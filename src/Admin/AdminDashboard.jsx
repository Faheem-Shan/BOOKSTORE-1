// import React, { useState, useEffect } from 'react';
// import toast from 'react-hot-toast';
// import { FaUsers, FaBookOpen, FaShoppingCart, FaClipboardList } from 'react-icons/fa';

// const API_BASE_URL = 'http://localhost:3000';

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
//             // JSON Server allows fetching the entire resource and getting the count from the length
//             const [usersRes, productsRes, ordersRes] = await Promise.all([
//                 fetch(`${API_BASE_URL}/users`),
//                 fetch(`${API_BASE_URL}/products`),
//                 fetch(`${API_BASE_URL}/orders`), // Filter for pending orders
//             ]);

//             const users = await usersRes.json();
//             const products = await productsRes.json();
//             const orders = await ordersRes.json();

//             const pendingOrders = orders.filter(o => o.status === 'Processing').length;
//             const outOfStockCount = products.filter(p => p.instock === false).length;




//             setStats({
//                 totalUsers: users.length,
//                 totalProducts: products.length,
//                 pendingOrders: orders.length,
//                 outOfStock: outOfStockCount,
//             });

//         } catch (error) {
//             toast.error("Failed to load dashboard statistics.");
//             console.error(error);
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

//     return (
//         <div className="p-8">
//             <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard Overview</h1>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

//                 <DashboardCard
//                     icon={<FaUsers />}
//                     title="Total Customers"
//                     value={stats.totalUsers}
//                     color="bg-sky-500"
//                 />

//                 <DashboardCard
//                     icon={<FaBookOpen />}
//                     title="Total Books"
//                     value={stats.totalProducts}
//                     color="bg-teal-200"
//                 />

//                 <DashboardCard
//                     icon={<FaClipboardList />}
//                     title="Pending Orders"
//                     value={stats.pendingOrders}
//                     color="bg-amber-200"
//                 />

//                 <DashboardCard
//                     icon={<FaShoppingCart />}
//                     title="Out of Stock"
//                     value={stats.outOfStock}
//                     color="bg-rose-100"
//                 />
//             </div>

//             {/* You can add charts, recent orders list, or low stock items here */}
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
// Imported FaChartLine for the Net Profit card
import { FaUsers, FaBookOpen, FaShoppingCart, FaClipboardList, FaDollarSign, FaChartLine } from 'react-icons/fa';

const API_BASE_URL = 'http://localhost:3000';

// Reusable Dashboard Card Component
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
            const [usersRes, productsRes, ordersRes] = await Promise.all([
                fetch(`${API_BASE_URL}/users`),
                fetch(`${API_BASE_URL}/products`),
                fetch(`${API_BASE_URL}/orders`),
            ]);

            const users = await usersRes.json();
            const products = await productsRes.json();
            const orders = await ordersRes.json();

            // --- 1. Calculate Standard Metrics ---
            const pendingOrdersCount = orders.filter(o => o.status === 'Processing').length;
            const outOfStockCount = products.filter(p => p.instock === false).length;

            // --- 2. Calculate Financial Metrics ---

            // a. Total Revenue: FIXED to use 'order.total' from the db.json
            const totalRevenue = orders.reduce((sum, order) => {
                return sum + (order.total || 0);
            }, 0);

            // b. Total Expenses: Inventory cost + fixed overhead (Placeholder logic retained)
            const inventoryCost = products.reduce((sum, product) => {
                // These fields are MISSING in your current db.json /products
                return sum + ((product.purchaseCost || 0) * (product.quantityInStock || 0));
            }, 0);

            const fixedExpenses = 3000; // Placeholder fixed expenses
            const totalExpenses = inventoryCost + fixedExpenses;
            // ------------------------------------


            setStats({
                totalUsers: users.length,
                totalProducts: products.length,
                pendingOrders: pendingOrdersCount,
                outOfStock: outOfStockCount,

                totalRevenue: totalRevenue,
                totalExpenses: totalExpenses,
            });

        } catch (error) {
            toast.error("Failed to load dashboard statistics.");
            console.error(error);
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

    // CALCULATE THE DIFFERENCE (NET PROFIT / NET LOSS) HERE
    const netProfit = stats.totalRevenue - stats.totalExpenses;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* 1. NET PROFIT CARD (THE DIFFERENCE) */}
                <DashboardCard
                    icon={<FaChartLine />}
                    title="Net Profit (The Difference)"
                    value={`₹${netProfit.toFixed(2)}`}
                    // Dynamic color: Green for profit, Red for loss
                    color={netProfit >= 0 ? "bg-green-600" : "bg-red-600"}
                />

                {/* 2. TOTAL REVENUE CARD */}
                <DashboardCard
                    icon={<FaDollarSign />}
                    title="Total Revenue"
                    value={`₹${stats.totalRevenue.toFixed(2)}`}
                    color="bg-emerald-300" // Adjusted color
                />

                {/* 3. TOTAL EXPENSE CARD */}
                <DashboardCard
                    icon={<FaDollarSign />}
                    title="Total Expenses"
                    value={`₹${stats.totalExpenses.toFixed(2)}`}
                    color="bg-red-400" // Adjusted color
                />

                {/* 4. TOTAL CUSTOMERS */}
                <DashboardCard
                    icon={<FaUsers />}
                    title="Total Customers"
                    value={stats.totalUsers}
                    color="bg-sky-300"
                />

                {/* 5. TOTAL BOOKS */}
                <DashboardCard
                    icon={<FaBookOpen />}
                    title="Total Books"
                    value={stats.totalProducts}
                    color="bg-teal-300"
                />

                {/* 6. PENDING ORDERS */}
                <DashboardCard
                    icon={<FaClipboardList />}
                    title="Pending Orders"
                    value={stats.pendingOrders}
                    color="bg-amber-400"
                />

                {/* 7. OUT OF STOCK */}
                <DashboardCard
                    icon={<FaShoppingCart />}
                    title="Out of Stock"
                    value={stats.outOfStock}
                    color="bg-rose-400"
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