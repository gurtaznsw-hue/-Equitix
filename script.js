const API_KEY = ""; // 1. Put your Polygon API Key
let currentPrice = 0; let curSym = "AAPL";

async function get(url) {
    const res = await fetch(`${url}${url.includes('?') ? '&' : '?'}apiKey=${API_KEY}`);
    return res.json();
}

function qp(s) { document.getElementById("tickerInput").value = s; fetchData(); }

async function fetchData(ticker = document.getElementById("tickerInput").value || curSym) {
    curSym = ticker.toUpperCase();
    const now = new Date().toISOString().split('T')[0];
    const prev = new Date(Date.now() - 7 * 864e5).toISOString().split('T')[0];

    const [snap, hist, divs] = await Promise.all([
        get(`https://api.polygon.io/v2/aggs/ticker/${curSym}/prev?adjusted=true`),
        get(`https://api.polygon.io/v2/aggs/ticker/${curSym}/range/1/day/${prev}/${now}`),
        get(`https://api.polygon.io/v3/reference/dividends?ticker=${curSym}&limit=3`)
    ]);

    if (snap.results) {
        currentPrice = snap.results[0].c;
        updateHero(curSym, snap.results[0]);
    } else { simulateLive(); } // No API Key -> Start Live Simulator

    if (hist.results) updateHistory(hist.results.reverse().slice(0, 5));
    if (divs.results) updateDividends(divs.results);
    document.getElementById("lastUpdated").innerText = `Updated: ${new Date().toLocaleTimeString()}`;
}

function simulateLive() {
    if (currentPrice === 0) currentPrice = 150.00;
    const movement = (Math.random() - 0.5) * 2;
    currentPrice = parseFloat((currentPrice + movement).toFixed(2));
    updateHero(curSym, { c: currentPrice, o: 148, h: currentPrice + 1, l: currentPrice - 1, v: 50000000 });
    console.log("Simulating Live Mode...");
}

function updateHero(t, d) {
    const ch = (((d.c - d.o) / d.o) * 100).toFixed(2);
    document.getElementById("stockSymbol").innerText = t;
    document.getElementById("stockPrice").innerText = `$${d.c}`;
    document.getElementById("openPrice").innerText = `$${d.o}`;
    document.getElementById("prevClose").innerText = `$${d.o}`;
    document.getElementById("dayHigh").innerText = `$${d.h}`;
    document.getElementById("dayLow").innerText = `$${d.l}`;
    document.getElementById("volume").innerText = `${(d.v / 1e6).toFixed(2)}M`;
    const el = document.getElementById("stockChange");
    el.innerText = `${ch > 0 ? '+' : ''}${ch}%`;
    el.className = ch >= 0 ? 'gain' : 'loss';
}

function updateHistory(days) {
    document.getElementById("historyBody").innerHTML = days.map(d => `<tr>
        <td>${new Date(d.t).toLocaleDateString()}</td>
        <td>$${d.o}</td><td>$${d.c}</td><td>$${d.h}</td><td>$${d.l}</td>
        <td class="${d.c >= d.o ? 'gain' : 'loss'}">${(((d.c - d.o)/d.o)*100).toFixed(2)}%</td>
    </tr>`).join("");
}

function updateDividends(data) {
    document.getElementById("dividendBody").innerHTML = data.map(d => `<tr>
        <td>${d.declaration_date || 'N/A'}</td><td class="gain">$${d.cash_amount}</td>
        <td>${d.ex_dividend_date}</td><td>${d.declaration_date || '-'}</td>
    </tr>`).join("");
}

// Auto-Refresh every 30 seconds
setInterval(() => fetchData(curSym), 30000);
window.onload = () => fetchData(curSym);
