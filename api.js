async function init() {
    try {
        const proxy = "https://corsproxy.io/?";
        const itemsUrl = encodeURIComponent('https://api.jbvalues.com/v1/items');
        const dataUrl = encodeURIComponent('https://api.jbvalues.com/v1/itemdata');

        const [itemsRes, dataRes] = await Promise.all([
            fetch(proxy + itemsUrl),
            fetch(proxy + dataUrl)
        ]);

        const itemsRaw = await itemsRes.json();
        const itemDataRaw = await dataRes.json();

        const items = Array.isArray(itemsRaw) ? itemsRaw : (itemsRaw.data || []);
        const itemData = itemDataRaw.data || itemDataRaw;

        // Reset the global db object
        db = {}; 

        items.forEach(item => {
            const category = item.category || 'Other';
            if (!db[category]) db[category] = [];
            const details = itemData[item.name] || {};
            
            db[category].push({
                name: item.name,
                image: item.image,
                cash_value: details.value || 0,
                duped_value: details.dupedValue || 0,
                trend: details.trend || 'stable',
                demand: details.demand || 'Normal'
            });
        });

        // Add filter buttons
        const fContainer = document.getElementById('filters');
        fContainer.innerHTML = '<div class="f-btn active" id="btn-all" onclick="setCat(\'all\', this)">All Items</div>';
        Object.keys(db).sort().forEach(category => {
            const btn = document.createElement('div');
            btn.className = 'f-btn';
            btn.innerText = category;
            btn.onclick = () => setCat(category, btn);
            fContainer.appendChild(btn);
        });

        updateData();

    } catch (error) {
        console.error("API Load Error:", error);
        document.getElementById('grid').innerHTML = `<p class="col-span-full text-center py-20 text-red-500 font-bold">Failed to load market data. Please refresh.</p>`;
    }
}
