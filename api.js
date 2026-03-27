async function init() {
    const grid = document.getElementById('grid');
    grid.innerHTML = `<div class="col-span-full text-center py-20"><p style="color: #0070f3;" class="animate-pulse font-bold">ESTABLISHING SECURE LINK...</p></div>`;

    // Switch to a more stable proxy format for Safari
    const proxy = "https://api.allorigins.win/get?url=";
    const itemsUrl = 'https://api.jbvalues.com/v1/items';
    const dataUrl = 'https://api.jbvalues.com/v1/itemdata';

    try {
        // Fetch Items
        const itemsRes = await fetch(proxy + encodeURIComponent(itemsUrl));
        const itemsJson = await itemsRes.json();
        // AllOrigins wraps the result in a string called 'contents'
        const itemsList = JSON.parse(itemsJson.contents);

        // Fetch Prices
        const priceRes = await fetch(proxy + encodeURIComponent(dataUrl));
        const priceJson = await priceRes.json();
        const priceMap = JSON.parse(priceJson.contents);

        console.log("Data Received:", itemsList);
        
        buildDatabase(itemsList, priceMap);

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

function buildDatabase(itemsRaw, pricesRaw) {
    // 1. Reset Global DB (ensure 'db' is defined in your HTML script)
    db = {}; 
    
    // 2. Drill down into the API structure
    const items = itemsRaw.items || itemsRaw.data || itemsRaw;
    const prices = pricesRaw.itemdata || pricesRaw.data || pricesRaw;

    // Safety check: if items isn't an array, the API changed format
    if (!Array.isArray(items)) {
        console.error("API Error: Items is not an array", items);
        return;
    }

    items.forEach(item => {
        // Use the API's internal category or default to 'Other'
        const cat = item.category || 'Other';
        if (!db[cat]) db[cat] = [];

        // Match price using the EXACT name key
        const p = prices[item.name] || {};

        db[cat].push({
            name: item.name || "Unknown Item",
            image: item.image || "",
            cash_value: p.value || 0,
            duped_value: p.dupedValue || 0,
            trend: (p.trend || 'stable').toLowerCase(),
            demand: p.demand || 'Normal'
        });
    });

    // 3. Rebuild Filter Buttons
    const filterRow = document.getElementById('filters');
    if(filterRow) {
        filterRow.innerHTML = '<div class="f-btn active" id="btn-all" onclick="setCat(\'all\', this)">All Items</div>';
        Object.keys(db).sort().forEach(category => {
            const btn = document.createElement('div');
            btn.className = 'f-btn';
            btn.innerText = category;
            btn.onclick = function() { setCat(category, this); };
            filterRow.appendChild(btn);
        });
    }

    // 4. Update the Grid (this function is in your HTML)
    updateData();
}
