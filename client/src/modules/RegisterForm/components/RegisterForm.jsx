import React from "react";
import { Form } from 'antd';
import { Button, Block, FormField } from '../../../components';
import { UserOutlined, LockOutlined, MailOutlined, InfoCircleTwoTone } from '@ant-design/icons';
import { Link } from "react-router-dom";

const success = false;

const RegisterForm = props => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isValid,
        isSubmitting
      } = props;

    return (
        <section className="auth">
        <div className="auth__content">
        <div>
            <div className="auth__top">
                <h2>Register</h2>
                <p>To enter the chat, you need to register</p>
            </div>
            <Block>
                <Form onSubmit={handleSubmit} name="normal_login" className="login-form" initialValues={{ remember: true, }} onFinish={onFinish}>
                    <FormField name="email" touched={touched} errors={errors} handleChange={handleChange} handleBlur={handleBlur} placeholder="E-Mail" type="email" icon={<MailOutlined/>} values={values} />
                    <FormField name="fullname" touched={touched} errors={errors} handleChange={handleChange} handleBlur={handleBlur} placeholder="Name" type="user" icon={<UserOutlined/>} values={values} />
                    <FormField name="password" touched={touched} errors={errors} handleChange={handleChange} handleBlur={handleBlur} placeholder="Password" type="password" icon={<LockOutlined/>} values={values} />
                    <FormField name="password_2" touched={touched} errors={errors} handleChange={handleChange} handleBlur={handleBlur} placeholder="Password repeat" type="password" icon={<LockOutlined/>} values={values} />
                    <Form.Item>
                        <Button onClick={ handleSubmit } type="primary" htmlType="submit" className="login-form-button">
                            Register
                        </Button>
                    </Form.Item>
                    <Link className="auth register-link" to="/signin">Login</Link>
                 </Form>
        </Block>
        </div>
        </div>
    </section>
    );
};

export default RegisterForm;