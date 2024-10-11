import { makeAutoObservable } from 'mobx';

class StockStore {
    stocks = [];
    constructor() {
        makeAutoObservable(this);
    }

    // Fetch user's stocks from the backend
    async fetchStocks() {
        try {
            const response = await fetch('http://localhost:3001/stocks', {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();
            if (response.ok) {
                this.stocks = data.stocks;
            }
        } catch (error) {
            console.error('Error fetching stocks:', error);
        }
    }

    // Get the user's holdings for a specific stock
    getHolding(symbol) {
        const stock = this.stocks.find(s => s.name === symbol);
        return stock ? stock.currentHold : 0;
    }

    // Buy stock
    async buyStock(symbol, quantity) {
        try {
            const response = await fetch('http://localhost:3001/stocks/buy', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ stockName: symbol, quantity }),
            });
            const data = await response.json();
            if (response.ok) {
                this.fetchStocks();
            }
            return data;
        } catch (error) {
            console.error('Error buying stock:', error);
        }
    }

    // Sell stock
    async sellStock(symbol, quantity) {
        try {
            const response = await fetch('http://localhost:3001/stocks/sell', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ stockName: symbol, quantity }),
            });
            const data = await response.json();
            if (response.ok) {
                this.fetchStocks();
            }
            return data;
        } catch (error) {
            console.error('Error selling stock:', error);
        }
    }
}

const stockStore = new StockStore();
export default stockStore;
