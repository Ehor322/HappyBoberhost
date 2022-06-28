import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import "./authentication.scss"
import YellowBtn from '../elements/YellowBtn/Yellowbtn';
import Image from '../../img/Dog and rat vector.svg'
import Logo from '../../img/logo1.svg'
export const Authentication = () => {
    const auth = useContext(AuthContext);

    const { loading, request } = useHttp();
    const [formLogin, setFormLogin] = useState({
        email: '', password: ''
    });
    const [formRegister, setFormRegister] = useState({
        email: '', password: '', firstName: '', lastName: '', phone: ''
    });

    const [router, setRouter] = useState('login');

    const changeHandlerLogin = event => {
        setFormLogin({ ...formLogin, [event.target.name]: event.target.value });
    }
    const changeHandlerRegister = event => {
        setFormRegister({ ...formRegister, [event.target.name]: event.target.value });
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...formLogin });
            auth.login(data.token, data.accountId, data.userType);
            if (data.userType === 'admin') {
                window.location.reload();
            }

        } catch (e) {

        }
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...formRegister });
            console.log(data);
        } catch (e) {

        }
    }

    const [pointerEventsLogin, setPointerEventsLogin] = useState('all');

    const [pointerEventsRegister, setPointerEventsRegister] = useState('all');

    if (auth.isAuthenticated) {
        return (
            <h1>Thank you, you are logged in</h1>
        )
    }

    if (router === 'login') {
        return (
            <div className="login__wrapper" style={{ pointerEvents: pointerEventsLogin }}>
                <div className="wrapper-flex">
                    <div className="item">
                        <h1 className="login_main-text">Sign up</h1>
                        <div>
                            <input className="input-login"
                                placeholder="Email"
                                id="email"
                                type="text"
                                name="email"
                                value={formLogin.email}
                                onChange={changeHandlerLogin}/>
                        </div>

                        <div >
                            <input className="input-login"
                                placeholder="Password"
                                id="password"
                                type="password"
                                name="password"
                                value={formLogin.password}
                                onChange={changeHandlerLogin}/>
                        </div>

                        <div className="display-buttons">
                            <button className="sign-up__button" disabled={loading} onClick={loginHandler} thi>Log in</button>
                            <label style={{ cursor: 'pointer' }} onClick={() => { setRouter('register'); setPointerEventsLogin('none'); setPointerEventsRegister('all') }}>Create an account</label>
                        </div>

                    </div>
                    <div className="img-wrapper">
                        <img src={Image } alt="" />
                    </div>
                </div>
                <img className="login-logo" src={Logo} alt="1"/>
            </div>
        );
    }
    return (
        <div className="login__wrapper" style={{ pointerEvents: pointerEventsRegister }}>
            <div className="wrapper-flex">
                <div className="img-wrapper">
                    <img src={Image } alt="" />
                </div>
                <div className="item">
                <h1 className="login_main-text">Sign in</h1>
                <div className="register-flex">
                    <div>
                        <input 
                            className="register-input"
                            placeholder="First name"
                            id="firstName"
                            type="text"
                            name="firstName"
                            value={formRegister.firstName}
                            onChange={changeHandlerRegister}
                        />
                    </div>
                    <div className="input-field">
                        <input
                            className="register-input"
                            placeholder="Last name"
                            id="lastName"
                            type="text"
                            name="lastName"
                            value={formRegister.lastName}
                            onChange={changeHandlerRegister}
                        />
                    </div>
                </div>
            
                <div className="input-field">
                    <input
                        className="register-input"
                        placeholder="Enter your email"
                        id="email"
                        type="text"
                        name="email"
                        value={formRegister.email}
                        onChange={changeHandlerRegister}
                    />
                </div>
                <div className="input-field">
                    <input
                        className="register-input"
                        placeholder="Enter your phone"
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formRegister.phone}
                        onChange={changeHandlerRegister}
                    />
                </div>
                <div className="input-field">
                    <input
                        className="register-input"
                        placeholder="Enter your password"
                        id="password"
                        type="password"
                        name="password"
                        value={formRegister.password}
                        onChange={changeHandlerRegister}
                    />

                </div>
                <div className="display-buttons">
                    <button  className="sign-up__button" disabled={loading} onClick={registerHandler}>Register</button>
                    <label style={{ cursor: 'pointer' }} onClick={() => { setRouter('login'); setPointerEventsRegister('none'); setPointerEventsLogin('all') }}>I am already member</label>
                </div>
                </div>
            </div>
            <img className="login-logo" src={Logo} alt="1"/>
        </div>
    );

};