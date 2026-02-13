# CitiTrack - Infrastructure Issue Monitoring System

A comprehensive web-based platform for Mati City residents and government agencies to report, monitor, and track public infrastructure issues with AI-assisted support.

## Project Overview

CitiTrack is a MERN stack (MongoDB, Express, React, Node.js) application designed to improve community issue reporting and infrastructure management. It features:

- **Citizen Portal**: Report infrastructure issues (road damage, drainage problems, streetlights, public facilities)
- **Admin Dashboard**: Manage and track reported issues
- **Real-time Status Updates**: Track issue progress
- **AI Chatbot**: Assist users during the reporting process
- **Centralized Database**: Organize all infrastructure concerns

## Tech Stack

### Backend (Server)

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt** - Password hashing

### Frontend (Client)

- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **CSS3** - Styling

## Project Structure

```
CitiTrack/
├── server/                 # Backend application
│   ├── config/            # Database configuration
│   ├── models/            # MongoDB schemas (Issue, User)
│   ├── routes/            # API endpoints
│   ├── controllers/       # Business logic
│   ├── middleware/        # Auth, error handling
│   ├── server.js          # Entry point
│   ├── package.json
│   └── .env.example       # Environment variables template
├── client/                # Frontend application
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API calls
│   │   ├── styles/        # CSS files
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

#### 1. Backend Setup

```bash
cd server
npm install
```

Create `.env` file:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cititrack
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
OPENAI_API_KEY=your_openai_api_key_here
```

Start the server:

```bash
npm run dev
```

#### 2. Frontend Setup

```bash
cd client
npm install
```

Start the development server:

```bash
npm start
```

The application will open at `http://localhost:3000`

## API Endpoints (To Be Implemented)

### Issues

- `GET /api/issues` - Get all issues
- `POST /api/issues` - Create new issue
- `GET /api/issues/:id` - Get issue details
- `PUT /api/issues/:id` - Update issue
- `DELETE /api/issues/:id` - Delete issue

### Users

- `POST /api/users/register` - Register user
- `POST /api/users/login` - Login user
- `GET /api/users/:id` - Get user profile

### Chatbot

- `POST /api/chatbot/message` - Send message to AI chatbot

## Features (Planned)

- [x] Project structure setup
- [ ] User authentication (login/register)
- [ ] Issue submission form
- [ ] Issue tracking dashboard
- [ ] Admin panel
- [ ] Status tracking feature
- [ ] AI chatbot integration
- [ ] Image upload for issues
- [ ] Comments on issues
- [ ] Real-time notifications
- [ ] Mobile responsive design

## Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## License

This project is licensed under the ISC License.

## Contact

For inquiries about CitiTrack, please contact the development team.

---

**Capstone Project for City Infrastructure Management**
