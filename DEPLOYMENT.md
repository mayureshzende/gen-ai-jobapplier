# Deployment Guide - Job Application Tracker with GenAI

## Overview
This is a full-stack application that needs to be deployed in two parts:
- **Frontend**: React/Vite → Netlify
- **Backend**: Express.js/Node.js → Railway, Render, or similar

---

## Part 1: Deploy Backend

### Option A: Deploy to Railway (Recommended)

**Step 1: Create Railway Account**
1. Go to https://railway.app
2. Sign up with GitHub
3. Create a new project

**Step 2: Configure Backend**
1. Go to your backend directory and ensure you have:
   - `package.json` with all dependencies
   - `.env` file with all environment variables
   - `server.js` as entry point

2. Create a `Procfile` in backend root:
   ```
   web: npm run dev
   ```

3. Ensure your backend listens on `process.env.PORT`:
   ```javascript
   // server.js
   app.listen(process.env.PORT || 3000, () => {
     console.log(`Server running on port ${process.env.PORT || 3000}`);
   });
   ```

**Step 3: Deploy to Railway**
1. In Railway dashboard, click "New Project"
2. Select "Deploy from GitHub"
3. Select your repository
4. Choose `backend` directory as root directory
5. Add environment variables:
   - `MONGODB_URI` (your MongoDB connection string)
   - `JWT_SECRET` (your JWT secret)
   - `GEMINI_API_KEY` (your Google Gemini API key)
   - `CORS_ORIGIN` (your frontend Netlify URL: https://your-site.netlify.app)
   - `NODE_ENV` (production)
6. Deploy!

You'll get a URL like: `https://your-backend.up.railway.app`

---

### Option B: Deploy to Render

1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: your-app-backend
   - **Root Directory**: backend
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm run dev`
6. Add environment variables (same as Railway)
7. Deploy!

You'll get a URL like: `https://your-backend.onrender.com`

---

## Part 2: Deploy Frontend to Netlify

### Step 1: Prepare Frontend

1. **Update environment file**:
   ```bash
   # In frontend/.env.production
   VITE_API_BASE_URL=https://your-backend-url.com
   ```
   Replace with your actual backend URL from Railway/Render

2. **Build locally to test**:
   ```bash
   cd frontend
   npm run build
   npm run preview
   ```

### Step 2: Deploy to Netlify

**Option A: GitHub + Netlify Auto-Deploy**

1. Go to https://netlify.com
2. Click "Sign up" → Connect your GitHub
3. Click "New site from Git"
4. Select your repository
5. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
5. Add environment variable in Netlify dashboard:
   - Go to Site settings → Build & deploy → Environment
   - Add `VITE_API_BASE_URL` = your backend URL
6. Deploy!

**Option B: Manual Deploy (Drag & Drop)**

1. Build your frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Go to https://netlify.com
3. Drag & drop the `frontend/dist` folder
4. Done! (But you won't have auto-updates)

---

## Part 3: Configure CORS on Backend

Your backend needs to allow requests from your Netlify frontend. Update `backend/src/app.js`:

```javascript
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);
```

Environment variable example:
```
CORS_ORIGIN=https://your-site.netlify.app
```

---

## Part 4: Verify Deployment

### Test Backend API

```bash
curl https://your-backend-url.com/health
```

Should return: `{"status":"OK","timestamp":"..."}`

### Test Frontend

1. Visit your Netlify URL: `https://your-site.netlify.app`
2. Try registering a new account
3. Check browser console for API logs
4. Verify all features work:
   - Login/Register
   - View Dashboard
   - Add Applications
   - Generate Reports
   - Update Profile

---

## Environment Variables Checklist

### Backend (.env)
- [ ] `MONGODB_URI` - MongoDB connection string
- [ ] `JWT_SECRET` - Random string for JWT signing
- [ ] `GEMINI_API_KEY` - Google Gemini API key
- [ ] `CORS_ORIGIN` - Your Netlify frontend URL
- [ ] `NODE_ENV` - Set to `production`
- [ ] `PORT` - Usually auto-set by hosting provider

### Frontend (.env.production)
- [ ] `VITE_API_BASE_URL` - Your backend URL

---

## Troubleshooting

### Frontend can't reach backend
- Check `VITE_API_BASE_URL` is correct
- Check CORS headers in backend
- Check browser console for exact error
- Ensure backend is running

### Getting 404 on API calls
- Verify backend routes are correct
- Check API endpoint paths
- Ensure backend URL doesn't have trailing slash

### MongoDB connection fails
- Check `MONGODB_URI` is valid
- Ensure IP whitelist includes hosting provider
- Check credentials are correct

### JWT errors
- Verify `JWT_SECRET` is set
- Should be a long random string (>32 characters)

---

## Quick Links

- **Railway**: https://railway.app
- **Render**: https://render.com
- **Netlify**: https://netlify.com
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
- **Google Gemini API**: https://ai.google.dev

---

## Post-Deployment

1. **Monitor logs**:
   - Railway: Project → Deployments → View logs
   - Render: Service → Logs
   - Netlify: Deploys → Deploy logs

2. **Enable auto-deploys**:
   - Both Railway and Render will auto-deploy on git push
   - Netlify will auto-deploy on git push

3. **Set up custom domain** (Optional):
   - Netlify: Site settings → Domain management
   - Railway/Render: Add custom domain in settings

---

## Cost Considerations

- **Netlify**: Free tier (100GB/month bandwidth)
- **Railway**: $5/month free credits + pay-as-you-go
- **Render**: Free tier available (limited), paid plans start at $7/month
- **MongoDB Atlas**: Free tier (512MB)
- **Google Gemini API**: Free tier with rate limits

---

Good luck with your deployment! 🚀
