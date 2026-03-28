async function loadJbValuesDatabase() {
    const dataUrl = 'https://api.jbvalues.com/v1/itemdata';
    const rows = await fetchJbValuesJson(dataUrl);
    if (!Array.isArray(rows) || rows.length === 0) {
        throw new Error('API returned no items');
    }
    buildDatabase(rows);
}

async function init() {
    const grid = document.getElementById('grid');
    if (!grid) return;

    grid.innerHTML = `<div class="grid-empty loading-banner"><p class="loading-text">ESTABLISHING SECURE LINK...</p></div>`;

    try {
        await loadJbValuesDatabase();
    } catch (err) {
        console.error("Fetch Error:", err);
        grid.innerHTML = `
            <div class="grid-empty error-banner">
                <p class="error-title">Database Connection Refused</p>
                <p class="error-detail">Error: ${String(err.message).replace(/</g, '&lt;')}</p>
                <button type="button" onclick="location.reload()" class="reconnect-btn">Try Reconnecting</button>
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

function listCategoryLabel(section, fallbackCategory) {
    const raw = (section || fallbackCategory || 'Other').trim();
    const labels = {
        Vehicle: 'Vehicles',
        'Weapon Skin': 'Weapon Skins',
        Color: 'Hyperchromes',
        Texture: 'Textures',
        Drift: 'Drifts',
        Furniture: 'Furniture',
        Horn: 'Horns',
        Rim: 'Rims',
        Spoiler: 'Spoilers',
        'Tire Sticker': 'Tire Stickers',
        'Tire Style': 'Tire Styles',
    };
    return labels[raw] || raw;
}

function normalizeTrend(t) {
    const s = String(t || 'stable').toLowerCase();
    if (/rise|climb|^\s*up\s*$|moon/.test(s)) return 'rising';
    if (/fall|drop|declin|down|crash/.test(s)) return 'falling';
    return 'stable';
}

function buildDatabase(rows) {
    if (!Array.isArray(rows) || rows.length === 0) {
        console.error('API Error: items list missing or empty', rows);
        return;
    }

    db = {};

    rows.forEach(item => {
        const name = item.displayName || item.name;
        if (!name) return;

        const cat = listCategoryLabel(item.section, item.category);
        if (!db[cat]) db[cat] = [];

        const details = item.details || {};
        const cash = typeof item.value === 'number' ? item.value : 0;
        const duped = typeof item.dupedValue === 'number' ? item.dupedValue : 0;
        const trendRaw = normalizeTrend(item.trend || details.trend || 'stable');

        let demand = details.demand ?? item.demand;
        if (typeof demand === 'number') demand = String(demand);
        if (demand == null || demand === '') demand = 'Normal';

        const imgId = item.robloxImage;
        const image = imgId && Number(imgId) > 0
            ? `https://www.roblox.com/Thumbs/Asset.ashx?width=420&height=420&assetId=${imgId}`
            : (item.image || '');

        let apiRecord;
        try {
            apiRecord = JSON.parse(JSON.stringify(item));
        } catch (e) {
            apiRecord = null;
        }

        db[cat].push({
            name,
            image,
            cash_value: cash,
            duped_value: duped,
            trend: trendRaw,
            demand,
            cat,
            apiRecord
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

    if (typeof updateData === 'function') {
        updateData();
    }
}
