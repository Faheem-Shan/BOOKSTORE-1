import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate,useOutletContext } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import toast from 'react-hot-toast'; // Using toast for cleaner feedback

const Payment = () => {
    const { cart, cartTotal, placeOrder } = useContext(CartContext);
    const location = useLocation();
    const navigate = useNavigate();
    const address = location.state?.address || {}; // Get address from previous step
    const { userName } = useOutletContext();

    // State for payment selection
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', cardholder: '' });

    // --- Order Calculations (Perfect as they were) ---
    const price = cartTotal();
    const shippingFee = 10.00;
    // const tax = price * 0.02;
    const totalAmount = price + shippingFee ;

    // --- Effects & Handlers ---
    useEffect(() => {
        if (cart.length === 0) {
            navigate('/cart');
            toast.error("Your cart is empty. Please add items.");
        }
        if (!address.name) {
            // If address is missing, redirect back to address form
            navigate('/address', { replace: true });
            toast.error("Please confirm your shipping address.");
        }
    }, [cart, navigate, address.name]);

    const handleCardChange = (e) => {
        setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
    };

    const handlePayment = (e) => {
        e.preventDefault();

        // 1. Basic Validation
        if (paymentMethod === 'card' && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.cardholder)) {
            toast.error('Please fill all card details.');
            return;
        }

        // 2. Place Order (using the robust function from CartContext)
        // For simplicity, we pass empty strings for UPI/Card in placeOrder. 
        // NOTE: The previous code was passing cardDetails.number for Card, which is fine for logging.
        placeOrder(address, paymentMethod, paymentMethod === 'card' ? cardDetails.number : 'N/A');

        // 3. Feedback and Navigation
        toast.success(`Order placed successfully, ${userName}!`);
        navigate('/my-orders');
    };


    return (
        <section className="max-padd-container py-12 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-bold mb-8 text-center">Confirm & Pay, {userName}</h2>

            <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto">

                {/* -------------------- 1. Order Summary (Left Column) -------------------- */}
                <div className="lg:w-1/2 space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <h3 className="text-xl font-semibold mb-4">Shipping To</h3>
                        <p className="font-medium">{address.name}</p>
                        <p className="text-gray-600">{address.street}, {address.city}, {address.pincode}</p>
                        <a href="/address" className="text-sm text-blue-600 hover:underline mt-2 inline-block">Change Address</a>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <h3 className="text-xl font-semibold mb-4">Your Order ({cart.length} items)</h3>
                        <ul className="space-y-2 text-sm max-h-48 overflow-y-auto">
                            {cart.map((item) => (
                                <li key={item.id} className="flex justify-between">
                                    <span className="text-gray-700">{item.name} x {item.quantity}</span>
                                    <span className="font-medium">₹{(item.offerPrice * item.quantity).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-4 pt-4 border-t border-gray-200 space-y-1">
                            <p className="flex justify-between"><span>Subtotal:</span> <span>₹{price.toFixed(2)}</span></p>
                            <p className="flex justify-between"><span>Shipping Fee:</span> <span>₹{shippingFee.toFixed(2)}</span></p>
                            {/* <p className="flex justify-between"><span>Tax (2%):</span> <span>₹{tax.toFixed(2)}</span></p> */}
                            <p className="flex justify-between text-lg font-bold"><span>Total Amount:</span> <span className="text-green-600">₹{totalAmount.toFixed(2)}</span></p>
                        </div>
                    </div>
                </div>

                {/* -------------------- 2. Payment Form (Right Column) -------------------- */}
                <div className="lg:w-1/2">
                    <form onSubmit={handlePayment} className="bg-white p-6 rounded-lg shadow-md space-y-4 border border-gray-200">
                        <h3 className="text-xl font-semibold mb-4">Select Payment Method</h3>

                        {/* Method Selection (Radio Buttons for simplicity) */}
                        <div className="space-y-3">
                            <div
                                className={`p-3 rounded-md border cursor-pointer ${paymentMethod === 'cod' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                                onClick={() => setPaymentMethod('cod')}
                            >
                                <label className="flex items-center space-x-2 font-medium">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="cod"
                                        checked={paymentMethod === 'cod'}
                                        onChange={() => setPaymentMethod('cod')}
                                        className="text-blue-600"
                                    />
                                    <span>Cash on Delivery (COD)</span>
                                </label>
                                <p className="text-xs text-gray-500 mt-1 pl-5">Pay with cash when your order is delivered.</p>
                            </div>

                            <div
                                className={`p-3 rounded-md border cursor-pointer ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                                onClick={() => setPaymentMethod('card')}
                            >
                                <label className="flex items-center space-x-2 font-medium">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="card"
                                        checked={paymentMethod === 'card'}
                                        onChange={() => setPaymentMethod('card')}
                                        className="text-blue-600"
                                    />
                                    <span>Credit/Debit Card</span>
                                </label>
                            </div>
                        </div>

                        {/* Card Details Conditional Inputs */}
                        {paymentMethod === 'card' && (
                            <div className="space-y-4 pt-2">
                                <input
                                    type="text"
                                    name="number"
                                    onChange={handleCardChange}
                                    className="block w-full p-2 border rounded-md shadow-sm"
                                    placeholder="Card Number (4242 4242 4242 4242)"
                                    required
                                />
                                <input
                                    type="text"
                                    name="cardholder"
                                    onChange={handleCardChange}
                                    className="block w-full p-2 border rounded-md shadow-sm"
                                    placeholder="Cardholder Name"
                                    required
                                />
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        name="expiry"
                                        onChange={handleCardChange}
                                        className="block w-1/2 p-2 border rounded-md shadow-sm"
                                        placeholder="MM/YY"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="cvv"
                                        onChange={handleCardChange}
                                        className="block w-1/2 p-2 border rounded-md shadow-sm"
                                        placeholder="CVV"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition mt-4"
                        >
                            Pay ₹{totalAmount.toFixed(2)}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Payment;