// import React from 'react'

// const Login = () => {
//   return (
//     <div>Login</div>
//   )
// }

// export default Login


// import React, { useState, useContext } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import toast from 'react-hot-toast'; // The key improvement

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { login } = useContext(AuthContext); // Context Integration
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       toast.error('Please fill all fields!'); // Excellent error handling
//       return;
//     }
//     // Assumes login function is async and returns true/false
//     if (await login(email, password)) {
//       toast.success('Logged in successfully!');
//       navigate('/');
//     } else {
//       toast.error('Invalid email or password!');
//     }
//   };

//   return (
//     <section className="max-padd-container py-12 bg-gray-50">
//       <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-200"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-200"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
//           >
//             Login
//           </button>
//           <p className="text-center text-sm">
//             Don’t have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
//           </p>
//           <div className="pt-2 text-center text-sm">

//           </div>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default Login;
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill all fields!');
      return;
    }

    const result = await login(email, password);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    const user = result.user;

    // Block check
    if (user.isBlocked) {
      toast.error("Your account has been blocked by admin!");
      return;
    }

    toast.success("Logged in successfully!");

    // Role based navigation
    if (user.role === "admin") {
      navigate("/admin", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-secondary">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-secondary focus:border-secondary outline-none"
              placeholder="Enter Email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-secondary focus:border-secondary outline-none"
              placeholder="Enter Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white bg-secondary hover:bg-opacity-90 transition-all shadow-md shadow-secondary/50"
          >
            Login
          </button>

          <p className="text-center text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-secondary hover:underline">Sign up</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
