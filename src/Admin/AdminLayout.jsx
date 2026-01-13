import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout =()=> {
    return (
        <div className="flex h-screen bg-gray-50">
            
            {/* Sidebar - Fixed on the left */}
            <AdminSidebar />
            <main className="flex-grow ml-64 p-8">
               <Outlet />
            </main>
        </div>
    );
}
export default AdminLayout;