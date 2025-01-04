import { useState } from 'react';
import { Eye, EyeClosed } from 'lucide-react';
import './login.css';

const Login = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const { email, password } = formData;

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const url = 'https://taskmate-backend-wi9p.onrender.com/signup';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const { data } = await response.json();

            localStorage.setItem('taskid', data._id);

            if (response.ok) {
                alert('User added successfully');
                window.open(
                    '/sidebar',
                    '_blank',
                );
            } else {
                alert('An error occured while adding the user.');
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        }
    };
    const handleSignin = async (e) => {
        e.preventDefault();
        const url = 'https://taskmate-backend-wi9p.onrender.com/signin';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const { data } = await response.json();

            localStorage.setItem('taskid', data._id);

            if (response.ok) {
                alert('User authentication was successful!');
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                });
                window.open(
                    '/sidebar',
                    '_blank',
                );
            } else {
                alert('Cannot auth'); // Show error message
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className='auth-container'>
            <div className='auth-wrapper'>
                <div className='form-container'>
                    <form
                        className={`form ${isSignIn ? 'active' : ''}`}
                        onSubmit={handleSignin}
                    >
                        <h2>Sign In</h2>
                        <div className='input-group'>
                            <input
                                type='email'
                                name='email'
                                placeholder='Email'
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className='input-group'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                minLength={8}
                                maxLength={16}
                                onCopy={(e) => {
                                    e.preventDefault();
                                    alert('Copying is not allowed!');
                                }}
                                placeholder='Password'
                                onPaste={(e) => {
                                    e.preventDefault();
                                    alert('Pasting is not allowed');
                                }}
                                onChange={handleInputChange}
                                required
                            />
                            <span
                                className='password-toggle'
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <EyeClosed className='closed-eye'></EyeClosed>
                                ) : (
                                    <Eye className='open-eye'></Eye>
                                )}
                            </span>
                        </div>
                        <a
                            href='/forgot-password'
                            className='forgot-password'
                        >
                            Forgot your password?
                        </a>
                        <button
                            type='submit'
                            className='submit-button'
                        >
                            Sign In
                        </button>
                    </form>
                </div>

                <div className='form-container'>
                    <form
                        className={`form ${!isSignIn ? 'active' : ''}`}
                        onSubmit={handleSignup}
                    >
                        <h2>Create Account</h2>
                        <div className='input-group'>
                            <input
                                type='text'
                                name='name'
                                placeholder='Name'
                                onChange={handleInputChange}
                                required={!isSignIn}
                            />
                        </div>
                        <div className='input-group'>
                            <input
                                type='email'
                                name='email'
                                placeholder='Email'
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className='input-group'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                minLength={8}
                                maxLength={16}
                                name='password'
                                placeholder='Password'
                                onCopy={(e) => {
                                    e.preventDefault();
                                    alert('Copying is not allowed!');
                                }}
                                onPaste={(e) => {
                                    e.preventDefault();
                                    alert('Pasting is not allowed');
                                }}
                                onChange={handleInputChange}
                                required
                            />
                            <span
                                className='password-toggle'
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <EyeClosed className='closed-eye'></EyeClosed>
                                ) : (
                                    <Eye className='open-eye'></Eye>
                                )}
                            </span>
                        </div>

                        <button
                            type='submit'
                            className='submit-button'
                        >
                            Sign Up
                        </button>
                    </form>
                </div>

                <div className={`overlay-container ${isSignIn ? 'right' : ''}`}>
                    {isSignIn ? (
                        <>
                            <h3>Hello, Friend!</h3>
                            <p>
                                Enter your personal details and start your
                                journey with us
                            </p>
                            <button
                                onClick={() => setIsSignIn(false)}
                                className='overlay-button'
                            >
                                Sign Up
                            </button>
                        </>
                    ) : (
                        <>
                            <h3>Welcome Back!</h3>
                            <p>
                                To keep connected with us, please log in with
                                your personal info
                            </p>
                            <button
                                onClick={() => setIsSignIn(true)}
                                className='overlay-button'
                            >
                                Sign In
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
