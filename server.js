const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');
const crypto = require('crypto');

// App initialization
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Discord Configuration
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// Support multiple Discord OAuth apps (comma-separated)
const ADDITIONAL_CLIENT_IDS = (process.env.ADDITIONAL_CLIENT_IDS || '').split(',').filter(id => id.trim());
const ADDITIONAL_CLIENT_SECRETS = (process.env.ADDITIONAL_CLIENT_SECRETS || '').split(',').filter(s => s.trim());

const REDIRECT_URI = 'https://jailbreakhub.onrender.com/auth/callback';

// Roblox OAuth Configuration
const ROBLOX_CLIENT_ID = process.env.ROBLOX_CLIENT_ID || '';
const ROBLOX_CLIENT_SECRET = process.env.ROBLOX_CLIENT_SECRET || '';
const ROBLOX_REDIRECT_URI = 'https://jailbreakhub.onrender.com/auth/roblox/callback';

// Muffin Hook API Configuration
const MUFFINHOOK_TOKEN = process.env.MUFFINHOOK_TOKEN || '';
const MUFFINHOOK_API_URL = 'https://api.muffinhook.site/export/cashleaderboard';

// Discord Server Requirements
const REQUIRED_DISCORD_GUILD_ID = process.env.REQUIRED_DISCORD_GUILD_ID || '';

// Simple JSON Database
const DB_FILE = './users.json';
const VALUE_CHANGES_FILE = './value-changes.json';
const VALUES_SNAPSHOT_FILE = './values-snapshot.json';

async function loadUsers() {
    try {
        const data = await fs.readFile(DB_FILE, 'utf8');
        return JSON.parse(data);
    } catch {
        return {};
    }
}

async function saveUsers(users) {
    await fs.writeFile(DB_FILE, JSON.stringify(users, null, 2));
}

// Database helpers
const User = {
    findOneAndUpdate: async (filter, update) => {
        const users = await loadUsers();
        const id = filter.discordId || filter.robloxId;
        
        users[id] = {
            ...users[id],
            ...update,
            id: id
        };
        
        await saveUsers(users);
        return users[id];
    },
    
    findOne: async (filter) => {
        const users = await loadUsers();
        if (filter.sessionToken) {
            return Object.values(users).find(u => u.sessionToken === filter.sessionToken) || null;
        }
        if (filter.discordId) {
            return users[filter.discordId] || null;
        }
        if (filter.robloxId) {
            return users[filter.robloxId] || null;
        }
        return null;
    },
    
    find: async () => {
        const users = await loadUsers();
        return Object.values(users).sort((a, b) => new Date(b.loginTime) - new Date(a.loginTime));
    },
    
    countDocuments: async () => {
        const users = await loadUsers();
        return Object.keys(users).length;
    }
};

// Value Changes Database Helpers
async function loadValueChanges() {
    try {
        const data = await fs.readFile(VALUE_CHANGES_FILE, 'utf8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

async function saveValueChanges(changes) {
    await fs.writeFile(VALUE_CHANGES_FILE, JSON.stringify(changes, null, 2));
}

async function loadValuesSnapshot() {
    try {
        const data = await fs.readFile(VALUES_SNAPSHOT_FILE, 'utf8');
        return JSON.parse(data);
    } catch {
        return null;
    }
}

async function saveValuesSnapshot(snapshot) {
    await fs.writeFile(VALUES_SNAPSHOT_FILE, JSON.stringify(snapshot, null, 2));
}

// Parse value string (handles "1.2M", "850K", etc)
function parseValue(val) {
    if (typeof val === 'number') return val;
    if (!val) return 0;
    const str = val.toString().toUpperCase();
    let num = parseFloat(str.replace(/[^0-9.]/g, ''));
    if (str.includes('M')) num *= 1000000;
    else if (str.includes('K')) num *= 1000;
    return num;
}

// Format item name for display
function formatItemName(key) {
    const names = {
        shiftLvl5: 'Shift HyperChrome (Lvl 5)',
        diamondLvl5: 'Diamond HyperChrome (Lvl 5)',
        redLvl5: 'Red HyperChrome (Lvl 5)',
        lvl1Any: 'Level 1 HyperChrome (Any)'
    };
    return names[key] || key;
}

// Monitor Values from external API
async function checkValueChanges() {
    try {
        // Fetch current values from API
        const response = await fetch('https://api.jbvalues.com/v1/items');
        if (!response.ok) {
            console.error('[Value Monitor] API request failed:', response.status);
            return [];
        }
        
        const items = await response.json();
        const currentValues = {};
        
        // Extract key values we want to track
        items.forEach(item => {
            if (item.name && item.value) {
                currentValues[item.name] = item.value.toString();
            }
        });
        
        const snapshot = await loadValuesSnapshot();
        
        // First run - just save snapshot
        if (!snapshot) {
            await saveValuesSnapshot(currentValues);
            console.log('[Value Monitor] Initial snapshot saved with', Object.keys(currentValues).length, 'items');
            return [];
        }
        
        const changes = [];
        const timestamp = new Date().toISOString();
        
        // Check for changes and new items
        for (const [name, currentValue] of Object.entries(currentValues)) {
            const previousValue = snapshot[name];
            
            if (!previousValue) {
                // New item
                changes.push({
                    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                    item: name,
                    itemKey: name,
                    type: 'new',
                    value: currentValue,
                    timestamp: timestamp
                });
            } else if (previousValue !== currentValue) {
                // Value changed
                const oldVal = parseValue(previousValue);
                const newVal = parseValue(currentValue);
                let percentChange = 0;
                if (oldVal > 0) {
                    percentChange = ((newVal - oldVal) / oldVal * 100);
                }
                
                changes.push({
                    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                    item: name,
                    itemKey: name,
                    type: newVal > oldVal ? 'increase' : 'decrease',
                    oldValue: previousValue,
                    newValue: currentValue,
                    percentChange: parseFloat(percentChange.toFixed(1)),
                    timestamp: timestamp
                });
            }
        }
        
        // Save new snapshot
        await saveValuesSnapshot(currentValues);
        
        // Append changes to history
        if (changes.length > 0) {
            const history = await loadValueChanges();
            history.unshift(...changes);
            // Keep only last 500 changes
            await saveValueChanges(history.slice(0, 500));
            console.log(`[Value Monitor] Detected ${changes.length} value changes at ${timestamp}`);
            changes.forEach(c => {
                console.log(`  - ${c.item}: ${c.oldValue || 'NEW'} → ${c.newValue || c.value}`);
            });
        }
        
        return changes;
    } catch (error) {
        console.error('[Value Monitor] Error checking changes:', error);
        return [];
    }
}

// Start value monitoring (check every 5 minutes)
function startValueMonitoring() {
    console.log('[Value Monitor] Starting value monitoring...');
    // Check immediately on startup
    checkValueChanges();
    // Then check every 5 minutes
    setInterval(checkValueChanges, 5 * 60 * 1000);
}

// Discord OAuth Routes
app.get('/auth/callback', async (req, res) => {
    const { code, error } = req.query;
    
    if (error) {
        return res.status(400).send('Discord authentication failed');
    }
    
    if (!code) {
        return res.status(400).send('Authorization code not provided');
    }
    
    try {
        // Exchange authorization code for access token
        const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: REDIRECT_URI,
                scope: 'identify email guilds'
            })
        });
        
        const tokenData = await tokenResponse.json();
        
        if (!tokenData.access_token) {
            console.error('Discord token error:', tokenData);
            return res.status(500).send('Failed to obtain access token: ' + JSON.stringify(tokenData));
        }
        
        // Get user information from Discord
        const userResponse = await fetch('https://discord.com/api/users/@me', {
            headers: {
                'Authorization': `Bearer ${tokenData.access_token}`
            }
        });
        
        const userData = await userResponse.json();
        
        if (!userData.id) {
            return res.status(500).send('Failed to obtain user information');
        }
        
        // Check Discord server membership if required
        if (REQUIRED_DISCORD_GUILD_ID) {
            const guildsResponse = await fetch('https://discord.com/api/users/@me/guilds', {
                headers: {
                    'Authorization': `Bearer ${tokenData.access_token}`
                }
            });
            
            const guilds = await guildsResponse.json();
            const isInRequiredServer = guilds.some(guild => guild.id === REQUIRED_DISCORD_GUILD_ID);
            
            if (!isInRequiredServer) {
                return res.status(403).send(`
                    <html>
                    <head><title>Access Denied</title></head>
                    <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #0a0e27; color: white;">
                        <h1 style="color: #ef4444;">Access Denied</h1>
                        <p>You must be a member of our Discord server to use this website.</p>
                        <p>Please join the server first, then try logging in again.</p>
                        <a href="/login.html" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background: #3b82f6; color: white; text-decoration: none; border-radius: 5px;">Back to Login</a>
                    </body>
                    </html>
                `);
            }
        }
        
        // Check if user is admin - support multiple admin IDs
        const ADMINS = (process.env.ADMIN_DISCORD_IDS || '1020804194975879199').split(',').filter(id => id.trim());
        console.log('Discord user ID:', userData.id);
        console.log('Admin list:', ADMINS);
        const isAdmin = ADMINS.includes(userData.id);
        console.log('Is admin:', isAdmin);
        
        // Create or update user in database
        const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        
        const userSession = {
            discordId: userData.id,
            username: userData.username,
            discriminator: userData.discriminator,
            avatar: userData.avatar ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png` : `https://cdn.discordapp.com/embed/avatars/0.png`,
            isAdmin: isAdmin,
            isBanned: false,
            bannedIPs: [],
            loginTime: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            sessionToken: crypto.randomBytes(32).toString('hex'),
            lastIP: clientIP
        };
        
        // Check if user or IP is banned
        const users = await loadUsers();
        const existingUser = users[userData.id];
        
        // Check for IP ban
        for (const [id, user] of Object.entries(users)) {
            if (user.isBanned && user.bannedIPs && user.bannedIPs.includes(clientIP)) {
                return res.status(403).send('This IP address has been banned.');
            }
        }
        
        if (existingUser && existingUser.isBanned) {
            return res.status(403).send('Your account has been banned.');
        }
        
        await User.findOneAndUpdate(
            { discordId: userData.id },
            userSession
        );
        
        console.log(`User ${userData.username} (${isAdmin ? 'Admin' : 'Member'}) logged in`);
        
        // Redirect with session token
        const redirectUrl = isAdmin ? '/admin.html' : '/index.html';
        res.redirect(`${redirectUrl}?session=${userSession.sessionToken}`);
        
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).send('Internal server error: ' + error.message);
    }
});

// Roblox OAuth Routes
app.get('/auth/roblox/callback', async (req, res) => {
    const { code, error } = req.query;
    
    if (error) {
        return res.status(400).send('Roblox authentication failed');
    }
    
    if (!code) {
        return res.status(400).send('Authorization code not provided');
    }
    
    try {
        // Exchange authorization code for access token
        const tokenResponse = await fetch('https://apis.roblox.com/oauth/v1/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: ROBLOX_CLIENT_ID,
                client_secret: ROBLOX_CLIENT_SECRET,
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: ROBLOX_REDIRECT_URI
            })
        });
        
        const tokenData = await tokenResponse.json();
        
        if (!tokenData.access_token) {
            console.error('Roblox token error:', tokenData);
            return res.status(500).send('Failed to obtain access token: ' + JSON.stringify(tokenData));
        }
        
        // Get user information from Roblox
        const userResponse = await fetch('https://apis.roblox.com/oauth/v1/userinfo', {
            headers: {
                'Authorization': `Bearer ${tokenData.access_token}`
            }
        });
        
        const userData = await userResponse.json();
        
        if (!userData.sub) {
            return res.status(500).send('Failed to obtain user information');
        }
        
        // Create or update user in database
        const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        
        const userSession = {
            robloxId: userData.sub,
            username: userData.preferred_username || userData.name || `RobloxUser${userData.sub}`,
            avatar: `https://www.roblox.com/headshot-thumbnail/image?userId=${userData.sub}&width=150&height=150&format=png`,
            isAdmin: false,
            isBanned: false,
            bannedIPs: [],
            loginTime: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            sessionToken: crypto.randomBytes(32).toString('hex'),
            lastIP: clientIP
        };
        
        // Check if user or IP is banned
        const users = await loadUsers();
        const existingUser = users[userData.sub];
        
        // Check for IP ban
        for (const [id, user] of Object.entries(users)) {
            if (user.isBanned && user.bannedIPs && user.bannedIPs.includes(clientIP)) {
                return res.status(403).send('This IP address has been banned.');
            }
        }
        
        if (existingUser && existingUser.isBanned) {
            return res.status(403).send('Your account has been banned.');
        }
        
        await User.findOneAndUpdate(
            { robloxId: userData.sub },
            userSession
        );
        
        console.log(`Roblox User ${userSession.username} logged in`);
        
        // Redirect with session token
        res.redirect(`/index.html?session=${userSession.sessionToken}`);
        
    } catch (error) {
        console.error('Roblox authentication error:', error);
        res.status(500).send('Internal server error: ' + error.message);
    }
});

// Session verification route
app.get('/api/check-session', async (req, res) => {
    const { token } = req.query;
    
    if (!token) {
        return res.status(400).json({ error: 'Token required' });
    }
    
    try {
        const user = await User.findOne({ sessionToken: token });
        
        if (!user) {
            return res.status(401).json({ error: 'Invalid session' });
        }
        
        // Check if user is banned
        if (user.isBanned) {
            return res.status(403).json({ error: 'Account banned', banned: true });
        }
        
        // Check if session is older than 1 day
        const ONE_DAY = 24 * 60 * 60 * 1000;
        const lastLogin = new Date(user.lastLogin).getTime();
        const now = Date.now();
        
        if (now - lastLogin > ONE_DAY) {
            // Session expired
            const users = await loadUsers();
            const userId = user.discordId || user.robloxId;
            if (users[userId]) {
                users[userId].sessionToken = null;
                await saveUsers(users);
            }
            return res.status(401).json({ error: 'Session expired' });
        }
        
        res.json({
            valid: true,
            user: {
                id: user.discordId || user.robloxId,
                username: user.username,
                avatar: user.avatar,
                isAdmin: Boolean(user.isAdmin),
                loginType: user.discordId ? 'discord' : 'roblox'
            },
            lastLogin: user.lastLogin
        });
        
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Admin API routes
app.get('/api/users', async (req, res) => {
    try {
        const { token } = req.query;
        
        // Verify admin session
        const adminUser = await User.findOne({ sessionToken: token });
        if (!adminUser || !adminUser.isAdmin) {
            return res.status(403).json({ error: 'Admin access required' });
        }
        
        const users = await User.find();
        
        res.json({
            users: users.map(user => ({
                discordId: user.discordId,
                username: user.username,
                avatar: user.avatar,
                isAdmin: Boolean(user.isAdmin),
                isBanned: Boolean(user.isBanned),
                banReason: user.banReason,
                bannedAt: user.bannedAt,
                lastIP: user.lastIP,
                loginTime: user.loginTime,
                lastLogin: user.lastLogin
            })),
            total: users.length
        });
        
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Statistics API
app.get('/api/stats', async (req, res) => {
    try {
        const { token } = req.query;
        
        const adminUser = await User.findOne({ sessionToken: token });
        if (!adminUser || !adminUser.isAdmin) {
            return res.status(403).json({ error: 'Admin access required' });
        }
        
        const totalUsers = await User.countDocuments();
        const today = new Date().toISOString().split('T')[0];
        const users = await User.find();
        const activeToday = users.filter(u => u.loginTime && u.loginTime.startsWith(today)).length;
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
        const newThisWeek = users.filter(u => u.loginTime && u.loginTime >= weekAgo).length;
        
        res.json({
            totalUsers,
            activeToday,
            newThisWeek
        });
        
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Logout route
app.get('/logout', async (req, res) => {
    const { token } = req.query;
    
    if (token) {
        const user = await User.findOne({ sessionToken: token });
        if (user) {
            const users = await loadUsers();
            const userId = user.discordId || user.robloxId;
            if (users[userId]) {
                users[userId].sessionToken = null;
                await saveUsers(users);
            }
        }
    }
    
    res.redirect('/login.html');
});

// Admin middleware - server-side protection
async function requireAdmin(req, res, next) {
    const token = req.query.token || req.headers['x-session-token'];
    
    if (!token) {
        return res.status(403).send('Access denied - Admin login required');
    }
    
    try {
        const user = await User.findOne({ sessionToken: token });
        if (!user || !user.isAdmin) {
            return res.status(403).send('Access denied - Admin only');
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).send('Server error');
    }
}

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Protect admin route with server-side check
app.get('/admin', async (req, res) => {
    // Check for session token in query or redirect to login
    const token = req.query.token;
    
    if (!token) {
        // Try to serve but client-side JS will redirect if not admin
        res.sendFile(path.join(__dirname, 'admin.html'));
        return;
    }
    
    try {
        const user = await User.findOne({ sessionToken: token });
        if (!user || !user.isAdmin) {
            return res.status(403).send('Access denied - Admin only');
        }
        res.sendFile(path.join(__dirname, 'admin.html'));
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Value Changes API
app.get('/api/value-changes', async (req, res) => {
    try {
        const changes = await loadValueChanges();
        res.json({
            changes: changes,
            total: changes.length,
            increases: changes.filter(c => c.type === 'increase').length,
            decreases: changes.filter(c => c.type === 'decrease').length,
            newItems: changes.filter(c => c.type === 'new').length
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Proxy endpoint for JB Values API (bypasses CORS)
app.get('/api/jbvalues-items', async (req, res) => {
    try {
        const response = await fetch('https://api.jbvalues.com/v1/items');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching JB Values:', error);
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

// Static leaderboard data embedded directly - no external file needed
const staticLeaderboard = [
    { rank: 1, username: "nxghtv7", money: 1267707600 },
    { rank: 2, username: "zanedjdjdjdjdjajowkr", money: 1098502715 },
    { rank: 3, username: "jinnboys", money: 1065520014 },
    { rank: 4, username: "n_iightmaree", money: 1016113170 },
    { rank: 5, username: "rcrntx", money: 1012966168 },
    { rank: 6, username: "not_justsalads", money: 1002775851 },
    { rank: 7, username: "andreematiasmayorga", money: 983434608 },
    { rank: 8, username: "domina_equus", money: 944428435 },
    { rank: 9, username: "hell0itsfahad", money: 943529781 },
    { rank: 10, username: "lsteven911", money: 902871238 },
    { rank: 11, username: "1imorav", money: 851037451 },
    { rank: 12, username: "xsoft_emily", money: 846964590 },
    { rank: 13, username: "asemays", money: 835788379 },
    { rank: 14, username: "kehixde", money: 821544661 },
    { rank: 15, username: "xavv_8zz", money: 805912707 },
    { rank: 16, username: "xav1er2d0ley", money: 795991688 },
    { rank: 17, username: "ionesacutie", money: 787893020 },
    { rank: 18, username: "novoaiumor", money: 785106512 },
    { rank: 19, username: "imikuu_39", money: 774122732 },
    { rank: 20, username: "ik_iiara", money: 723687009 },
    { rank: 21, username: "io_ssipi", money: 653377688 },
    { rank: 22, username: "xam3910", money: 652545403 },
    { rank: 23, username: "kastwox", money: 629069910 },
    { rank: 24, username: "1estrellamary", money: 624704745 },
    { rank: 25, username: "07d0l", money: 599661420 },
    { rank: 26, username: "imalex456", money: 599205630 },
    { rank: 27, username: "yyunano", money: 579267990 },
    { rank: 28, username: "rosalinabiscuit2075", money: 542200851 },
    { rank: 29, username: "michaelwfsdd", money: 541414784 },
    { rank: 30, username: "y7moon", money: 537562421 },
    { rank: 31, username: "xmlqo", money: 535551132 },
    { rank: 32, username: "eighteeniettername", money: 525790253 },
    { rank: 33, username: "imyuql", money: 515392545 },
    { rank: 34, username: "chaztea", money: 500114887 },
    { rank: 35, username: "jooahssnnsj", money: 491338926 },
    { rank: 36, username: "01_allenlxx", money: 491007523 },
    { rank: 37, username: "imaquashadow", money: 477784518 },
    { rank: 38, username: "1ichriss", money: 473845077 },
    { rank: 39, username: "megasplasher1", money: 463997155 },
    { rank: 40, username: "77vynx", money: 446185759 },
    { rank: 41, username: "logitis124", money: 430309432 },
    { rank: 42, username: "gi7m0", money: 426336132 },
    { rank: 43, username: "irose_lu", money: 424741550 },
    { rank: 44, username: "001the_edu", money: 418056131 },
    { rank: 45, username: "oceanryz", money: 417097150 },
    { rank: 46, username: "nofastez", money: 414315598 },
    { rank: 47, username: "annoying_angel1234", money: 410345061 },
    { rank: 48, username: "3l1s307", money: 403028411 },
    { rank: 49, username: "xjosuewa", money: 403013752 },
    { rank: 50, username: "quixortic", money: 399188208 },
    { rank: 51, username: "dutygamer89", money: 399007289 },
    { rank: 52, username: "9lxvt", money: 396582351 },
    { rank: 53, username: "menez_foxx", money: 394696086 },
    { rank: 54, username: "thunderouslogan", money: 389153111 },
    { rank: 55, username: "mamdee99", money: 384622006 },
    { rank: 56, username: "admine5", money: 384078519 },
    { rank: 57, username: "chrisxxxc1001", money: 378904921 },
    { rank: 58, username: "thedeadly1234", money: 369699104 },
    { rank: 59, username: "rodgers_999", money: 366474678 },
    { rank: 60, username: "tk_survey", money: 366472955 },
    { rank: 61, username: "angelpasha", money: 366001709 },
    { rank: 62, username: "abrams1421", money: 365842961 },
    { rank: 63, username: "gamerlockpedrodavid1", money: 361006296 },
    { rank: 64, username: "ranzd0mz", money: 354483204 },
    { rank: 65, username: "000_richhddmoney", money: 350715591 },
    { rank: 66, username: "000_richhdev", money: 349618771 },
    { rank: 67, username: "luisorlando15", money: 345728492 },
    { rank: 68, username: "1bad_k", money: 344559089 },
    { rank: 69, username: "andrhevn21", money: 340184985 },
    { rank: 70, username: "xoxxox_ng", money: 338406991 },
    { rank: 71, username: "nihonblox", money: 331793274 },
    { rank: 72, username: "kacperkovskyyy", money: 329713688 },
    { rank: 73, username: "vampjuaniel", money: 326258293 },
    { rank: 74, username: "dwiivz", money: 326002171 },
    { rank: 75, username: "xka3u", money: 325742823 },
    { rank: 76, username: "arg_kezver", money: 324212167 },
    { rank: 77, username: "fuldron", money: 319898282 },
    { rank: 78, username: "fercrack007", money: 319634349 },
    { rank: 79, username: "renatboi", money: 318895945 },
    { rank: 80, username: "iukqs", money: 313740838 },
    { rank: 81, username: "sushicuteuwu", money: 312157912 },
    { rank: 82, username: "d4rw1n8555", money: 311130781 },
    { rank: 83, username: "rvyuan", money: 308758338 },
    { rank: 84, username: "marvzz333", money: 308556069 },
    { rank: 85, username: "xxfernanfloo22xx", money: 305601814 },
    { rank: 86, username: "eriiten165", money: 302158836 },
    { rank: 87, username: "chrris_19", money: 301619430 },
    { rank: 88, username: "nstmatt", money: 295807667 },
    { rank: 89, username: "racheile", money: 294256265 },
    { rank: 90, username: "oryxxw", money: 293567438 },
    { rank: 91, username: "xt_xony", money: 292427490 },
    { rank: 92, username: "sideacraft", money: 291899040 },
    { rank: 93, username: "nxc7v", money: 290931408 },
    { rank: 94, username: "si1v_4", money: 289491973 },
    { rank: 95, username: "bonnietrey8", money: 284566841 },
    { rank: 96, username: "1idavidd", money: 283300073 },
    { rank: 97, username: "f42iw", money: 281011695 },
    { rank: 98, username: "thewaffle44", money: 280074048 },
    { rank: 99, username: "ibctyx", money: 274238261 },
    { rank: 100, username: "angeleyes68", money: 273823781 },
    { rank: 101, username: "iixluhvly", money: 271351475 },
    { rank: 102, username: "welkermakayla", money: 270561905 },
    { rank: 103, username: "v3rs4s3", money: 268360187 },
    { rank: 104, username: "dmitriy752", money: 263330112 },
    { rank: 105, username: "voyed1", money: 262395199 },
    { rank: 106, username: "sqnnyblossom", money: 260866826 },
    { rank: 107, username: "ryslorange", money: 259014434 },
    { rank: 108, username: "dovycarriesyou", money: 258659813 },
    { rank: 109, username: "starcontroler123", money: 255817569 },
    { rank: 110, username: "schublox", money: 255035032 },
    { rank: 111, username: "pr_yanielor", money: 249971753 },
    { rank: 112, username: "roblox_user_444840834", money: 249635500 },
    { rank: 113, username: "bixck_dreams", money: 249418440 },
    { rank: 114, username: "evericy", money: 249315048 },
    { rank: 115, username: "minty_22", money: 247896276 },
    { rank: 116, username: "bryna253592", money: 244483935 },
    { rank: 117, username: "lonaville", money: 239394891 },
    { rank: 118, username: "1arazel", money: 239173316 },
    { rank: 119, username: "playstationforeverbr", money: 238690818 },
    { rank: 120, username: "ailsettarhyseynov", money: 237979471 },
    { rank: 121, username: "aiambslullaby", money: 237015232 },
    { rank: 122, username: "d_xrkwashere", money: 235979490 },
    { rank: 123, username: "organista_polska", money: 235861108 },
    { rank: 124, username: "leorcairsupreme", money: 235112610 },
    { rank: 125, username: "dndaxla", money: 231638860 },
    { rank: 126, username: "winner0_1", money: 231168645 },
    { rank: 127, username: "ericklechi2220", money: 230768435 },
    { rank: 128, username: "girlyroseb2", money: 229042125 },
    { rank: 129, username: "sohaibdagreat", money: 228905259 },
    { rank: 130, username: "irxssie", money: 228331982 },
    { rank: 131, username: "thesvjerkthing", money: 228110709 },
    { rank: 132, username: "0mxmrx", money: 226003224 },
    { rank: 133, username: "ammo7830", money: 224801443 },
    { rank: 134, username: "xlukqs", money: 223697501 },
    { rank: 135, username: "zachzillaandjoshua", money: 223630104 },
    { rank: 136, username: "xj3zykk", money: 223433850 },
    { rank: 137, username: "gio272", money: 222743250 },
    { rank: 138, username: "kainechill", money: 222566546 },
    { rank: 139, username: "nuevowalterhenry2323", money: 222477537 },
    { rank: 140, username: "pinksheepyoshi", money: 221864783 },
    { rank: 141, username: "antoniproxd01", money: 221543861 },
    { rank: 142, username: "notamiii99955", money: 220215556 },
    { rank: 143, username: "kylemedeiros2", money: 219818790 },
    { rank: 144, username: "pu_chii", money: 219756425 },
    { rank: 145, username: "tamas1960", money: 218932618 },
    { rank: 146, username: "fyiytupik", money: 215238944 },
    { rank: 147, username: "itzstg101", money: 215233824 },
    { rank: 148, username: "aestaciom", money: 215069843 },
    { rank: 149, username: "mrfahadmind", money: 213309946 },
    { rank: 150, username: "ii_zicwrld", money: 213309828 },
    { rank: 151, username: "purewhirr", money: 213131630 },
    { rank: 152, username: "albao3o", money: 213027188 },
    { rank: 153, username: "verolaz", money: 212410919 },
    { rank: 154, username: "0_delx", money: 212036351 },
    { rank: 155, username: "krantz_cyberion", money: 211233343 },
    { rank: 156, username: "dogtotitanic0008", money: 210768104 },
    { rank: 157, username: "rxviliq", money: 210226991 },
    { rank: 158, username: "000_iireyner", money: 208588319 },
    { rank: 159, username: "xflame_l", money: 208553005 },
    { rank: 160, username: "o_ocily", money: 207226244 },
    { rank: 161, username: "jspears2", money: 207022988 },
    { rank: 162, username: "rogueatlantis", money: 206411678 },
    { rank: 163, username: "0_xky", money: 205808016 },
    { rank: 164, username: "chiinosr", money: 205659074 },
    { rank: 165, username: "hermanodecode", money: 205629779 },
    { rank: 166, username: "usernameszthis", money: 205275006 },
    { rank: 167, username: "killgodrommer2", money: 204654276 },
    { rank: 168, username: "d6nnise", money: 204244590 },
    { rank: 169, username: "olhman1", money: 204228714 },
    { rank: 170, username: "alejandra_rrr", money: 203743211 },
    { rank: 171, username: "bestnoobvt123456", money: 203657679 },
    { rank: 172, username: "vika709998", money: 202826266 },
    { rank: 173, username: "karen201712", money: 202270243 },
    { rank: 174, username: "exphxriav1", money: 201641856 },
    { rank: 175, username: "ixycrea", money: 200795074 },
    { rank: 176, username: "sxprreme", money: 200636050 },
    { rank: 177, username: "ekkdkerd", money: 200108404 },
    { rank: 178, username: "i_miilkyy", money: 199564634 },
    { rank: 179, username: "dinglecarriesyou", money: 199502278 },
    { rank: 180, username: "50o1s", money: 199464423 },
    { rank: 181, username: "sub2jailbreakmoments", money: 197335611 },
    { rank: 182, username: "banmoi_mrc", money: 195428364 },
    { rank: 183, username: "muladrea", money: 194873148 },
    { rank: 184, username: "tacosonme", money: 194758327 },
    { rank: 185, username: "94_95kragee", money: 194150376 },
    { rank: 186, username: "1rlxw", money: 190841249 },
    { rank: 187, username: "0nlydarktimes", money: 190238376 },
    { rank: 188, username: "e_ily00", money: 189513561 },
    { rank: 189, username: "dndieyla", money: 189256080 },
    { rank: 190, username: "folzikgame1", money: 188761701 },
    { rank: 191, username: "vesna02", money: 188449441 },
    { rank: 192, username: "hydrolexe", money: 187567230 },
    { rank: 193, username: "fantastic_butterfly2", money: 187138700 },
    { rank: 194, username: "1tzspecter", money: 185395702 },
    { rank: 195, username: "not_nlkk", money: 185047760 },
    { rank: 196, username: "mg_nightmare5", money: 185023494 },
    { rank: 197, username: "jam55510", money: 183731303 },
    { rank: 198, username: "angelw1ttaknife", money: 183695651 },
    { rank: 199, username: "0iitheking_crisxx0", money: 180908263 },
    { rank: 200, username: "patriottilldeath", money: 180540950 },
    { rank: 201, username: "pedro_paizero", money: 180394522 },
    { rank: 202, username: "brahplaysroblox", money: 180041504 },
    { rank: 203, username: "alex210911", money: 179035997 },
    { rank: 204, username: "samybuby", money: 178500616 },
    { rank: 205, username: "bxbyy_ok", money: 178420908 },
    { rank: 206, username: "xqevn", money: 177036830 },
    { rank: 207, username: "ii_5k", money: 174680132 },
    { rank: 208, username: "rafiizyn", money: 172843799 },
    { rank: 209, username: "ohboiivian", money: 172813355 },
    { rank: 210, username: "faiienolympian", money: 172734333 },
    { rank: 211, username: "ztnv_jonathan", money: 171624715 },
    { rank: 212, username: "wiidfilower", money: 170634060 },
    { rank: 213, username: "n_1mr4", money: 168620032 },
    { rank: 214, username: "tylikesroblox1975", money: 168473228 },
    { rank: 215, username: "mynameisjerryyayyay", money: 168308406 },
    { rank: 216, username: "bi_ouxuvi", money: 168291793 },
    { rank: 217, username: "scorpionghost17", money: 168220265 },
    { rank: 218, username: "ponybowpony", money: 167707359 },
    { rank: 219, username: "ponymyyupony", money: 167466489 },
    { rank: 220, username: "ii_cryptz", money: 167267239 },
    { rank: 221, username: "fiiledwithjoy", money: 166770016 },
    { rank: 222, username: "rxzveenaa", money: 166547569 },
    { rank: 223, username: "kika212121", money: 166029502 },
    { rank: 224, username: "perfectiylocked", money: 165454847 },
    { rank: 225, username: "ranveer3234", money: 165289961 },
    { rank: 226, username: "000_00iiadri", money: 165218093 },
    { rank: 227, username: "cokonya", money: 165206581 },
    { rank: 228, username: "abe7706", money: 164999000 },
    { rank: 229, username: "miningblaze64", money: 164844669 },
    { rank: 230, username: "rosegold14444", money: 164521348 },
    { rank: 231, username: "mrshark_333", money: 164335754 },
    { rank: 232, username: "fellowbacon093", money: 163467155 },
    { rank: 233, username: "wolfdoro", money: 162844311 },
    { rank: 234, username: "alexelloprox", money: 162344004 },
    { rank: 235, username: "valckrie", money: 161939897 },
    { rank: 236, username: "bocefus13", money: 161409344 },
    { rank: 237, username: "xblond_ag", money: 161049254 },
    { rank: 238, username: "elefetor", money: 160655130 },
    { rank: 239, username: "dishwasher_lover123", money: 160329552 },
    { rank: 240, username: "vshl3xz", money: 160169183 },
    { rank: 241, username: "donatorxexe", money: 159419157 },
    { rank: 242, username: "xjoseph_777x", money: 158730376 },
    { rank: 243, username: "jeffy090011", money: 158501147 },
    { rank: 244, username: "z3nbot", money: 158182962 },
    { rank: 245, username: "xs_akaa", money: 158071779 },
    { rank: 246, username: "666yilthe4th", money: 158014463 },
    { rank: 247, username: "xxtrolencioxx", money: 157605847 },
    { rank: 248, username: "ylost_x7", money: 156227072 },
    { rank: 249, username: "iluvrobloxyyy", money: 156077510 },
    { rank: 250, username: "gjjun_07", money: 155676915 }
];

// Muffin Hook Leaderboard - Use static data
function getStaticLeaderboardData() {
    return {
        count: staticLeaderboard.length,
        leaderboard: staticLeaderboard.map(player => ({
            rank: player.rank,
            username: player.username,
            money: player.money,
            UserId: null // We don't have UserIds in the static data
        })),
        lastUpdated: new Date().toISOString()
    };
}

// Simple test endpoint
app.get('/api/test', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
});

// Muffin Hook functions removed - using static data now

// Proxy endpoint for Muffin Hook leaderboard - serves static data
app.get('/api/muffinhook-leaderboard', async (req, res) => {
    try {
        const data = getStaticLeaderboardData();
        console.log(`[Leaderboard] Serving ${data.count} players from static data`);
        res.json({
            ...data,
            cached: false,
            lastUpdated: data.lastUpdated
        });
    } catch (error) {
        console.error('[Leaderboard] Error:', error);
        res.status(500).json({ error: 'Failed to load leaderboard' });
    }
});

// Leaderboard Database
const LEADERBOARD_FILE = './leaderboard.json';

async function loadLeaderboard() {
    try {
        const data = await fs.readFile(LEADERBOARD_FILE, 'utf8');
        return JSON.parse(data);
    } catch {
        return { entries: [], lastUpdated: null };
    }
}

async function saveLeaderboard(data) {
    await fs.writeFile(LEADERBOARD_FILE, JSON.stringify(data, null, 2));
}

// Get leaderboard
app.get('/api/leaderboard', async (req, res) => {
    try {
        const leaderboard = await loadLeaderboard();
        
        // Sort by total value (descending)
        const sortedEntries = (leaderboard.entries || []).sort((a, b) => b.totalValue - a.totalValue);
        
        // Calculate stats
        const totalPlayers = sortedEntries.length;
        const combinedValue = sortedEntries.reduce((sum, entry) => sum + (entry.totalValue || 0), 0);
        const topValue = sortedEntries.length > 0 ? sortedEntries[0].totalValue : 0;
        
        res.json({
            leaderboard: sortedEntries.slice(0, 50), // Top 50
            totalPlayers,
            combinedValue,
            topValue,
            lastUpdated: leaderboard.lastUpdated
        });
    } catch (error) {
        console.error('Error loading leaderboard:', error);
        res.status(500).json({ error: 'Failed to load leaderboard' });
    }
});

// Submit to leaderboard
app.post('/api/leaderboard/submit', async (req, res) => {
    try {
        const token = req.headers['x-session-token'];
        
        if (!token) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        
        // Verify user
        const user = await User.findOne({ sessionToken: token });
        if (!user) {
            return res.status(401).json({ error: 'Invalid session' });
        }
        
        const { totalValue, itemCount, inventory } = req.body;
        
        if (!totalValue || totalValue < 0) {
            return res.status(400).json({ error: 'Invalid value' });
        }
        
        // Load current leaderboard
        const leaderboard = await loadLeaderboard();
        
        // Find existing entry for this user
        const existingIndex = leaderboard.entries.findIndex(e => 
            e.discordId === user.discordId || e.robloxId === user.robloxId
        );
        
        const entry = {
            discordId: user.discordId,
            robloxId: user.robloxId,
            username: user.username,
            avatar: user.avatar,
            totalValue: Math.floor(totalValue),
            itemCount: itemCount || 0,
            inventory: inventory || [],
            submittedAt: new Date().toISOString()
        };
        
        if (existingIndex >= 0) {
            // Update existing entry
            leaderboard.entries[existingIndex] = entry;
        } else {
            // Add new entry
            leaderboard.entries.push(entry);
        }
        
        leaderboard.lastUpdated = new Date().toISOString();
        
        await saveLeaderboard(leaderboard);
        
        res.json({
            success: true,
            message: 'Inventory submitted successfully',
            rank: leaderboard.entries.sort((a, b) => b.totalValue - a.totalValue)
                .findIndex(e => e.discordId === user.discordId || e.robloxId === user.robloxId) + 1
        });
    } catch (error) {
        console.error('Error submitting to leaderboard:', error);
        res.status(500).json({ error: 'Failed to submit inventory' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Discord Client ID: ${CLIENT_ID}`);
    console.log(`Database: JSON file (users.json)`);
    // Start value monitoring
    startValueMonitoring();
    // Static leaderboard loaded - no API needed
    console.log('[Leaderboard] Static data loaded with 250 players');
});
