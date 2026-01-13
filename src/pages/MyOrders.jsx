// import React, { useEffect, useState, useOutletContext } from 'react';

// const MyOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const { userName } = useOutletContext();

//   useEffect(() => {
//     fetch('http://localhost:3000/orders')
//       .then((res) => res.json())
//       .then((data) => setOrders(data));
//   }, []);

//   return (
//     <section className="max-padd-container py-12 bg-gray-100">
//       <h2 className="text-2xl font-bold mb-6 text-center">My Orders List, {userName}</h2>
//       {orders.length === 0 ? (
//         <p className="text-center">No orders yet. <a href="/shop" className="text-blue-500 hover:underline">Start shopping</a>.</p>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((order, index) => (
//             <div key={index} className="bg-white p-4 rounded-lg shadow-md">
//               <h3 className="text-lg font-semibold">Order ID: {order.id}</h3>
//               <p>Payment Status: {order.status === 'Processing' ? 'Pending' : 'Done'}</p>
//               <p>Method: {order.paymentMethod}</p>
//               <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
//               <p>Amount: ₹{order.total.toFixed(2)}</p>
//               <p>Status: <span className="text-green-500">{order.status}</span></p>
//               <button className="mt-2 bg-purple-500 text-white py-1 px-2 rounded-md hover:bg-purple-600 transition">Track Order</button>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// };

// export default MyOrders;

import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { userName } = useOutletContext();

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('user'))?.id;

    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:3000/orders');
        const data = await res.json();
        const userOrders = data.filter(order => order.userId.toString() === userId.toString());
        setOrders(userOrders.reverse());
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders(); // initial fetch
    const interval = setInterval(fetchOrders, 5000); // fetch every 5 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, []);


  const handleCancel = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      await fetch(`http://localhost:3000/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Cancelled" }),
      });

      setOrders(prev =>
        prev.map(order =>
          order.id === orderId ? { ...order, status: "Cancelled" } : order
        )
      );

      alert("Order cancelled successfully!");
    } catch (error) {
      console.error("Cancel failed:", error);
      alert("Failed to cancel order");
    }
  };




  return (
    <section className="max-padd-container py-12 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">My Orders List, {userName}</h2>

      <p className="text-center text-gray-700 mb-8">
        Review the history and status of all your book orders.
      </p>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven't placed any orders yet. <a href="/shop" className="text-blue-600 hover:underline">Start shopping</a>.
        </p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
              {/* -------------------- 1. Order Items (Visual Row) -------------------- */}
              <div className="flex flex-row overflow-x-auto pb-2 border-b border-gray-200 gap-6">
                {order.items.map((item) => (
                  <div key={item.id} className="flex-shrink-0 w-48 flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-sm line-clamp-1 text-gray-900">{item.name}</p>
                      {/* Enforcing dark gray text on Price and Quantity */}
                      <p className="text-xs text-gray-700">Price: <span className="font-semibold text-gray-900">₹{item.offerPrice.toFixed(2)}</span></p>
                      <p className="text-xs text-gray-700">Quantity: <span className="text-gray-900">{item.quantity}</span></p>
                    </div>
                  </div>
                ))}
              </div>

              {/* -------------------- 2. Order Details and Status -------------------- */}
              <div className="mt-4 text-sm text-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center">

                <div className="space-y-1">

                  {/* FIX 2: Dark text for the whole line. Making the labels bold (font-semibold) */}
                  <p><span className="font-semibold text-gray-800">Order ID:</span> <span className="font-mono text-xs text-gray-900">{order.id}</span></p>

                  {/* FIX 3: Dark text for the whole line */}
                  <p>
                    <span className="font-semibold text-gray-800">Payment Status:</span> <span className="font-semibold text-green-700">Done</span> | <span className="font-semibold text-gray-800">Method:</span> <span className="capitalize text-gray-900">{order.paymentMethod.replace(' on Delivery', '').toLowerCase()}</span>
                  </p>

                  {/* FIX 4: Dark text for the whole line */}
                  <p>
                    <span className="font-semibold text-gray-800">Date:</span> <span className="font-semibold text-gray-900">{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span> | <span className="font-semibold text-gray-800">Amount:</span> <span className="font-bold text-lg text-gray-900">₹{order.total.toFixed(2)}</span>
                  </p>
                </div>

                <div className="mt-3 md:mt-0 flex items-center gap-3">
                  <p className="font-semibold text-sm text-gray-800">
                    Status: <span className={`font-bold ${order.status === 'Processing'
                          ? 'text-orange-500'
                          : order.status === 'Cancelled'
                            ? 'text-red-600'
                            : 'text-green-600'
                        }`}
                    >
                      {order.status}
                    </span>
                  </p>
                  <button className="bg-purple-600 text-white py-2 px-4 rounded-full text-xs hover:bg-purple-700 transition shadow-md">
                    Track Order
                  </button>

                  {order.status === "Processing" && (
                    <button
                      onClick={() => handleCancel(order.id)}
                      className="bg-red-600 text-white py-2 px-4 rounded-full text-xs hover:bg-red-700 transition shadow-md"
                    >
                      Cancel
                    </button>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
export default MyOrders;