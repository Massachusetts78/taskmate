import React, { useState } from 'react';
import { Eye, EyeClosed } from 'lucide-react';
import './forgot_password.css';
import { ToastContainer, toast } from 'react-toastify';

const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const sleep = (ms = 3000) => new Promise((res) => setTimeout(res, ms));

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        // Send email verification request
        const response = await fetch(
            'https://taskmate-backend-tmrk.onrender.com/forgot-password',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            },
        );

        if (response.ok) {
            setStep(2);
        } else {
            toast.error('Email not found!');
        }
    };
    const toggleNewPasswordVisibility = () => {
        setNewPasswordVisible(!newPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setPasswordsMatch(false); // Set password mismatch flag to false
            return; // Don't proceed if passwords don't match
        }

        // Send new password to the server
        const response = await fetch(
            `https://taskmate-backend-tmrk.onrender.com/reset-password/${email}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ new_password: newPassword }),
            },
        );

        if (response.ok) {
            toast.success('Password updated successfully!');
            await sleep();
            window.location.href = '/login';
        } else {
            toast.error('Something went wrong, please try again.');
        }
    };

    return (
        <div className='forgot-password-page-container'>
            <div
                className={`forgot-password-page-form ${step === 1 ? 'forgot-password-page-step-1' : 'forgot-password-page-step-2'}`}
            >
                {step === 1 && (
                    <form
                        className='forgot-password-page-email-form'
                        onSubmit={handleEmailSubmit}
                    >
                        <h2 className='forgot-password-page-title'>
                            Forgot Password
                        </h2>
                        <p className='forgot-password-page-description'>
                            Enter your email to reset your password
                        </p>
                        <div className='forgot-password-page-input-group'>
                            <input
                                type='email'
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='forgot-password-page-input'
                                required
                            />
                        </div>
                        <button
                            type='submit'
                            className='forgot-password-page-submit-btn'
                        >
                            Send Reset Link
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form
                        className='forgot-password-page-password-form'
                        onSubmit={handlePasswordReset}
                    >
                        <h2 className='forgot-password-page-title'>
                            Reset Your Password
                        </h2>
                        <div className='forgot-password-page-input-group'>
                            <input
                                type={newPasswordVisible ? 'text' : 'password'}
                                minLength={8}
                                maxLength={16}
                                onCopy={(e) => {
                                    e.preventDefault();
                                    toast.info('Copying is not allowed!');
                                }}
                                onPaste={(e) => {
                                    e.preventDefault();
                                    toast.info('Pasting is not allowed!');
                                }}
                                placeholder='New Password'
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className='forgot-password-page-input'
                                required
                            />
                            <span
                                className='toggle-password'
                                onClick={toggleNewPasswordVisibility}
                            >
                                {newPasswordVisible ? (
                                    <EyeClosed className='eye-closed'></EyeClosed>
                                ) : (
                                    <Eye className='eye-open'></Eye>
                                )}
                            </span>
                        </div>
                        <div className='forgot-password-page-input-group'>
                            <input
                                type={
                                    confirmPasswordVisible ? 'text' : 'password'
                                }
                                minLength={8}
                                maxLength={16}
                                value={confirmPassword}
                                onCopy={(e) => {
                                    e.preventDefault();
                                    toast.info('Copying is not allowed!');
                                }}
                                onPaste={(e) => {
                                    e.preventDefault();
                                    toast.info('Pasting is not allowed!');
                                }}
                                placeholder='Confirm Password'
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                className='forgot-password-page-input'
                                required
                            />
                            <span
                                className='toggle-password'
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {confirmPasswordVisible ? (
                                    <EyeClosed className='eye-closed'></EyeClosed>
                                ) : (
                                    <Eye className='eye-open'></Eye>
                                )}
                            </span>
                        </div>

                        {/* Add password strength indicator here */}
                        <div className='password-strength'>
                            <div
                                className={`password-strength-bar ${
                                    newPassword.length < 8
                                        ? 'strength-weak'
                                        : newPassword.length < 12
                                          ? 'strength-medium'
                                          : 'strength-strong'
                                }`}
                            />
                        </div>

                        {!passwordsMatch && (
                            <p className='forgot-password-page-error-message'>
                                Passwords do not match!
                            </p>
                        )}

                        <button
                            type='submit'
                            className='forgot-password-page-submit-btn'
                        >
                            Reset Password
                        </button>
                    </form>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default ForgotPassword;
