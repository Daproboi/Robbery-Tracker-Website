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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Discord Client ID: ${CLIENT_ID}`);
    console.log(`Database: JSON file (users.json)`);
    // Start value monitoring
    startValueMonitoring();
});
