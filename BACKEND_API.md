# Interview Gen AI - Backend API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
All protected endpoints require a valid JWT token in cookies (automatically set on login/register).

---

## Authentication Endpoints

### Register User
- **POST** `/auth/register`
- **Access**: Public
- **Body**:
  ```json
  {
    "username": "string (required)",
    "email": "string (required)",
    "password": "string (min 6 chars, required)"
  }
  ```
- **Response** (201):
  ```json
  {
    "success": true,
    "message": "User registered successfully"
  }
  ```

### Login User
- **POST** `/auth/login`
- **Access**: Public
- **Body**:
  ```json
  {
    "username": "string (required)",
    "password": "string (required)"
  }
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Login successful"
  }
  ```
- **Cookies**: Sets `token` cookie with JWT

### Get Current User
- **POST** `/auth/getMe`
- **Access**: Private (requires token)
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "user details fetched successfully",
    "user": {
      "id": "string",
      "username": "string",
      "email": "string"
    }
  }
  ```

### Logout User
- **POST** `/auth/logout`
- **Access**: Public
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Logged out successfully"
  }
  ```

---

## Job Applications Endpoints

### Create Application
- **POST** `/applications`
- **Access**: Private
- **Body**:
  ```json
  {
    "company": "string (required)",
    "role": "string (required)",
    "location": "string (required)",
    "salary": "string (optional)",
    "status": "enum: Saved | Applied | Interview | Offer | Rejected",
    "source": "enum: LinkedIn | Indeed | Referral | Other",
    "jobDescription": "string (required)"
  }
  ```
- **Response** (201):
  ```json
  {
    "success": true,
    "message": "Application created successfully",
    "application": { /* application object */ }
  }
  ```

### Get All Applications
- **GET** `/applications`
- **Access**: Private
- **Query Params**: None
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Applications retrieved successfully",
    "applications": [ /* array of applications */ ],
    "count": "number"
  }
  ```

### Get Application by ID
- **GET** `/applications/:id`
- **Access**: Private
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Application retrieved successfully",
    "application": { /* application object */ }
  }
  ```

### Update Application
- **PUT** `/applications/:id`
- **Access**: Private
- **Body**: Any fields from create (all optional)
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Application updated successfully",
    "application": { /* updated application */ }
  }
  ```

### Delete Application
- **DELETE** `/applications/:id`
- **Access**: Private
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Application deleted successfully"
  }
  ```

### Get Application Statistics
- **GET** `/applications/stats/summary`
- **Access**: Private
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Statistics retrieved successfully",
    "stats": {
      "total": "number",
      "saved": "number",
      "applied": "number",
      "interview": "number",
      "offer": "number",
      "rejected": "number",
      "responseRate": "number (percentage)",
      "avgMatchScore": "number"
    }
  }
  ```

---

## User Profile Endpoints

### Get Profile
- **GET** `/profile`
- **Access**: Private
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Profile retrieved successfully",
    "profile": { /* profile object */ }
  }
  ```

### Create/Update Profile
- **POST** `/profile`
- **Access**: Private
- **Body**:
  ```json
  {
    "summary": "string (optional, max 1000 chars)",
    "skills": ["string"],
    "experience": [
      {
        "role": "string",
        "company": "string",
        "startDate": "date (optional)",
        "endDate": "date (optional)",
        "currentlyWorking": "boolean",
        "description": "string (optional)",
        "bullets": ["string"]
      }
    ],
    "education": [
      {
        "school": "string",
        "degree": "string",
        "fieldOfStudy": "string",
        "startDate": "date",
        "endDate": "date"
      }
    ],
    "certifications": [
      {
        "name": "string",
        "issuer": "string",
        "issueDate": "date",
        "expirationDate": "date",
        "credentialUrl": "string (URL)"
      }
    ]
  }
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Profile saved successfully",
    "profile": { /* profile object */ }
  }
  ```

### Update Summary
- **PUT** `/profile/summary`
- **Access**: Private
- **Body**:
  ```json
  {
    "summary": "string"
  }
  ```

### Update Skills
- **PUT** `/profile/skills`
- **Access**: Private
- **Body**:
  ```json
  {
    "skills": ["string"]
  }
  ```

### Add Experience
- **POST** `/profile/experience`
- **Access**: Private
- **Body**:
  ```json
  {
    "role": "string (required)",
    "company": "string (required)",
    "startDate": "date (optional)",
    "endDate": "date (optional)",
    "currentlyWorking": "boolean (optional)",
    "description": "string (optional)",
    "bullets": ["string"]
  }
  ```

### Update Experience
- **PUT** `/profile/experience/:expId`
- **Access**: Private
- **Body**: Any experience fields (all optional)

### Delete Experience
- **DELETE** `/profile/experience/:expId`
- **Access**: Private

### Add Certification
- **POST** `/profile/certifications`
- **Access**: Private
- **Body**:
  ```json
  {
    "name": "string (required)",
    "issuer": "string (optional)",
    "issueDate": "date (optional)",
    "expirationDate": "date (optional)",
    "credentialUrl": "string (optional)"
  }
  ```

### Delete Certification
- **DELETE** `/profile/certifications/:certId`
- **Access**: Private

---

## Interview Report Endpoints

### Generate Interview Report
- **POST** `/interview/uploadcv`
- **Access**: Private
- **Content-Type**: `multipart/form-data`
- **Fields**:
  - `resume`: File (PDF, required, max 1MB)
  - `jobDescription`: String (required)
  - `profileSummary`: String (required)
- **Response** (201):
  ```json
  {
    "success": true,
    "message": "Interview report generated successfully",
    "aiResponse": {
      "_id": "string",
      "jobTitle": "string",
      "matchScore": "number (0-100)",
      "profileSummary": "string",
      "jobDescription": "string",
      "resume": "string",
      "technicalQuestions": [
        {
          "question": "string",
          "answer": "string",
          "intention": "string"
        }
      ],
      "behavioralQuestions": [
        {
          "question": "string",
          "answer": "string",
          "intention": "string"
        }
      ],
      "skillGaps": [
        {
          "skill": "string",
          "severity": "enum: low | medium | high"
        }
      ],
      "preparationPlan": [
        {
          "focus": "string",
          "days": "number",
          "plan": "string"
        }
      ],
      "createdAt": "ISO string",
      "updatedAt": "ISO string"
    }
  }
  ```

### Get All Interview Reports
- **GET** `/interview`
- **Access**: Private
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Interview reports retrieved successfully",
    "reports": [ /* array of reports (summary, no full details) */ ]
  }
  ```

### Get Interview Report by ID
- **GET** `/interview/:interviewReportId`
- **Access**: Private
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Interview report retrieved successfully",
    "interviewReport": { /* full report object */ }
  }
  ```

### Generate PDF Resume
- **GET** `/interview/generatepdf/:interviewId`
- **Access**: Private
- **Response**: Binary PDF file
- **Headers**:
  - `Content-Type`: `application/pdf`
  - `Content-Disposition`: `attachment; filename=...`

### Delete Interview Report
- **DELETE** `/interview/:interviewId`
- **Access**: Private
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Interview report deleted successfully"
  }
  ```

---

## Health Check

### Health Status
- **GET** `/health`
- **Access**: Public
- **Response** (200):
  ```json
  {
    "status": "OK",
    "timestamp": "ISO string"
  }
  ```

---

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error message describing what went wrong"
}
```

### Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (auth failed)
- `404` - Not Found
- `409` - Conflict (e.g., user already exists)
- `500` - Server Error

---

## Rate Limiting

All API endpoints are rate-limited to **100 requests per 15 minutes** per IP address.

Response header when rate-limited:
```
Retry-After: <seconds>
```

---

## Best Practices

1. **Always include error handling** for network requests
2. **Use the JWT token** from cookies automatically (set by browser)
3. **Validate request data** on the client before sending
4. **Don't expose sensitive data** in error messages on production
5. **Use HTTPS** in production environments

---

## Example Usage

```javascript
// Register
const registerRes = await fetch('http://localhost:3000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'john_doe',
    email: 'john@example.com',
    password: 'securePassword123'
  })
});

// Create Application (after login)
const appRes = await fetch('http://localhost:3000/api/applications', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include', // Important: include cookies
  body: JSON.stringify({
    company: 'Google',
    role: 'Senior Engineer',
    location: 'Mountain View, CA',
    status: 'Applied',
    source: 'LinkedIn',
    jobDescription: 'We are looking for...'
  })
});

// Get user profile
const profileRes = await fetch('http://localhost:3000/api/profile', {
  method: 'GET',
  credentials: 'include'
});
```

---

Last Updated: 2025-01-13
Version: 1.0.0
