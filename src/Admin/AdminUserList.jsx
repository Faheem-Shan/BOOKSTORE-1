import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const API_URL = "http://localhost:3000/users";

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch");
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

  // Block / Unblock a user
  const handleToggleBlock = async (userId, currentStatus, userName) => {
    const confirmAction = window.confirm(
      `Are you sure you want to ${currentStatus ? "unblock" : "block"} ${userName}?`
    );
    if (!confirmAction) return;

    try {
      const response = await fetch(`${API_URL}/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isBlocked: !currentStatus }),
      });

      if (!response.ok) throw new Error("Failed to update user");

      // Update state locally
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, isBlocked: !currentStatus } : user
        )
      );

      toast.success(
        `User ${currentStatus ? "unblocked" : "blocked"} successfully`
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user status");
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-600">Loading users...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Manage Users</h1>

      {/* Small Stats */}
      <div className="flex gap-4 mb-6">
        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
          Total: {users.length}
        </div>
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg">
          Active: {users.filter((u) => !u.isBlocked).length}
        </div>
        <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg">
          Blocked: {users.filter((u) => u.isBlocked).length}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border rounded-lg shadow-sm overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">User</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        user.isBlocked
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {user.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() =>
                        handleToggleBlock(user.id, user.isBlocked, user.name)
                      }
                      className={`px-3 py-1.5 rounded-md text-white font-medium text-xs transition ${
                        user.isBlocked
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center text-gray-500 py-6 italic"
                >
                  No users found
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
