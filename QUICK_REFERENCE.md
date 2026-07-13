# Quick Reference Card

## Frontend Components

| Component | Location | Purpose |
|-----------|----------|---------|
| Button | `components/ui/Button.jsx` | 4 variants, 2 sizes |
| Input/Select | `components/ui/Input.jsx` | Text inputs and dropdowns |
| Textarea | `components/ui/Textarea.jsx` | Multi-line text input |
| Tag | `components/ui/Tag.jsx` | Pill badges with colors |
| FormField | `components/ui/FormField.jsx` | Label + input wrapper |
| Card | `components/ui/Card.jsx` | Container with metadata |
| SegmentedControl | `components/ui/SegmentedControl.jsx` | Radio toggle group |
| UserMenu | `components/ui/UserMenu.jsx` | Avatar dropdown |
| Navbar | `components/ui/Navbar.jsx` | Top navigation bar |
| PageSkeleton | `components/ui/PageSkeleton.jsx` | Loading placeholder |

## Frontend Pages

| Page | Route | Purpose |
|------|-------|---------|
| Home (Dashboard) | `/` or `/dashboard` | Application overview |
| Applications | `/applications` | Add/edit applications |
| Profile | `/profile` | Resume/profile management |
| GenerateReport | `/generatereport` | Interview prep generation |
| InterviewReport | `/interview/:id` | Generated report display |
| Login | `/login` | User authentication |
| Register | `/register` | New user signup |

## Frontend Hooks

| Hook | Location | Purpose |
|------|----------|---------|
| useAuth | `features/auth/hooks/` | Authentication state |
| useInterview | `features/ai/hooks/` | Interview reports state |
| useApplications | `features/applications/hooks/` | Applications state |
| useClickOutside | `hooks/` | Dropdown dismiss handling |

## Backend API Endpoints

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/getMe
```

### Applications
```
POST   /api/applications
GET    /api/applications
GET    /api/applications/stats/summary
GET    /api/applications/:id
PUT    /api/applications/:id
DELETE /api/applications/:id
```

### Profile
```
POST   /api/profile
GET    /api/profile
PUT    /api/profile/summary
PUT    /api/profile/skills
POST   /api/profile/experience
PUT    /api/profile/experience/:expId
DELETE /api/profile/experience/:expId
POST   /api/profile/certifications
DELETE /api/profile/certifications/:certId
```

### Interview Reports
```
POST   /api/interview/uploadcv
GET    /api/interview
GET    /api/interview/:id
GET    /api/interview/generatepdf/:id
DELETE /api/interview/:id
```

### Health
```
GET    /api/health
```

## Environment Variables

```bash
# Backend
NODE_ENV=development
PORT=3000
CORS_ORIGIN=http://localhost:5173
MONGO_URI=<mongodb-connection-string>
JWT_SECRET=<32-char-random-string>
GEMINI_API_KEY=<your-api-key>

# Frontend
# (Usually handled via env at build time)
```

## Key Technologies

### Frontend
- React 19.2
- React Router v7
- Tailwind CSS v4
- Axios
- React Compiler (auto-memoization)
- Code-splitting (React.lazy + Suspense)

### Backend
- Express 5.2
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- Bcryptjs (password hashing)
- Helmet (security headers)
- Express Rate Limit
- Morgan (HTTP logging)
- Zod (validation)
- Google Gemini (AI)

## Common Tasks

### Start Development
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

### Test an API Endpoint
```bash
curl -X GET http://localhost:3000/api/health
```

### Install New Dependencies
```bash
# Frontend
cd frontend && npm install <package-name>

# Backend
cd backend && npm install <package-name>
```

### Run Linting
```bash
# Frontend
npm run lint

# Backend
npm run lint
```

### Build for Production
```bash
# Frontend
npm run build

# Backend (no build needed, ESM modules used as-is)
```

## File Structure

```
interview-gen-ai/
├── frontend/
│   ├── src/
│   │   ├── components/ui/          # Shared components
│   │   ├── features/
│   │   │   ├── auth/               # Auth pages & context
│   │   │   ├── ai/                 # Interview & report pages
│   │   │   └── applications/       # App state & context
│   │   ├── context/                # Theme context
│   │   ├── hooks/                  # Custom hooks
│   │   ├── lib/                    # Utilities
│   │   ├── routes/                 # Router config
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css               # Design tokens
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── models/                 # MongoDB schemas
│   │   ├── controller/             # Route handlers
│   │   ├── routes/                 # API routes
│   │   ├── middleware/             # Express middleware
│   │   ├── services/               # Business logic
│   │   ├── config/                 # Config files
│   │   └── app.js                  # Express app setup
│   ├── server.js
│   ├── .env
│   ├── .env.example
│   └── package.json
├── IMPLEMENTATION_SUMMARY.md       # High-level overview
├── BACKEND_API.md                  # API documentation
├── BACKEND_IMPROVEMENTS.md         # Technical improvements
├── SETUP_VERIFICATION.md           # Testing guide
└── QUICK_REFERENCE.md              # This file
```

## Response Format

All API responses follow this format:

```json
{
  "success": true,
  "message": "Description of what happened",
  "data": {}  // Optional, varies by endpoint
}
```

## Error Responses

```json
{
  "success": false,
  "message": "Error description",
  "errors": []  // Optional, for validation errors
}
```

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (auth failed) |
| 404 | Not Found |
| 409 | Conflict (e.g., duplicate user) |
| 429 | Too Many Requests (rate limited) |
| 500 | Server Error |

## CSS Custom Properties (Design Tokens)

```css
/* Colors */
--color-bg              /* Background */
--color-surface         /* Surface/cards */
--color-text            /* Text */
--color-text-secondary  /* Secondary text */
--color-accent          /* Primary action color */
--color-accent-hover    /* Hover state */
--color-divider         /* Borders/dividers */

/* Status Colors */
--status-saved          /* Gray */
--status-applied        /* Blue */
--status-interview      /* Amber */
--status-offer          /* Green */
--status-rejected       /* Red */

/* Radius */
--radius-sm   /* 10px */
--radius-md   /* 14px */
--radius-lg   /* 20px */
```

## Common Errors & Fixes

| Error | Solution |
|-------|----------|
| CORS error | Check backend CORS_ORIGIN matches frontend URL |
| Port already in use | Kill process: `lsof -i :3000` / `kill -9 <PID>` |
| MongoDB connection failed | Verify MONGO_URI and internet |
| JWT validation failed | Check JWT_SECRET matches |
| Rate limit hit | Wait 15 minutes or clear IP |
| localStorage lost | Check incognito mode, not in private |

## Performance Tips

### Frontend
- Use React DevTools Profiler
- Check bundle size with `npm run build`
- Monitor Network tab for large files
- Test with Lighthouse

### Backend
- Use MongoDB Atlas profiler
- Monitor memory usage
- Check query performance
- Use lean() on read queries

## Security Checklist

- [ ] JWT_SECRET is 32+ characters
- [ ] HTTPS enabled in production
- [ ] CORS configured correctly
- [ ] Rate limiting active
- [ ] Database backups enabled
- [ ] Error logging doesn't expose secrets
- [ ] Cookies have httpOnly flag
- [ ] CSRF tokens if using sessions

## Debugging Tips

### Frontend
```javascript
// Check auth state
console.log(useAuth());

// Check localStorage
console.log(localStorage.getItem('mock_applications'));

// Monitor API calls
// Open Network tab in DevTools
```

### Backend
```javascript
// Add logging
console.log('Debug info:', variable);

// Check MongoDB
db.applications.find().limit(10);

// View running processes
ps aux | grep node
```

## Useful Commands

```bash
# Frontend development
npm run dev                # Start dev server
npm run build              # Build for production
npm run lint               # Check code quality
npm run lint:fix           # Auto-fix linting issues

# Backend development
npm run dev                # Start with hot-reload
npm run lint               # Check code quality
npm run lint:fix           # Auto-fix linting issues

# General
git log --oneline          # View commit history
git status                 # Check changes
git diff                   # View diffs
```

## Default Credentials (Development Only)

After registration:
- **Username**: Any unique string
- **Email**: Any email format
- **Password**: Min 6 characters

## Rate Limiting

- **Limit**: 100 requests per 15 minutes per IP
- **Headers**: `Retry-After` on 429 response
- **Applies to**: All `/api/` routes

## Session Duration

- **JWT Expiry**: 24 hours
- **Cookie MaxAge**: 24 hours
- **Auto Logout**: After 24 hours of expiry

## Pagination (Future)

Not yet implemented. When added, use query params:
```
GET /api/applications?page=1&limit=10&sort=-createdAt
```

## Search/Filter (Future)

Not yet implemented. When added, use query params:
```
GET /api/applications?status=Applied&company=Google
```

---

**Version**: 2.0.0
**Last Updated**: January 13, 2025
**Print-Friendly**: Yes ✅

Print this page for quick reference!
