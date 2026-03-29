const express = require('express');
const sqlite3 = require('sqlite3').verbose();
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
const REDIRECT_URI = process.env.REDIRECT_URI || `http://localhost:${process.env.PORT || 3000}/auth/callback`;

// SQLite Database (async)
const db = new sqlite3.Database('./users.db');

// Create users table
db.run(`
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

// Database helpers (async)
const User = {
    findOneAndUpdate: async (filter, update) => {
        const { discordId } = filter;
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE discordId = ?', [discordId], (err, existing) => {
                if (err) return reject(err);
                
                if (existing) {
                    db.run(`
                        UPDATE users SET 
                            username = ?, 
                            discriminator = ?, 
                            avatar = ?, 
                            isAdmin = ?, 
                            loginTime = ?, 
                            lastLogin = ?, 
                            sessionToken = ? 
                        WHERE discordId = ?
                    `, [
                        update.username || existing.username,
                        update.discriminator || existing.discriminator,
                        update.avatar || existing.avatar,
                        update.isAdmin ? 1 : 0,
                        update.loginTime || existing.loginTime,
                        update.lastLogin || existing.lastLogin,
                        update.sessionToken || existing.sessionToken,
                        discordId
                    ], (err) => {
                        if (err) return reject(err);
                        db.get('SELECT * FROM users WHERE discordId = ?', [discordId], (err, row) => {
                            if (err) return reject(err);
                            resolve(row);
                        });
                    });
                } else {
                    db.run(`
                        INSERT INTO users (discordId, username, discriminator, avatar, isAdmin, loginTime, lastLogin, sessionToken)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                    `, [
                        discordId,
                        update.username,
                        update.discriminator,
                        update.avatar,
                        update.isAdmin ? 1 : 0,
                        update.loginTime,
                        update.lastLogin,
                        update.sessionToken
                    ], (err) => {
                        if (err) return reject(err);
                        db.get('SELECT * FROM users WHERE discordId = ?', [discordId], (err, row) => {
                            if (err) return reject(err);
                            resolve(row);
                        });
                    });
                }
            });
        });
    },
    
    findOne: async (filter) => {
        return new Promise((resolve, reject) => {
            if (filter.sessionToken) {
                db.get('SELECT * FROM users WHERE sessionToken = ?', [filter.sessionToken], (err, row) => {
                    if (err) return reject(err);
                    resolve(row);
                });
            } else if (filter.discordId) {
                db.get('SELECT * FROM users WHERE discordId = ?', [filter.discordId], (err, row) => {
                    if (err) return reject(err);
                    resolve(row);
                });
            } else {
                resolve(null);
            }
        });
    },
    
    find: async (options = {}) => {
        return new Promise((resolve, reject) => {
            let query = 'SELECT * FROM users';
            if (options.sort && options.sort.loginTime === -1) {
                query += ' ORDER BY loginTime DESC';
            }
            db.all(query, [], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    
    countDocuments: async (filter = {}) => {
        return new Promise((resolve, reject) => {
            if (filter.loginTime && filter.loginTime.$gte) {
                db.get('SELECT COUNT(*) as count FROM users WHERE loginTime >= ?', [filter.loginTime.$gte], (err, row) => {
                    if (err) return reject(err);
                    resolve(row.count);
                });
            } else {
                db.get('SELECT COUNT(*) as count FROM users', [], (err, row) => {
                    if (err) return reject(err);
                    resolve(row.count);
                });
            }
        });
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
        
        // Get all users from database
        const users = await User.find({}).sort({ loginTime: -1 });
        
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
app.get('/logout', async (req, res) => {
    const { token } = req.query;
    
    if (token) {
        // Invalidate user session
        const user = await User.findOne({ sessionToken: token });
        if (user) {
            db.run('UPDATE users SET sessionToken = NULL WHERE discordId = ?', [user.discordId]);
        }
    }
    
    res.redirect('/login.html');
});

// Statistics API
app.get('/api/stats', async (req, res) => {
    try {
        const { token } = req.query;
        
        // Verify admin session
        const adminUser = await User.findOne({ sessionToken: token });
        if (!adminUser || !adminUser.isAdmin) {
            return res.status(403).json({ error: 'Admin access required' });
        }
        
        const today = new Date().toISOString().split('T')[0];
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
        
        const totalUsers = await User.countDocuments();
        const activeToday = await new Promise((resolve, reject) => {
            db.get("SELECT COUNT(*) as count FROM users WHERE loginTime >= ?", [today + 'T00:00:00'], (err, row) => {
                if (err) return reject(err);
                resolve(row.count);
            });
        });
        const newThisWeek = await new Promise((resolve, reject) => {
            db.get("SELECT COUNT(*) as count FROM users WHERE loginTime >= ?", [weekAgo], (err, row) => {
                if (err) return reject(err);
                resolve(row.count);
            });
        });
        
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
