import React, { useState } from 'react';
import './layoutAdmin.scss';
import {
    TeamOutlined,
    UserOutlined,
    AppstoreOutlined,
    FileDoneOutlined,
    DollarOutlined
} from '@ant-design/icons';
import { Dropdown, Layout, Menu, Space } from 'antd';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';

const { Sider, Content, Footer } = Layout;

const items = [
    {
        key: 'dashboard',
        icon: <AppstoreOutlined />,
        label: <Link to='/admin'>Dashboard</Link>,
    },
    {
        key: 'user',
        icon: <UserOutlined />,
        label: 'Manage Users',
        children: [
            {
                key: 'crud',
                icon: <TeamOutlined />,
                label: <Link to='/admin/user'>CRUD</Link>,
            },
            {
                key: 'file',
                icon: <TeamOutlined />,
                label: 'Files',
            },
        ]
    },
    {
        key: 'book',
        icon: <FileDoneOutlined />,
        label: <Link to='/admin/book'>Manage Books</Link>,
    },
    {
        key: 'order',
        icon: <DollarOutlined />,
        label: <Link to='/admin/order'>Manage Orders</Link>,
    },
]

const LayoutAdmin = () => {
    const user = useSelector(state => state.account.user);
    const [activeMenu, setActiveMenu] = useState('dashboard');

    const adminItems = [
        {
            label: 'Manage account',
            key: 'account',
        },
        {
            label: 'Logout',
            key: 'logout',
        },
    ]

    return (
        <Layout
            className='layout-admin'
            style={{ minHeight: '100vh' }}
        >
            <Sider
                breakpoint="md"
                collapsedWidth="0"
                style={{ background: 'white' }}
            >
                <div style={{ height: 32, textAlign: 'center', marginTop: '25px' }}>
                    Admin
                </div>
                <Menu
                    theme="light"
                    defaultSelectedKeys={[activeMenu]}
                    mode="inline"
                    items={items}
                    onClick={(e) => setActiveMenu(e.key)}
                />
            </Sider>
            <Layout>
                <div className='admin-header'>
                    <Dropdown menu={{ items: adminItems }}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                Welcome {user.fullName}
                            </Space>
                        </a>
                    </Dropdown >
                </div>
                <Content>
                    <div style={{ padding: 0, minHeight: 360, background: '#f5f5f5', height: '80vh', marginLeft: '50px' }}>
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>&copy; 2023 Giang Pham. <a target='_blank' href='https://github.com/giangpham-cfg'>My github page</a></Footer>
            </Layout>
        </Layout>
    )
}

export default LayoutAdmin;