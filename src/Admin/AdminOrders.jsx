// import React, { useState, useEffect } from 'react';
// import toast from 'react-hot-toast';
// import { HiOutlineChevronDown } from 'react-icons/hi';

// const ORDER_STATUSES = ['Processing', 'Packing', 'Shipped', 'Out for delivery', 'Delivered', 'Cancelled'];

// const API_URL = 'http://localhost:3000/orders';

// // --- StatusDropdown Component (Optimized for Local State Update) ---
// const StatusDropdown = ({ orderId, initialStatus, onStatusUpdateSuccess }) => {
//     const [status, setStatus] = useState(initialStatus);

//     const getStatusColor = (currentStatus) => {
//         switch (currentStatus) {
//             case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
//             case 'Shipped':
//             case 'Out for delivery': return 'bg-blue-100 text-blue-800 border-blue-200';
//             case 'Processing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
//             case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
//             default: return 'bg-gray-100 text-gray-800 border-gray-200';
//         }
//     };

//     const handleStatusChange = async (e) => {
//         const newStatus = e.target.value;
//         const previousStatus = status;

//         // Optimistic UI update
//         setStatus(newStatus);

//         try {
//             const response = await fetch(`${API_URL}/${orderId}`, {
//                 method: 'PATCH',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ status: newStatus }),
//             });

//             if (!response.ok) {
//                 // Revert state on failure
//                 setStatus(previousStatus);
//                 toast.error(`Failed to update status for Order #${orderId}`);
//                 return;
//             }

//             toast.success(`Order #${orderId} status updated to: ${newStatus}`);
//             onStatusUpdateSuccess(orderId, newStatus);

//         } catch (error) {

//             setStatus(previousStatus);
//             toast.error('Network error during status update.');
//         }
//     };


//     return (
//         <div className="relative">
//             <select
//                 value={status}
//                 onChange={handleStatusChange}
//                 className={`appearance-none block w-full py-2 px-3 pr-8 text-sm font-semibold rounded-lg border focus:ring-secondary focus:border-secondary transition-colors ${getStatusColor(status)}`}
//             >
//                 {ORDER_STATUSES.map(s => (
//                     <option key={s} value={s}>{s}</option>
//                 ))}
//             </select>
//             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                 <HiOutlineChevronDown className="h-4 w-4" />
//             </div>
//         </div>
//     );
// };


// const AdminOrders = () => {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchOrders();
//     }, []);

//     const fetchOrders = async () => {
//         setLoading(true);
//         try {
//             const response = await fetch(API_URL);
//             if (!response.ok) throw new Error('Failed to fetch orders');

//             let data = await response.json();

//             data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//             setOrders(data);
//         } catch (error) {
//             toast.error(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };


//     const handleLocalStatusUpdate = (orderId, newStatus) => {
//         setOrders(prevOrders =>
//             prevOrders.map(order =>
//                 order.id === orderId ? { ...order, status: newStatus } : order
//             )
//         );
//     };


//     const formatDate = (dateString) => {
//         return new Date(dateString).toLocaleDateString('en-IN', {
//             year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
//         });
//     };

//     if (loading) {
//         return <div className="text-center bold-24 py-10">Loading orders...</div>;
//     }

//     return (
//         <div className="p-4">
//             <h2 className="text-2xl font-bold mb-6 text-gray-800">Customer Orders ({orders.length})</h2>

//             <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-100">
//                 <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer & Address</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items & Qty</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                         {orders.map((order) => (
//                             <tr key={order.id}>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
//                                     #{order.id}
//                                 </td>
//                                 <td className="px-6 py-4 text-sm text-gray-700">
//                                     <p className="font-bold">{order.address.name}</p>
//                                     <p className="text-xs text-gray-500">{order.address.street}, {order.address.city}, PIN: {order.address.pincode}</p>
//                                     <p className="text-xs mt-1 italic">Payment: **{order.paymentMethod}**</p>
//                                 </td>
//                                 <td className="px-6 py-4 text-sm text-gray-700 max-w-xs">
//                                     {order.items.map((item, index) => (
//                                         <p key={index} className="text-xs text-gray-600 truncate">
//                                             **{item.quantity}x** {item.title || item.name}
//                                         </p>
//                                     ))}
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-base font-bold text-black">
//                                     ₹{order.total}
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap">
//                                     <StatusDropdown
//                                         orderId={order.id}
//                                         initialStatus={order.status}
//                                         onStatusUpdateSuccess={handleLocalStatusUpdate}
//                                     />
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
//                                     {formatDate(order.createdAt)}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//             {orders.length === 0 && (
//                 <div className="text-center py-10 text-gray-500">No customer orders found.</div>
//             )}
//         </div>
//     );
// };

// export default AdminOrders;

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineChevronDown } from 'react-icons/hi';

const ORDER_STATUSES = ['Processing', 'Packing', 'Shipped', 'Out for delivery', 'Delivered', 'Cancelled'];

// Pointing to Django backend
const API_URL = 'http://127.0.0.1:8000/api/admin/orders/';

// --- StatusDropdown Component ---
const StatusDropdown = ({ orderId, initialStatus, onStatusUpdateSuccess }) => {
    const [status, setStatus] = useState(initialStatus);
    const token = localStorage.getItem('access_token');

    const getStatusColor = (currentStatus) => {
        switch (currentStatus) {
            case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
            case 'Shipped':
            case 'Out for delivery': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Processing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        const previousStatus = status;

        setStatus(newStatus); // Optimistic UI update

        try {
            const response = await fetch(`${API_URL}${orderId}/update-status/`, {
                method: 'PATCH',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                setStatus(previousStatus);
                toast.error(`Failed to update status for Order #${orderId}`);
                return;
            }

            toast.success(`Order #${orderId} marked as ${newStatus}`);
            onStatusUpdateSuccess(orderId, newStatus);

        } catch (error) {
            setStatus(previousStatus);
            toast.error('Network error during status update.');
        }
    };

    return (
        <div className="relative">
            <select
                value={status}
                onChange={handleStatusChange}
                className={`appearance-none block w-full py-2 px-3 pr-8 text-sm font-semibold rounded-lg border focus:ring-black focus:border-black transition-colors cursor-pointer ${getStatusColor(status)}`}
            >
                {ORDER_STATUSES.map(s => (
                    <option key={s} value={s} className="bg-white text-black">{s}</option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <HiOutlineChevronDown className="h-4 w-4" />
            </div>
        </div>
    );
};


const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_URL, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch orders');

            const data = await response.json();
            // Sorting by date (Django usually returns 'created_at')
            data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setOrders(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLocalStatusUpdate = (orderId, newStatus) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    if (loading) return <div className="text-center py-20 text-gray-500 text-xl animate-pulse">Loading secure order data...</div>;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-extrabold text-gray-900">Manage Orders</h2>
                <span className="bg-black text-white px-4 py-1 rounded-full text-sm font-bold">
                    {orders.length} Total
                </span>
            </div>

            <div className="overflow-hidden bg-white rounded-2xl shadow-xl border border-gray-100">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">ID</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Customer</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Items</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Total</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Date</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-black">#{order.id}</td>
                                <td className="px-6 py-4 text-sm">
                                    <p className="font-bold text-gray-900">{order.customer_name || order.address?.name}</p>
                                    <p className="text-xs text-gray-500 leading-tight">
                                        {order.address?.street}, {order.address?.city}
                                    </p>
                                    <span className="text-[10px] uppercase font-bold text-indigo-600 mt-1 block">
                                        Method: {order.payment_method}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <div className="max-h-20 overflow-y-auto space-y-1">
                                        {order.items.map((item, idx) => (
                                            <p key={idx} className="text-xs text-gray-600 truncate">
                                                <span className="font-bold text-black">{item.quantity}x</span> {item.product_title || item.name}
                                            </p>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-lg font-black text-gray-900">
                                    ₹{order.total_amount || order.total}
                                </td>
                                <td className="px-6 py-4">
                                    <StatusDropdown
                                        orderId={order.id}
                                        initialStatus={order.status}
                                        onStatusUpdateSuccess={handleLocalStatusUpdate}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-400 font-medium">
                                    {formatDate(order.created_at || order.createdAt)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {orders.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-2xl mt-4 border-2 border-dashed border-gray-200">
                    <p className="text-gray-400 font-medium">No customer orders have been placed yet.</p>
                </div>
            )}
        </div>
    );
};

export default AdminOrders;