const fs = require('fs');
const https = require('https');

// Simple template for individual item pages
function createSimpleItemPage(item, category) {
    // Create safe filename
    let fileName = item.displayName || item.name;
    fileName = fileName.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    
    fileName = fileName.replace(/[^a-z0-9-]/g, '');
    if (!fileName) fileName = 'unnamed-item';
    fileName += '.html';

    const cleanValue = (item.value || 0).toLocaleString();
    const dupedValue = (item.dupedValue || 0).toLocaleString();
    const trend = normalizeTrend(item.trend || 'stable');
    const demand = item.demand || 'Normal';
    
    const demandClass = getDemandClass(demand);
    const trendClass = getTrendClass(trend);
    
    const originalPriceSection = item.originalPrice && item.originalPrice !== 'N/A' ? `
                    <div class="value-box">
                        <div class="value-label">Original Price</div>
                        <div class="value-amount value-original">${item.originalPrice}</div>
                    </div>` : '';

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jailbreak Hub | ${item.displayName || item.name}</title>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbackend/js/adsbygoogle.js?client=ca-pub-4156751217830729"
     crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=JetBrains+Mono:wght@700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* --- AUTOMATIC GLOBAL LIGHT MODE FIX --- */
        body.light-mode {     
            --bg: #f8fafc !important;    
            --surface: rgba(255, 255, 255, 0.8) !important;    
            --card: rgba(241, 245, 249, 0.8) !important;    
            --card-hover: rgba(255, 255, 255, 0.95) !important;
            --border: rgba(0, 0, 0, 0.08) !important;    
            --border-light: rgba(0, 0, 0, 0.15) !important;
            --accent: #005bb5 !important;    
            --accent-glow: #005bb5 !important;    
            --green: #00b35f !important;    
            --orange: #d97706 !important;
            --red: #dc2626 !important;
            --text-main: #0f172a !important;    
            --text-dim: #475569 !important;    
            --muted: rgba(0, 0, 0, 0.05) !important;
            --muted-hover: rgba(0, 0, 0, 0.1) !important;
            --invert: 1 !important;
        }
        /* Forces hardcoded white text to flip dark when light mode is active */
        body.light-mode * { color: var(--text-main); }
        body.light-mode .text-green { color: var(--green) !important; }
        body.light-mode .text-orange { color: var(--orange) !important; }
        body.light-mode .text-red { color: var(--red) !important; }
        body.light-mode .bounty-name, body.light-mode .sb-val, body.light-mode .bounty-slider-val { color: var(--accent) !important; text-shadow: none !important; }
        /* --------------------------------------- */

        :root {
            --bg: #030508;
            --surface: #0a0c10;
            --card: #11141a;
            --border: rgba(255, 255, 255, 0.08);
            --accent: #0070f3;
            --green: #00ff88;
            --red: #ff4444;
            --orange: #ffa500;
            --text-main: #ffffff;
            --text-dim: #94a3b8;
        }

        * { box-sizing: border-box; transition: all 0.2s ease; }
        body { 
            font-family: 'Plus Jakarta Sans', sans-serif; 
            background: var(--bg); color: var(--text-main); 
            margin: 0; padding-top: 100px;
            background-image: radial-gradient(circle at 50% -20%, #111827 0%, #030508 60%);
            min-height: 100vh;
        }

        /* --- UNIFIED NAVIGATION --- */
        .nav-top {
            position: fixed; top: 0; width: 100%; height: 70px;
            background: rgba(3, 5, 8, 0.9); backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--border); display: flex;
            align-items: center; justify-content: center;
            padding: 0 40px; z-index: 5000;
        }
        .nav-logo { position: absolute; left: 40px; font-weight: 800; font-size: 1.4rem; text-decoration: none; color: #fff; letter-spacing: -1px; }
        .nav-logo span { color: var(--accent); }
        .nav-links { display: flex; gap: 5px; align-items: center; }
        .nav-item { position: relative; height: 70px; display: flex; align-items: center; padding: 0 12px; }
        .nav-link { text-decoration: none; color: var(--text-dim); font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; cursor: pointer; }
        .nav-link:hover, .nav-item:hover .nav-link { color: #fff; }

        .dropdown {
            position: absolute; top: 70px; left: 50%; transform: translateX(-50%) translateY(10px);
            background: var(--surface); border: 1px solid var(--border);
            border-radius: 12px; min-width: 220px; padding: 10px;
            opacity: 0; pointer-events: none; box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }
        .nav-item:hover .dropdown { opacity: 1; pointer-events: auto; transform: translateX(-50%) translateY(0); }
        
        .drop-link { 
            display: flex; flex-direction: column; padding: 12px; 
            color: var(--text-dim); text-decoration: none; 
            font-size: 0.75rem; border-radius: 8px; font-weight: 600; 
            margin-bottom: 4px;
        }
        .drop-link:hover { background: var(--card); color: #fff; }

        .mobile-toggle { display: none; }

        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        
        .back-btn {
            display: inline-flex; align-items: center; gap: 8px;
            padding: 12px 20px; background: var(--surface); border: 1px solid var(--border);
            border-radius: 12px; color: var(--text-dim); text-decoration: none;
            font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
            margin-bottom: 30px; transition: all 0.2s ease;
        }
        .back-btn:hover { 
            background: var(--card); 
            color: var(--accent); 
            transform: translateX(-4px);
        }

        .item-container {
            display: grid; 
            grid-template-columns: minmax(400px, 1fr) minmax(600px, 2fr); 
            gap: 40px; 
            margin-bottom: 60px;
        }

        @media (max-width: 1024px) {
            .item-container { grid-template-columns: 1fr; }
        }

        .item-image-section {
            background: var(--surface); border: 1px solid var(--border);
            border-radius: 24px; padding: 30px; display: flex; flex-direction: column;
            align-items: center; position: relative; overflow: hidden;
        }
        .item-image-wrapper {
            width: 100%; aspect-ratio: 1/1; background: #000;
            border-radius: 16px; display: flex; align-items: center;
            justify-content: center; overflow: hidden; margin-bottom: 20px;
            border: 1px solid var(--border);
        }
        .item-image { width: 85%; height: 85%; object-fit: contain; }
        
        .trend-badge {
            position: absolute; top: 20px; right: 20px;
            padding: 8px 16px; border-radius: 12px; font-size: 0.7rem;
            font-weight: 900; text-transform: uppercase; border: 1px solid;
            backdrop-filter: blur(10px); box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .trend-rising { 
            background: linear-gradient(135deg, rgba(0, 255, 136, 0.2) 0%, rgba(0, 255, 136, 0.1) 100%); 
            color: var(--green); 
            border-color: var(--green);
            box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
        }
        .trend-falling { 
            background: linear-gradient(135deg, rgba(255, 68, 68, 0.2) 0%, rgba(255, 68, 68, 0.1) 100%); 
            color: var(--red); 
            border-color: var(--red);
            box-shadow: 0 0 20px rgba(255, 68, 68, 0.3);
        }
        .trend-stable { 
            background: linear-gradient(135deg, rgba(148, 163, 184, 0.2) 0%, rgba(148, 163, 184, 0.1) 100%); 
            color: var(--text-dim); 
            border-color: var(--border);
        }

        .item-info-section {
            display: flex; flex-direction: column; gap: 30px;
        }

        .item-header {
            background: var(--surface); border: 1px solid var(--border);
            border-radius: 24px; padding: 30px;
        }
        .item-category {
            color: var(--accent); font-size: 0.7rem; font-weight: 800;
            text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;
        }
        .item-name {
            font-size: 2.5rem; font-weight: 900; line-height: 1.1;
            margin: 0 0 20px 0; text-transform: uppercase;
        }
        .item-description {
            color: var(--text-dim); line-height: 1.6; font-size: 1rem;
            margin: 0;
        }

        .values-grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }
        .value-box {
            background: var(--surface); border: 1px solid var(--border);
            border-radius: 16px; padding: 20px;
            transition: all 0.2s ease;
        }
        .value-box:hover {
            transform: translateY(-4px); box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
        .value-label {
            font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase;
            font-weight: 800; letter-spacing: 0.05em; margin-bottom: 8px;
        }
        .value-amount {
            font-family: 'JetBrains Mono'; font-size: 1.5rem; font-weight: 700;
        }
        .value-clean { color: var(--green); }
        .value-duped { color: var(--orange); }
        .value-original { color: var(--text-dim); }

        .meta-grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }
        .meta-box {
            background: var(--surface); border: 1px solid var(--border);
            border-radius: 16px; padding: 20px;
        }
        .meta-label {
            font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase;
            font-weight: 800; letter-spacing: 0.05em; margin-bottom: 8px;
        }
        .meta-value {
            font-size: 1rem; font-weight: 700; color: var(--text-main);
        }
        .demand-high { color: var(--green); }
        .demand-medium { color: var(--orange); }
        .demand-low { color: var(--red); }

        footer {
            background: var(--surface); border-top: 1px solid var(--border);
            padding: 60px 20px; text-align: center; margin-top: 100px;
        }
        .footer-brand { font-size: 1.5rem; font-weight: 900; margin-bottom: 10px; }
        .footer-brand span { color: var(--accent); }
        .footer-credits { color: var(--text-dim); font-size: 0.85rem; margin-bottom: 20px; }
        .footer-links { display: flex; justify-content: center; gap: 20px; margin-bottom: 30px; }
        .footer-links a { color: var(--text-main); text-decoration: none; font-size: 0.85rem; font-weight: 700; }
        .footer-links a:hover { color: var(--accent); }
    </style>
</head>
<body>
    <div id="navbar-container"></div>
    
    <div class="container">
        <a href="values.html" class="back-btn">
            <i class="fa-solid fa-arrow-left"></i>
            Back to Market Database
        </a>

        <div class="item-container">
            <div class="item-image-section">
                <div class="trend-badge ${trendClass}">${trend.toUpperCase()}</div>
                <div class="item-image-wrapper">
                    <img src="${item.robloxImage ? `https://www.roblox.com/Thumbs/Asset.ashx?width=420&height=420&assetId=${item.robloxImage}` : 'https://via.placeholder.com/400/0a0c10/64748b?text=%3F'}" class="item-image" alt="${item.displayName || item.name}">
                </div>
            </div>

            <div class="item-info-section">
                <div class="item-header">
                    <div class="item-category">${category.toUpperCase()}</div>
                    <h1 class="item-name">${item.displayName || item.name}</h1>
                    <p class="item-description">${item.description || 'No description available for this item.'}</p>
                </div>

                <div class="values-grid">
                    <div class="value-box">
                        <div class="value-label">Clean Value</div>
                        <div class="value-amount value-clean">$${cleanValue}</div>
                    </div>
                    <div class="value-box">
                        <div class="value-label">Duped Value</div>
                        <div class="value-amount value-duped">$${dupedValue}</div>
                    </div>
                    ${originalPriceSection}
                </div>

                <div class="meta-grid">
                    <div class="meta-box">
                        <div class="meta-label">Demand</div>
                        <div class="meta-value ${demandClass}">${demand}</div>
                    </div>
                    <div class="meta-box">
                        <div class="meta-label">Trend</div>
                        <div class="meta-value">${trend.charAt(0).toUpperCase() + trend.slice(1)}</div>
                    </div>
                    <div class="meta-box">
                        <div class="meta-label">Category</div>
                        <div class="meta-value">${category}</div>
                    </div>
                    <div class="meta-box">
                        <div class="meta-label">Last Updated</div>
                        <div class="meta-value">${formatDate(item.lastUpdated) || 'Unknown'}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="footer-container"></div>

    <script src="loader.js"></script>
</body>
</html>`;

    // Handle duplicate filenames by adding counter
    let finalFileName = fileName;
    let counter = 1;
    while (fs.existsSync(finalFileName)) {
        const nameWithoutExt = fileName.replace('.html', '');
        finalFileName = `${nameWithoutExt}-${counter}.html`;
        counter++;
    }

    fs.writeFileSync(finalFileName, html);
    return finalFileName;
}

function getDemandClass(demand) {
    if (!demand) return '';
    const d = demand.toLowerCase();
    if (d.includes('high') || d.includes('very high')) return 'demand-high';
    if (d.includes('medium') || d.includes('decent')) return 'demand-medium';
    if (d.includes('low') || d.includes('very low') || d.includes('close to none')) return 'demand-low';
    return '';
}

function getTrendClass(trend) {
    if (!trend) return 'trend-stable';
    const t = trend.toLowerCase();
    if (t.includes('rising') || t.includes('up')) return 'trend-rising';
    if (t.includes('falling') || t.includes('down')) return 'trend-falling';
    return 'trend-stable';
}

function normalizeTrend(trend) {
    const s = String(trend || 'stable').toLowerCase();
    if (/rise|climb|^\s*up\s*$|moon/.test(s)) return 'rising';
    if (/fall|drop|declin|down|crash/.test(s)) return 'falling';
    return 'stable';
}

function formatDate(dateString) {
    if (!dateString) return 'Unknown';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Unknown';
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (e) {
        return 'Unknown';
    }
}

// Function to get category label
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

// Function to fetch data from API
function fetchApiData(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    const jsonData = JSON.parse(data);
                    resolve(jsonData);
                } catch (error) {
                    reject(error);
                }
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

// Main function to create all item pages
async function createAllSimpleItemPages() {
    console.log('Creating simple individual item pages...');
    
    try {
        // Try the itemdata endpoint first
        let apiData;
        try {
            apiData = await fetchApiData('https://api.jbvalues.com/v1/itemdata');
        } catch (error) {
            console.log('Failed to fetch itemdata, trying items endpoint...');
            apiData = await fetchApiData('https://api.jbvalues.com/v1/items');
        }

        // Handle different response formats
        let items = [];
        if (Array.isArray(apiData)) {
            items = apiData;
        } else if (apiData.itemdata && Array.isArray(apiData.itemdata)) {
            items = apiData.itemdata;
        } else if (apiData.items && Array.isArray(apiData.items)) {
            items = apiData.items;
        } else if (apiData.data && Array.isArray(apiData.data)) {
            items = apiData.data;
        }

        if (items.length === 0) {
            console.error('No items found in API response');
            return;
        }

        console.log(`Found ${items.length} items in API response`);

        let totalCreated = 0;
        const createdFiles = [];

        for (const item of items) {
            if (item && (item.displayName || item.name)) {
                const category = listCategoryLabel(item.section, item.category);
                const fileName = createSimpleItemPage(item, category);
                createdFiles.push({ 
                    name: item.displayName || item.name, 
                    category, 
                    fileName 
                });
                totalCreated++;
            }
        }

        console.log(`\n✅ Successfully created ${totalCreated} simple individual item pages!`);
        console.log('\nCreated files:');
        createdFiles.forEach(file => {
            console.log(`- ${file.fileName} (${file.name} - ${file.category})`);
        });

        console.log('\nEach item now has its own clean, simple HTML page with:');
        console.log('- Item information');
        console.log('- Values (Clean, Duped, Original)');
        console.log('- Demand and trend');
        console.log('- Professional styling');
        console.log('- Navigation back to main database');
        console.log('- No complex charts or extra features');

    } catch (error) {
        console.error('Error creating item pages:', error.message);
    }
}

// Run the creation
createAllSimpleItemPages();
