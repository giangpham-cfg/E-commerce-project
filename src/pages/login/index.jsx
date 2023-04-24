import React, { useState } from 'react';
import '../register/index.scss';
import { Button, Form, Input, message, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { callLogin } from '../../service/api';
import { useDispatch } from 'react-redux';
import { doLoginAction } from '../../redux/account/accountSlice';

const LoginPage = () => {
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false);

    const dispatch = useDispatch();

    const onFinish = async (values) => {
        const { username, password } = values;
        setIsSubmit(true);
        const res = await callLogin(username, password);
        setIsSubmit(false);

        if (res?.data) {
            localStorage.setItem('access_token', res.data.access_token);
            dispatch(doLoginAction(res.data.user))
            message.success({
                content: 'Logged in successfully!',
                duration: 5
            })
            navigate('/')
        } else {
            notification.error({
                message: 'There is an error!',
                description: 'Login information is not valid',
                placement: 'topRight',
                duration: 5
            })
        }
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
                            name="username"
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
                            <Link to='/register' > Sign up here </Link>
                        </div>

                        <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
                            <Button type="primary" htmlType="submit" loading={isSubmit}>
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