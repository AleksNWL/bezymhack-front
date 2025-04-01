import React from 'react';
import { Menu } from 'antd';
import 'antd/dist/reset.css';
import './Nav.css';

const Nav: React.FC = () => {
    return (
        <Menu mode="horizontal" style={{ justifyContent: 'center' }}>
            <Menu.Item key="home">
                <a href="/main">Purchaseses</a>
            </Menu.Item>
            <Menu.Item key="auth">
                <a href="/login">Login</a>
            </Menu.Item>
            <Menu.Item key="register">
                <a href="/register">Register</a>
            </Menu.Item>
        </Menu>
    )
}

export default Nav;