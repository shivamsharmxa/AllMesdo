# Message App

A real-time messaging application with email verification and user authentication.

## Features

- User authentication (signup/login)
- Email verification
- Real-time messaging
- User online status
- Modern UI with Tailwind CSS

## Tech Stack

### Frontend

- React
- React Router
- Tailwind CSS
- Axios
- React Hot Toast

### Backend

- Node.js
- Express
- MongoDB
- Socket.IO
- Nodemailer
- JWT Authentication

## Setup Instructions

1. Clone the repository:

```bash
git clone <repository-url>
cd message-app
```

2. Install dependencies:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Create a `.env` file in the server directory with the following variables:

```
PORT=3002
MONGODB_URI=mongodb://localhost:27017/message
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_app_specific_password
```

4. Set up Gmail for email verification:

   - Go to your Google Account settings
   - Enable 2-Step Verification
   - Generate an App Password for the application
   - Use this password as EMAIL_PASS in your .env file

5. Start the development servers:

```bash
# Start the backend server (from server directory)
npm run dev

# Start the frontend server (from client directory)
npm start
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend: http://localhost:3002

## API Endpoints

### Authentication

- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- POST /api/auth/verify-email - Verify email with code
- POST /api/auth/resend-verification - Resend verification email
- GET /api/auth/me - Get current user
- POST /api/auth/logout - Logout user

### Users

- GET /api/users - Get all users

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
