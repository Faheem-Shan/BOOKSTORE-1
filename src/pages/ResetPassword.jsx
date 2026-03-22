import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
    // We get the email from the URL link we sent in the email
    const email = searchParams.get('email');
    
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleReset = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            return toast.error("Passwords do not match!");
        }

        try {
            // This will hit your Django "Reset" endpoint
            await api.post('accounts/reset-password/', { email, new_password: newPassword });
            toast.success("Password reset successful! Please login.");
            navigate('/login');
        } catch (err) {
            toast.error("Link expired or invalid request.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form onSubmit={handleReset} className="p-8 bg-white shadow-xl rounded-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Set New Password</h2>
                <div className="space-y-4">
                    <input 
                        type="password" 
                        placeholder="New Password" 
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Confirm New Password" 
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
                        Reset Password
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ResetPassword;