// import React, { useEffect, useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
// import toast from 'react-hot-toast';

// const AdminOrderStats = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:3000/orders')
//       .then(res => res.json())
//       .then(data => setOrders(data))
//       .catch(err => toast.error('Failed to fetch orders'));
//   }, []);

//   // Prepare chart data
//   const chartData = orders.reduce((acc, order) => {
//     const status = order.status;
//     const existing = acc.find(item => item.status === status);
//     if (existing) existing.count += 1;
//     else acc.push({ status, count: 1 });
//     return acc;
//   }, []);

//   // Summary data
//   const totalOrders = orders.length;
//   const delivered = orders.filter(o => o.status === 'Delivered').length;
//   const processing = orders.filter(o => o.status === 'Processing').length;
//   const cancelled = orders.filter(o => o.status === 'Cancelled').length;

//   // Custom colors for chart
//   const statusColors = {
//     Processing: '#4F46E5',
//     Delivered: '#22C55E',
//     Cancelled: '#EF4444',
//     'Out for delivery': '#F59E0B',
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-8">
//       <h1 className="text-3xl font-bold mb-8 text-gray-800">📊 Order Reports & Analytics</h1>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//         <div className="bg-blue-100 p-5 rounded-2xl shadow-md">
//           <p className="text-sm text-gray-600">Total Orders</p>
//           <h2 className="text-3xl font-bold text-blue-700">{totalOrders}</h2>
//         </div>

//         <div className="bg-green-100 p-5 rounded-2xl shadow-md">
//           <p className="text-sm text-gray-600">Delivered</p>
//           <h2 className="text-3xl font-bold text-green-700">{delivered}</h2>
//         </div>

//         <div className="bg-indigo-100 p-5 rounded-2xl shadow-md">
//           <p className="text-sm text-gray-600">Processing</p>
//           <h2 className="text-3xl font-bold text-indigo-700">{processing}</h2>
//         </div>

//         <div className="bg-red-100 p-5 rounded-2xl shadow-md">
//           <p className="text-sm text-gray-600">Cancelled</p>
//           <h2 className="text-3xl font-bold text-red-700">{cancelled}</h2>
//         </div>
//       </div>

//       {/* Chart */}
//       {orders.length === 0 ? (
//         <p className="text-gray-500 text-center">No orders yet.</p>
//       ) : (
//         <div className="bg-white p-6 rounded-2xl shadow-lg">
//           <h2 className="text-lg font-semibold mb-4 text-gray-700">Order Status Overview</h2>
//           <ResponsiveContainer width="70%" height={400}>
//             <BarChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//               <XAxis dataKey="status" />
//               <YAxis allowDecimals={false} />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="count" radius={[8, 8, 0, 0]}>
//                 {chartData.map((entry, index) => (
//                   <cell
//                     key={`cell-${index}`}
//                     fill={statusColors[entry.status] || '#6366F1'}
//                   />
//                 ))}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminOrderStats;


import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import toast from 'react-hot-toast';

// Updated to point to Django orders endpoint
const API_URL = 'http://127.0.0.1:8000/api/admin/orders/';

const AdminOrderStats = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    
    fetch(API_URL, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Not authorized or server error');
        return res.json();
      })
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(err => {
        toast.error(err.message);
        setLoading(false);
      });
  }, []);

  // Prepare chart data based on Django status fields
  const chartData = orders.reduce((acc, order) => {
    const status = order.status || 'Pending';
    const existing = acc.find(item => item.status === status);
    if (existing) existing.count += 1;
    else acc.push({ status, count: 1 });
    return acc;
  }, []);

  // Summary data calculated from the orders array
  const totalOrders = orders.length;
  const delivered = orders.filter(o => o.status === 'Delivered').length;
  const processing = orders.filter(o => o.status === 'Processing' || o.status === 'Pending').length;
  const cancelled = orders.filter(o => o.status === 'Cancelled').length;

  const statusColors = {
    Pending: '#6366F1',
    Processing: '#4F46E5',
    Delivered: '#22C55E',
    Cancelled: '#EF4444',
    'Out for delivery': '#F59E0B',
  };

  if (loading) return <div className="text-center py-20 text-gray-500">Generating reports...</div>;

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2">
        <span>📊</span> Order Reports & Analytics
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white border-l-4 border-blue-500 p-5 rounded-xl shadow-sm">
          <p className="text-xs uppercase tracking-wider font-semibold text-gray-500">Total Orders</p>
          <h2 className="text-3xl font-bold text-gray-800">{totalOrders}</h2>
        </div>

        <div className="bg-white border-l-4 border-green-500 p-5 rounded-xl shadow-sm">
          <p className="text-xs uppercase tracking-wider font-semibold text-gray-500">Delivered</p>
          <h2 className="text-3xl font-bold text-gray-800">{delivered}</h2>
        </div>

        <div className="bg-white border-l-4 border-indigo-500 p-5 rounded-xl shadow-sm">
          <p className="text-xs uppercase tracking-wider font-semibold text-gray-500">Processing</p>
          <h2 className="text-3xl font-bold text-gray-800">{processing}</h2>
        </div>

        <div className="bg-white border-l-4 border-red-500 p-5 rounded-xl shadow-sm">
          <p className="text-xs uppercase tracking-wider font-semibold text-gray-500">Cancelled</p>
          <h2 className="text-3xl font-bold text-gray-800">{cancelled}</h2>
        </div>
      </div>

      {/* Chart Section */}
      {orders.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 p-10 rounded-2xl text-center">
          <p className="text-gray-500">No order data available for charting.</p>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
          <h2 className="text-lg font-bold mb-6 text-gray-700">Order Status Distribution</h2>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                  dataKey="status" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#6b7280', fontSize: 12}} 
                />
                <YAxis 
                  allowDecimals={false} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#6b7280', fontSize: 12}} 
                />
                <Tooltip 
                  cursor={{fill: '#f9fafb'}}
                  contentStyle={{borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Legend />
                <Bar dataKey="count" name="Number of Orders" radius={[6, 6, 0, 0]} barSize={50}>
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={statusColors[entry.status] || '#6366F1'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrderStats;