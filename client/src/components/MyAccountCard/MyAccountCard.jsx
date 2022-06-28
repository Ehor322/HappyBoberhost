import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FireBaseUploader } from '../FireBaseUploader/FireBaseUploader'
import { useHttp } from "../../hooks/http.hook";
import { storage } from "../../firebase/firebase";
import "./MyAccountCard.scss";

export const MyAccountCard = ({ account }) => {

    const [url, setUrl] = useState(account.photo);


    const [images, setImages] = useState([]);


    const [accountData, setAccountData] = useState({
        id: account._id,
        firstName: (account.firstName ? account.firstName : ''),
        lastName: (account.lastName ? account.lastName : ''),
        email: (account.email ? account.email : ''),
        phone: (account.phone ? account.phone : ''),
        password: '',
        registeredAt: (account.registeredAt ? account.registeredAt : ''),
        lastLogin: (account.lastLogin ? account.lastLogin : ''),
        userType: (account.userType ? account.userType : ''),
        isSubscriber: (account.isSubscriber ? account.isSubscriber : ''),
        appLanguage: (account.appLanguage ? account.appLanguage : ''),
        expirySubscription: (account.expirySubscription ? account.expirySubscription : ''),
        photo: (account.photo ? account.photo : ''),
        region: (account.region ? account.region : ''),
        description: (account.description ? account.description : ''),
        website: (account.website ? account.website : '')
    });

    const changeHandler = event => {
        setAccountData({ ...accountData, [event.target.name]: event.target.value });
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
            await request('/api/account/updatemyacc', 'POST', { ...accountData }, { Authorization: `Bearer ${auth.token}` });
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
                            setUrl(urls);
                            setAccountData({ photo: urls });
                            accountData.photo = urls;
                            resolve(urls);
                        });
                }
            );
        })

    }

    return (
        <div style={{ marginTop: '5vw', display: "flex", flexDirection: 'column' }}>
            <p className="Main-Account__input-text">Accaunt Setting</p>
            <div className="account__input-flex"> 
                <div className="account__input-ImgWrapper">
                    <img src={accountData.photo}></img>
                </div>
                <button className="account__input-Button" style={accountData.photo === '' ? { display: 'none' } : { display: 'all' }} onClick={() => {
                setAccountData({ ...accountData, photo: '' })
            }}>Delete Image</button>
            </div>
            <input className = "account__input" value={accountData.firstName}
                placeholder="firstName"
                id="firstName"
                type="text"
                name="firstName"
                onChange={changeHandler} />
            <input className = "account__input" value={accountData.lastName}
                placeholder="lastName"
                id="lastName"
                type="text"
                name="lastName"
                onChange={changeHandler} />
            <input className = "account__input" value={accountData.email}
                placeholder="email"
                id="email"
                type="text"
                name="email"
                onChange={changeHandler} />
            <input className = "account__input" value={accountData.phone}
                placeholder="phone"
                id="phone"
                type="tel"
                name="phone"
                onChange={changeHandler} />
            <input className = "account__input" value={accountData.password}
                placeholder="password"
                id="password"
                type="password"
                name="password"
                onChange={changeHandler} />
            <input className = "account__input" value={accountData.region}
                placeholder="region"
                id="region"
                type="text"
                name="region"
                onChange={changeHandler} />
            <input className = "account__input" value={accountData.description}
                placeholder="description"
                id="description"
                type="text"
                name="description"
                onChange={changeHandler} />
            <input className = "account__input" value={accountData.website}
                placeholder="website"
                id="website"
                type="text"
                name="website"
                onChange={changeHandler} />
            <div className="account__input-flex">
                <FireBaseUploader handleChange={handleChangePhoto} isMultiple={false}>
                </FireBaseUploader>
            </div>
            <div className="account__input-flex">
                <button  className="account__input-Button" disabled={loading} onClick={createAdHandler}>Save</button>
                <button   className="account__input-Button" onClick={() => {
                    setAccountData({
                        id: account._id,
                        firstName: (account.firstName ? account.firstName : ''),
                        lastName: (account.lastName ? account.lastName : ''),
                        email: (account.email ? account.email : ''),
                        phone: (account.phone ? account.phone : ''),
                        password: '',
                        registeredAt: (account.registeredAt ? account.registeredAt : ''),
                        lastLogin: (account.lastLogin ? account.lastLogin : ''),
                        userType: (account.userType ? account.userType : ''),
                        isSubscriber: (account.isSubscriber ? account.isSubscriber : ''),
                        appLanguage: (account.appLanguage ? account.appLanguage : ''),
                        expirySubscription: (account.expirySubscription ? account.expirySubscription : ''),
                        photo: (account.photo ? account.photo : ''),
                        region: (account.region ? account.region : ''),
                        description: (account.description ? account.description : ''),
                        website: (account.website ? account.website : '')
                    })
                }} >Cancel</button>
            </div>
        </div>
    )
}