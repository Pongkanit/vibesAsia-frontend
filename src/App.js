import React from 'react';
import { Layout } from 'antd';
import Header from './components/header';
import StockList from './components/stockList';

const { Content, Footer } = Layout;

const App = () => {
  return (
    <Layout className="layout">
      <Header />
      <Content style={{ padding: '50px' }}>
        <StockList />
      </Content>
      <Footer style={{ textAlign: 'center' }}>My Web App ©2024</Footer>
    </Layout>
  );
};

export default App;
