import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartTotal = () => {
  const { cartTotal } = useContext(CartContext);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4">
      <h3 className="text-lg font-semibold mb-2">Cart Total</h3>
      <p className="text-gray-800 font-medium">Total: ₹{cartTotal().toFixed(2)}</p>
    </div>
  );
};

export default CartTotal;
