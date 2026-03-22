// import React, { createContext, useState, useEffect, useContext } from 'react';

// export const AuthContext = createContext();
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);

  
//   useEffect(() => {
//     if (user) localStorage.setItem('user', JSON.stringify(user));
//     else localStorage.removeItem('user');
//   }, [user]);

  
//    const login = async (email, password) => {
//     try {
//       const response = await fetch("http://localhost:3000/users");
//       if (!response.ok) throw new Error("Failed to fetch users");

//       const users = await response.json();

//       const foundUser = users.find(
//         (u) => u.email === email && u.password === password
//       );

//       if (!foundUser) {
//         return { success: false, message: "Invalid email or password" };
//       }

//       if (foundUser.isBlocked) {
//         return { success: false, message: "Your account is blocked. Contact admin." };
//       }

//       setUser(foundUser);
//       return { success: true, user: foundUser };

//     } catch (error) {
//       console.error("Login failed:", error);
//       return { success: false, message: "Something went wrong" };
//     }
//   };


//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//     // navigate("/", { replace: true });  
//   };

//   return (
//   <AuthContext.Provider value={{ user, login, logout }}>
//     {children}</AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// import React, { createContext, useState, useEffect, useContext } from "react";
// import api from "../api/axios";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(
//     () => JSON.parse(localStorage.getItem("user")) || null
//   );

//   // keep user in localStorage
//   useEffect(() => {
//     if (user) localStorage.setItem("user", JSON.stringify(user));
//     else localStorage.removeItem("user");
//   }, [user]);

//   // 🔐 LOGIN WITH DJANGO
//  const login = async (username, password) => {
//   try {
//     const res = await api.post("auth/login/", {
//       username,
//       password,
//     });

//     const { access, refresh, user } = res.data;

//     localStorage.setItem("access_token", access);
//     localStorage.setItem("refresh_token", refresh);
//     localStorage.setItem("user", JSON.stringify(user));
//     setUser(user);

//     // ✅ RETURN USER
//     return { success: true, user };
//   } catch (err) {
//     return {
//       success: false,
//       message:
//         err.response?.data?.detail ||
//         err.response?.data?.message ||
//         "Invalid username or password",
//     };
//   }
// };
//   // 🚪 LOGOUT
//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    // Only parse if it exists and is not the string "undefined"
    if (storedUser && storedUser !== "undefined") {
      try {
        return JSON.parse(storedUser);
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        return null;
      }
    }
    return null;
  });
  // Synchronize user state with localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // 🔐 LOGIN
  const login = async (username, password) => {
    try {
      const res = await api.post("auth/login/", {
        username,
        password,
      });

      // Match the keys from your Django View (access, refresh, user)
      const { access, refresh, user: userData } = res.data;

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("user", JSON.stringify(userData));
      
      // ✅ Set the header for all future API calls immediately
      api.defaults.headers.common["Authorization"] = `Bearer ${access}`;

      setUser(userData);
      return { success: true, user: userData };
    } catch (err) {
      console.error("Login Error:", err.response?.data);
      return {
        success: false,
        message: err.response?.data?.message || "Invalid username or password",
      };
    }
  };

  // 🚪 LOGOUT (Clean everything)
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    
    // Remove the Auth header
    delete api.defaults.headers.common["Authorization"];
    
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);