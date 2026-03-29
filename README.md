# Jailbreak Hub Backend

Complete Node.js backend with Discord OAuth authentication for Jailbreak Hub.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- MongoDB
- Discord Application (Client ID and Secret)

### Installation
```bash
# Clone or create the project
git clone <your-repo-url>
cd jailbreak-hub-backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env file with your Discord credentials
nano .env
```

### Start Development Server
```bash
npm run dev
```

### Start Production Server
```bash
npm start
```

## 🔧 Configuration

### Environment Variables (.env)
```env
CLIENT_ID=1487705589210550282
CLIENT_SECRET=your_discord_client_secret_here
MONGODB_URI=mongodb://localhost:27017/jailbreak-hub
PORT=3000
NODE_ENV=development
```

### Discord Application Setup
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create new application or use existing one
3. Set redirect URI: `https://yourdomain.com/auth/callback`
4. Add OAuth2 scope: `identify email guilds`

## 📡 API Endpoints

### Authentication
- `GET /auth/callback` - Discord OAuth callback
- `GET /api/check-session` - Verify user session
- `GET /logout` - Logout user

### Admin APIs
- `GET /api/users` - Get all users (admin only)
- `GET /api/stats` - Get user statistics (admin only)

## 🗄️ Database Schema

### User Model
```javascript
{
    discordId: String,
    username: String,
    discriminator: String,
    avatar: String,
    isAdmin: Boolean,
    loginTime: Date,
    lastLogin: Date,
    sessionToken: String
}
```

## 🚀 Deployment

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Option 2: Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy
railway login
railway deploy
```

### Option 3: Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Deploy
heroku create your-app-name
heroku config:set CLIENT_ID=1487705589210550282
heroku config:set CLIENT_SECRET=your_secret
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

## 🔐 Security Features

- Discord OAuth 2.0 authentication
- Role-based access control (Admin vs Member)
- Session management with secure tokens
- Admin detection via Discord user ID list
- CORS enabled for cross-origin requests

## 📋 Frontend Integration

The frontend automatically detects admin status and redirects accordingly:
- **Admin users** → `/admin.html`
- **Regular users** → `/index.html`
- **Non-logged in** → `/login.html`

## 🛠️ Admin Access

Only Discord users with IDs in the admin array get admin panel access:
- `1487705589210550282` (Daproboi)
- `plugtm` (Plug™)

All other Discord users get regular member access.

---

**Ready to deploy! 🚀**
