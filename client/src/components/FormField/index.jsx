import React from "react";
import { Form, Input } from 'antd';
import { validateField } from '../../utils/helper';

const FormField = ({ name, placeholder, icon, type, handleChange, handleBlur, touched, errors, values }) => {
  return (
    <Form.Item validateStatus={validateField(name, touched, errors)} help={ !touched[name] ? '' : errors[name] } hasFeedback>
      <Input prefix={icon} type={type} placeholder={placeholder} size="large" onChange={handleChange} onBlur={handleBlur} value={values[name]} name={name} />
    </Form.Item>
  );
};

export default FormField;