import { useState } from 'react';
import { Star, Calendar, Bell, List, CheckCircle, Users } from 'lucide-react';
import './welcome.css';

const LandingPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className='landing-container'>
            {/* Navigation */}
            <nav className='nav'>
                <div className='nav-content'>
                    <a
                        href='#'
                        className='logo'
                    >
                        TaskMate
                    </a>
                    <button
                        className='menu-btn'
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <List size={24} />
                    </button>
                    <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                        <a
                            href='#home'
                            className='nav-link'
                        >
                            Home
                        </a>
                        <a
                            href='#features'
                            className='nav-link'
                        >
                            Features
                        </a>
                        <a
                            href='#about'
                            className='nav-link'
                        >
                            About us
                        </a>
                        <a
                            href='#future'
                            className='nav-link'
                        >
                            Future Plans
                        </a>
                        <a
                            href='#feedback'
                            className='nav-link'
                        >
                            Feedback
                        </a>
                        <a
                            href='/login'
                            target='_blank'
                        >
                            <button className='get-started-btn'>
                                Get Started
                            </button>
                        </a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section
                className='hero'
                id='home'
            >
                <div className='hero-content'>
                    <h1>
                        Organize Your Tasks <span>Like Never Before</span>
                    </h1>
                    <p>
                        TaskMate helps you manage your daily tasks, set
                        reminders, and boost your productivity with an intuitive
                        interface.
                    </p>
                    <div className='hero-buttons'>
                        <a
                            href='/login'
                            target='_blank'
                        >
                            <button className='get-started-btn'>
                                Get Started
                            </button>
                        </a>
                    </div>
                </div>
            </section>
            {/* About Section */}
            <section
                className='about'
                id='about'
            >
                <div className='about-content'>
                    <div className='about-text'>
                        <h2>Why Choose TaskMate?</h2>
                        <p>
                            At TaskMate, we believe in making productivity
                            simple and enjoyable. Our platform is designed with
                            you in mind, combining powerful features with an
                            intuitive interface that makes task management feel
                            effortless. Whether you&apos;re a student,
                            professional, or team leader, TaskMate adapts to
                            your needs and helps you achieve more.
                        </p>
                        <p>
                            Join thousands of users who have transformed their
                            productivity and discovered a better way to manage
                            their daily tasks. Experience the perfect balance of
                            simplicity and functionality with TaskMate.
                        </p>
                    </div>
                    <div className='about-image'>
                        <div className='about-image-grid'>
                            <div className='about-card'>
                                <Users className='about-card-icon' />
                                <h3>User Friendly</h3>
                                <p>
                                    Intuitive interface that anyone can master
                                    in minutes
                                </p>
                            </div>
                            <div className='about-card'>
                                <Star className='about-card-icon' />
                                <h3>Top Rated</h3>
                                <p>
                                    Consistently rated 5 stars by our amazing
                                    users
                                </p>
                            </div>
                            <div className='about-card'>
                                <CheckCircle className='about-card-icon' />
                                <h3>Reliable</h3>
                                <p>
                                    Rock-solid reliability you can count on
                                    daily
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section
                className='features'
                id='features'
            >
                <h2 className='section-title'>Key Features</h2>
                <div className='features-grid'>
                    <div className='feature-card'>
                        <CheckCircle className='feature-icon' />
                        <h3 className='feature-title'>Task Management</h3>
                        <p className='feature-description'>
                            Easily create, organize, and track your tasks with
                            our intuitive interface.
                        </p>
                    </div>
                    <div className='feature-card'>
                        <Star className='feature-icon' />
                        <h3 className='feature-title'>Priority Tasks</h3>
                        <p className='feature-description'>
                            Mark important tasks and keep track of your
                            priorities effortlessly.
                        </p>
                    </div>
                    <div className='feature-card'>
                        <Calendar className='feature-icon' />
                        <h3 className='feature-title'>Due Dates</h3>
                        <p className='feature-description'>
                            Set due dates and never miss an important deadline
                            again.
                        </p>
                    </div>
                    <div className='feature-card'>
                        <Bell className='feature-icon' />
                        <h3 className='feature-title'>Reminders</h3>
                        <p className='feature-description'>
                            Get notified about upcoming tasks and stay on top of
                            your schedule.
                        </p>
                    </div>
                </div>
            </section>
            {/* Future Expectations Section */}
            <section
                className='future-expectations'
                id='future'
            >
                <h2 className='section-title'>
                    What You Can Expect in the Future
                </h2>
                <div className='future-grid'>
                    <div className='future-card'>
                        <h3 className='future-title'>
                            Mobile App (React Native)
                        </h3>
                        <p className='future-description'>
                            Soon, you&apos;ll be able to access TaskMate on your
                            mobile devices with a fully functional app built
                            using React Native. Stay productive on the go!
                        </p>
                    </div>
                    <div className='future-card'>
                        <h3 className='future-title'>Enhanced Notifications</h3>
                        <p className='future-description'>
                            We&apos;re working on integrating more advanced
                            notification systems to keep you on top of your
                            tasks with more timely and personalized reminders.
                        </p>
                    </div>
                    <div className='future-card'>
                        <h3 className='future-title'>AI-Driven Productivity</h3>
                        <p className='future-description'>
                            TaskMate will evolve with AI to suggest task
                            prioritization, automate repetitive tasks, and give
                            insights into your productivity patterns.
                        </p>
                    </div>
                    <div className='future-card'>
                        <h3 className='future-title'>Collaboration Features</h3>
                        <p className='future-description'>
                            We are working on full-fledged collaboration tools,
                            enabling teams to manage tasks together, share
                            updates, and track progress more efficiently.
                        </p>
                    </div>
                </div>
            </section>

            {/* Feedback Section */}
            <section
                className='feedback'
                id='feedback'
            >
                <h2 className='section-title'>What our Users say</h2>
                <div className='feedback-grid'>
                    <div className='feedback-card'>
                        <p className='feedback-text'>
                            "TaskMate has completely transformed how I organize
                            my work. It&apos;s simple yet powerful!"
                        </p>
                        <p className='feedback-author'>- John</p>
                    </div>
                    <div className='feedback-card'>
                        <p className='feedback-text'>
                            "The best task management app I&apos;ve ever used.
                            Clean interface and great features."
                        </p>
                        <p className='feedback-author'>- Mike </p>
                    </div>
                    <div className='feedback-card'>
                        <p className='feedback-text'>
                            "Finally found a task manager that fits my workflow
                            perfectly. Highly recommended!"
                        </p>
                        <p className='feedback-author'>- Emily</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className='footer'>
                <div className='footer-content'>
                    <div className='footer-section'>
                        <h3>TaskMate</h3>
                        <p>Simplify your life with better task management.</p>
                    </div>
                    <div className='footer-section'>
                        <h3>Quick Links</h3>
                        <ul className='footer-links'>
                            <li>
                                <a
                                    href='#home'
                                    className='footer-link'
                                >
                                    Home
                                </a>
                                <a
                                    href='#features'
                                    className='footer-link'
                                >
                                    Features
                                </a>
                                <a
                                    href='#about'
                                    className='footer-link'
                                >
                                    About us
                                </a>
                                <a
                                    href='#feedback'
                                    className='footer-link'
                                >
                                    Feedback
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='footer-bottom'>
                    <p>&copy; 2025 TaskMate. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
