# HRMS - Human Resource Management System

## Project Overview
The HRMS is a full-stack MERN (MongoDB, Express.js, React, Node.js) application designed to streamline workforce management for organizations. Built as a fresher-level MERN stack assignment, it provides role-based access control (RBAC) for three user types: **Admin**, **HR**, and **Employee**. The system supports user authentication, employee management, attendance tracking, leave management, and profile picture uploads, with a responsive frontend styled using Tailwind CSS.

The backend runs on `http://localhost:5000`, proxied through the frontend at `http://localhost:3000` for seamless API communication. This project demonstrates proficiency in building secure, scalable web applications using modern JavaScript technologies.

## Features
- **User Authentication & Authorization**:
  - JWT-based login and signup.
  - Role-based access control for `admin`, `hr`, and `employee`.
- **Employee Management**:
  - Add, edit, and delete employee records (HR/Admin).
  - Upload profile pictures via Cloudinary (HR/Admin).
  - View/edit employee profiles (Employee).
- **Attendance Management**:
  - Log daily attendance (Employee).
  - View attendance history (Employee/HR/Admin).
  - Update attendance records (HR/Admin).
- **Leave Management**:
  - Apply for leaves with balance tracking (Employee).
  - Approve/reject leave requests (HR/Admin).
  - View leave history (Employee/HR/Admin).
- **Responsive UI**:
  - Built with Tailwind CSS for a modern, mobile-friendly interface.
  - Role-specific dashboards and navigation.
- **State Management**:
  - Zustand for lightweight, centralized state management in the frontend.

## Technologies Used

### Backend
| Technology | Version | Purpose | Why Chosen |
|------------|---------|---------|------------|
| **Node.js** | 18.x | JavaScript runtime for server-side logic | Enables full JavaScript stack, high performance, and a vast ecosystem. |
| **Express.js** | 4.18.x | Web framework for API development | Simplifies routing, middleware integration, and API creation with a minimalistic approach. |
| **MongoDB** | 5.x | NoSQL database for data storage | Flexible schema suits dynamic HR data; integrates well with Mongoose. |
| **Mongoose** | 7.6.x | MongoDB object modeling | Provides schema validation, query building, and simplifies database interactions. |
| **jsonwebtoken** | 9.0.x | JWT for authentication | Secure, stateless authentication; widely adopted for RBAC. |
| **bcryptjs** | 2.4.x | Password hashing | Securely hashes passwords with salt, protecting user credentials. |
| **Cloudinary** | 2.7.x | Image storage and management | Handles profile picture uploads with CDN optimization, reducing server load. |
| **multer** | 1.4.x | File upload middleware | Simplifies handling of multipart/form-data for image uploads. |
| **cors** | 2.8.x | Cross-Origin Resource Sharing | Enables secure API access from the frontend (localhost:3000). |
| **dotenv** | 16.3.x | Environment variable management | Safely manages sensitive configurations (e.g., JWT_SECRET, Cloudinary credentials). |

### Frontend
| Technology | Version | Purpose | Why Chosen |
|------------|---------|---------|------------|
| **React** | 18.2.x | UI library for building components | Component-based architecture, virtual DOM, and large community support. |
| **React Router** | 6.22.x | Client-side routing | Enables dynamic, single-page application navigation with role-based routes. |
| **Tailwind CSS** | 3.4.x | CSS framework for styling | Utility-first approach speeds up development, ensures responsiveness, and offers customizable designs. |
| **Zustand** | 4.x | State management | Lightweight alternative to Redux, simple API for managing auth state. |
| **axios** | 1.6.x | HTTP client for API requests | Promise-based, handles errors gracefully, and supports interceptors for auth tokens. |
| **jwt-decode** | 3.x | Decode JWT tokens | Extracts user role from tokens for role-based routing and navigation. |
| **react-hot-toast** | 2.x | Notification library | Provides user-friendly toast notifications for success/error messages. |
| **lucide-react** | 0.263.x | Icon library | Modern, customizable icons that integrate seamlessly with React. |

### Why These Technologies?
- **MERN Stack**: Unified JavaScript across the stack simplifies development and maintenance, ideal for rapid prototyping in a fresher-level project.
- **Tailwind CSS**: Chosen over Material UI for faster styling with utility classes, reducing CSS boilerplate and ensuring a custom, responsive design.
- **Zustand**: Preferred over Redux for its simplicity and minimal setup, suitable for managing authentication state in a small-scale app.
- **Cloudinary**: Selected for image uploads to offload storage and optimize delivery, avoiding local server storage complexities.
- **MongoDB**: Flexible schema supports evolving HR data (e.g., employee details, attendance records) without rigid migrations.

## Project Structure

### Backend
```
backend/
├── src/
│   ├── config/
│   │   ├── config.js        # Environment variables (JWT_SECRET)
│   ├── controllers/
│   │   ├── auth.controller.js      # Login, signup
│   │   ├── employee.controller.js  # Employee CRUD
│   │   ├── user.controller.js      # User management (Admin)
│   │   ├── attendance.controller.js # Attendance logging/viewing
│   │   ├── leave.controller.js     # Leave requests/approvals
│   ├── middleware/
│   │   ├── auth.js          # JWT authentication and RBAC
│   ├── models/
│   │   ├── UserModel.js     # User schema (name, email, password, role)
│   │   ├── EmployeeModel.js # Employee schema (designation, department, profileImage)
│   │   ├── AttendanceModel.js # Attendance schema (date, status, checkIn, checkOut)
│   │   ├── LeaveModel.js    # Leave schema (startDate, endDate, type, status)
│   ├── routes/
│   │   ├── auth.route.js    # /api/auth routes
│   │   ├── employee.route.js # /api/employees routes
│   │   ├── user.route.js    # /api/users routes
│   │   ├── attendance.route.js # /api/attendance routes
│   │   ├── leave.route.js   # /api/leave routes
│   ├── services/
│   │   ├── cloudinary.js    # Cloudinary upload/delete functions
│   ├── app.js               # Express app setup
├── server.js                # Entry point
├── .env                     # Environment variables
├── package.json             # Dependencies and scripts
```

### Frontend
```
frontend/
├── public/
│   ├── index.html           # HTML template
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── AuthForm.js  # Login/signup form
│   │   ├── Employee/
│   │   │   ├── EmployeeForm.js # Add/edit employee
│   │   │   ├── EmployeeList.js # View/delete employees
│   │   ├── Attendance/
│   │   │   ├── AttendanceForm.js # Log attendance
│   │   │   ├── AttendanceHistory.js # View attendance
│   │   ├── Leave/
│   │   │   ├── LeaveForm.js # Apply for leave
│   │   │   ├── LeaveHistory.js # View leave history
│   │   ├── Profile/
│   │   │   ├── Profile.js   # View/edit profile
│   │   ├── Navbar.js        # Responsive navigation
│   ├── pages/
│   │   ├── HeroSection.js   # Landing page
│   │   ├── AdminDashboard.js # Admin dashboard
│   │   ├── HRDashboard.js   # HR dashboard
│   │   ├── EmployeeDashboard.js # Employee dashboard
│   ├── store/
│   │   ├── authStore.js     # Zustand auth state
│   ├── lib/
│   │   ├── axios.js         # Axios instance with interceptors
│   ├── App.js               # Root component
│   ├── AppRouter.js         # Routes configuration
│   ├── index.js             # Entry point
│   ├── index.css            # Tailwind CSS
├── package.json             # Dependencies and proxy
├── tailwind.config.js       # Tailwind configuration
```

## Setup Instructions

### Prerequisites
- **Node.js**: v18.x or higher
- **MongoDB**: v5.x or higher (local or MongoDB Atlas)
- **Cloudinary Account**: For image uploads
- **Git**: For cloning the repository
- **Postman**: For API testing

### Backend Setup
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd backend
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment Variables**:
   Create a `.env` file in the `backend` root:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/hrms
   JWT_SECRET=your_jwt_secret_here
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. **Run MongoDB**:
   Ensure MongoDB is running locally or use MongoDB Atlas.
5. **Start the Backend**:
   ```bash
   npm start
   ```
   The server runs on `http://localhost:5000`.

### Frontend Setup
1. **Navigate to Frontend**:
   ```bash
   cd frontend
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Configure Proxy**:
   Ensure `package.json` includes:
   ```json
   "proxy": "http://localhost:5000"
   ```
4. **Start the Frontend**:
   ```bash
   npm start
   ```
   The app runs on `http://localhost:3000`, proxying API requests to `5000`.

### Initial Admin Setup
1. Hash a password for the admin user:
   ```javascript
   const bcrypt = require('bcryptjs');
   console.log(bcrypt.hashSync('admin123', 10));
   ```
2. Insert the admin user in MongoDB:
   ```bash
   mongosh
   use hrms
   db.users.insertOne({
     name: "Initial Admin",
     email: "admin@example.com",
     password: "<hashed_password>",
     role: "admin",
     createdAt: new Date(),
     updatedAt: new Date()
   })
   ```

## Usage

### Roles and Access
- **Admin** (`/admin`):
  - Full access: Manage users, employees, attendance, and leaves.
  - Create HR and employee accounts.
- **HR** (`/hr`):
  - Manage employees: Add, edit, delete, upload profile pictures.
  - View and update attendance records.
  - Approve/reject leave requests.
- **Employee** (`/dashboard`):
  - View/edit personal profile.
  - Log daily attendance.
  - Apply for leaves and view leave history.

### Navigation
- **Landing Page** (`/`): Overview with login/signup links.
- **Auth Page** (`/auth`): Login or signup with role selection.
- **Dashboards**: Role-specific views with navigation via `Navbar`.
- **Employees** (`/employees`): List, add, edit, delete (HR/Admin).
- **Attendance** (`/attendance`): View history, log attendance.
- **Leave** (`/leave`): Apply, view history, manage requests.
- **Profile** (`/profile`): View/edit user details.

### Example Workflow
1. **Admin**:
   - Login at `/auth` with `admin@example.com`.
   - Navigate to `/admin` to create HR users (`/api/users`).
2. **HR**:
   - Login with HR credentials.
   - Add employees at `/employees/add`.
   - Approve leaves at `/leave`.
3. **Employee**:
   - Login with employee credentials.
   - Log attendance at `/attendance/log`.
   - Apply for leave at `/leave/apply`.

## API Endpoints

### Authentication
- `POST /api/auth/signup`: Create user (Admin-only).
- `POST /api/auth/login`: Authenticate user, return JWT.

### Users (Admin)
- `POST /api/users`: Create user.
- `PUT /api/users/:id`: Update user.
- `DELETE /api/users/:id`: Delete user.
- `GET /api/users`: List all users.

### Employees
- `POST /api/employees`: Add employee (HR/Admin).
- `PUT /api/employees/:id`: Update employee (HR/Admin).
- `DELETE /api/employees/:id`: Delete employee (HR/Admin).
- `GET /api/employees`: List employees (HR/Admin).
- `GET /api/profile`: View profile (All roles).

### Attendance
- `POST /api/attendance`: Log attendance (Employee).
- `GET /api/attendance/user/:userId`: View user attendance (HR/Admin).
- `PUT /api/attendance/:id`: Update attendance (HR/Admin).
- `GET /api/attendance`: List all attendance (HR/Admin).

### Leave
- `POST /api/leave`: Apply for leave (Employee).
- `PUT /api/leave/:id`: Update leave status (HR/Admin).
- `GET /api/leave/user/:userId`: View user leaves (All roles).
- `GET /api/leave`: List all leaves (HR/Admin).

## Testing
Use Postman to test API endpoints:
1. **Base URL**: `http://localhost:5000`
2. **Steps**:
   - Login as admin (`POST /api/auth/login`).
   - Create HR user (`POST /api/users` with admin token).
   - Login as HR, add employee (`POST /api/employees`).
   - Login as employee, log attendance (`POST /api/attendance`), apply for leave (`POST /api/leave`).
   - As HR, approve leave (`PUT /api/leave/:id`).
3. **Collection**: Available on request.

## Assumptions
- `lib/axios.js` uses a custom axios instance with JWT interceptors.
- Backend `cors` allows requests from `http://localhost:3000`.
- Cloudinary credentials are configured in `.env`.
- MongoDB is running locally or via Atlas.
- Default employee password is `default123` (set during creation).

## Future Improvements
- **User Management UI**: Add `UserForm` and `UserList` for admin.
- **Analytics**: Dashboards with attendance/leave statistics.
- **Password Reset**: Implement forgot password functionality.
- **File Exports**: Export employee data as CSV.
- **Notifications**: Email alerts for leave approvals.
- **Testing**: Add Jest for unit tests, Cypress for E2E tests.

## Troubleshooting
- **401 Unauthorized**: Verify JWT in `localStorage` and `authMiddleware`.
- **CORS Errors**: Check `cors` middleware in `app.js`.
- **Cloudinary Uploads**: Confirm credentials in `.env` and check Cloudinary dashboard.
- **MongoDB Connection**: Ensure `MONGO_URI` is correct.
- **Port Conflict**: Check `netstat -aon | findstr :5000` or `:3000`.

## License
MIT License

Copyright (c) 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.