const API_KEY = "";
let currentPrice = 0; let curSym = "AAPL";
let historyData = [];


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
    } else { simulateLive(); }

    if (hist.results) {
        historyData = hist.results.reverse().slice(0, 5);
        renderHistory(historyData);
    }
    if (divs.results) updateDividends(divs.results);

    document.getElementById("lastUpdated").innerText = `Updated: ${new Date().toLocaleTimeString()}`;
}

function simulateLive() {
    if (currentPrice === 0) currentPrice = 150.00;
    const movement = (Math.random() - 0.5) * 2;
    currentPrice = parseFloat((currentPrice + movement).toFixed(2));
    updateHero(curSym, { c: currentPrice, o: 148, h: currentPrice + 1, l: currentPrice - 1, v: 50000000 });

    if (historyData.length === 0) {
        historyData = [
            { t: Date.now() - 864e5, o: 145, c: 148, h: 150, l: 144 },
            { t: Date.now() - 1728e5, o: 150, c: 147, h: 151, l: 146 },
            { t: Date.now() - 2592e5, o: 142, c: 145, h: 146, l: 141 },
            { t: Date.now() - 3456e5, o: 140, c: 138, h: 141, l: 137 },
            { t: Date.now() - 4320e5, o: 144, c: 146, h: 147, l: 143 }
        ];
        renderHistory(historyData);
    }
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

function renderHistory(days) {
    document.getElementById("historyBody").innerHTML = days.map(d => `<tr>
        <td>${new Date(d.t).toLocaleDateString()}</td>
        <td>$${d.o}</td><td>$${d.c}</td><td>$${d.h}</td><td>$${d.l}</td>
        <td class="${d.c >= d.o ? 'gain' : 'loss'}">${(((d.c - d.o) / d.o) * 100).toFixed(2)}%</td>
    </tr>`).join("");
}


function filterHistory() {
    const profitableDays = historyData.filter(day => day.c >= day.o);
    renderHistory(profitableDays);
}

function sortHistory() {
    const sortedByHigh = [...historyData].sort((a, b) => b.h - a.h);
    renderHistory(sortedByHigh);
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}


function updateDividends(data) {
    document.getElementById("dividendBody").innerHTML = data.map(d => `<tr>
        <td>${d.declaration_date || 'N/A'}</td><td class="gain">$${d.cash_amount}</td>
        <td>${d.ex_dividend_date}</td><td>${d.declaration_date || '-'}</td>
    </tr>`).join("");
}

setInterval(() => fetchData(curSym), 30000);
window.onload = () => fetchData(curSym);
