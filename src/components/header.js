import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Layout, Menu, Button, Modal, Form, Input, message } from 'antd';
import userStore from '../stores/userStore';
import { Link } from 'react-router-dom';

const { Header: AntHeader } = Layout;

const Header = observer(() => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleLogin = async (values) => {
        const { username, password } = values;
        const result = await userStore.login(username, password);

        if (result.success) {
            message.success(result.message);
            setIsModalVisible(false);
            form.resetFields();
        } else {
            message.error(result.message);
        }
    };

    const handleLogout = async () => {
        const result = await userStore.logout();

        if (result.success) {
            message.success(result.message);
        } else {
            message.error(result.message);
        }
    };

    return (
        <AntHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ flex: 1 }}>
                <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
            </Menu>
            {userStore.currentUser ? (
                <>
                    <span style={{ color: 'white' }}>Welcome, {userStore.currentUser}!</span>
                    <Button type="primary" style={{ marginLeft: '10px' }} onClick={handleLogout}>
                        Logout
                    </Button>
                </>
            ) : (
                <Button type="primary" style={{ marginLeft: 'auto' }} onClick={showModal}>
                    Login
                </Button>
            )}
            <Modal title="Login" open={isModalVisible} onCancel={handleCancel} footer={null}>
                <Form form={form} onFinish={handleLogin}>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
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
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </AntHeader>
    );
});

export default Header;
