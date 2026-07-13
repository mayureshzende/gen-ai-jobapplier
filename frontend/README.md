# 🎯 Job Application Tracker with GenAI - Frontend

A modern React-based web application for tracking job applications and generating AI-powered interview preparation reports.

## 🎥 Demo Video

[![Watch the demo](https://img.shields.io/badge/Watch%20Demo-YouTube-red?style=for-the-badge)](YOUR_VIDEO_LINK_HERE)

**Paste your demo video link above** by replacing `YOUR_VIDEO_LINK_HERE` with your actual video URL.

---

## ✨ Features

### Core Features
- 🔐 **User Authentication** - Secure login/register with JWT
- 📋 **Application Tracking** - Track job applications with status (Saved, Applied, Interview, Offer, Rejected)
- 🤖 **AI Interview Prep** - Generate interview strategies powered by Google Gemini API
- 📊 **Dashboard** - Visual kanban/table view of applications
- 📱 **Responsive Design** - Works on all device sizes
- 🌓 **Dark Mode** - Toggle between light and dark themes

### User Profile Management
- 👤 **Personal Information** - Store first, middle, and last name
- 📝 **Professional Summary** - Add career overview
- 🎯 **Skills Management** - Add and manage technical/professional skills
- 💼 **Work Experience** - Track job history with dates and descriptions
- 🏆 **Certifications** - Record professional certifications
- ⬆️⬇️ **Reorder Experience** - Easily organize experiences by importance

### Application Management
- ➕ **Add Applications** - Create new job application records
- 🔄 **Drag & Drop** - Reorder applications between status columns
- 📊 **Statistics** - View response rate, interviews, offers at a glance
- 📈 **Match Score** - See AI-generated match scores for your profile
- 🔗 **Quick Links** - Click applications to view/create interview reports

### Interview Preparation
- 📄 **Resume Upload** - Upload PDF resume for analysis
- 🎤 **Interview Report** - Get detailed interview strategy and prep guide
- 📋 **Technical Questions** - AI-generated questions with sample answers
- 🗣️ **Behavioral Questions** - Prepare for common behavioral questions
- 📚 **Skill Gaps** - Identify areas to improve before interviews
- 📅 **Preparation Plan** - 7-day structured preparation timeline
- 📥 **Download Resume** - Generate customized PDF resume

---

## 🛠️ Tech Stack

- **Framework**: React 19.2
- **Build Tool**: Vite 5.0
- **Styling**: Tailwind CSS 4
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Routing**: React Router v7
- **Authentication**: JWT with HttpOnly cookies
- **API Integration**: RESTful API with interceptors

---

## 📋 Prerequisites

- Node.js 16+ 
- npm or yarn
- Backend API running on port 3000

---

## 🚀 Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/interview-gen-ai.git
cd interview-gen-ai/frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables

**Development** (`.env`):
```env
VITE_API_BASE_URL=http://localhost:3000
```

**Production** (`.env.production`):
```env
VITE_API_BASE_URL=https://your-backend-url.com
```

### 4. Run Development Server
```bash
npm run dev
```

Access at: `http://localhost:5173`

---

## 📦 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── ui/                 # Reusable UI components
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       ├── Input.jsx
│   │       ├── FormField.jsx
│   │       ├── Navbar.jsx
│   │       ├── UserMenu.jsx
│   │       ├── Tag.jsx
│   │       └── ...
│   │
│   ├── features/
│   │   ├── auth/               # Authentication module
│   │   │   ├── pages/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── hooks/
│   │   │   │   └── useAuth.jsx
│   │   │   ├── services/
│   │   │   │   └── Auth.api.service.js
│   │   │   └── state/
│   │   │       └── AuthContext.jsx
│   │   │
│   │   └── ai/                 # AI Features module
│   │       ├── pages/
│   │       │   ├── Home.jsx (Dashboard)
│   │       │   ├── Applications.jsx
│   │       │   ├── Profile.jsx
│   │       │   ├── GenerateReport.jsx
│   │       │   └── InterviewReport.jsx
│   │       ├── hooks/
│   │       │   ├── useInterview.jsx
│   │       │   ├── useApplications.jsx
│   │       │   └── useProfile.jsx
│   │       ├── services/
│   │       │   ├── interviewai.service.js
│   │       │   ├── applications.service.js
│   │       │   └── profile.service.js
│   │       └── state/
│   │           ├── InterviewContext.jsx
│   │           └── ...
│   │
│   ├── context/
│   │   └── ThemeContext.jsx    # Dark/Light mode management
│   │
│   ├── lib/
│   │   ├── apiClient.js        # Axios instance with interceptors
│   │   └── statusMeta.js       # Status and score utilities
│   │
│   ├── hooks/
│   │   └── useClickOutside.jsx # Utility hook
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css              # Tailwind + CSS variables
│
├── .env                        # Development environment config
├── .env.production             # Production environment config
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 🔑 Key Pages & Routes

| Page | Route | Purpose |
|------|-------|---------|
| Login | `/login` | User authentication |
| Register | `/register` | New user registration with full name |
| Dashboard | `/dashboard` | View applications (Kanban/Table view) |
| Applications | `/applications` | Add new job application |
| Profile | `/profile` | Manage personal info, skills, experience, certifications |
| Generate Report | `/generatereport` | Create AI interview preparation report |
| Interview Report | `/interview/:id` | View generated interview strategy & prep guide |

---

## 🎨 UI Components

### Available Components
- **Button** - Variants: primary, secondary, ghost, icon | Sizes: sm, md
- **Input** - Text inputs with validation and optional state
- **Textarea** - Multi-line text with resize support
- **Card** - Compound: Card, Card.Kicker, Card.Title, Card.Body, Card.Meta
- **FormField** - Label wrapper with error/hint support
- **Tag** - Status/skill badges with variants
- **SegmentedControl** - Radio group styled as toggle buttons
- **Navbar** - Top navigation with user menu and theme toggle
- **UserMenu** - Dropdown menu with profile/logout options
- **PageSkeleton** - Loading placeholder skeleton

---

## 🔄 State Management

### Context Providers
- **AuthContext** - User authentication state, login/logout
- **ThemeContext** - Dark/light mode toggle & persistence
- **InterviewContext** - Interview reports CRUD operations

### Custom Hooks
- `useAuth()` - Register, login, logout, update profile
- `useProfile()` - Get/update summary, skills, experience, certifications
- `useApplications()` - Create, read, update, delete applications
- `useInterview()` - Generate reports, get reports, download PDF

---

## 🚀 Building & Deployment

### Build for Production
```bash
npm run build
```

Creates optimized build in `dist/` directory.

### Preview Build Locally
```bash
npm run preview
```

### Deploy to Netlify

See [DEPLOYMENT.md](../DEPLOYMENT.md) for complete step-by-step instructions.

**Quick Setup:**
1. Connect GitHub repository to Netlify
2. Configure build settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`
3. Add environment variable:
   - `VITE_API_BASE_URL` = your backend URL
4. Deploy automatically on git push!

---

## 🔌 API Integration

### Authentication Endpoints
- `POST /api/auth/register` - Register with email, password, first/middle/last name
- `POST /api/auth/login` - Login with username/password
- `POST /api/auth/logout` - Logout and clear session
- `POST /api/auth/getMe` - Get current authenticated user
- `PUT /api/auth/update-info` - Update first/middle/last name

### Application Management
- `GET /api/applications/` - List all user applications
- `POST /api/applications/` - Create new application
- `GET /api/applications/:id` - Get specific application
- `PUT /api/applications/:id` - Update application status
- `DELETE /api/applications/:id` - Delete application
- `GET /api/applications/stats/summary` - Get application statistics

### Interview Reports
- `GET /api/interview/` - List all interview reports
- `POST /api/interview/uploadcv` - Generate new interview report from resume
- `GET /api/interview/:id` - Get specific interview report
- `GET /api/interview/generatepdf/:id` - Generate and download PDF resume
- `DELETE /api/interview/:id` - Delete interview report

### User Profile
- `GET /api/profile/` - Get user profile
- `POST /api/profile/` - Create/update full profile
- `PUT /api/profile/summary` - Update professional summary
- `PUT /api/profile/skills` - Update skills list
- `POST /api/profile/experience` - Add work experience
- `PUT /api/profile/experience/:id` - Update work experience
- `PUT /api/profile/experience/:id/reorder` - Move experience up/down
- `DELETE /api/profile/experience/:id` - Delete work experience
- `POST /api/profile/certifications` - Add certification
- `DELETE /api/profile/certifications/:id` - Delete certification

---

## 🎯 Key Features In Detail

### Dashboard
- **Kanban View**: Organize applications by status (Saved → Applied → Interview → Offer → Rejected)
- **Table View**: Detailed table with all application information
- **Drag & Drop**: Move applications between status columns
- **Statistics**: Total applications, response rate, interviews, offers, generated reports
- **Quick Navigation**: Click any application to view/create its interview report

### Application Tracking
- Company name, job title, location, salary range
- Job status tracking with visual indicators
- Job source (LinkedIn, Indeed, Referral, Other)
- Full job description storage
- AI-generated match score (0-100%)
- Application date tracking

### Comprehensive Profile
- **Personal Info**: First, middle, last name (displayed in navbar and profile header)
- **Professional Summary**: Multi-line career overview
- **Skills**: Add unlimited technical and professional skills
- **Work Experience**: Track roles with company, dates, descriptions
- **Reorder Experience**: Drag buttons to organize by relevance
- **Certifications**: Record professional certifications with issuer

### AI Interview Preparation
- Upload PDF resume OR write quick self-description
- Submit full job description
- AI generates (via Google Gemini):
  - **Match Score**: 0-100% relevance to job
  - **Optimized Resume**: Tailored resume matching job description
  - **Skill Gaps**: Skills needed but not in your profile
  - **7-Day Plan**: Structured day-by-day preparation timeline
  - **Technical Q&A**: 5+ technical questions with answers & intent
  - **Behavioral Q&A**: 5+ behavioral questions with sample answers
- **Download**: Save optimized PDF resume

---

## 🌙 Theme System

- **Automatic Detection**: Respects system dark/light preference
- **Manual Toggle**: Button in navbar to switch themes
- **Persistence**: Theme preference saved to localStorage
- **Smooth Transitions**: CSS transitions between themes
- **Comprehensive Support**: All components support both light and dark modes

### CSS Variables
```css
--color-bg        /* Background */
--color-surface   /* Card/panel background */
--color-text      /* Primary text */
--color-text-secondary /* Secondary text */
--color-accent    /* Primary accent color */
--color-divider   /* Borders and dividers */

--status-saved    /* Saved status color */
--status-applied  /* Applied status color */
--status-interview /* Interview status color */
--status-offer    /* Offer status color */
--status-rejected /* Rejected status color */
```

---

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **HttpOnly Cookies**: Tokens stored securely
- **CORS Enabled**: Cross-origin requests from frontend to backend
- **Environment Variables**: Sensitive data in .env files
- **Password Hashing**: Passwords hashed on backend with bcrypt
- **Protected Routes**: ProtectedLayout ensures auth before access

---

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## 🐛 Troubleshooting

### API Connection Issues
```bash
# Check backend is running on port 3000
curl http://localhost:3000/health

# Verify VITE_API_BASE_URL in .env
echo $VITE_API_BASE_URL

# Check browser console for CORS errors
# Open DevTools → Console tab
```

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### Dark Mode Not Working
```bash
# Clear browser cache and localStorage
localStorage.clear()

# Hard refresh browser
Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

# Check CSS variables in DevTools
# Console: getComputedStyle(document.documentElement).getPropertyValue('--color-bg')
```

### Hot Module Replacement (HMR) Issues
```bash
# Restart dev server
# Ctrl+C in terminal, then npm run dev
```

---

## 📚 Additional Resources

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Axios Documentation](https://axios-http.com)
- [Google Gemini API](https://ai.google.dev)
- [Backend README](../backend/README.md)
- [Deployment Guide](../DEPLOYMENT.md)

---

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📧 Support

For issues, questions, or suggestions:
1. Check [GitHub Issues](https://github.com/yourusername/interview-gen-ai/issues)
2. Create a new issue with detailed description
3. Include console logs and error messages

---

## 🎬 Screenshots

Coming soon! Watch the demo video above for a complete walkthrough.

---

**Made with ❤️ for job hunters and interview preppers**

Last Updated: July 2026 | Version 1.0.0
