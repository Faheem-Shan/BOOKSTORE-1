// import React, { useContext } from 'react';
// import { useOutletContext } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { CartContext } from '../context/CartContext';
// import { AuthContext } from '../context/AuthContext';
// import CartTotal from '../components/CartTotal';

// const Cart = () => {
//   const { cart, removeFromCart, updateQuantity, cartTotal } = useContext(CartContext);
//   const { user } = useContext(AuthContext);

//   const navigate = useNavigate();
//   const { userName } = useOutletContext();
//   const price = cartTotal();
//   const shippingFee = 10.00;
//   const tax = price * 0.02;
//   const totalAmount = price + shippingFee + tax;

//   return (
//     <section className="max-padd-container py-12 bg-gray-50">
//       <h2 className="text-2xl font-bold mb-6 text-center">Cart, {userName}</h2>
//       <div className="flex flex-col lg:flex-row gap-6">
//         <div className="flex-1 space-y-4">
//           {cart.length === 0 ? (
//             <p className="text-center text-gray-600">
//               Your cart is empty. <a href="/shop" className="text-blue-600 hover:underline">Shop now</a>.
//             </p>
//           ) : (
//             cart.map((item) => (
//               <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
//                 <img src={item.image} alt={item.name} className="w-16 h-24 object-cover rounded" />
//                 <div className="flex-1 ml-4">
//                   <h3 className="text-sm font-medium">{item.name}</h3>
//                   <p className="text-gray-600">₹{item.offerPrice}.00 x {item.quantity}</p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <input
//                     type="number"
//                     min="1"
//                     // value={item.quantity}
//                     // onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
//                     value={item.quantity}
//                     onChange={(e) => {
//                       const value = parseInt(e.target.value);
//                       const quantity = (isNaN(value) || value < 1) ? 1 : value;
//                       updateQuantity(item.id, quantity);}}
//                     className = "w-16 p-1 border rounded"
//                         />
//                         <button
//                           onClick={() => removeFromCart(item.id)}
//                           className="text-red-600 hover:text-red-800"
//                         >
//                           Remove
//                         </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//         <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
//           <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
//           <p className="text-gray-600 mb-2">Items: {cart.length}</p>
            
//           <button
//             onClick={() => navigate('/address')}
//             className="w-full mt-4 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
//             disabled={cart.length === 0}
//           >
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Cart;

import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import CartTotal from "../components/CartTotal";

const BACKEND_URL = "http://127.0.0.1:8000";

const Cart = () => {
  // Added getCartTotal from context to keep logic centralized
  const { cart, removeFromCart, getCartTotal } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!cart || !cart.items) {
    return <p className="text-center py-20">Loading cart...</p>;
  }

  const items = cart.items;

  // ✅ UPDATED CALCULATION: Using the flattened field names from your Serializer
  const subtotal = getCartTotal(); 
  const shippingFee = items.length > 0 ? 10 : 0;
  const tax = subtotal * 0.02;
  const totalAmount = subtotal + shippingFee + tax;

  return (
    <section className="max-padd-container py-12 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Cart, {user?.username}
      </h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* CART ITEMS */}
        <div className="flex-1 space-y-4">
          {items.length === 0 ? (
            <div className="text-center bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-600">Your cart is empty.</p>
              <button 
                onClick={() => navigate("/shop")}
                className="mt-4 text-blue-600 hover:underline"
              >
                Shop now
              </button>
            </div>
          ) : (
            items.map((item) => {
              // UPDATED: Logic to determine the correct price to display
              const isOfferActive = item.product_offer_price && Number(item.product_offer_price) > 0;
              const displayPrice = isOfferActive ? item.product_offer_price : item.product_price;

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
                >
                  <img
                    src={`${BACKEND_URL}${item.product_image}`}
                    alt={item.product_title}
                    className="w-16 h-24 object-cover rounded"
                  />

                  <div className="flex-1 ml-4">
                    <h3 className="text-sm font-medium">
                      {item.product_title}
                    </h3>
                    <div className="flex items-center gap-2">
                        {/* Display the active price (Offer or Original) */}
                        <p className="text-blue-600 font-bold">
                           ₹{Number(displayPrice).toFixed(2)}
                        </p>
                        
                        {/* If offer exists, show original price with strike-through */}
                        {isOfferActive && (
                           <p className="line-through text-xs text-gray-400">
                             ₹{Number(item.product_price).toFixed(2)}
                           </p>
                        )}
                        
                        <p className="text-gray-500 text-sm italic">
                           × {item.quantity}
                        </p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product)}
                    className="text-red-600 hover:text-red-800 font-semibold text-sm transition-colors"
                  >
                    Remove
                  </button>
                </div>
              );
            })
          )}
        </div>
        
        {/* ORDER SUMMARY */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow-md h-fit">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

          <CartTotal
            price={subtotal}
            tax={tax}
            shipping={shippingFee}
            total={totalAmount}
          />

          <button
            onClick={() => navigate("/address")}
            className="w-full mt-4 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition disabled:bg-gray-400"
            disabled={items.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;