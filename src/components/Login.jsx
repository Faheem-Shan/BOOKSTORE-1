// import React, { useState, useContext } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import toast from 'react-hot-toast';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       toast.error('Please fill all fields!');
//       return;
//     }

//     const result = await login(email, password);

//     if (!result.success) {
//       toast.error(result.message);
//       return;
//     }

//     const user = result.user;

//     // Block check
//     if (user.isBlocked) {
//       toast.error("Your account has been blocked by admin!");
//       return;
//     }

//     toast.success("Logged in successfully!");

//     // Role based navigation
//     if (user.role === "admin") {
//       navigate("/admin", { replace: true });
//     } else {
//       navigate("/", { replace: true });
//     }
//   };

//   return (
//     <section className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-xl">
//         <h2 className="text-3xl font-bold text-center mb-6 text-secondary">
//           Login
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-3 border rounded-lg focus:ring-secondary focus:border-secondary outline-none"
//               placeholder="Enter Email"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 border rounded-lg focus:ring-secondary focus:border-secondary outline-none"
//               placeholder="Enter Password"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 rounded-lg text-white bg-secondary hover:bg-opacity-90 transition-all shadow-md shadow-secondary/50"
//           >
//             Login
//           </button>

//           <p className="text-center text-sm">
//             Don’t have an account?{" "}
//             <Link to="/signup" className="text-secondary hover:underline">Sign up</Link>
//           </p>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default Login;


import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const [username, setUsername] = useState("");   
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Please fill all fields!");
      return;
    }

    const result = await login(username, password); 

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success("Logged in successfully!");

    // Role based navigation (Django field names)
    if (result.user?.role === "admin") {
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter password"
              required
            />
            <div className="flex justify-end mt-1">
            <Link 
              to="/forgot-password" 
              className="text-xs text-secondary hover:underline font-medium"
            >
              Forgot Password?
            </Link>
          </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white bg-secondary"
          >
            Login
          </button>

          <p className="text-center text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-secondary hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
