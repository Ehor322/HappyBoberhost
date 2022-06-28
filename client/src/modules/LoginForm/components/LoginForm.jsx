import React from "react";
import { Form, Input, Checkbox } from 'antd';
import { Button, Block } from '../../../components';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { validateField } from '../../../utils/helper';

const LoginForm = props => {
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
        isSubmitting,
      } = props;

    return (
        <section className="auth">
        <div className="auth__content">
        <div>
            <div className="auth__top">
                <h2>Sign in</h2>
                <p>Please sign in</p>
            </div>
            <Block>
                <Form onSubmit={handleSubmit} name="normal_login" className="login-form" initialValues={{ remember: true, }} onFinish={onFinish}>
                    <Form.Item validateStatus={validateField("email", touched, errors)} help={ !touched.email ? '' : errors.email } hasFeedback>
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} type="email" placeholder="E-Mail" size="large" onChange={handleChange} onBlur={handleBlur} value={values.email} name="email" />
                    </Form.Item>
                    <Form.Item validateStatus={validateField("password", touched, errors)} help={ !touched.password ? '' : errors.password } hasFeedback>
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" size="large" onChange={handleChange} onBlur={handleBlur} value={values.password} name="password" />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item>
                        <Button disabled={isSubmitting} onClick={ handleSubmit } type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                    <Link className="auth register-link" to="/signup">Register</Link>
                </Form>
            </Block>
        </div>
        </div>
    </section>
    );
};

export default LoginForm;