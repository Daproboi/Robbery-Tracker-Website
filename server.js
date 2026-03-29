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
const REDIRECT_URI = 'https://jailbreakhub.onrender.com/auth/callback';

// Simple JSON Database
const DB_FILE = './users.json';

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
        const { discordId } = filter;
        
        users[discordId] = {
            ...users[discordId],
            ...update,
            discordId
        };
        
        await saveUsers(users);
        return users[discordId];
    },
    
    findOne: async (filter) => {
        const users = await loadUsers();
        if (filter.sessionToken) {
            return Object.values(users).find(u => u.sessionToken === filter.sessionToken) || null;
        }
        if (filter.discordId) {
            return users[filter.discordId] || null;
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
        
        // Check if user is admin
        const ADMINS = (process.env.ADMIN_DISCORD_IDS || '').split(',').filter(id => id.trim());
        console.log('Discord user ID:', userData.id);
        console.log('Admin list:', ADMINS);
        const isAdmin = ADMINS.includes(userData.id);
        console.log('Is admin:', isAdmin);
        
        // Create or update user in database
        const userSession = {
            discordId: userData.id,
            username: userData.username,
            discriminator: userData.discriminator,
            avatar: userData.avatar ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png` : `https://cdn.discordapp.com/embed/avatars/0.png`,
            isAdmin: isAdmin,
            loginTime: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            sessionToken: crypto.randomBytes(32).toString('hex')
        };
        
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
        
        res.json({
            valid: true,
            user: {
                id: user.discordId,
                username: user.username,
                isAdmin: Boolean(user.isAdmin)
            }
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
            users[user.discordId].sessionToken = null;
            await saveUsers(users);
        }
    }
    
    res.redirect('/login.html');
});

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Discord Client ID: ${CLIENT_ID}`);
    console.log(`Database: JSON file (users.json)`);
});
