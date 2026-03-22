// // import React, { useContext } from 'react';
// // import { CartContext } from '../context/CartContext';

// // const CartTotal = () => {
// //   const { cartTotal } = useContext(CartContext);

// //   return (
// //     <div className="bg-white p-4 rounded-lg shadow-md mt-4">
// //       <h3 className="text-lg font-semibold mb-2">Cart Total</h3>
// //       <p className="text-gray-800 font-medium">Total: ₹{cartTotal().toFixed(2)}</p>
// //     </div>
// //   );
// // };

// // export default CartTotal;
import React from "react";

const CartTotal = ({ price, tax, shipping, total }) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-gray-700">
        <span>Subtotal</span>
        <span>₹{price.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-gray-700">
        <span>Tax</span>
        <span>₹{tax.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-gray-700">
        <span>Shipping</span>
        <span>₹{shipping.toFixed(2)}</span>
      </div>

      <hr />

      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>₹{total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CartTotal;
