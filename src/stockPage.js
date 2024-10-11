import React from 'react';
import { Layout } from 'antd';
import Header from './components/header';
import StockDetail from './components/stockDetails';

const { Content, Footer } = Layout;

const StockPage = () => {
    return (
        <Layout className="layout">
            <Header />
            <Content style={{ padding: '50px' }}>
                <StockDetail />
            </Content>
            <Footer style={{ textAlign: 'center' }}>My Web App ©2024</Footer>
        </Layout>
    );
};

export default StockPage;
