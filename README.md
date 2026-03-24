# 📈 Equitix — Real-Time Stock Trading Platform

> **New Generation Stock Trading. Precision. Speed. Intelligence.**

---

## 🏢 About Equitix

**Equitix** is a next-generation stock trading web application designed for modern traders who demand real-time data, blazing performance, and a clean, intuitive interface. Built for both retail investors and professional traders, Equitix delivers live market data, portfolio tracking, and intelligent trade execution insights — all in one seamless platform.

---

## 🎯 Purpose

The goal of Equitix is to democratize access to professional-grade trading tools. Traditional trading platforms are cluttered, slow, and intimidating. Equitix reimagines the trading experience with:

- A clean, responsive UI optimized for speed
- Real-time stock price updates with zero lag
- Intelligent dashboards that surface the data that matters most
- A platform accessible to beginners and experts alike

---

## 🌐 API Used

**[Polygon.io REST & WebSocket API](https://polygon.io/)**

Polygon.io is a financial data platform providing real-time and historical stock market data. Equitix uses it for:

| Endpoint | Usage |
|---|---|
| `/v2/aggs/ticker/{ticker}/range/...` | Historical OHLCV candlestick data |
| `/v3/reference/tickers` | Stock ticker search & company info |
| `/v2/last/trade/{ticker}` | Last trade price for a stock |
| `WebSocket: stocks.*` | Real-time live price streaming |
| `/v2/snapshot/locale/us/markets/stocks/tickers` | Market-wide snapshot & movers |

> **Why Polygon.io?** It offers a generous free tier, robust WebSocket support for live data, and covers all major US exchanges including NYSE, NASDAQ, and AMEX.

---

## ✨ Features

### 🔴 Live Trading Dashboard
- Real-time stock price ticker using WebSocket streaming
- Live candlestick chart with 1min / 5min / 1hr / 1D / 1W intervals
- Top Gainers & Losers updated every 30 seconds

### 🔍 Stock Search & Discovery
- Intelligent ticker search with autocomplete
- Company profiles: name, sector, market cap, exchange
- Quick-view price cards with percentage change

### 📊 Portfolio Tracker
- Add/remove stocks to a personal watchlist
- Track unrealized P&L across your holdings
- Portfolio performance chart over time

### 📰 Market Overview
- Pre-market & after-hours price data
- Volume heatmap across sectors
- 52-week high/low indicators

### 🔔 Price Alerts *(Planned)*
- Set custom price thresholds for any ticker
- Browser notifications when alerts trigger

### 🌙 Dark / Light Mode
- Full theme switching with smooth transitions
- Optimized color contrast for long trading sessions

---

## 🛠 Technologies

| Layer | Technology |
|---|---|
| **Frontend** | React.js (Vite) |
| **Charts** | Lightweight Charts (TradingView) |
| **API Integration** | Polygon.io REST API + WebSockets |
| **HTTP Client** | Axios |
| **Routing** | React Router v6 |
| **Version Control** | Git + GitHub |
| **Deployment** | Vercel |

---


### Installation

```bash
# 1. Clone the repository
git clone https://github.com/equitix/equitix-trading-app.git
cd equitix-trading-app

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
```


---

## 📁 Project Structure

```
equitix/
├── public/
│   └── equitix-logo.svg
├── src/
│   ├── components/
│   │   ├── Dashboard/
│   │   ├── StockChart/
│   │   ├── Watchlist/
│   │   ├── SearchBar/
│   │   └── Navbar/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Trade.jsx
│   │   └── Portfolio.jsx
│   ├── hooks/
│   │   ├── usePolygonWebSocket.js
│   │   └── useStockData.js
│   ├── store/
│   │   └── useStore.js
│   ├── services/
│   │   └── polygonApi.js
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── package.json
├── vite.config.js
└── README.md
```

---

## 📌 Roadmap

- [x] Project setup & repository initialization
- [ ] Basic UI layout & routing
- [ ] Polygon.io API integration (REST)
- [ ] Live stock search & ticker cards
- [ ] Real-time WebSocket price streaming
- [ ] Candlestick chart (Lightweight Charts)
- [ ] Watchlist / Portfolio tracker
- [ ] Price alerts system
- [ ] Mobile responsive design
- [ ] Deployment to Vercel

---


## 👤 Author

**Equitix Engineering Team**
- Name : Gurtaz Singh

---
