# QuickHire Backend

REST API for the QuickHire job board. Built with Express, TypeScript, and MongoDB.

## Features
- Jobs CRUD for admin
- Public job listing, search, filter, featured and latest
- Applications submission and admin review
- Auth with JWT (access + refresh)
- User profile (get/update)

## Tech Stack
- Node.js, Express.js, TypeScript
- MongoDB, Mongoose
- Zod validation

## Getting Started
1. Go to backend folder
   ```bash
   cd backend
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Create `.env` in `backend/` (see example below)
4. Run dev server
   ```bash
   npm run start:dev
   ```

The API will run on `http://localhost:5000` (or the `PORT` you set).

## Environment Variables
Create `backend/.env`:
```
PORT=5000
DATABASE_URL=mongodb://127.0.0.1:27017/quickhire

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=7d

BCRYPT_SALT_ROUNDS=10
ADMIN_PASSWORD=admin123
ADMIN_KEY=admin_key

CLIENT_URL=http://localhost:3000
CORS_ORIGINS=http://localhost:3000
```


## API Endpoints
Base URL: `/api/v1`

### Jobs
- `GET /jobs`
- `GET /jobs/:id`
- `GET /jobs/_featured`
- `GET /jobs/_latest`
- `GET /jobs/_summary/categories`
- `POST /jobs` (admin)
- `PATCH /jobs/:id` (admin)
- `DELETE /jobs/:id` (admin)

### Applications
- `POST /applications`
- `GET /applications` (admin)
- `GET /applications/:id` (admin)
- `PATCH /applications/:id/status` (admin)

### Auth
- `POST /auth/login`
- `POST /auth/refresh-token`
- `POST /auth/change-password`

### Users
- `GET /users/me`
- `PATCH /users/me`

## Data Models (Summary)
### Job
`title, company, location, category, description, employment_type, tags, company_logo_url, createdAt`

### Application
`job, name, email, resumeLink, coverNote, status, createdAt`

### User
`id, email, password, role, status, name, avatarUrl, isDeleted`


## Live url  

https://quick-hire-backend-dun.vercel.app
