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

    const sleep = (ms = 2000) => new Promise((res) => setTimeout(res, ms));
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const { data } = await response.json();
            if (response.ok) {
                localStorage.setItem('taskid', data._id);
                toast.success('User added successfully!');
                await sleep(2500);
                window.open('/sidebar', '_blank');
            } else {
                toast.error('An error occurred while adding the user.');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        }
    };

    const handleSignin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/signin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const { data } = await response.json();
            if (response.ok) {
                localStorage.setItem('taskid', data._id);
                setFormData({ name: '', email: '', password: '' });
                toast.info('Authenticating User......');
                await sleep();
                toast.success('User authenticated successfully!');
                await sleep();
                window.open('/sidebar', '_blank');
            } else {
                toast.error('Authentication failed! Try again.');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
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
                                        toast.error('Copying is not allowed!');
                                    }}
                                    onPaste={(e) => {
                                        e.preventDefault();
                                        toast.error('Pasting is not allowed');
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
                                        toast.error('Copying is not allowed!');
                                    }}
                                    onPaste={(e) => {
                                        e.preventDefault();
                                        toast.error('Pasting is not allowed');
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
                            <h3>Hello, Friend!</h3>
                            <p>
                                Enter your personal details and start your
                                journey with us
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
                            <h3>Welcome Back!</h3>
                            <p>
                                To keep connected with us, please log in with
                                your personal info
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
