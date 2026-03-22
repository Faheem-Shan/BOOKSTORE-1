// import React, { useState, useEffect } from 'react';
// import toast from 'react-hot-toast';
// // Imported FaChartLine for the Net Profit card
// import { FaUsers, FaBookOpen, FaShoppingCart, FaClipboardList, FaDollarSign, FaChartLine } from 'react-icons/fa';

// const API_BASE_URL = 'http://localhost:8000/api/admin';

// // Reusable Dashboard Card Component
// const DashboardCard = ({ icon, title, value, color }) => (
//     <div className={`p-6 rounded-xl shadow-lg ${color} text-white transition-transform hover:scale-[1.02] duration-300`}>
//         <div className="flex items-center justify-between">
//             <div className="text-4xl">{icon}</div>
//             <div className="text-right">
//                 <p className="text-xl font-bold">{value}</p>
//                 <p className="text-sm opacity-90">{title}</p>
//             </div>
//         </div>
//     </div>
// );


// const AdminDashboard = () => {
//     const [stats, setStats] = useState({
//         totalUsers: 0,
//         totalProducts: 0,
//         pendingOrders: 0,
//         outOfStock: 0,
//         totalRevenue: 0,
//         totalExpenses: 0,
//     });
//     const [loading, setLoading] = useState(true);

//     const fetchDashboardStats = async () => {
//         try {
//             // 1. Get the token from localStorage (saved during login)
//             const token = localStorage.getItem('token'); 

//             // 2. Fetch the single stats object from Django
//             const response = await fetch('http://127.0.0.1:8000/api/admin/dashboard/', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     // This header tells Django who you are (Faheem the Admin)
//                     'Authorization': `Bearer ${token}` 
//                 },
//             });

//             if (!response.ok) {
//                 if (response.status === 401 || response.status === 403) {
//                     toast.error("Not authorized! Please login as Admin.");
//                     return;
//                 }
//                 throw new Error('Failed to fetch stats');
//             }

//             const data = await response.json();

//             // 3. Update the state directly with the Django data
//             // No more manual calculations or .reduce() needed!
//             setStats({
//                 totalUsers: data.totalUsers,
//                 totalProducts: data.totalProducts,
//                 pendingOrders: data.pendingOrders,
//                 outOfStock: data.outOfStock,
//                 totalRevenue: data.totalRevenue,
//                 totalExpenses: data.totalExpenses,
//             });

//         } catch (error) {
//             toast.error("Failed to load dashboard statistics.");
//             console.error("Dashboard Fetch Error:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchDashboardStats();
//     }, []);


//     if (loading) {
//         return <div className="text-center py-20 text-xl text-gray-500">Loading dashboard...</div>;
//     }

//     // CALCULATE THE DIFFERENCE (NET PROFIT / NET LOSS) HERE
//     const netProfit = stats.totalRevenue - stats.totalExpenses;

//     return (
//         <div className="p-8">
//             <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard Overview</h1>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

//                 {/* 1. NET PROFIT CARD (THE DIFFERENCE) */}
//                 <DashboardCard
//                     icon={<FaChartLine />}
//                     title="Net Profit (The Difference)"
//                     value={`₹${netProfit.toFixed(2)}`}
//                     // Dynamic color: Green for profit, Red for loss
//                     color={netProfit >= 0 ? "bg-green-600" : "bg-red-600"}
//                 />

//                 {/* 2. TOTAL REVENUE CARD */}
//                 <DashboardCard
//                     icon={<FaDollarSign />}
//                     title="Total Revenue"
//                     value={`₹${stats.totalRevenue.toFixed(2)}`}
//                     color="bg-emerald-300" // Adjusted color
//                 />

//                 {/* 3. TOTAL EXPENSE CARD */}
//                 <DashboardCard
//                     icon={<FaDollarSign />}
//                     title="Total Expenses"
//                     value={`₹${stats.totalExpenses.toFixed(2)}`}
//                     color="bg-red-400" // Adjusted color
//                 />

//                 {/* 4. TOTAL CUSTOMERS */}
//                 <DashboardCard
//                     icon={<FaUsers />}
//                     title="Total Customers"
//                     value={stats.totalUsers}
//                     color="bg-sky-300"
//                 />

//                 {/* 5. TOTAL BOOKS */}
//                 <DashboardCard
//                     icon={<FaBookOpen />}
//                     title="Total Books"
//                     value={stats.totalProducts}
//                     color="bg-teal-300"
//                 />

//                 {/* 6. PENDING ORDERS */}
//                 <DashboardCard
//                     icon={<FaClipboardList />}
//                     title="Pending Orders"
//                     value={stats.pendingOrders}
//                     color="bg-amber-400"
//                 />

//                 {/* 7. OUT OF STOCK */}
//                 <DashboardCard
//                     icon={<FaShoppingCart />}
//                     title="Out of Stock"
//                     value={stats.outOfStock}
//                     color="bg-rose-400"
//                 />
//             </div>

//             <div className="mt-12 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Links</h2>
//                 <p className="text-gray-600">Use the sidebar to manage Products, Categories, and Orders.</p>
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaUsers, FaBookOpen, FaShoppingCart, FaClipboardList, FaDollarSign, FaChartLine } from 'react-icons/fa';

// Use the variable consistently
const API_BASE_URL = 'http://127.0.0.1:8000/api/admin';

const DashboardCard = ({ icon, title, value, color }) => (
    <div className={`p-6 rounded-xl shadow-lg ${color} text-white transition-transform hover:scale-[1.02] duration-300`}>
        <div className="flex items-center justify-between">
            <div className="text-4xl">{icon}</div>
            <div className="text-right">
                <p className="text-xl font-bold">{value}</p>
                <p className="text-sm opacity-90">{title}</p>
            </div>
        </div>
    </div>
);

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProducts: 0,
        pendingOrders: 0,
        outOfStock: 0,
        totalRevenue: 0,
        totalExpenses: 0,
    });
    const [loading, setLoading] = useState(true);

    const fetchDashboardStats = async () => {
        try {
            const token = localStorage.getItem('access_token'); 

            // Using the template literal with API_BASE_URL
            const response = await fetch(`${API_BASE_URL}/dashboard/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
            });

            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    toast.error("Not authorized! Please login as Admin.");
                    return;
                }
                throw new Error('Failed to fetch stats');
            }

            const data = await response.json();

            // Use OR (||) fallbacks to prevent crashes if a value is null/undefined
            setStats({
                totalUsers: data.totalUsers || 0,
                totalProducts: data.totalProducts || 0,
                pendingOrders: data.pendingOrders || 0,
                outOfStock: data.outOfStock || 0,
                totalRevenue: data.totalRevenue || 0,
                totalExpenses: data.totalExpenses || 0,
            });

        } catch (error) {
            toast.error("Failed to load dashboard statistics.");
            console.error("Dashboard Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    if (loading) {
        return <div className="text-center py-20 text-xl text-gray-500">Loading dashboard...</div>;
    }

    const netProfit = (stats.totalRevenue || 0) - (stats.totalExpenses || 0);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* <DashboardCard
                    icon={<FaChartLine />}
                    title="Net Profit"
                    value={`₹${Number(netProfit).toFixed(2)}`}
                    color={netProfit >= 0 ? "bg-green-600" : "bg-red-600"}
                /> */}

                <DashboardCard
                    icon={<FaDollarSign />}
                    title="Total Revenue"
                    value={`₹${Number(stats.totalRevenue).toFixed(2)}`}
                    color="bg-emerald-500"
                />

                <DashboardCard
                    icon={<FaDollarSign />}
                    title="Total Expenses"
                    value={`₹${Number(stats.totalExpenses).toFixed(2)}`}
                    color="bg-red-400"
                />

                <DashboardCard
                    icon={<FaUsers />}
                    title="Total Customers"
                    value={stats.totalUsers}
                    color="bg-sky-500"
                />

                <DashboardCard
                    icon={<FaBookOpen />}
                    title="Total Books"
                    value={stats.totalProducts}
                    color="bg-teal-500"
                />

                <DashboardCard
                    icon={<FaClipboardList />}
                    title="Pending Orders"
                    value={stats.pendingOrders}
                    color="bg-amber-500"
                />

                <DashboardCard
                    icon={<FaShoppingCart />}
                    title="Out of Stock"
                    value={stats.outOfStock}
                    color="bg-rose-500"
                />
            </div>

            <div className="mt-12 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Links</h2>
                <p className="text-gray-600">Use the sidebar to manage Products, Categories, and Orders.</p>
            </div>
        </div>
    );
};

export default AdminDashboard;