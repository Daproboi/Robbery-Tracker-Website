async function init() {
    const grid = document.getElementById('grid');
    grid.innerHTML = `<div class="col-span-full text-center py-20"><p style="color: #0070f3;" class="animate-pulse font-bold">ESTABLISHING SECURE LINK...</p></div>`;

    const dataUrl = 'https://api.jbvalues.com/v1/itemdata';

    try {
        const rows = await fetchJbValuesJson(dataUrl);
        buildDatabase(rows);
    } catch (err) {
        console.error("Fetch Error:", err);
        grid.innerHTML = `
            <div class="col-span-full text-center py-20 text-red-500">
                <p class="font-bold uppercase">Database Connection Refused</p>
                <p class="text-xs text-white opacity-50 mt-2">Error: ${err.message}</p>
                <button onclick="location.reload()" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs">Try Reconnecting</button>
            </div>`;
    }
}

async function fetchJbValuesJson(url) {
    const parseBody = async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    };

    try {
        const data = await parseBody(await fetch(url));
        return unwrapItemsArray(data);
    } catch (firstErr) {
        const firstMsg = firstErr instanceof Error ? firstErr.message : String(firstErr);
        try {
            const proxy = 'https://api.allorigins.win/get?url=' + encodeURIComponent(url);
            const proxyRes = await fetch(proxy);
            if (!proxyRes.ok) {
                throw new Error(`HTTP ${proxyRes.status}`);
            }
            const wrapped = await proxyRes.json();
            if (wrapped.contents == null || wrapped.contents === '') {
                throw new Error('proxy returned empty contents');
            }
            const raw = typeof wrapped.contents === 'string'
                ? JSON.parse(wrapped.contents)
                : wrapped.contents;
            return unwrapItemsArray(raw);
        } catch (proxyErr) {
            const proxyMsg = proxyErr instanceof Error ? proxyErr.message : String(proxyErr);
            const combined = new Error(
                `Direct request failed (${firstMsg}). Proxy fallback failed (${proxyMsg}).`
            );
            combined.cause = { direct: firstErr, proxy: proxyErr };
            throw combined;
        }
    }
}

function unwrapItemsArray(data) {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.itemdata)) return data.itemdata;
    if (data && Array.isArray(data.items)) return data.items;
    if (data && Array.isArray(data.data)) return data.data;
    return [];
}

function buildDatabase(rows) {
    db = {};

    if (!Array.isArray(rows) || rows.length === 0) {
        console.error('API Error: items list missing or empty', rows);
        return;
    }

    rows.forEach(item => {
        const name = item.displayName || item.name;
        if (!name) return;

        const cat = item.section || item.category || 'Other';
        if (!db[cat]) db[cat] = [];

        const details = item.details || {};
        const cash = typeof item.value === 'number' ? item.value : 0;
        const duped = typeof item.dupedValue === 'number' ? item.dupedValue : 0;
        const trendRaw = item.trend || details.trend || 'stable';

        let demand = details.demand ?? item.demand;
        if (typeof demand === 'number') demand = String(demand);
        if (demand == null || demand === '') demand = 'Normal';

        const imgId = item.robloxImage;
        const image = imgId && Number(imgId) > 0
            ? `https://www.roblox.com/Thumbs/Asset.ashx?width=420&height=420&assetId=${imgId}`
            : (item.image || '');

        db[cat].push({
            name,
            image,
            cash_value: cash,
            duped_value: duped,
            trend: String(trendRaw).toLowerCase(),
            demand
        });
    });

    const filterRow = document.getElementById('filters');
    if (filterRow) {
        filterRow.innerHTML = '<div class="f-btn active" id="btn-all" onclick="setCat(\'all\', this)">All Items</div>';
        Object.keys(db).sort().forEach(category => {
            const btn = document.createElement('div');
            btn.className = 'f-btn';
            btn.innerText = category;
            btn.onclick = function() { setCat(category, this); };
            filterRow.appendChild(btn);
        });
    }

    updateData();
}
