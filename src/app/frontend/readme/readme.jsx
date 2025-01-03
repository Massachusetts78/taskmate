import React from 'react';
import { Code, CheckCircle, Calendar, Bell, Star, List } from 'lucide-react';
import './readme.css';

const CodeBlock = ({ language, children }) => (
    <div className='code-block'>
        <div className='code-block-header'>
            <span className='code-block-language'>{language}</span>
            <button className='button-icon'>
                <Code size={16} />
            </button>
        </div>
        <div className='code-block-content'>
            <pre>
                <code>{children}</code>
            </pre>
        </div>
    </div>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className='feature-card animate-fade-in'>
        <div className='feature-icon'>
            <Icon
                size={24}
                className='feature-icon-svg'
            />
        </div>
        <h3 className='feature-title'>{title}</h3>
        <p className='section-content'>{description}</p>
    </div>
);

const EndpointCard = ({ method, endpoint, description }) => (
    <div className='endpoint-card'>
        <span className={`method-badge method-${method.toLowerCase()}`}>
            {method}
        </span>
        <code className='endpoint-path'>{endpoint}</code>
        <p className='endpoint-description'>{description}</p>
    </div>
);

const ReadmeComponent = () => {
    return (
        <div className='readme-container'>
            <div className='readme-wrapper'>
                <header className='readme-header'>
                    <h1 className='readme-title'>TaskMate</h1>
                    <p className='readme-description'>
                        A powerful task management API with user authentication
                        and comprehensive task tracking capabilities
                    </p>
                    <div className='badge-container'>
                        <span className='badge badge-blue'>v1.0.0</span>
                        <span className='badge badge-green'>
                            Node.js + MongoDB
                        </span>
                        <span className='badge badge-purple'>RESTful API</span>
                    </div>
                </header>

                <main>
                    <section className='section'>
                        <h2 className='section-title'>Overview</h2>
                        <p className='section-content'>
                            TaskMate is a robust task management system built
                            with Express.js and MongoDB. It provides secure user
                            authentication, comprehensive task management
                            features, and a RESTful API for seamless
                            integration. Perfect for developers looking to
                            implement task management in their applications.
                        </p>
                    </section>

                    <section className='section'>
                        <h2 className='section-title'>Core Features</h2>
                        <div className='feature-grid'>
                            <FeatureCard
                                icon={CheckCircle}
                                title='Task Management'
                                description='Create, read, update, and delete tasks with support for completion status, due dates, and importance flags.'
                            />
                            <FeatureCard
                                icon={Calendar}
                                title='Due Dates'
                                description='Set and track task deadlines with built-in date management and overdue task highlighting.'
                            />
                            <FeatureCard
                                icon={Bell}
                                title='Reminders'
                                description='Configure reminder timestamps for tasks to ensure timely completion and notifications.'
                            />
                            <FeatureCard
                                icon={Star}
                                title='Priority System'
                                description='Mark tasks as important and filter based on priority levels for better organization.'
                            />
                        </div>
                    </section>

                    <section className='section'>
                        <h2 className='section-title'>API Authentication</h2>
                        <div>
                            <p className='section-content'>
                                TaskMate uses secure password hashing and email
                                verification:
                            </p>

                            <CodeBlock language='javascript'>
                                {`// User Registration
const response = await fetch('/signup', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'securePassword123'
  })
});

// User Authentication
const response = await fetch('/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        email: 'john@example.com',
        password: 'securePassword123'
  })
});`}
                            </CodeBlock>
                        </div>
                    </section>

                    <section className='section'>
                        <h2 className='section-title'>
                            Task Management Endpoints
                        </h2>
                        <div className='endpoint-container'>
                            <EndpointCard
                                method='POST'
                                endpoint='/create-task/:userId'
                                description='Create a new task with name, description, due date, and importance flag'
                            />
                            <EndpointCard
                                method='GET'
                                endpoint='/get-task/:userId'
                                description='Retrieve all tasks for a specific user'
                            />
                            <EndpointCard
                                method='PUT'
                                endpoint='/update-task/:_id'
                                description='Update all fields of an existing task'
                            />
                            <EndpointCard
                                method='PATCH'
                                endpoint='/update-task/:_id'
                                description='Partially update specific fields of a task'
                            />
                            <EndpointCard
                                method='DELETE'
                                endpoint='/delete-task/:_id'
                                description='Remove a task from the system'
                            />
                        </div>
                    </section>

                    <section className='section'>
                        <h2 className='section-title'>Data Models</h2>
                        <div className='table-container'>
                            <h3 className='subsection-title'>User Schema</h3>
                            <CodeBlock language='javascript'>
                                {`const User_schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
}, { versionKey: false });`}
                            </CodeBlock>

                            <h3 className='subsection-title'>Task Schema</h3>
                            <CodeBlock language='javascript'>
                                {`const task_schema = new mongoose.Schema({
    taskName: { type: String, required: true },
    taskId: { type: String, required: true, ref: 'User' },
    completed: Boolean,
    dueDate: Date,
    remainder: Date,
    important: Boolean,
    description: String,
}, { versionKey: false });`}
                            </CodeBlock>
                        </div>
                    </section>

                    <section className='section'>
                        <h2 className='section-title'>Installation</h2>
                        <div>
                            <p className='section-content'>
                                Set up your local development environment:
                            </p>

                            <CodeBlock language='bash'>
                                {`# Clone TaskMate repository
git clone https://github.com/yourusername/taskmate.git

# Install dependencies
cd taskmate
npm install

# Configure environment
cp .env.example .env
# Edit .env with your MongoDB URI and other settings

# Start development server
npm start`}
                            </CodeBlock>
                        </div>
                    </section>

                    <section className='section'>
                        <h2 className='section-title'>Contributing</h2>
                        <div>
                            <p className='section-content'>
                                We welcome contributions to TaskMate! Here's how
                                to contribute:
                            </p>
                            <ol className='contribute-list'>
                                <li>Fork the TaskMate repository</li>
                                <li>
                                    Create a feature branch: git checkout -b
                                    feature/AmazingFeature
                                </li>
                                <li>
                                    Commit your changes: git commit -m 'Add
                                    AmazingFeature'
                                </li>
                                <li>
                                    Push to the branch: git push origin
                                    feature/AmazingFeature
                                </li>
                                <li>Open a Pull Request</li>
                            </ol>
                        </div>
                    </section>
                </main>

                <footer className='readme-footer'>
                    <div className='footer-content'>
                        <div className='section-content'>
                            © 2024 TaskMate. All rights reserved.
                        </div>
                        <div className='footer-links'>
                            <a
                                href='#'
                                className='footer-link'
                            >
                                View on GitHub
                            </a>
                            <a
                                href='#'
                                className='footer-link'
                            >
                                API Documentation
                            </a>
                            <a
                                href='#'
                                className='footer-link'
                            >
                                Report Issues
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default ReadmeComponent;
