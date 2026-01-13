import React, { useContext } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const { userName } = useOutletContext();
  const price = cartTotal();
  const shippingFee = 10.00;
  const tax = price * 0.02;
  const totalAmount = price + shippingFee + tax;

  return (
    <section className="max-padd-container py-12 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-center">Cart, {userName}</h2>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-4">
          {cart.length === 0 ? (
            <p className="text-center text-gray-600">
              Your cart is empty. <a href="/shop" className="text-blue-600 hover:underline">Shop now</a>.
            </p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
                <img src={item.image} alt={item.name} className="w-16 h-24 object-cover rounded" />
                <div className="flex-1 ml-4">
                  <h3 className="text-sm font-medium">{item.name}</h3>
                  <p className="text-gray-600">₹{item.offerPrice}.00 x {item.quantity}</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    // value={item.quantity}
                    // onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    value={item.quantity}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      const quantity = (isNaN(value) || value < 1) ? 1 : value;
                      updateQuantity(item.id, quantity);}}
                    className = "w-16 p-1 border rounded"
                        />
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <p className="text-gray-600 mb-2">Items: {cart.length}</p>
            
          <button
            onClick={() => navigate('/address')}
            className="w-full mt-4 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
            disabled={cart.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;