async function init() {
    const grid = document.getElementById('grid');
    // Show loading state in your existing grid
    grid.innerHTML = `
        <div class="col-span-full text-center py-20">
            <div class="inline-block animate-spin mb-4 text-accent"><i class="fa-solid fa-circle-notch fa-3x"></i></div>
            <p class="text-accent font-bold animate-pulse uppercase tracking-widest">Connecting to JBValues Database...</p>
        </div>`;

    // Try multiple proxies in case one is blocked/down
    const proxies = [
        "https://api.allorigins.win/get?url=",
        "https://corsproxy.io/?",
        "https://thingproxy.freeboard.io/fetch/"
    ];

    const itemsUrl = 'https://api.jbvalues.com/v1/items';
    const dataUrl = 'https://api.jbvalues.com/v1/itemdata';

    let itemsData = null;
    let priceData = null;

    for (let proxy of proxies) {
        try {
            console.log("Attempting connection via: " + proxy);
            
            const itemsRes = await fetch(proxy + encodeURIComponent(itemsUrl));
            const itemsRaw = await itemsRes.json();
            // AllOrigins wraps in .contents, others might not
            const itemsList = itemsRaw.contents ? JSON.parse(itemsRaw.contents) : itemsRaw;

            const priceRes = await fetch(proxy + encodeURIComponent(dataUrl));
            const priceRaw = await priceRes.json();
            const priceMap = priceRaw.contents ? JSON.parse(priceRaw.contents) : priceRaw;

            if (itemsList && priceMap) {
                itemsData = itemsList;
                priceData = priceMap;
                break; // We got the data, stop the loop!
            }
        } catch (err) {
            console.warn("Proxy failed, trying next...");
        }
    }

    if (!itemsData || !priceData) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-20 border border-red-900/30 bg-red-900/10 rounded-3xl">
                <i class="fa-solid fa-triangle-exclamation text-red-500 text-4xl mb-4"></i>
                <p class="text-red-500 font-bold text-xl uppercase">Market Offline</p>
                <p class="text-dim text-sm mt-2">The API is currently unresponsive. Please try again in a few minutes.</p>
                <button onclick="location.reload()" class="mt-6 px-8 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all">Retry Connection</button>
            </div>`;
        return;
    }

    processData(itemsData, priceData);
}

function processData(itemsList, priceMap) {
    // Ensure we are accessing the correct array inside the API response
    const items = Array.isArray(itemsList) ? itemsList : (itemsList.items || itemsList.data || []);
    const prices = priceMap.itemdata || priceMap.data || priceMap;

    // Clear and rebuild the global 'db' variable from your HTML script
    db = {}; 

    items.forEach(item => {
        const cat = item.category || 'Other';
        if (!db[cat]) db[cat] = [];

        // Match item to its price data using the name as the key
        const details = prices[item.name] || {};

        db[cat].push({
            name: item.name,
            image: item.image || 'https://via.placeholder.com/200/000/333?text=No+Image',
            cash_value: details.value || 0,
            duped_value: details.dupedValue || 0,
            trend: details.trend || 'stable',
            demand: details.demand || 'Normal'
        });
    });

    // Generate Filter Buttons dynamically
    const filterRow = document.getElementById('filters');
    filterRow.innerHTML = `<div class="f-btn active" id="btn-all" onclick="setCat('all', this)">All Items</div>`;
    
    Object.keys(db).sort().forEach(category => {
        const btn = document.createElement('div');
        btn.className = 'f-btn';
        btn.innerText = category;
        btn.onclick = function() { setCat(category, this); };
        filterRow.appendChild(btn);
    });

    // Call your HTML's updateData function to render the grid
    if (typeof updateData === "function") {
        updateData();
    }
}
