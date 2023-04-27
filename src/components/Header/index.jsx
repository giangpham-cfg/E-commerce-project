
import React, { useState } from 'react';
import { SearchOutlined, ShoppingOutlined, MenuOutlined } from '@ant-design/icons';
import { Badge, Divider, Drawer, Dropdown, Input, Space } from 'antd';
import './header.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const [openDrawer, setOpenDrawer] = useState(false);
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const user = useSelector(state => state.account.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const items = [
        {
            label: (
                <a target="_blank" rel="noreferrer" href="">
                    Manage account
                </a>
            ),
            key: 'account',
        },
        {
            label: (
                <a target="_blank" rel="noreferrer" href="">
                    Logout
                </a>
            ),
            key: 'logout',
        },
    ]

    return (
        <>
            <div className="header-container">

                <div className="header-left">
                    <div className="burger-menu"
                        onClick={() => setOpenDrawer(true)}
                    >
                        <MenuOutlined />
                    </div>
                    <div className='logo'>
                        <div className="book-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M542.22 32.05c-54.8 3.11-163.72 14.43-230.96 55.59-4.64 2.84-7.27 7.89-7.27 13.17v363.87c0 11.55 12.63 18.85 23.28 13.49 69.18-34.82 169.23-44.32 218.7-46.92 16.89-.89 30.02-14.43 30.02-30.66V62.75c.01-17.71-15.35-31.74-33.77-30.7zM264.73 87.64C197.5 46.48 88.58 35.17 33.78 32.05 15.36 31.01 0 45.04 0 62.75V400.6c0 16.24 13.13 29.78 30.02 30.66 49.49 2.6 149.59 12.11 218.77 46.95 10.62 5.35 23.21-1.94 23.21-13.46V100.63c0-5.29-2.62-10.14-7.27-12.99z" /></svg>
                        </div>
                        <div className="logo-text">Happy Reader</div>
                    </div>
                </div>
                <div className="search-bar">
                    <Input size="large" placeholder="What are you looking for today?" prefix={<SearchOutlined rotate={90} />} />
                </div>
                <div className='user-shopping'>
                    <div className="shopping-basket">
                        <Space>
                            <Badge count={5}>
                                <ShoppingOutlined />
                            </Badge>
                        </Space>
                    </div>
                    <div className="account">
                        {!isAuthenticated ?
                            <span onClick={() => navigate('/login')}>User Account</span>
                            :
                            <Dropdown menu={{ items }}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        Welcome {user.fullName}
                                    </Space>
                                </a>
                            </Dropdown>
                        }
                    </div>
                </div>
            </div>

            <Drawer
                title="Account menu"
                placement="left"
                onClose={() => setOpenDrawer(false)}
                open={openDrawer}
            >
                <p>Manage account</p>
                <Divider />
                <p>Logout</p>
                <Divider />
            </Drawer>
        </>
    )
}

export default Header;