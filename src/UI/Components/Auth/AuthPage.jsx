import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import './AuthPage.css'; // For styling

import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../supabaseClient'; // Make sure you initialize this

const AuthPage = () => {
    const [mode, setMode] = useState('login');

    const navigate = useNavigate();

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                // User is logged in, navigate to dashboard or home
                navigate('/dashboard'); // Change to '/' if you want homepage
            }
        });

        // Optional: Check if user is already logged in (for page refresh)
        supabase.auth.getSession().then(({ data }) => {
            if (data.session) {
                navigate('/dashboard');
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [navigate]);
    // CHECK IF USER IS LOGGED IN


    return (
        <div className="auth-container">
        <div className="auth-box">
            <h2>{mode === 'login' ? 'Sign In to Your Account' : 'Create Your Free Account'}</h2>

            {mode === 'login' ? <LoginForm /> : <SignupForm />}

            <button 
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} 
            className="toggle-button"
            >
            {mode === 'login' ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
        </div>
        </div>
    );
};

export default AuthPage;
