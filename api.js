async function init() {
    const grid = document.getElementById('grid');
    grid.innerHTML = `<div class="col-span-full text-center py-20"><p style="color: #0070f3;" class="animate-pulse font-bold">LOADING MARKET DATA...</p></div>`;

    // This 'raw' version of the proxy works best for Safari
    const proxy = "https://api.allorigins.win/raw?url=";
    const itemsUrl = 'https://api.jbvalues.com/v1/items';
    const dataUrl = 'https://api.jbvalues.com/v1/itemdata';

    try {
        const itemsRes = await fetch(proxy + encodeURIComponent(itemsUrl));
        const itemsList = await itemsRes.json();

        const priceRes = await fetch(proxy + encodeURIComponent(dataUrl));
        const priceMap = await priceRes.json();

        // LOGGING: This will show in your Safari Console
        console.log("API Items:", itemsList);
        console.log("API Prices:", priceMap);

        // This handles the 'names' exactly how the API sends them
        buildDatabase(itemsList, priceMap);

    } catch (err) {
        console.error("Fetch Error:", err);
        grid.innerHTML = `<div class="col-span-full text-center py-20 text-red-500">
            <p class="font-bold uppercase">Connection Error</p>
            <p class="text-xs text-white opacity-50">Safari blocked the request. Try: Develop > Disable Cross-Origin Restrictions</p>
        </div>`;
    }
}

function buildDatabase(itemsRaw, pricesRaw) {
    db = {}; 
    
    // JBValues often puts the list inside a '.items' or '.data' key
    const items = itemsRaw.items || itemsRaw.data || itemsRaw;
    const prices = pricesRaw.itemdata || pricesRaw.data || pricesRaw;

    items.forEach(item => {
        const cat = item.category || 'Other';
        if (!db[cat]) db[cat] = [];

        // MATCHING THE NAMES:
        // We look for the price using the exact 'name' from the item list
        const p = prices[item.name] || {};

        db[cat].push({
            name: item.name,
            image: item.image,
            cash_value: p.value || 0,
            duped_value: p.dupedValue || 0,
            trend: p.trend || 'stable',
            demand: p.demand || 'Normal'
        });
    });

    // Refresh the UI
    const filterRow = document.getElementById('filters');
    if(filterRow) {
        filterRow.innerHTML = '<div class="f-btn active" id="btn-all" onclick="setCat(\'all\', this)">All Items</div>';
        Object.keys(db).forEach(category => {
            const btn = document.createElement('div');
            btn.className = 'f-btn';
            btn.innerText = category;
            btn.onclick = function() { setCat(category, this); };
            filterRow.appendChild(btn);
        });
    }

    updateData();
}
