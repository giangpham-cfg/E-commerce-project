import React, { useState } from 'react';
import '../register/index.scss';
import { Button, Form, Input, message, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const onFinish = async (values) => {
        const { email, password } = values;
    }
    return (
        <div className='register-wrapper'>
            <div className='register-container'>
                <div className='register-content'>
                    <div className='sign-up'>Login</div>
                    <Form
                        name="basic"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >

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

                        <div className='register-text'>
                            Haven't had an account?
                            <a href='#'>Sign up here</a>
                        </div>

                        <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
                            <Button type="primary" htmlType="submit" loading={true}>
                                LOGIN
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;