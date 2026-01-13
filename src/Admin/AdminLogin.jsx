// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { useAuth } from '../context/AuthContext';


// const API_URL = 'http://localhost:3000/users';

// const AdminLogin = () => {
//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const navigate = useNavigate();
//     const { login } = useAuth();

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleLogin = async (e) => {
//         e.preventDefault();

//         const success = await login(formData.email, formData.password, 'admin');

//         if (success) {
//             toast.success('Admin Logged in successfully!');
//             navigate('/admin', { replace: true }); // Redirect to admin dashboard
//         } else {
//             toast.error('Invalid credentials or not authorized as admin.');
//         }
//     };
//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gray-100">
//             <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-2xl">

//                 <h2 className="text-3xl font-bold text-center mb-6 text-secondary tracking-wider">
//                     Admin Login
//                 </h2>

//                 <form onSubmit={handleLogin} className="space-y-6">
//                     <div>
//                         <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                         <input
//                             type="email"
//                             name="email"
//                             id="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none"
//                             placeholder="Email"
//                             required
//                         />
//                     </div>

//                     <div>
//                         <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//                         <input
//                             type="password"
//                             name="password"
//                             id="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none"
//                             placeholder="password"
//                             required
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         className="w-full py-3 bold-16 rounded-lg text-white bg-secondary hover:bg-opacity-90 transition-all shadow-md shadow-secondary/50"
//                     >
//                         Login
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AdminLogin;