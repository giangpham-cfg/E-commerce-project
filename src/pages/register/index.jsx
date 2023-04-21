import React, { useState } from 'react';
import './index.scss';
import { Button, Form, Input, message, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { callRegister } from '../../service/api';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false);

    const onFinish = async (values) => {
        const { fullName, email, password, phone } = values;
        setIsSubmit(true);
        const res = await callRegister(fullName, email, password, phone);
        setIsSubmit(false);
        if (res?.data?._id) {
            message.success({
                content: 'Your registration is completed. Thanks for signing up!',
                duration: 5
            });
            navigate('/login')
        } else {
            notification.error({
                message: 'There is an error!',
                description: 'Email is invalid or already exist. Please use another email',
                placement: 'topRight',
                duration: 5
            })
        }
    };

    return (
        <div className='register-wrapper'>
            <div className='register-container'>
                <div className='register-content'>
                    <div className='sign-up'>Sign Up</div>
                    <Form
                        name="basic"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Full Name"
                            name="fullName"
                            rules={[{ required: true, message: 'Please input your full name!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <div className='register-text'>
                            Signed up already?
                            <a href='#'>Login here</a>
                        </div>

                        <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
                            <Button type="primary" htmlType="submit" loading={isSubmit}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )

};

export default RegisterPage