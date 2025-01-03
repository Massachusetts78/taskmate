# TaskMate: Your productivity companion! 

## Overview
TaskMate is a comprehensive task management application designed to help users organize and manage their daily activities efficiently. It combines a user-friendly interface with robust backend functionality to deliver a seamless experience. This project leverages modern technologies like React, Express, and MongoDB.

## Features
- **User Authentication**: Secure login and registration using bcrypt for password hashing.
- **Task Management**: Create, update, delete, and prioritize tasks.
- **Categorization**: Organize tasks by categories or projects.
- **Interactive UI**: Built with React and styled for modern aesthetics.
- **Real-time Updates**: Backend powered by Express and MongoDB ensures a dynamic experience.
- **Cross-Origin Support**: CORS enabled for secure and flexible integration.

---

## Project Structure
```plaintext
.
├── LICENSE
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── public
│   └── taskmate.png
├── src
│   ├── App.jsx
│   ├── app
│   │   ├── backend
│   │   │   ├── server.mjs
│   │   │   └── utils
│   │   │       ├── notification.js
│   │   │       └── reminder.js
│   │   └── frontend
│   │       ├── forgot-password
│   │       │   ├── forgot_password.css
│   │       │   └── forgot_password.jsx
│   │       ├── login
│   │       │   ├── login.css
│   │       │   └── login.jsx
│   │       ├── readme
│   │       │   ├── readme.css
│   │       │   └── readme.jsx
│   │       ├── sidebar
│   │       │   ├── sidebar.css
│   │       │   └── sidebar.jsx
│   │       └── welcome
│   │           ├── welcome.css
│   │           └── welcome.jsx
│   └── main.jsx
└── vite.config.js                 # Project documentation
```

---

## Installation

### Prerequisites
- Node.js (>=16.x)
- MongoDB (>=5.x)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Massachusetts78/taskmate.git
   cd taskmate
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Make sure you have concurrently installed globally
   ```bash
   npm install -g concurrently
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URI=your-mongodb-uri
   PORT=3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Start the backend server:
   ```bash
   npm run server
   ```

6. Preview the build (optional):
   ```bash
   npm run preview
   ```

---

## Scripts

The following scripts are defined in `package.json`:
- **`dev`**: Starts the Vite development server.
- **`concurrently`**: for running both frontend and backend simultaneously.
- **`build`**: Builds the application for production.
- **`lint`**: Runs ESLint to check code quality.
- **`server`**: Starts the Express backend server.
- **`preview`**: Previews the production build locally.
- **`start`**: Starts the web application (both frontend and backend).

---

## Technologies Used

### Backend
- **Express**: Fast, minimal Node.js web framework.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **bcrypt**: Password hashing for secure authentication.
- **Body-parser**: Middleware for parsing incoming request bodies.

### Frontend
- **React**: Component-based library for building user interfaces.
- **React Router**: Declarative routing for React applications.
- **Lucide React**: Icon toolkit for React.

### Development Tools
- **Vite**: Lightning-fast development environment.
- **ESLint**: Linting tool for maintaining code quality.
- **Prettier**: Code formatter for consistent style.

---

## Usage

### Running Locally
1. Start the development server:
   ```bash
   npm start
   ```

2. Open the application in your browser:
   ```
   http://localhost:5173
   ```

3. Please ensure MongoDB is running locally or use a remote database.

### NOTE:
Please ensure you have a .env file and MongoDB connection to access the backend.

#### Create a Task
```javascript

// Task Schema

const task_schema = new mongoose.Schema(
    {
        taskName: { type: String, required: true },
        taskId: { type: String, required: true, ref: 'User' },
        completed: Boolean,
        dueDate: Date,
        reminder: Date,
        important: Boolean,
        description: String,
    },
    { versionKey: false },
);
```
```bash
POST /create-task/:$userID
Content-Type: application/json
{
  "taskName": "Finish README",
  "description": "Complete the documentation for TaskMate",
  "dueDate": "2025-01-15",
  "description": "This task is going to be great",
  "important": true
}
```

---

## Contributing

### How to Contribute
We welcome contributions! Follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your fork:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

### Guidelines
- Follow the existing code style (use Prettier).
- Write clear commit messages.
- Ensure tests pass before submitting.

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Future Plans
- **Mobile App**: Develop a React Native version.
- **Notifications**: Add email and push notifications.
- **Collaboration**: Enable task sharing and real-time collaboration.

---

## Acknowledgments
- Thanks to the open-source community for the libraries and frameworks used in this project.

---

## Contact
Feel free to reach out for questions or feedback:
- **GitHub**: [Massachusetts](https://github.com/Massachusetts78)