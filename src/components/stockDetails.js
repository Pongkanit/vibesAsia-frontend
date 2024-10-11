import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Input, message } from 'antd';
import { observer } from 'mobx-react-lite';
import stockStore from '../stores/stockStore';
import userStore from '../stores/userStore';

const StockDetail = observer(() => {
    if (!userStore.currentUser) {
        return <p>Please log in to view your stock information.</p>;
    }
    const { symbol } = useParams();
    const [stockData, setStockData] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [loading, setLoading] = useState(true);

    // Fetch stock information when component mounts
    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const response = await fetch(
                    `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=qQ47sYZlG9VXAyL2hus8wpQa8V0cwOhU`
                );
                const data = await response.json();
                setStockData(data[0]);
                setLoading(false);
            } catch (error) {
                message.error('Error fetching stock information');
                setLoading(false);
            }
        };

        fetchStockData();
        stockStore.fetchStocks(); // Fetch user stocks from the backend
    }, [symbol]);

    const handleBuy = async () => {
        if (quantity > 0) {
            const result = await stockStore.buyStock(symbol, quantity);
            if (result.message === 'Stock bought successfully') {
                message.success(result.message);
                setQuantity(0);
            } else {
                message.error(result.message);
            }
        } else {
            message.error('Please enter a valid quantity to buy');
        }
    };

    const handleSell = async () => {
        if (quantity > 0) {
            const result = await stockStore.sellStock(symbol, quantity);
            if (result.message === 'Stock sold successfully') {
                message.success(result.message);
                setQuantity(0);
            } else {
                message.error(result.message);
            }
        } else {
            message.error('Please enter a valid quantity to sell');
        }
    };

    if (loading) {
        return <p>Loading stock information...</p>;
    }

    if (!stockData) {
        return <p>Stock information could not be loaded.</p>;
    }

    return (
        <div>
            <h2>{stockData.symbol} - {stockData.name}</h2>
            <p>Price: ${stockData.price}</p>
            <p>Change: {stockData.change} ({stockData.changesPercentage}%)</p>
            <p>Day Low: ${stockData.dayLow}</p>
            <p>Day High: ${stockData.dayHigh}</p>
            <p>Your Holdings: {stockStore.getHolding(symbol)} shares</p>

            <Input
                type="number"
                min={1}
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                style={{ width: '200px', marginRight: '10px' }}
            />
            <Button type="primary" onClick={handleBuy} style={{ marginRight: '10px' }}>
                Buy
            </Button>
            <Button type="primary" danger onClick={handleSell}>
                Sell
            </Button>
        </div>
    );
});

export default StockDetail;
