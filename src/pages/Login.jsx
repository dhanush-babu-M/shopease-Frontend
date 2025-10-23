import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import apiClient from '../api/axiosConfig'; // <-- IMPORT API CLIENT
import { toast } from 'react-toastify'; // <-- IMPORT TOAST

const Login = () => {
    // 1. Add state for form fields and loading
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // 2. Create the form submit handler
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 3. Call the backend login endpoint
            const response = await apiClient.post('/users/login', {
                email: email,
                password: password
            });

            // 4. VERY IMPORTANT: Save the JWT token
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                toast.success("Login successful! Welcome back.");
                setLoading(false);
                navigate('/'); // Redirect to homepage
            } else {
                throw new Error("No token received");
            }

        } catch (error) {
            setLoading(false);
            toast.error("Invalid email or password. Please try again.");
            console.error("Login error:", error);
        }
    };

    return (
        <div className="flex items-center justify-center py-12 px-4 bg-background">
            <div className="w-full max-w-md p-8 space-y-6 bg-surface rounded-2xl shadow-xl">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-textPrimary">Welcome Back!</h1>
                    <p className="mt-2 text-textSecondary">Sign in to continue to ShopEase</p>
                </div>
                {/* 5. Connect the handler to the form */}
                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email" className="text-sm font-bold text-textSecondary block mb-2">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="w-full p-3 text-textPrimary bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                            placeholder="you@example.com"
                            value={email} // 6. Bind state
                            onChange={(e) => setEmail(e.target.value)} // 7. Update state
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm font-bold text-textSecondary block mb-2">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            className="w-full p-3 text-textPrimary bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </form>
                <p className="text-center text-textSecondary">
                    Don't have an account? <Link to="/signup" className="font-bold text-primary hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;