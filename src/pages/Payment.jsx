// import React, { useState, useContext, useEffect } from 'react';
// import { useLocation, useNavigate,useOutletContext } from 'react-router-dom';
// import { CartContext } from '../context/CartContext';
// import toast from 'react-hot-toast'; // Using toast for cleaner feedback

// const Payment = () => {
//     const { cart, cartTotal, placeOrder } = useContext(CartContext);
//     const location = useLocation();
//     const navigate = useNavigate();
//     const address = location.state?.address || {}; // Get address from previous step
//     const { userName } = useOutletContext();

//     // State for payment selection
//     const [paymentMethod, setPaymentMethod] = useState('cod');
//     const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', cardholder: '' });

//     // --- Order Calculations (Perfect as they were) ---
//     const price = cartTotal();
//     const shippingFee = 10.00;
//     // const tax = price * 0.02;
//     const totalAmount = price + shippingFee ;

//     // --- Effects & Handlers ---
//     useEffect(() => {
//         if (cart.length === 0) {
//             navigate('/cart');
//             toast.error("Your cart is empty. Please add items.");
//         }
//         if (!address.name) {
//             // If address is missing, redirect back to address form
//             navigate('/address', { replace: true });
//             toast.error("Please confirm your shipping address.");
//         }
//     }, [cart, navigate, address.name]);

//     const handleCardChange = (e) => {
//         setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
//     };

//     const handlePayment = (e) => {
//         e.preventDefault();

//         // 1. Basic Validation
//         if (paymentMethod === 'card' && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.cardholder)) {
//             toast.error('Please fill all card details.');
//             return;
//         }

//         // 2. Place Order (using the robust function from CartContext)
//         // For simplicity, we pass empty strings for UPI/Card in placeOrder. 
//         // NOTE: The previous code was passing cardDetails.number for Card, which is fine for logging.
//         placeOrder(address, paymentMethod, paymentMethod === 'card' ? cardDetails.number : 'N/A');

//         // 3. Feedback and Navigation
//         toast.success(`Order placed successfully, ${userName}!`);
//         navigate('/my-orders');
//     };


//     return (
//         <section className="max-padd-container py-12 bg-gray-50 min-h-screen">
//             <h2 className="text-2xl font-bold mb-8 text-center">Confirm & Pay, {userName}</h2>

//             <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto">

//                 {/* -------------------- 1. Order Summary (Left Column) -------------------- */}
//                 <div className="lg:w-1/2 space-y-6">
//                     <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
//                         <h3 className="text-xl font-semibold mb-4">Shipping To</h3>
//                         <p className="font-medium">{address.name}</p>
//                         <p className="text-gray-600">{address.street}, {address.city}, {address.pincode}</p>
//                         <a href="/address" className="text-sm text-blue-600 hover:underline mt-2 inline-block">Change Address</a>
//                     </div>

//                     <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
//                         <h3 className="text-xl font-semibold mb-4">Your Order ({cart.length} items)</h3>
//                         <ul className="space-y-2 text-sm max-h-48 overflow-y-auto">
//                             {cart.map((item) => (
//                                 <li key={item.id} className="flex justify-between">
//                                     <span className="text-gray-700">{item.name} x {item.quantity}</span>
//                                     <span className="font-medium">₹{(item.offerPrice * item.quantity).toFixed(2)}</span>
//                                 </li>
//                             ))}
//                         </ul>

//                         <div className="mt-4 pt-4 border-t border-gray-200 space-y-1">
//                             <p className="flex justify-between"><span>Subtotal:</span> <span>₹{price.toFixed(2)}</span></p>
//                             <p className="flex justify-between"><span>Shipping Fee:</span> <span>₹{shippingFee.toFixed(2)}</span></p>
//                             {/* <p className="flex justify-between"><span>Tax (2%):</span> <span>₹{tax.toFixed(2)}</span></p> */}
//                             <p className="flex justify-between text-lg font-bold"><span>Total Amount:</span> <span className="text-green-600">₹{totalAmount.toFixed(2)}</span></p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* -------------------- 2. Payment Form (Right Column) -------------------- */}
//                 <div className="lg:w-1/2">
//                     <form onSubmit={handlePayment} className="bg-white p-6 rounded-lg shadow-md space-y-4 border border-gray-200">
//                         <h3 className="text-xl font-semibold mb-4">Select Payment Method</h3>

//                         {/* Method Selection (Radio Buttons for simplicity) */}
//                         <div className="space-y-3">
//                             <div
//                                 className={`p-3 rounded-md border cursor-pointer ${paymentMethod === 'cod' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
//                                 onClick={() => setPaymentMethod('cod')}
//                             >
//                                 <label className="flex items-center space-x-2 font-medium">
//                                     <input
//                                         type="radio"
//                                         name="payment"
//                                         value="cod"
//                                         checked={paymentMethod === 'cod'}
//                                         onChange={() => setPaymentMethod('cod')}
//                                         className="text-blue-600"
//                                     />
//                                     <span>Cash on Delivery (COD)</span>
//                                 </label>
//                                 <p className="text-xs text-gray-500 mt-1 pl-5">Pay with cash when your order is delivered.</p>
//                             </div>

//                             <div
//                                 className={`p-3 rounded-md border cursor-pointer ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
//                                 onClick={() => setPaymentMethod('card')}
//                             >
//                                 <label className="flex items-center space-x-2 font-medium">
//                                     <input
//                                         type="radio"
//                                         name="payment"
//                                         value="card"
//                                         checked={paymentMethod === 'card'}
//                                         onChange={() => setPaymentMethod('card')}
//                                         className="text-blue-600"
//                                     />
//                                     <span>Credit/Debit Card</span>
//                                 </label>
//                             </div>
//                         </div>

//                         {/* Card Details Conditional Inputs */}
//                         {paymentMethod === 'card' && (
//                             <div className="space-y-4 pt-2">
//                                 <input
//                                     type="text"
//                                     name="number"
//                                     onChange={handleCardChange}
//                                     className="block w-full p-2 border rounded-md shadow-sm"
//                                     placeholder="Card Number (4242 4242 4242 4242)"
//                                     required
//                                 />
//                                 <input
//                                     type="text"
//                                     name="cardholder"
//                                     onChange={handleCardChange}
//                                     className="block w-full p-2 border rounded-md shadow-sm"
//                                     placeholder="Cardholder Name"
//                                     required
//                                 />
//                                 <div className="flex gap-4">
//                                     <input
//                                         type="text"
//                                         name="expiry"
//                                         onChange={handleCardChange}
//                                         className="block w-1/2 p-2 border rounded-md shadow-sm"
//                                         placeholder="MM/YY"
//                                         required
//                                     />
//                                     <input
//                                         type="text"
//                                         name="cvv"
//                                         onChange={handleCardChange}
//                                         className="block w-1/2 p-2 border rounded-md shadow-sm"
//                                         placeholder="CVV"
//                                         required
//                                     />
//                                 </div>
//                             </div>
//                         )}

//                         <button
//                             type="submit"
//                             className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition mt-4"
//                         >
//                             Pay ₹{totalAmount.toFixed(2)}
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Payment;
// import React, { useState, useContext, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { CartContext } from "../context/CartContext";
// import toast from "react-hot-toast";

// const Payment = () => {
//   const { cart, cartTotal, placeOrder } = useContext(CartContext);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const address = location.state?.address;

//   const [paymentMethod, setPaymentMethod] = useState("cod");
//   const [cardDetails, setCardDetails] = useState({
//     number: "",
//     expiry: "",
//     cvv: "",
//     cardholder: "",
//   });

//   if (!cart) return null;

//   const price = cartTotal();
//   const shippingFee = 10;
//   const totalAmount = price + shippingFee;

//   useEffect(() => {
//     if (cart.length === 0) {
//       toast.error("Your cart is empty");
//       navigate("/cart");
//     }

//     if (!address) {
//       toast.error("Please confirm your address");
//       navigate("/address");
//     }
//   }, [cart, address, navigate]);

//   const handleCardChange = (e) =>
//     setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });

//   const handlePayment = async (e) => {
//     e.preventDefault();

//     if (
//       paymentMethod === "card" &&
//       Object.values(cardDetails).some((v) => !v)
//     ) {
//       toast.error("Please fill all card details");
//       return;
//     }

//     try {
//       await placeOrder();
//       toast.success("Order placed successfully");
//       navigate("/my-orders");
//     } catch {
//       toast.error("Payment failed");
//     }
//   };

//   return (
//     <section className="max-padd-container py-12 bg-gray-50 min-h-screen">
//       <h2 className="text-2xl font-bold mb-8 text-center">Confirm & Pay</h2>

//       <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto">
//         {/* ORDER SUMMARY */}
//         <div className="lg:w-1/2 space-y-6">
//           <div className="bg-white p-6 rounded-lg shadow">
//             <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
//             <p>{address.name}</p>
//             <p>{address.street}, {address.city}, {address.pincode}</p>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow">
//             <h3 className="text-lg font-semibold mb-4">
//               Order ({cart.length} items)
//             </h3>

//             <ul className="space-y-2">
//               {cart.map((item) => (
//                 <li key={item.id} className="flex justify-between">
//                   <span>
//                     {item.product.title} × {item.quantity}
//                   </span>
//                   <span>
//                     ₹
//                     {(item.product.offer_price ??
//                       item.product.price) * item.quantity}
//                   </span>
//                 </li>
//               ))}
//             </ul>

//             <div className="mt-4 border-t pt-4 space-y-1">
//               <p className="flex justify-between">
//                 <span>Subtotal</span>
//                 <span>₹{price}</span>
//               </p>
//               <p className="flex justify-between">
//                 <span>Shipping</span>
//                 <span>₹{shippingFee}</span>
//               </p>
//               <p className="flex justify-between font-bold text-lg">
//                 <span>Total</span>
//                 <span className="text-green-600">₹{totalAmount}</span>
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* PAYMENT */}
//         <div className="lg:w-1/2">
//           <form onSubmit={handlePayment} className="bg-white p-6 rounded-lg shadow space-y-4">
//             <h3 className="text-lg font-semibold">Payment Method</h3>

//             <label className="flex gap-2 items-center">
//               <input
//                 type="radio"
//                 checked={paymentMethod === "cod"}
//                 onChange={() => setPaymentMethod("cod")}
//               />
//               Cash on Delivery
//             </label>

//             <label className="flex gap-2 items-center">
//               <input
//                 type="radio"
//                 checked={paymentMethod === "card"}
//                 onChange={() => setPaymentMethod("card")}
//               />
//               Card
//             </label>

//             {paymentMethod === "card" && (
//               <>
//                 <input name="number" onChange={handleCardChange} placeholder="Card Number" className="w-full border p-2 rounded" />
//                 <input name="cardholder" onChange={handleCardChange} placeholder="Card Holder" className="w-full border p-2 rounded" />
//                 <div className="flex gap-2">
//                   <input name="expiry" onChange={handleCardChange} placeholder="MM/YY" className="w-1/2 border p-2 rounded" />
//                   <input name="cvv" onChange={handleCardChange} placeholder="CVV" className="w-1/2 border p-2 rounded" />
//                 </div>
//               </>
//             )}

//             <button className="w-full bg-green-600 text-white py-3 rounded font-semibold">
//               Pay ₹{totalAmount}
//             </button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Payment;

import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";

const Payment = () => {
  // 1. Rename cartTotal to getCartTotal to match your Context
  const { cart, getCartTotal, placeOrder } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();

  const address = location.state?.address;

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    cardholder: "",
  });

  // Inside Payment component
const price = getCartTotal();
const taxRate = 0.02; // 2% tax to match your Cart page
const taxAmount = price * taxRate;
const shippingFee = 10;
const totalAmount = price + taxAmount + shippingFee;

  useEffect(() => {
    // 3. Fix cart check: your cart state is { items: [], ... }
    if (cart.items && cart.items.length === 0) {
      toast.error("Your cart is empty");
      navigate("/cart");
    }

    if (!address) {
      toast.error("Please confirm your address");
      navigate("/address");
    }
  }, [cart, address, navigate]);

  if (!cart || !address) return null;

  const handleCardChange = (e) =>
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });

  // const handlePayment = async (e) => {
  //   e.preventDefault();

  //   if (paymentMethod === "card" && Object.values(cardDetails).some((v) => !v)) {
  //     toast.error("Please fill all card details");
  //     return;
  //   }

  //   try {
  //     await placeOrder();
  //     // toast.success inside context or here
  //     navigate("/my-orders");
  //   } catch (err) {
  //     toast.error("Payment failed");
  //   }
  // };


  const handlePayment = async (e) => {
  e.preventDefault();

   if (paymentMethod === "cod") {
    try {
      await placeOrder();
      toast.success("Order placed successfully!");
      navigate("/my-orders");
    } catch {
      toast.error("Order failed");
    }
    return;
  }

  try {

    const res = await fetch("http://127.0.0.1:8000/api/orders/create-payment/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({
        amount: totalAmount
      }),
    });

    const data = await res.json();

    const options = {
      key: data.key,
      amount: data.amount,
      currency: "INR",
      name: "BookStore",
      description: "Book Purchase",
      order_id: data.order_id,

      handler: async function (response) {

        console.log("Payment Success:", response);

        await placeOrder();

        toast.success("Payment Successful!");
        navigate("/my-orders");
      },

      theme: {
        color: "#16a34a"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (error) {
    toast.error("Payment Failed");
  }
};


  return (
    <section className="max-padd-container py-12 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-8 text-center">Confirm & Pay</h2>

      <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto">
        <div className="lg:w-1/2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
            <p className="font-medium">{address.name}</p>
            <p className="text-gray-600">{address.street}, {address.city}, {address.pincode}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">
              Order Summary ({cart.items?.length || 0} items)
            </h3>

            <ul className="space-y-3">
              {/* 4. Fix: Map through cart.items, not cart */}
              {cart.items?.map((item) => (
                <li key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {item.product_title} <span className="text-gray-400">×{item.quantity}</span>
                  </span>
                  <span className="font-medium">
                    ₹{(parseFloat(item.product_offer_price) || parseFloat(item.product_price)) * item.quantity}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-4 border-t pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (2%)</span>
                <span>₹{taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping Fee</span>
                <span>₹{shippingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-xl pt-2 border-t">
                <span>Total Amount</span>
                <span className="text-green-600">₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* PAYMENT METHOD SECTION */}
        <div className="lg:w-1/2">
          <form onSubmit={handlePayment} className="bg-white p-6 rounded-lg shadow space-y-4">
            <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
            
            <div className="space-y-3">
                <label className="flex gap-3 items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition">
                <input
                    type="radio"
                    name="method"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="w-4 h-4 accent-green-600"
                />
                <span className="font-medium text-gray-700">Cash on Delivery (COD)</span>
                </label>

                <label className="flex gap-3 items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition">
                <input
                    type="radio"
                    name="method"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="w-4 h-4 accent-green-600"
                />
                <span className="font-medium text-gray-700">Credit / Debit Card</span>
                </label>
            </div>

            {paymentMethod === "card" && (
              <div className="grid grid-cols-2 gap-3 mt-4 animate-in fade-in duration-300">
                <input name="number" onChange={handleCardChange} placeholder="Card Number" className="col-span-2 border p-2 rounded focus:ring-2 focus:ring-green-500 outline-none" />
                <input name="cardholder" onChange={handleCardChange} placeholder="Card Holder Name" className="col-span-2 border p-2 rounded focus:ring-2 focus:ring-green-500 outline-none" />
                <input name="expiry" onChange={handleCardChange} placeholder="MM/YY" className="border p-2 rounded focus:ring-2 focus:ring-green-500 outline-none" />
                <input name="cvv" onChange={handleCardChange} placeholder="CVV" className="border p-2 rounded focus:ring-2 focus:ring-green-500 outline-none" />
              </div>
            )}

            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-bold text-lg shadow-lg transition-all active:scale-[0.98] mt-6">
              Place Order (₹{totalAmount.toFixed(2)})
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Payment;