import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useHttp } from "../../../hooks/http.hook";
import { RadioButton } from '../../../components/RadioButton/RadioButton';
import { FireBaseUploader } from '../../../components/FireBaseUploader/FireBaseUploader';
import { storage } from '../../../firebase/firebase';
import './CreateAdAdmin.scss';

export const CreateAdAdmin = () => {

    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);

    const auth = useContext(AuthContext);

    const [gender, setGender] = React.useState('');

    const [form, setForm] = useState({
        type: '', gender: '', color: '', information: '', age: 0, breed: '', price: 0, animalName: '', picture: [], location: ''
    });

    const { loading, request } = useHttp();

    const changeHandler = event => {
        form.gender = gender;
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const handleMaleChange = () => {
        setGender('male');
    };

    const handleFemaleChange = () => {
        setGender('female');
    };

    const handleChange = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            setImages((prevState) => [...prevState, newImage]);

        }
    };

    const createAdHandler = () => {
        const promises = [];
        images.forEach((image) => {
            promises.push(uploadImageAsPromise(image));
        })
        Promise.all(promises).then(async () => {
            await request('/api/ads/createad', 'POST', { ...form }, { Authorization: `Bearer ${auth.token}` });
        }).then(() => {
            setForm({
                type: '', gender: '', color: '', information: '', age: 0, breed: '', price: 0, animalName: '', picture: [], location: ''
            });
            setGender(''); setUrls([]); setImages([]);
        })
    }

    async function uploadImageAsPromise(image) {
        return new Promise(function (resolve, reject) {
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on(
                "state_changed",
                () => { },
                (error) => {
                    console.log(error);
                    reject(error);
                },
                async () => {
                    await storage
                        .ref("images")
                        .child(image.name)
                        .getDownloadURL()
                        .then((urls) => {
                            setUrls((prevState) => [...prevState, urls]);
                            setForm((prevState) => ({ picture: [...prevState.picture, urls] }));
                            form.picture.push(urls);
                            resolve(urls);
                        });
                }
            );
        })

    }




    return (
        <div style={{ marginTop: '4vw' }}>
            <p className='ManeLabel-CreateAd'>CREATE AD</p>
            <div className="create-flex">
                <div className="left">
                    <FireBaseUploader handleChange={handleChange} isMultiple={true}>
                    </FireBaseUploader>
                </div>
                <div className="right">
                    <div >
                        <input className='create-input' placeholder='Name' type="text" name="animalName" autoComplete="off" required
                            value={form.animalName}
                            onChange={changeHandler} />

                    </div>
                    <div >
                        <input type="text" name="type" placeholder='Type' autoComplete="off" required
                            value={form.type}
                            onChange={changeHandler} />
                    </div>
                    <div >
                        <input type="text" name="breed" placeholder='Breed' autoComplete="off" required
                            value={form.breed}
                            onChange={changeHandler} />
                    </div>
                    <div >
                        <input type="number" min={0} max={1000000} name="age" placeholder='Age' autoComplete="off" required
                            value={form.age}
                            onChange={changeHandler} />
                    </div>
                    <div >
                        <input type="number" min={0} max={1000000} name="price" placeholder='Price' autoComplete="off" required
                            value={form.price}
                            onChange={changeHandler} />
                    </div>
                    <div >
                        <input type="text" name="color" placeholder='Color' autoComplete="off" required
                            value={form.color}
                            onChange={changeHandler} />
                    </div>
                    <div >
                        <input type="text" placeholder='Location' name="location" autoComplete="off" required
                            value={form.location}
                            onChange={changeHandler} />
                    </div>
                    <div className='Radio'>
                        <RadioButton
                            label="Male"
                            value={gender === 'male'}
                            onChange={handleMaleChange}
                        ></RadioButton>
                        <RadioButton
                            label="Female"
                            value={gender === 'female'}
                            onChange={handleFemaleChange}
                        ></RadioButton>
                    </div>
                </div>

            </div>
            <div >
                <textarea className='createAdPage-textarea' type="text" placeholder='Information' name="information" autoComplete="off" required value={form.information} onChange={changeHandler} />
                <button className='createAdPage-button' disabled={loading} onClick={createAdHandler}>Create</button>
            </div>

        </div >
    );
};
