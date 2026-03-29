# Railway Deployment Instructions

## Step 1: Push to GitHub (if not already)
```bash
git add .
git commit -m "Prepare for Railway deployment"
git push
```

## Step 2: Deploy via Railway Dashboard
1. Go to https://railway.app
2. Login with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your `Robbery-Tracker-Website` repo
6. Click "Deploy"

## Step 3: Add Environment Variables
In Railway dashboard, go to your project → Variables, add:
- `CLIENT_ID` = 1487705589210550282
- `CLIENT_SECRET` = ywNzvJVwUK7yEgAEEJHnAWUR5QAJn3P3
- `ADMIN_DISCORD_IDS` = 1487705589210550282,plugtm,1371297155809153076
- `REDIRECT_URI` = https://YOUR_RAILWAY_DOMAIN/auth/callback

## Step 4: Update Discord OAuth
Go to https://discord.com/developers/applications
- Select your app → OAuth2
- Add redirect: `https://YOUR_RAILWAY_DOMAIN/auth/callback`

## Step 5: Done!
Your site will be live at the Railway domain.
