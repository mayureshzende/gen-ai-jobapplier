# Interview Gen AI 🎯

A comprehensive full-stack application for tracking job applications and generating AI-powered interview preparation strategies using Google's Generative AI.

## 🌟 Features

### Application Management
- **Track Applications**: Manage job applications with company, role, location, and salary information
- **Application Status Tracking**: Monitor application status (Saved, Applied, Interview, Offer, Rejected)
- **Kanban Board View**: Visualize applications by status with drag-and-drop support
- **Table View**: Browse applications in a structured table format
- **Match Score**: AI-generated compatibility score between your profile and job description

### Interview Preparation
- **AI-Generated Strategy**: Upload resume or provide self-description to get personalized interview strategies
- **Interview Reports**: Comprehensive reports including:
  - Skill gap analysis with severity levels
  - Preparation timeline and daily focus areas
  - Technical interview questions with suggested answers
  - Behavioral interview questions with response strategies
  - Generated resume tailored to the job
- **PDF Download**: Export interview reports as PDF documents

### Profile Management
- **Professional Summary**: Add and edit your professional background
- **Skills**: Manage and showcase your technical and soft skills
- **Work Experience**: Add detailed work experience with role descriptions
- **Certifications**: Track professional certifications and credentials
- **Profile Statistics**: Quick overview of your profile completeness

### User Experience
- **Dark/Light Theme Toggle**: Switch between themes with ☀️/🌙 buttons
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Mobile Navigation**: Hamburger menu for easy navigation on small screens
- **Date Formatting**: Consistent "DD-Month-YYYY" format across the app
- **Month-Year Date Picker**: Simplified date selection for experience entries

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **React Router 7** - Routing and navigation
- **Tailwind CSS 4** - Utility-first CSS styling
- **Vite** - Build tool and dev server
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **Google Generative AI** - AI-powered interview strategies
- **Puppeteer** - PDF generation
- **Bcrypt** - Password hashing

### Development Tools
- **ESLint** - Code linting
- **Nodemon** - Auto-restart server during development
- **Dotenv** - Environment variable management

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **Google API Key** (for Generative AI features)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd interview-gen-ai
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/interview-gen-ai
JWT_SECRET=your_jwt_secret_key_here
GOOGLE_API_KEY=your_google_api_key_here
PORT=3000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env.production` file (if needed):
```env
VITE_API_URL=http://localhost:3000
```

### 4. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on: `http://localhost:3000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on: `http://localhost:5174`

## 📁 Project Structure

```
interview-gen-ai/
├── backend/
│   ├── src/
│   │   ├── controller/       # API controllers
│   │   ├── models/           # MongoDB models
│   │   ├── routes/           # API routes
│   │   └── server.js         # Server entry point
│   ├── .env                  # Environment variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── features/         # Feature modules (auth, ai, etc.)
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utilities and helpers
│   │   ├── context/          # React context providers
│   │   ├── routes/           # Route definitions
│   │   └── main.jsx          # App entry point
│   ├── .env.production       # Production environment
│   └── package.json
│
└── README.md                 # This file
```

## 🔑 Key API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Applications
- `GET /api/applications` - Get all applications
- `POST /api/applications` - Create new application
- `PUT /api/applications/:id` - Update application
- `DELETE /api/applications/:id` - Delete application

### Interview Reports
- `POST /api/interview/generate` - Generate interview report
- `GET /api/interview/:id` - Get report by ID
- `GET /api/interview/user/all` - Get all user reports
- `POST /api/interview/pdf/:id` - Download report as PDF

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile/summary` - Update professional summary
- `PUT /api/profile/skills` - Update skills
- `POST /api/profile/experience` - Add experience
- `PUT /api/profile/experience/:id` - Update experience
- `POST /api/profile/certification` - Add certification

## 🎨 Responsive Design

The application is fully responsive with the following breakpoints:

| Device | Width | Features |
|--------|-------|----------|
| Mobile | < 640px | Single column, hamburger menu, table view only on dashboard |
| Tablet | 640px - 1024px | 2-3 columns, full menu, flexible views |
| Desktop | > 1024px | Full layout, kanban and table views, sidebar navigation |

## 🔐 Authentication

- User registration with email validation
- Secure JWT-based authentication
- Password hashing with bcrypt
- Protected routes and API endpoints
- Session persistence with localStorage

## 💡 Usage Guide

### Creating an Application Entry
1. Click **"+ New Application"** button
2. Fill in company name, job role, location, and salary (optional)
3. Paste the job description
4. Select application source (LinkedIn, Indeed, Referral, Other)
5. Review your experience in the sidebar
6. Click **"Save Application"**

### Generating Interview Strategy
1. Navigate to **"Generate"** from the menu
2. Paste or upload your resume (PDF) or provide a quick description
3. Paste the job description
4. Add company name (optional)
5. Click **"Generate My Interview Strategy"**
6. Review the comprehensive report with:
   - Skill gaps
   - Preparation plan
   - Technical questions
   - Behavioral questions

### Managing Your Profile
1. Go to **"Profile"** section
2. Add/edit professional summary
3. Manage skills and certifications
4. Add detailed work experience with descriptions
5. All changes save automatically

## 🎯 Date Format

All dates across the application use the format: **DD-Month-YYYY**
- Example: `21-August-2026`

Experience dates use **Month-Year** format in pickers:
- Example: `August 2026`

## 🐛 Troubleshooting

### Backend Connection Issues
- Ensure MongoDB is running
- Check `.env` file has correct `MONGODB_URI`
- Verify port 3000 is available

### Frontend Build Issues
- Clear `node_modules` and reinstall: `npm install`
- Clear Vite cache: `rm -rf .vite`
- Rebuild: `npm run dev`

### API Request Errors
- Check browser console for error messages
- Verify backend is running on port 3000
- Check network tab in browser DevTools

## 📝 Environment Variables

### Backend (.env)
```env
MONGODB_URI          # MongoDB connection string
JWT_SECRET           # Secret key for JWT tokens
GOOGLE_API_KEY       # Google Generative AI API key
PORT                 # Server port (default: 3000)
NODE_ENV             # development or production
```

### Frontend (.env.production)
```env
VITE_API_URL         # Backend API URL
```

## 🚢 Deployment

### Build Frontend
```bash
cd frontend
npm run build
```

### Build Backend
```bash
cd backend
npm install --production
```

Deploy using your preferred hosting platform (Vercel, Netlify, Heroku, AWS, etc.).

## 📄 License

This project is open source and available under the ISC License.

## 👨‍💻 Development

### Code Quality
- ESLint for code linting
- Tailwind CSS for consistent styling
- Responsive design principles

### Best Practices
- Component-based architecture
- Custom hooks for reusable logic
- Context API for state management
- Proper error handling and logging

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review API response errors
3. Check browser console for client-side errors
4. Verify all environment variables are set correctly

## 🙏 Acknowledgments

- Built with modern React and Node.js
- Styled with Tailwind CSS
- Powered by Google Generative AI
- Database provided by MongoDB

---

**Last Updated:** July 2026

**Version:** 1.0.0
