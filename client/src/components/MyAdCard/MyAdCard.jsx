import React, { useState, useContext } from "react";
import { Modal } from "../modal/Modal";
import { Report } from "../report/Report";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { FireBaseUploader } from '../FireBaseUploader/FireBaseUploader';
import { useHttp } from "../../hooks/http.hook";
import { storage } from "../../firebase/firebase";
import { RadioButton } from "../RadioButton/RadioButton";
import "./MyAdCard.scss"




export const MyAdCard = ({ ad }) => {

    const [urls, setUrls] = useState(ad.picture);


    const [images, setImages] = useState([]);

    const [adData, setAdData] = useState({
        id: ad._id,
        type: (ad.type ? ad.type : ''),
        gender: (ad.gender ? ad.gender : ''),
        color: (ad.color ? ad.color : ''),
        information: (ad.information ? ad.information : ''),
        age: (ad.age ? ad.age : 0),
        breed: (ad.breed ? ad.breed : ''),
        price: (ad.price ? ad.price : 0),
        animalName: (ad.animalName ? ad.animalName : ''),
        date: (ad.date ? ad.date : Date.now),
        picture: (ad.picture ? ad.picture : []),
        isTop: (ad.isTop ? ad.isTop : false),
        topEnd: (ad.topEnd ? ad.topEnd : null),
        location: (ad.location ? ad.location : ''),
        account: (ad.account ? ad.account : '')
    });

    const changeHandler = event => {
        setAdData({ ...adData, [event.target.name]: event.target.value });
    }

    const handleChangePhoto = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            setImages((prevState) => [...prevState, newImage]);

        }
    };

    const { loading, request } = useHttp();

    const auth = useContext(AuthContext);


    const createAdHandler = () => {
        const promises = [];
        images.forEach((image) => {
            promises.push(uploadImageAsPromise(image));
        })
        Promise.all(promises).then(async () => {
            await request('/api/ads/updatemyad', 'POST', { ...adData }, { Authorization: `Bearer ${auth.token}` });
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
                            //setAdData((prevState) => ({ picture: [...prevState.picture, urls] }));
                            adData.picture.push(urls);
                            resolve(urls);
                        });
                }
            );
        })

    }


    const handleMaleChange = () => {
        setAdData({ ...adData, gender: 'male' });
    };

    const handleFemaleChange = () => {
        setAdData({ ...adData, gender: 'female' });
    };


    return (
        <div style={{ marginTop: '100px', display: "flex", flexDirection: 'column' }}>
            <p className="Main-Account__input-text">Ad Setting</p>
            <input className = "ad__input" value={adData.type}
                placeholder="type"
                id="type"
                type="text"
                name="type"
                onChange={changeHandler} />
            <input className = "ad__input" value={adData.color}
                placeholder="color"
                id="color"
                type="text"
                name="color"
                onChange={changeHandler} />
            <input className = "ad__input"  value={adData.information}
                placeholder="information"
                id="information"
                type="text"
                name="information"
                onChange={changeHandler} />
            <input className = "ad__input" value={adData.breed}
                placeholder="breed"
                id="breed"
                type="text"
                name="breed"
                onChange={changeHandler} />
            <input className = "ad__input" value={adData.animalName}
                placeholder="animalName"
                id="animalName"
                type="text"
                name="animalName"
                onChange={changeHandler} />
            <input className = "ad__input" value={adData.location}
                placeholder="location"
                id="location"
                type="text"
                name="location"
                onChange={changeHandler} />
            <input className = "ad__input" value={adData.age}
                placeholder="age"
                id="age"
                type="number"
                name="age"
                onChange={changeHandler} />
            <input className = "ad__input" value={adData.price}
                placeholder="price"
                id="price"
                type="number"
                name="price"
                onChange={changeHandler} />
            <div className='Radio'>
                <RadioButton
                    label="Male"
                    value={adData.gender === 'male'}
                    onChange={handleMaleChange}
                ></RadioButton>
                <RadioButton
                    label="Female"
                    value={adData.gender === 'female'}
                    onChange={handleFemaleChange}
                ></RadioButton>
            </div>
            <div className="adSetting-Flex">
                <div className="adSetting-Grid">{(adData.picture).map((img) => {
                    return (
                    <div>
                        <img width={'200px'} height={'200px'} src={img} />
                        <div>
                            <button  className="ad__input-Button" onClick={() => {
                                setAdData({ ...adData, picture: adData.picture.filter(image => image !== img) })
                            }}>delete</button>
                        </div>
                    </div>)
                })}
                </div>
            </div>
            <div  className="account__input-flex">
                <FireBaseUploader handleChange={handleChangePhoto} isMultiple={true}>
                </FireBaseUploader>
            </div>

            <div className="account__input-flex">
                <button className="ad__input-Button" disabled={loading} onClick={createAdHandler}>Save</button>
                <button className="ad__input-Button"  onClick={() => {
                    setAdData({
                        id: ad._id,
                        type: (ad.type ? ad.type : ''),
                        gender: (ad.gender ? ad.gender : ''),
                        color: (ad.color ? ad.color : ''),
                        information: (ad.information ? ad.information : ''),
                        age: (ad.age ? ad.age : 0),
                        breed: (ad.breed ? ad.breed : ''),
                        price: (ad.price ? ad.price : 0),
                        animalName: (ad.animalName ? ad.animalName : ''),
                        date: (ad.date ? ad.date : Date.now),
                        picture: (ad.picture ? ad.picture : []),
                        isTop: (ad.isTop ? ad.isTop : false),
                        topEnd: (ad.topEnd ? ad.topEnd : null),
                        location: (ad.location ? ad.location : ''),
                        account: (ad.account ? ad.account : '')
                    })
                }} >Cancel</button>
            </div>

        </div>
    )
}