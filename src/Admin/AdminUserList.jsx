// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// const API_URL = "http://127.0.0.1:8000/api/admin/users/";

// const AdminUserList = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch all users
//   const fetchUsers = async () => {
//     try {
//       const res = await fetch(API_URL);
//       if (!res.ok) throw new Error("Failed to fetch");
//       const data = await res.json();
//       setUsers(data);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to load users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Block / Unblock a user
//   const handleToggleBlock = async (userId, currentStatus, userName) => {
//     const confirmAction = window.confirm(
//       `Are you sure you want to ${currentStatus ? "unblock" : "block"} ${userName}?`
//     );
//     if (!confirmAction) return;

//     try {
//       const response = await fetch(`${API_URL}/${userId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ isBlocked: !currentStatus }),
//       });

//       if (!response.ok) throw new Error("Failed to update user");

//       // Update state locally
//       setUsers((prev) =>
//         prev.map((user) =>
//           user.id === userId ? { ...user, isBlocked: !currentStatus } : user
//         )
//       );

//       toast.success(
//         `User ${currentStatus ? "unblocked" : "blocked"} successfully`
//       );
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to update user status");
//     }
//   };

//   if (loading) {
//     return <div className="text-center py-10 text-gray-600">Loading users...</div>;
//   }

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h1 className="text-2xl font-semibold mb-6 text-gray-800">Manage Users</h1>

//       {/* Small Stats */}
//       <div className="flex gap-4 mb-6">
//         <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
//           Total: {users.length}
//         </div>
//         <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg">
//           Active: {users.filter((u) => !u.isBlocked).length}
//         </div>
//         <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg">
//           Blocked: {users.filter((u) => u.isBlocked).length}
//         </div>
//       </div>

//       {/* Users Table */}
//       <div className="bg-white border rounded-lg shadow-sm overflow-x-auto">
//         <table className="min-w-full text-sm text-gray-700">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="py-3 px-4 text-left">User</th>
//               <th className="py-3 px-4 text-left">Email</th>
//               <th className="py-3 px-4 text-left">Status</th>
//               <th className="py-3 px-4 text-center">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.length > 0 ? (
//               users.map((user) => (
//                 <tr key={user.id} className="border-t hover:bg-gray-50">
//                   <td className="py-3 px-4 font-medium">{user.name}</td>
//                   <td className="py-3 px-4">{user.email}</td>
//                   <td className="py-3 px-4">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                         user.isBlocked
//                           ? "bg-red-100 text-red-700"
//                           : "bg-green-100 text-green-700"
//                       }`}
//                     >
//                       {user.isBlocked ? "Blocked" : "Active"}
//                     </span>
//                   </td>
//                   <td className="py-3 px-4 text-center">
//                     <button
//                       onClick={() =>
//                         handleToggleBlock(user.id, user.isBlocked, user.name)
//                       }
//                       className={`px-3 py-1.5 rounded-md text-white font-medium text-xs transition ${
//                         user.isBlocked
//                           ? "bg-green-500 hover:bg-green-600"
//                           : "bg-red-500 hover:bg-red-600"
//                       }`}
//                     >
//                       {user.isBlocked ? "Unblock" : "Block"}
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan="4"
//                   className="text-center text-gray-500 py-6 italic"
//                 >
//                   No users found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminUserList;

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Updated to point to your Django Backend
const API_URL = "http://127.0.0.1:8000/api/admin/users/";

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users from Django
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('access_token'); // Using correct key from your storage
      
      const res = await fetch(API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) throw new Error("Failed to fetch users");
      
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Block / Unblock a user using Django PATCH
  const handleToggleBlock = async (userId, currentStatus, userName) => {
    const confirmAction = window.confirm(
      `Are you sure you want to ${currentStatus ? "unblock" : "block"} ${userName}?`
    );
    if (!confirmAction) return;

    try {
      const token = localStorage.getItem('access_token');
      // Updated URL to match your Django toggle-block path
      const response = await fetch(`${API_URL}${userId}/toggle-block/`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (!response.ok) throw new Error("Failed to update user");

      const data = await response.json();

      // Update state locally using the field name 'is_blocked' from your Django model
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, is_blocked: data.is_blocked } : user
        )
      );

      toast.success(
        `User ${data.is_blocked ? "blocked" : "unblocked"} successfully`
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user status");
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-xl text-gray-500">Loading users...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">User Management</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
          <p className="text-blue-600 text-sm font-medium">Total Registered</p>
          <p className="text-2xl font-bold text-blue-900">{users.length}</p>
        </div>
        <div className="bg-green-50 border border-green-200 p-4 rounded-xl">
          <p className="text-green-600 text-sm font-medium">Active Users</p>
          <p className="text-2xl font-bold text-green-900">{users.filter((u) => !u.is_blocked).length}</p>
        </div>
        <div className="bg-red-50 border border-red-200 p-4 rounded-xl">
          <p className="text-red-600 text-sm font-medium">Blocked Users</p>
          <p className="text-2xl font-bold text-red-900">{users.filter((u) => u.is_blocked).length}</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Username</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Email</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{user.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        user.is_blocked
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {user.is_blocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() =>
                        handleToggleBlock(user.id, user.is_blocked, user.username)
                      }
                      className={`px-4 py-2 rounded-lg text-white text-xs font-bold transition shadow-sm ${
                        user.is_blocked
                          ? "bg-emerald-500 hover:bg-emerald-600"
                          : "bg-rose-500 hover:bg-rose-600"
                      }`}
                    >
                      {user.is_blocked ? "Unblock User" : "Block User"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-10 text-center text-gray-400 italic">
                  No users found in database.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUserList;