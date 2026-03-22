// import React, { useEffect, useState } from 'react';
// import { useOutletContext } from 'react-router-dom';

// const MyOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const { userName } = useOutletContext();

//   useEffect(() => {
//     const userId = JSON.parse(localStorage.getItem('user'))?.id;

//     const fetchOrders = async () => {
//       try {
//         const res = await fetch('http://localhost:3000/orders');
//         const data = await res.json();
//         const userOrders = data.filter(order => order.userId.toString() === userId.toString());
//         setOrders(userOrders.reverse());
//       } catch (error) {
//         console.error("Failed to fetch orders:", error);
//       }
//     };

//     fetchOrders(); // initial fetch
//     const interval = setInterval(fetchOrders, 5000); // fetch every 5 seconds

//     return () => clearInterval(interval); // cleanup on unmount
//   }, []);


//   const handleCancel = async (orderId) => {
//     if (!window.confirm("Are you sure you want to cancel this order?")) return;

//     try {
//       await fetch(`http://localhost:3000/orders/${orderId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: "Cancelled" }),
//       });

//       setOrders(prev =>
//         prev.map(order =>
//           order.id === orderId ? { ...order, status: "Cancelled" } : order
//         )
//       );

//       alert("Order cancelled successfully!");
//     } catch (error) {
//       console.error("Cancel failed:", error);
//       alert("Failed to cancel order");
//     }
//   };




//   return (
//     <section className="max-padd-container py-12 bg-gray-50 min-h-screen">
//       <h2 className="text-2xl font-bold mb-6 text-center">My Orders List, {userName}</h2>

//       <p className="text-center text-gray-700 mb-8">
//         Review the history and status of all your book orders.
//       </p>

//       {orders.length === 0 ? (
//         <p className="text-center text-gray-600">
//           You haven't placed any orders yet. <a href="/shop" className="text-blue-600 hover:underline">Start shopping</a>.
//         </p>
//       ) : (
//         <div className="space-y-6">
//           {orders.map((order) => (
//             <div key={order.id} className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
//               {/* -------------------- 1. Order Items (Visual Row) -------------------- */}
//               <div className="flex flex-row overflow-x-auto pb-2 border-b border-gray-200 gap-6">
//                 {order.items.map((item) => (
//                   <div key={item.id} className="flex-shrink-0 w-48 flex items-center gap-3">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-12 h-16 object-cover rounded"
//                     />
//                     <div>
//                       <p className="font-medium text-sm line-clamp-1 text-gray-900">{item.name}</p>
//                       {/* Enforcing dark gray text on Price and Quantity */}
//                       <p className="text-xs text-gray-700">Price: <span className="font-semibold text-gray-900">₹{item.offerPrice.toFixed(2)}</span></p>
//                       <p className="text-xs text-gray-700">Quantity: <span className="text-gray-900">{item.quantity}</span></p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* -------------------- 2. Order Details and Status -------------------- */}
//               <div className="mt-4 text-sm text-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center">

//                 <div className="space-y-1">

//                   {/* FIX 2: Dark text for the whole line. Making the labels bold (font-semibold) */}
//                   <p><span className="font-semibold text-gray-800">Order ID:</span> <span className="font-mono text-xs text-gray-900">{order.id}</span></p>

//                   {/* FIX 3: Dark text for the whole line */}
//                   <p>
//                     <span className="font-semibold text-gray-800">Payment Status:</span> <span className="font-semibold text-green-700">Done</span> | <span className="font-semibold text-gray-800">Method:</span> <span className="capitalize text-gray-900">{order.paymentMethod.replace(' on Delivery', '').toLowerCase()}</span>
//                   </p>

//                   {/* FIX 4: Dark text for the whole line */}
//                   <p>
//                     <span className="font-semibold text-gray-800">Date:</span> <span className="font-semibold text-gray-900">{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span> | <span className="font-semibold text-gray-800">Amount:</span> <span className="font-bold text-lg text-gray-900">₹{order.total.toFixed(2)}</span>
//                   </p>
//                 </div>

//                 <div className="mt-3 md:mt-0 flex items-center gap-3">
//                   <p className="font-semibold text-sm text-gray-800">
//                     Status: <span className={`font-bold ${order.status === 'Processing'
//                           ? 'text-orange-500'
//                           : order.status === 'Cancelled'
//                             ? 'text-red-600'
//                             : 'text-green-600'
//                         }`}
//                     >
//                       {order.status}
//                     </span>
//                   </p>
//                   <button className="bg-purple-600 text-white py-2 px-4 rounded-full text-xs hover:bg-purple-700 transition shadow-md">
//                     Track Order
//                   </button>

//                   {order.status === "Processing" && (
//                     <button
//                       onClick={() => handleCancel(order.id)}
//                       className="bg-red-600 text-white py-2 px-4 rounded-full text-xs hover:bg-red-700 transition shadow-md"
//                     >
//                       Cancel
//                     </button>)}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// };
// export default MyOrders;
// import React, { useEffect, useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import api from "../api/axios";

// const MyOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const { user } = useContext(AuthContext);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await api.get("orders/");
//         // We use .reverse() to show newest orders first
//         setOrders(res.data.reverse());
//       } catch (err) {
//         console.error("Failed to fetch orders", err);
//       }
//     };
//     fetchOrders();
//   }, []);

//   const handleCancel = async (orderId) => {
//     if (!window.confirm("Are you sure you want to cancel this order?")) return;
//     try {
//       // Assuming your backend has a patch endpoint for this
//       await api.patch(`orders/${orderId}/`, { status: "Cancelled" });
//       setOrders(prev =>
//         prev.map(order => order.id === orderId ? { ...order, status: "Cancelled" } : order)
//       );
//     } catch (err) {
//       alert("Failed to cancel order");
//     }
//   };

//   return (
//     <section className="max-padd-container py-10 bg-gray-50 min-h-screen">
//       <div className="max-w-4xl mx-auto">
//         <h2 className="text-2xl font-bold mb-1 text-center text-gray-800">
//           My Orders List, {user?.username}
//         </h2>
//         <p className="text-center text-gray-500 text-sm mb-8">
//           Review the history and status of all your book orders.
//         </p>

//         {orders.length === 0 ? (
//           <div className="bg-white p-10 rounded-xl shadow-sm text-center border">
//             <p className="text-gray-600 italic">You haven't placed any orders yet.</p>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {orders.map((order) => (
//               <div key={order.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                
//                 {/* 1. HORIZONTAL ORDER ITEMS (Your Old Design Style) */}
//                 <div className="flex flex-row overflow-x-auto pb-3 border-b border-gray-100 gap-6 scrollbar-hide">
//                   {order.items.map((item, index) => (
//                     <div key={index} className="flex-shrink-0 w-56 flex items-center gap-3">
//                       <div className="w-12 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0 shadow-sm">
//                         <img 
//                           src={item.image} 
//                           alt={item.title} 
//                           className="w-full h-full object-cover"
//                           onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=No+Cover"; }}
//                         />
//                       </div>
//                       <div className="overflow-hidden">
//                         <p className="font-bold text-sm text-gray-900 truncate">{item.title}</p>
//                         <p className="text-xs text-gray-600">Price: <span className="font-bold text-gray-900">₹{item.price}</span></p>
//                         <p className="text-xs text-gray-600">Qty: <span className="text-gray-900">{item.quantity}</span></p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* 2. ORDER DETAILS AND STATUS */}
//                 <div className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//                   <div className="space-y-1 text-[13px]">
//                     <p>
//                       <span className="font-bold text-gray-800 uppercase text-[10px] tracking-widest">Order ID:</span> 
//                       <span className="ml-2 font-mono text-gray-900">{order.id}</span>
//                     </p>
//                     <p>
//                       <span className="font-bold text-gray-800">Payment Status:</span> <span className="text-green-600 font-bold">Done</span> 
//                       <span className="mx-2 text-gray-300">|</span> 
//                       <span className="font-bold text-gray-800">Method:</span> <span className="text-gray-700">Cash</span>
//                     </p>
//                     <p>
//                       <span className="font-bold text-gray-800">Date:</span> <span className="text-gray-700">{order.date || "Today"}</span> 
//                       <span className="mx-2 text-gray-300">|</span> 
//                       <span className="font-bold text-gray-800">Amount:</span> <span className="text-lg font-black text-gray-900 ml-1">₹{order.total}</span>
//                     </p>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <p className="text-sm font-bold text-gray-800">
//                       Status: <span className={`ml-1 ${
//                         order.status === 'Processing' ? 'text-orange-500' : 
//                         order.status === 'Cancelled' ? 'text-red-600' : 'text-green-600'
//                       }`}>
//                         {order.status}
//                       </span>
//                     </p>
                    
//                     <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-5 rounded-full text-xs font-bold transition shadow-md active:scale-95">
//                       Track Order
//                     </button>

//                     {order.status === "PENDING" && (
//                       <button
//                         onClick={() => handleCancel(order.id)}
//                         className="bg-red-50 text-red-600 border border-red-100 py-2 px-5 rounded-full text-xs font-bold hover:bg-red-600 hover:text-white transition active:scale-95"
//                       >
//                         Cancel
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default MyOrders;
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("orders/");
        setOrders(res.data.reverse());
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <section className="py-12 bg-gray-50 min-h-screen px-4">
      {/* Increased max-width to 5xl for that "border-to-border" stretched look */}
      <div className="max-w-5xl mx-auto"> 
        <h2 className="text-2xl font-bold mb-1 text-center text-gray-800">
          My Orders List, {user?.username}
        </h2>
        <p className="text-center text-gray-400 text-xs mb-10 uppercase tracking-widest">
          Review the history and status of all your book orders
        </p>

        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-100 shadow-sm">
            <p className="text-gray-400">No orders found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              /* The Single Main Card */
              <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                
                {/* 1. Item Section (Stretched) */}
                <div className="p-6">
                  <div className="flex flex-row overflow-x-auto pb-2 gap-8 scrollbar-hide">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex-shrink-0 w-64 flex items-center gap-4">
                        <div className="w-14 h-20 bg-gray-50 rounded flex-shrink-0 overflow-hidden shadow-inner">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
                          />
                        </div>
                        <div className="flex flex-col">
                          <h4 className="font-bold text-gray-800 text-sm leading-tight mb-1 whitespace-nowrap">{item.title}</h4>
                          <p className="text-[12px] text-gray-500 font-medium">
                            Price: <span className="text-gray-900 font-bold">₹{item.price}</span>
                          </p>
                          <p className="text-[12px] text-gray-500 font-medium">
                            Quantity: <span className="text-gray-900 font-bold">{item.quantity}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Neat Divider */}
                <hr className="border-gray-50 mx-6" />

                {/* 2. Status & Details Section (Same background logic as old design) */}
                <div className="px-6 py-5 bg-gray-50/30 flex flex-wrap justify-between items-center gap-4">
                  <div className="space-y-1 text-[13px]">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Order ID: <span className="text-gray-700 font-mono">{order.id}</span></p>
                    <p className="text-gray-600">
                       Payment Status: <span className="text-green-600 font-bold italic">Done</span> | Method: <span className="font-semibold text-gray-700">Cash</span>
                    </p>
                    <p className="text-gray-800 font-medium pt-1">
                       Date: <span className="text-gray-600">{new Date(order.created_at || Date.now()).toLocaleDateString()}</span> | 
                       <span className="ml-2">Amount:</span> <span className="text-xl font-black text-gray-900 ml-1">₹{order.total}</span>
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-x-4">
                     <div className="flex items-center gap-x-2 mr-2">
                      <span className="text-[11px] font-bold text-gray-400 uppercase">Status:</span>
                      <span className={`px-3 py-1 rounded-md text-[11px] font-black uppercase tracking-tight ${
                          order.status === 'PENDING' || order.status === 'Cancelled' 
                              ? 'bg-red-50 text-red-600'   // Red for Pending/Cancelled
                              : order.status === 'SHIPPED' || order.status === 'Done'
                              ? 'bg-green-50 text-green-600' // Green for Shipped/Done
                              : 'bg-blue-50 text-blue-600'   // Blue for Processing/Packing
                      }`}>
                          {order.status || 'PENDING'}
                      </span>
                  </div>
                    {/* <button className="bg-[#9333ea] hover:bg-purple-700 text-white px-6 py-2 rounded-full text-xs font-bold shadow-md transition-all active:scale-95">
                      Track Order
                    </button> */}
                    
                    {/* {order.status !== 'Cancelled' && (
                       <button className="text-red-500 hover:text-red-700 text-xs font-bold px-2">
                         Cancel
                       </button>
                    )} */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyOrders;