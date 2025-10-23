import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import apiClient from '../api/axiosConfig'; // <-- IMPORT API CLIENT
import { toast } from 'react-toastify'; // <-- IMPORT TOAST

const Signup = () => {
    // 1. Add state for form fields, loading, and errors
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // For redirecting after signup

    // 2. Create the form submit handler
    const handleSignup = async (e) => {
        e.preventDefault(); // Stop the page from reloading
        setLoading(true);

        // Check if passwords are good (add more validation later)
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            setLoading(false);
            return;
        }

        try {
            // 3. Call the backend API
            const response = await apiClient.post('/users/signup', {
                name: name,
                email: email,
                password: password
            });
            
            toast.success("Account created successfully! Please log in.");
            setLoading(false);
            navigate('/login'); // Redirect to login page

        } catch (error) {
            setLoading(false);
            if (error.response && error.response.data) {
                toast.error(error.response.data.message || "Signup failed. Please try again.");
            } else {
                toast.error("Signup failed. Please try again.");
            }
            console.error("Signup error:", error);
        }
    };

    return (
        <div className="flex items-center justify-center py-12 px-4 bg-background">
            <div className="w-full max-w-md p-8 space-y-6 bg-surface rounded-2xl shadow-xl">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-textPrimary">Create Your Account</h1>
                    <p className="mt-2 text-textSecondary">Join the ShopEase family!</p>
                </div>
                {/* 4. Connect the handler to the form */}
                <form className="space-y-6" onSubmit={handleSignup}>
                    <div>
                        <label htmlFor="name" className="text-sm font-bold text-textSecondary block mb-2">Full Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            className="w-full p-3 text-textPrimary bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                            placeholder="Dhanush Babu"
                            value={name} // 5. Bind state to input
                            onChange={(e) => setName(e.target.value)} // 6. Update state on change
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-sm font-bold text-textSecondary block mb-2">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="w-full p-3 text-textPrimary bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                </form>
                <p className="text-center text-textSecondary">
                    Already have an account? <Link to="/login" className="font-bold text-primary hover:underline">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;