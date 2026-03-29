const express = require('express');
const Database = require('better-sqlite3');
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
const REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:3000/auth/callback';

// SQLite Database
const db = new Database('./users.db');

// Create users table
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        discordId TEXT PRIMARY KEY,
        username TEXT NOT NULL,
        discriminator TEXT,
        avatar TEXT,
        isAdmin INTEGER DEFAULT 0,
        loginTime TEXT,
        lastLogin TEXT,
        sessionToken TEXT
    )
`);

// Database helpers
const User = {
    findOneAndUpdate: (filter, update, options) => {
        const { discordId } = filter;
        const existing = db.prepare('SELECT * FROM users WHERE discordId = ?').get(discordId);
        
        if (existing) {
            db.prepare(`
                UPDATE users SET 
                    username = ?, 
                    discriminator = ?, 
                    avatar = ?, 
                    isAdmin = ?, 
                    loginTime = ?, 
                    lastLogin = ?, 
                    sessionToken = ? 
                WHERE discordId = ?
            `).run(
                update.username || existing.username,
                update.discriminator || existing.discriminator,
                update.avatar || existing.avatar,
                update.isAdmin ? 1 : 0,
                update.loginTime || existing.loginTime,
                update.lastLogin || existing.lastLogin,
                update.sessionToken || existing.sessionToken,
                discordId
            );
        } else {
            db.prepare(`
                INSERT INTO users (discordId, username, discriminator, avatar, isAdmin, loginTime, lastLogin, sessionToken)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `).run(
                discordId,
                update.username,
                update.discriminator,
                update.avatar,
                update.isAdmin ? 1 : 0,
                update.loginTime,
                update.lastLogin,
                update.sessionToken
            );
        }
        
        return db.prepare('SELECT * FROM users WHERE discordId = ?').get(discordId);
    },
    
    findOne: (filter) => {
        if (filter.sessionToken) {
            return db.prepare('SELECT * FROM users WHERE sessionToken = ?').get(filter.sessionToken);
        }
        if (filter.discordId) {
            return db.prepare('SELECT * FROM users WHERE discordId = ?').get(filter.discordId);
        }
        return null;
    },
    
    find: (options = {}) => {
        let query = 'SELECT * FROM users';
        if (options.sort && options.sort.loginTime === -1) {
            query += ' ORDER BY loginTime DESC';
        }
        return db.prepare(query).all();
    },
    
    countDocuments: (filter = {}) => {
        if (filter.loginTime && filter.loginTime.$gte) {
            return db.prepare('SELECT COUNT(*) as count FROM users WHERE loginTime >= ?').get(filter.loginTime.$gte).count;
        }
        return db.prepare('SELECT COUNT(*) as count FROM users').get().count;
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
        console.log('Discord user ID:', userData.id, 'Type:', typeof userData.id);
        console.log('Admin list:', ADMINS);
        const isAdmin = ADMINS.includes(userData.id);
        console.log('Is admin:', isAdmin);
        
        // Create or update user in database
        const userSession = {
            discordId: userData.id,
            username: userData.username,
            discriminator: userData.discriminator,
            avatar: userData.avatar || `https://cdn.discordapp.com/avatars/${userData.id}.png`,
            isAdmin: isAdmin,
            loginTime: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            sessionToken: require('crypto').randomBytes(32).toString('hex')
        };
        
        await User.findOneAndUpdate(
            { discordId: userData.id },
            userSession,
            { upsert: true, new: true }
        );
        
        console.log(`User ${userData.username} (${isAdmin ? 'Admin' : 'Member'}) logged in at ${new Date()}`);
        
        // Redirect with session token
        const redirectUrl = isAdmin ? '/admin.html' : '/index.html';
        res.redirect(`${redirectUrl}?session=${userSession.sessionToken}`);
        
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).send('Internal server error: ' + error.message);
    }
});

// Session verification route
app.get('/api/check-session', (req, res) => {
    const { token } = req.query;
    
    if (!token) {
        return res.status(400).json({ error: 'Token required' });
    }
    
    try {
        const user = User.findOne({ sessionToken: token });
        
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
        const adminUser = User.findOne({ sessionToken: token });
        if (!adminUser || !adminUser.isAdmin) {
            return res.status(403).json({ error: 'Admin access required' });
        }
        
        // Get all users
        const users = User.find({}).sort({ loginTime: -1 });
        
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

// Logout route
app.get('/logout', (req, res) => {
    const { token } = req.query;
    
    if (token) {
        // Invalidate user session
        const user = User.findOne({ sessionToken: token });
        if (user) {
            db.prepare('UPDATE users SET sessionToken = NULL WHERE discordId = ?').run(user.discordId);
        }
    }
    
    res.redirect('/login.html');
});

// Statistics API
app.get('/api/stats', (req, res) => {
    try {
        const { token } = req.query;
        
        // Verify admin session
        const adminUser = User.findOne({ sessionToken: token });
        if (!adminUser || !adminUser.isAdmin) {
            return res.status(403).json({ error: 'Admin access required' });
        }
        
        const today = new Date().toISOString().split('T')[0];
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
        
        const totalUsers = User.countDocuments();
        const activeToday = db.prepare("SELECT COUNT(*) as count FROM users WHERE loginTime >= ?").get(today + 'T00:00:00').count;
        const newThisWeek = db.prepare("SELECT COUNT(*) as count FROM users WHERE loginTime >= ?").get(weekAgo).count;
        
        res.json({
            totalUsers,
            activeToday,
            newThisWeek
        });
        
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
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
    console.log(`Database: SQLite (users.db)`);
});
