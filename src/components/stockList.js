import React, { useState, useEffect } from 'react';
import { Card, message } from 'antd';
import { Link } from 'react-router-dom';

const StockList = () => {
    const [stockData, setStockData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch real-time stock data for AAPL and TSLA (skip using .env)
    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const response = await fetch(
                    'https://financialmodelingprep.com/api/v3/quote/AAPL,TSLA?apikey=qQ47sYZlG9VXAyL2hus8wpQa8V0cwOhU'
                );
                const data = await response.json();
                setStockData(data);
                setLoading(false);
            } catch (error) {
                message.error('Error fetching stock data');
                setLoading(false);
            }
        };

        fetchStockData();
    }, []);

    if (loading) {
        return <p>Loading stock information...</p>;
    }

    return (
        <div>
            <h2>Stock List</h2>
            <div style={{ display: 'flex', gap: '20px' }}>
                {stockData.map((stock) => (
                    <Card
                        key={stock.symbol}
                        title={`${stock.symbol} - ${stock.name}`}
                        style={{ width: 300 }}
                        extra={<Link to={`/stock/${stock.symbol}`}>View Details</Link>}
                    >
                        <p>Price: ${stock.price}</p>
                        <p>Change: {stock.change} ({stock.changesPercentage}%)</p>
                        <p>Day Low: ${stock.dayLow}</p>
                        <p>Day High: ${stock.dayHigh}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default StockList;
