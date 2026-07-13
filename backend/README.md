# 🎯 Job Application Tracker with GenAI - Backend API

A robust Express.js backend API for job application tracking with AI-powered interview preparation powered by Google Gemini API.

## 🎥 Demo Video

[![Watch the demo](https://img.shields.io/badge/Watch%20Demo-YouTube-red?style=for-the-badge)](YOUR_VIDEO_LINK_HERE)

**Paste your demo video link above** by replacing `YOUR_VIDEO_LINK_HERE` with your actual video URL.

---

## ✨ Features

### Authentication & User Management
- 🔐 User registration with first, middle, last name
- 🔑 Secure login with JWT tokens
- 👤 User profile management
- 🔄 Session management with token blacklist
- 🛡️ Password hashing with bcrypt

### Application Management
- ✅ CRUD operations for job applications
- 📊 Application statistics (total, by status, response rate)
- 🏷️ Status tracking (Saved, Applied, Interview, Offer, Rejected)
- 🔗 Relationship between applications and interview reports

### Interview Report Generation
- 🤖 AI-powered interview strategy generation using Google Gemini
- 📄 PDF resume upload and parsing
- 📋 Automated technical question generation
- 🗣️ Behavioral question generation with sample answers
- 📚 Skill gap identification
- 📅 7-day preparation planning
- 📥 Custom PDF resume generation
- 💾 Report persistence in MongoDB

### User Profile
- 📝 Professional summary management
- 🎯 Skills tracking
- 💼 Work experience with reordering
- 🏆 Certification management
- 📅 Experience timeline management

---

## 🛠️ Tech Stack

- **Runtime**: Node.js 16+
- **Framework**: Express 5.2
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with HttpOnly cookies
- **Security**: Helmet, CORS, Rate Limiting
- **AI**: Google Gemini API
- **PDF Generation**: Puppeteer
- **File Upload**: Multer
- **Validation**: Zod schemas
- **Environment**: Dotenv

---

## 📋 Prerequisites

- Node.js 16+
- npm or yarn
- MongoDB Atlas account (free tier available)
- Google Gemini API key
- Port 3000 available

---

## 🚀 Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/interview-gen-ai.git
cd interview-gen-ai/backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables

Create `.env` file in backend directory:
```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/interview-gen-ai

# Authentication
JWT_SECRET=your_super_secret_jwt_key_min_32_chars_recommended

# Google Gemini API
GEMINI_API_KEY=your_google_gemini_api_key

# CORS
CORS_ORIGIN=http://localhost:5173

# File Upload
UPLOAD_DIR=uploads
MAX_FILE_SIZE=50000000
```

### 4. Run Development Server
```bash
npm run dev
```

Server starts at: `http://localhost:3000`

### 5. Verify Setup
```bash
curl http://localhost:3000/health
```

Should return: `{"status":"OK","timestamp":"..."}`

---

## 📦 Project Structure

```
backend/
├── src/
│   ├── models/
│   │   ├── user.model.js           # User schema
│   │   ├── application.model.js    # Job application schema
│   │   ├── interviewReport.model.js # Interview report schema
│   │   ├── profile.model.js        # User profile schema
│   │   └── blacklist.model.js      # JWT blacklist for logout
│   │
│   ├── controller/
│   │   ├── user.controller.js      # User auth & info endpoints
│   │   ├── applications.controller.js # Application CRUD
│   │   ├── interview.controller.js # Interview report generation
│   │   └── profile.controller.js   # Profile management
│   │
│   ├── routes/
│   │   ├── users.routes.js         # Auth routes
│   │   ├── applications.routes.js  # Application routes
│   │   ├── interview.routes.js     # Interview routes
│   │   └── profile.routes.js       # Profile routes
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js      # JWT verification
│   │   └── errorHandler.js         # Error handling
│   │
│   ├── services/
│   │   ├── ai.services.js          # AI/Gemini integration
│   │   ├── resumePdfService.js     # PDF generation
│   │   ├── validationSchemas.js    # Zod validation
│   │   ├── interviewReportPromt.js # AI prompts
│   │   └── pdfGenerationPrompt.js  # Resume generation prompt
│   │
│   ├── config/
│   │   └── database.js             # MongoDB connection
│   │
│   ├── utils/
│   │   └── date.utils.js           # Date utilities
│   │
│   ├── app.js                      # Express app setup
│   └── main.js                     # Entry point (placeholder)
│
├── server.js                       # Server startup
├── package.json
├── .env                           # Environment variables
├── .env.example                   # Example env template
└── README.md                      # This file
```

---

## 🔑 API Endpoints

### Authentication Routes (`/api/auth`)

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "middleName": "Michael",
  "lastName": "Doe"
}

Response: 201 Created
{
  "success": true,
  "message": "User registered successfully"
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securePassword123"
}

Response: 200 OK
{
  "success": true,
  "message": "Login successful"
}
```

#### Get Current User
```
POST /api/auth/getMe
Authorization: Bearer <jwt_token>

Response: 200 OK
{
  "success": true,
  "message": "user details fetched successfully",
  "user": {
    "id": "...",
    "username": "john_doe",
    "email": "john@example.com",
    "firstName": "John",
    "middleName": "Michael",
    "lastName": "Doe"
  }
}
```

#### Update User Info
```
PUT /api/auth/update-info
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "firstName": "John",
  "middleName": "Michael",
  "lastName": "Doe"
}

Response: 200 OK
{
  "success": true,
  "message": "User information updated successfully",
  "user": {...}
}
```

#### Logout User
```
POST /api/auth/logout
Authorization: Bearer <jwt_token>

Response: 200 OK
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### Applications Routes (`/api/applications`)

#### Get All Applications
```
GET /api/applications/
Authorization: Bearer <jwt_token>

Response: 200 OK
{
  "success": true,
  "message": "Applications retrieved successfully",
  "applications": [...],
  "count": 10
}
```

#### Create Application
```
POST /api/applications/
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "company": "Google",
  "role": "Senior Frontend Engineer",
  "location": "Mountain View, CA",
  "salary": "$200k - $250k",
  "status": "Applied",
  "source": "LinkedIn",
  "jobDescription": "We are looking for..."
}

Response: 201 Created
{
  "success": true,
  "message": "Application created successfully",
  "application": {...}
}
```

#### Get Application by ID
```
GET /api/applications/:id
Authorization: Bearer <jwt_token>

Response: 200 OK
{
  "success": true,
  "message": "Application retrieved successfully",
  "application": {...}
}
```

#### Update Application
```
PUT /api/applications/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "status": "Interview"
}

Response: 200 OK
{
  "success": true,
  "message": "Application updated successfully",
  "application": {...}
}
```

#### Delete Application
```
DELETE /api/applications/:id
Authorization: Bearer <jwt_token>

Response: 200 OK
{
  "success": true,
  "message": "Application deleted successfully"
}
```

#### Get Statistics
```
GET /api/applications/stats/summary
Authorization: Bearer <jwt_token>

Response: 200 OK
{
  "success": true,
  "message": "Statistics retrieved successfully",
  "stats": {
    "total": 10,
    "saved": 2,
    "applied": 5,
    "interview": 2,
    "offer": 1,
    "rejected": 0,
    "responseRate": 80,
    "avgMatchScore": 75
  }
}
```

---

### Interview Routes (`/api/interview`)

#### Generate Interview Report
```
POST /api/interview/uploadcv
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data

- resume: <pdf_file>
- jobDescription: "Job description text..."
- profileSummary: "Your professional background..."

Response: 201 Created
{
  "success": true,
  "message": "Interview report generated successfully",
  "aiResponse": {
    "_id": "...",
    "jobTitle": "Senior Engineer",
    "matchScore": 85,
    "skillGaps": [...],
    "technicalQuestions": [...],
    "behavioralQuestions": [...],
    "preparationPlan": [...],
    ...
  }
}
```

#### Get All Reports
```
GET /api/interview/
Authorization: Bearer <jwt_token>

Response: 200 OK
{
  "success": true,
  "message": "Interview reports retrieved successfully",
  "reports": [...]
}
```

#### Get Report by ID
```
GET /api/interview/:id
Authorization: Bearer <jwt_token>

Response: 200 OK
{
  "success": true,
  "message": "Interview report retrieved successfully",
  "interviewReport": {...}
}
```

#### Generate PDF Resume
```
GET /api/interview/generatepdf/:id
Authorization: Bearer <jwt_token>

Response: 200 OK (Binary PDF content)
Content-Type: application/pdf
```

#### Delete Report
```
DELETE /api/interview/:id
Authorization: Bearer <jwt_token>

Response: 200 OK
{
  "success": true,
  "message": "Interview report deleted successfully"
}
```

---

### Profile Routes (`/api/profile`)

#### Get Profile
```
GET /api/profile/
Authorization: Bearer <jwt_token>

Response: 200 OK
{
  "success": true,
  "message": "Profile retrieved successfully",
  "profile": {
    "_id": "...",
    "summary": "...",
    "skills": [...],
    "experience": [...],
    "certifications": [...]
  }
}
```

#### Update Summary
```
PUT /api/profile/summary
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "summary": "Experienced full-stack developer..."
}

Response: 200 OK
{
  "success": true,
  "message": "Summary updated successfully",
  "profile": {...}
}
```

#### Update Skills
```
PUT /api/profile/skills
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "skills": ["React", "Node.js", "MongoDB", "AWS"]
}

Response: 200 OK
{
  "success": true,
  "message": "Skills updated successfully",
  "profile": {...}
}
```

#### Add Experience
```
POST /api/profile/experience
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "role": "Senior Engineer",
  "company": "Google",
  "startDate": "2021-01-15",
  "endDate": "2023-12-31",
  "currentlyWorking": false,
  "description": "Worked on..."
}

Response: 201 Created
{
  "success": true,
  "message": "Experience added successfully",
  "profile": {...}
}
```

#### Reorder Experience
```
PUT /api/profile/experience/:id/reorder
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "direction": "up"
}

Response: 200 OK
{
  "success": true,
  "message": "Experience moved up successfully",
  "profile": {...}
}
```

#### Delete Experience
```
DELETE /api/profile/experience/:id
Authorization: Bearer <jwt_token>

Response: 200 OK
{
  "success": true,
  "message": "Experience deleted successfully",
  "profile": {...}
}
```

#### Add Certification
```
POST /api/profile/certifications
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "AWS Certified Solutions Architect",
  "issuer": "Amazon Web Services",
  "issueDate": "2022-06-15"
}

Response: 201 Created
{
  "success": true,
  "message": "Certification added successfully",
  "profile": {...}
}
```

#### Delete Certification
```
DELETE /api/profile/certifications/:id
Authorization: Bearer <jwt_token>

Response: 200 OK
{
  "success": true,
  "message": "Certification deleted successfully",
  "profile": {...}
}
```

---

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth with 1-day expiration
- **Password Hashing**: bcrypt with 10 salt rounds
- **CORS Protection**: Configurable CORS with credentials
- **Helmet Security**: HTTP headers hardening
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Data Validation**: Zod schema validation on all inputs
- **Token Blacklist**: Logout invalidates tokens
- **HttpOnly Cookies**: Tokens can't be accessed via JavaScript
- **Environment Separation**: Dev/prod config via .env

---

## 📊 Database Schema

### User Schema
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  firstName: String,
  middleName: String,
  lastName: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Application Schema
```javascript
{
  user: ObjectId (ref: User),
  company: String,
  role: String,
  location: String,
  salary: String,
  status: String (enum),
  source: String,
  jobDescription: String,
  matchScore: Number,
  interviewReport: ObjectId (ref: InterviewReport),
  createdAt: Date,
  updatedAt: Date
}
```

### Interview Report Schema
```javascript
{
  user: ObjectId (ref: User),
  resume: String,
  jobDescription: String,
  profileSummary: String,
  jobTitle: String,
  matchScore: Number,
  skillGaps: Array,
  technicalQuestions: Array,
  behavioralQuestions: Array,
  preparationPlan: Array,
  createdAt: Date,
  updatedAt: Date
}
```

### Profile Schema
```javascript
{
  user: ObjectId (ref: User, unique),
  summary: String,
  skills: [String],
  experience: [
    {
      role: String,
      company: String,
      startDate: Date,
      endDate: Date,
      currentlyWorking: Boolean,
      description: String
    }
  ],
  certifications: [
    {
      name: String,
      issuer: String,
      issueDate: Date
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚀 Deployment

See [DEPLOYMENT.md](../DEPLOYMENT.md) for complete deployment instructions to Railway, Render, or other platforms.

**Quick Deploy to Railway:**
```bash
# 1. Create Railway account at https://railway.app
# 2. Connect GitHub and select this repository
# 3. Set root directory to: backend
# 4. Add environment variables
# 5. Deploy!
```

---

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Verify MongoDB URI in .env
# Check IP whitelist in MongoDB Atlas
# Test connection: mongosh "your_uri"
```

### JWT Issues
```bash
# Ensure JWT_SECRET is set (min 32 chars)
# Check token expiration (1 day)
# Verify Authorization header format: "Bearer token"
```

### Gemini API Errors
```bash
# Check GEMINI_API_KEY is valid
# Verify API quota and rate limits
# Check request format in ai.services.js
```

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
PORT=3001 npm run dev
```

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com)
- [MongoDB/Mongoose](https://mongoosejs.com)
- [Google Gemini API](https://ai.google.dev)
- [JWT Explanation](https://jwt.io)
- [CORS Guide](https://enable-cors.org)
- [Frontend README](../frontend/README.md)
- [Deployment Guide](../DEPLOYMENT.md)

---

## 📄 License

MIT License - see LICENSE file for details

---

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

---

## 📧 Support

For issues or questions:
1. Check existing issues on GitHub
2. Create detailed bug report with:
   - Error message
   - API endpoint
   - Request/response
   - Environment details

---

**Built with Node.js & Google Gemini API**

Last Updated: July 2026 | Version 1.0.0
