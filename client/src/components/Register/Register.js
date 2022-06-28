import React, { useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { NavLink } from "react-router-dom";

export const RegisterPage = () => {

    const [form, setForm] = useState({
        email: '', password: ''
    });

    const { loading, request } = useHttp();


    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }



    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form });
            console.log(data);
        } catch (e) {

        }
    }




};
