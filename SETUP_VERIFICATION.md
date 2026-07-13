# Setup & Verification Guide

## Quick Start

### 1. Backend Setup

```bash
cd backend
npm install  # Important: Install new dependencies (helmet, express-rate-limit, morgan)
npm run dev
```

Expected output:
```
> nodemon ./server.js
[nodemon] 3.1.14
[nodemon] to restart at any time, type `rs`
[nodemon] watching path(s): *.*
The server is running on port 3000
```

### 2. Frontend Setup

```bash
cd frontend
npm install  # No new dependencies needed
npm run dev
```

Expected output:
```
> vite

  VITE v5.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

---

## Pre-Verification Checklist

Before testing, ensure:

### Backend
- [ ] `.env` file exists with all required variables
- [ ] `CORS_ORIGIN=http://localhost:5173`
- [ ] `NODE_ENV=development`
- [ ] `PORT=3000`
- [ ] MongoDB connection string is valid
- [ ] Gemini API key is valid
- [ ] `npm install` completed successfully
- [ ] No error messages in `npm install`

### Frontend
- [ ] `.env` file configured (if needed)
- [ ] Port 5173 is available
- [ ] `npm install` completed successfully
- [ ] No TypeScript errors
- [ ] `npm run dev` starts without errors

---

## Verification Tests

### 1. Server Health Check

```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2025-01-13T..."
}
```

### 2. Register New User

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  --data '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "testpass123"
  }'
```

Expected response (201):
```json
{
  "success": true,
  "message": "User registered successfully"
}
```

### 3. Login User

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  --data '{
    "username": "testuser",
    "password": "testpass123"
  }'
```

Expected response (200):
```json
{
  "success": true,
  "message": "Login successful"
}
```

### 4. Get Current User

```bash
curl http://localhost:3000/api/auth/getMe \
  -H "Content-Type: application/json" \
  -b cookies.txt
```

Expected response (200):
```json
{
  "success": true,
  "message": "user details fetched successfully",
  "user": {
    "id": "...",
    "username": "testuser",
    "email": "test@example.com"
  }
```

### 5. Create Application

```bash
curl -X POST http://localhost:3000/api/applications \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  --data '{
    "company": "Google",
    "role": "Senior Engineer",
    "location": "Mountain View, CA",
    "salary": "$200k-$250k",
    "status": "Applied",
    "source": "LinkedIn",
    "jobDescription": "Looking for experienced engineers..."
  }'
```

Expected response (201):
```json
{
  "success": true,
  "message": "Application created successfully",
  "application": { /* application object */ }
}
```

### 6. Get Applications

```bash
curl http://localhost:3000/api/applications \
  -b cookies.txt
```

Expected response (200):
```json
{
  "success": true,
  "message": "Applications retrieved successfully",
  "applications": [ /* array of applications */ ],
  "count": 1
}
```

### 7. Get Application Stats

```bash
curl http://localhost:3000/api/applications/stats/summary \
  -b cookies.txt
```

Expected response (200):
```json
{
  "success": true,
  "message": "Statistics retrieved successfully",
  "stats": {
    "total": 1,
    "saved": 0,
    "applied": 1,
    "interview": 0,
    "offer": 0,
    "rejected": 0,
    "responseRate": 100,
    "avgMatchScore": 0
  }
}
```

### 8. Create Profile

```bash
curl -X POST http://localhost:3000/api/profile \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  --data '{
    "summary": "Experienced full-stack engineer",
    "skills": ["JavaScript", "React", "Node.js", "MongoDB"]
  }'
```

Expected response (200):
```json
{
  "success": true,
  "message": "Profile saved successfully",
  "profile": { /* profile object */ }
}
```

### 9. Get Profile

```bash
curl http://localhost:3000/api/profile \
  -b cookies.txt
```

Expected response (200):
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "profile": { /* profile object */ }
}
```

### 10. Logout

```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -b cookies.txt
```

Expected response (200):
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## Frontend Integration Tests

### 1. Open Application
- Navigate to http://localhost:5173
- Should show Login page

### 2. Register Flow
- Click "Register" link
- Fill in username, email, password
- Click "Create Account"
- Should redirect to Login

### 3. Login Flow
- Fill in username and password
- Click "Log In"
- Should redirect to Dashboard

### 4. Dashboard
- Should show stats bar with 5 tiles
- Should show applications section (empty initially)
- Should show Kanban/Table toggle
- Should show "+ New Application" button in navbar

### 5. Add Application
- Click "+ New Application" in navbar
- Fill in all fields (company, role, location, status, source, JD)
- Click "Save Application"
- Should redirect to Dashboard
- New application should appear

### 6. Kanban View
- Verify 5 columns (Saved, Applied, Interview, Offer, Rejected)
- Verify application appears in "Applied" column
- Try drag-and-drop to another column
- Verify stats update

### 7. Table View
- Click "Table" toggle
- Verify table displays applications
- Verify columns: Company, Role, Location, Applied, Status, Match

### 8. Profile
- Click "Profile" in navbar
- Should show profile sections (Summary, Skills, Experience, Achievements)
- Try editing summary
- Try editing skills

### 9. Generate Report
- Click "Generate" in navbar
- Fill in Job Description
- Fill in either Resume or Self-Description
- Click "Generate My Interview Strategy"
- Should load and redirect to report

### 10. Interview Report
- Should display match score
- Should show skill gaps
- Should show preparation plan
- Should show technical and behavioral questions
- Click "Download Resume" to test PDF generation

### 11. Theme Toggle
- Click theme toggle button in navbar
- Verify light/dark mode switching
- Verify localStorage persists theme

### 12. UserMenu
- Click avatar in navbar
- Should show dropdown with username
- Click "View Profile" should go to Profile
- Click "Log Out" should redirect to Login

---

## Troubleshooting

### Backend Issues

**Port Already in Use**
```bash
# Windows: Find process on port 3000
netstat -ano | findstr :3000
# Kill the process
taskkill /PID <PID> /F
```

**MongoDB Connection Failed**
- Verify MONGO_URI is correct
- Check internet connection (if using cloud MongoDB)
- Verify VPN/IP whitelist if needed

**Dependencies Not Installed**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Invalid JWT_SECRET**
- Generate a new one: `openssl rand -hex 32`
- Update .env with new value

### Frontend Issues

**Port 5173 Already in Use**
```bash
# Change port in vite.config.js or use:
npm run dev -- --port 5174
```

**CORS Error**
- Verify backend CORS_ORIGIN matches frontend URL
- Check backend is running on port 3000
- Clear browser cache/cookies

**API Not Responding**
- Verify backend is running (`npm run dev`)
- Check network tab in browser DevTools
- Verify API requests include `credentials: 'include'`

**localStorage Issues**
- Clear browser storage: DevTools → Application → Storage → Clear All
- Check browser allows localStorage

---

## Performance Verification

### Frontend
```bash
# Build for production
npm run build

# Check bundle size
ls -lh dist/assets/
```

Should produce optimized bundles with lazy-loaded chunks.

### Backend
```bash
# Check response times
time curl http://localhost:3000/api/health
```

Should respond in <50ms.

---

## Security Verification

### 1. Check Cookie Security
```bash
curl -v http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  --data '{"username":"test","password":"test"}'
```

Look for:
- `HttpOnly` flag
- `SameSite=Strict`
- `Secure` flag (in production only)

### 2. Check CORS Headers
```bash
curl -H "Origin: http://localhost:5173" \
  http://localhost:3000/api/health -v
```

Should return:
```
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Credentials: true
```

### 3. Check Security Headers
```bash
curl http://localhost:3000/api/health -v
```

Should return helmet headers like:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 0`

### 4. Test Rate Limiting
```bash
# Run 101 requests rapidly
for i in {1..101}; do 
  curl http://localhost:3000/api/health
done
```

Request 101 should get 429 (Too Many Requests).

---

## Database Verification

### Check Collections
```javascript
// In MongoDB client
db.getCollectionNames()
// Should include: users, applications, profiles, InterviewModel, etc.
```

### Check Indexes
```javascript
db.users.getIndexes()
db.applications.getIndexes()
db.profiles.getIndexes()
```

Should show indexes on email, username, user references.

---

## Logging Verification

### Check Application Logs
Watch the backend console during:
1. Register
2. Login
3. Create application
4. Generate report

Should see Morgan HTTP logs:
```
POST /api/auth/register 201 - 234.567 ms
GET /api/applications 200 - 45.123 ms
```

---

## Deployment Pre-Check

Before deploying to production:

- [ ] All tests pass
- [ ] No console errors in frontend
- [ ] No console errors in backend
- [ ] Rate limiting working
- [ ] CORS configured for production domain
- [ ] HTTPS enabled
- [ ] JWT_SECRET is strong (32+ random chars)
- [ ] Database backups enabled
- [ ] Error logging configured
- [ ] Monitoring set up
- [ ] Load testing completed

---

## Success Indicators

✅ All API endpoints respond with correct status codes
✅ Frontend correctly communicates with backend
✅ Authentication flow works end-to-end
✅ Applications can be created, read, updated, deleted
✅ Profile can be created and updated
✅ Interview generation works with real resume
✅ PDF download works
✅ Theme toggle persists
✅ Logout clears session
✅ Rate limiting prevents abuse

---

## Support Resources

- **API Documentation**: See `BACKEND_API.md`
- **Backend Improvements**: See `BACKEND_IMPROVEMENTS.md`
- **Implementation Summary**: See `IMPLEMENTATION_SUMMARY.md`
- **Environment Variables**: See `.env.example`

---

**Version**: 2.0.0
**Last Updated**: January 13, 2025
**Status**: Ready for Testing ✅
