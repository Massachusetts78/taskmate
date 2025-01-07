import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css';

const Login = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const sleep = (ms = 2000) => new Promise((res) => setTimeout(res, ms));

    const handleSignup = async (e) => {
        e.preventDefault();
        const toastId = toast.loading('Signing up......'); // Show loading toast
        try {
            const response = await fetch(
                'https://taskmate-backend-tmrk.onrender.com/signup',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                },
            );

            const { data } = await response.json();
            if (response.ok) {
                localStorage.setItem('taskid', data._id);
                toast.update(toastId, {
                    render: 'User added successfully!',
                    type: 'success',
                    isLoading: false,
                    autoClose: 1900,
                });
                await sleep();
                window.open('/sidebar', '_blank');
            } else {
                toast.update(toastId, {
                    render: 'An error occurred while adding the user.',
                    type: 'error',
                    isLoading: false,
                    autoClose: 3000,
                });
            }
        } catch (error) {
            toast.update(toastId, {
                render: 'An error occurred. Please try again.',
                type: 'error',
                isLoading: false,
                autoClose: 3000,
            });
        }
    };

    const handleSignin = async (e) => {
        e.preventDefault();
        const toastId = toast.loading('Authenticating User.......'); // Show loading toast
        try {
            const response = await fetch(
                `https://taskmate-backend-tmrk.onrender.com/signin`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                    }),
                },
            );

            const { data } = await response.json();
            if (response.ok) {
                localStorage.setItem('taskid', data._id);
                setFormData({ name: '', email: '', password: '' });
                toast.update(toastId, {
                    render: 'User authenticated successfully!',
                    type: 'success',
                    isLoading: false,
                    autoClose: 1900,
                });
                await sleep();
                window.open('/sidebar', '_blank');
            } else {
                toast.update(toastId, {
                    render: 'Authentication failed! Try again.',
                    type: 'error',
                    isLoading: false,
                    autoClose: 3000,
                });
            }
        } catch (error) {
            toast.update(toastId, {
                render: 'An error occurred. Please try again.',
                type: 'error',
                isLoading: false,
                autoClose: 3000,
            });
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
                            <div className='password-input-wrapper'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    placeholder='Password'
                                    onChange={handleInputChange}
                                    minLength={8}
                                    maxLength={16}
                                    onCopy={(e) => {
                                        e.preventDefault();
                                        toast.warn('Copying is not allowed!', {
                                            autoClose: 2000,
                                        });
                                    }}
                                    onPaste={(e) => {
                                        e.preventDefault();
                                        toast.warn('Pasting is not allowed', {
                                            autoClose: 2000,
                                        });
                                    }}
                                    required
                                />
                                <button
                                    type='button'
                                    className='password-toggle'
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    tabIndex='-1'
                                >
                                    {showPassword ? (
                                        <EyeOff className='eye-icon' />
                                    ) : (
                                        <Eye className='eye-icon' />
                                    )}
                                </button>
                            </div>
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
                            <div className='password-input-wrapper'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    placeholder='Password'
                                    onChange={handleInputChange}
                                    minLength={8}
                                    maxLength={16}
                                    onCopy={(e) => {
                                        e.preventDefault();
                                        toast.warn('Copying is not allowed!', {
                                            autoClose: 2000,
                                        });
                                    }}
                                    onPaste={(e) => {
                                        e.preventDefault();
                                        toast.warn('Pasting is not allowed', {
                                            autoClose: 2000,
                                        });
                                    }}
                                    required
                                />
                                <button
                                    type='button'
                                    className='password-toggle'
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    tabIndex='-1'
                                >
                                    {showPassword ? (
                                        <EyeOff className='eye-icon' />
                                    ) : (
                                        <Eye className='eye-icon' />
                                    )}
                                </button>
                            </div>
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
                            <h3>Welcome Back!</h3>
                            <p>
                                To keep connected with us, please log in with
                                your personal info.
                            </p>
                            <button
                                type='button'
                                onClick={() => setIsSignIn(false)}
                                className='overlay-button'
                            >
                                Sign Up
                            </button>
                        </>
                    ) : (
                        <>
                            <h3>Hello, User!</h3>
                            <p>
                                Enter your details and start your productive
                                journey with us.
                            </p>
                            <button
                                type='button'
                                onClick={() => setIsSignIn(true)}
                                className='overlay-button'
                            >
                                Sign In
                            </button>
                        </>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
