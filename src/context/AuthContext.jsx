// import React, { createContext, useState, useEffect, useContext } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

//   useEffect(() => {
//     if (user) localStorage.setItem('user', JSON.stringify(user));
//     else localStorage.removeItem('user');
//   }, [user]);

//   const login = (email, password) => {
//     // Simulate login (replace with API call later)
//     if (email && password) {
//       const mockUser = { email, username: email.split('@')[0], role: 'user' };
//       setUser(mockUser);
//       return true;
//     }
//     return false;
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);

  
  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  
   const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3000/users");
      if (!response.ok) throw new Error("Failed to fetch users");

      const users = await response.json();

      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!foundUser) {
        return { success: false, message: "Invalid email or password" };
      }

      if (foundUser.isBlocked) {
        return { success: false, message: "Your account is blocked. Contact admin." };
      }

      setUser(foundUser);
      return { success: true, user: foundUser };

    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, message: "Something went wrong" };
    }
  };


  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    // navigate("/", { replace: true });  
  };

  return (
  <AuthContext.Provider value={{ user, login, logout }}>
    {children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);