import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AiFillStar } from 'react-icons/ai';
import { IoCart } from 'react-icons/io5';
import { AuthContext } from '../context/AuthContext'; 
import toast from 'react-hot-toast'; // Good for user feedback

const ProductDetails = () => {
  const { id, category } = useParams();
  const navigate = useNavigate();

  const { books, addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext); 

  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // --- 1. Fetch, Map, and Validate Book Data ---
  useEffect(() => {
    // 1. Find the book by matching ID and Category (case-insensitive)
    const foundBookData = books.find(
      (b) => b.id === id && b.category.toLowerCase() === category.toLowerCase()
    );

    if (foundBookData) {
      // 2. Map the data.jsx keys (title, author) to the component's keys (name, writer)
      const mappedBook = {
        ...foundBookData,
        name: foundBookData.title,
        writer: foundBookData.author,
      };
      setBook(mappedBook);
    } else {
      setBook(null);
    }

    window.scrollTo(0, 0);
  }, [id, category, books]);

  // --- 2. Handlers ---
  const handleAddToCart = () => {
    if (!book || !book.instock) return;
    addToCart({ ...book, quantity });
    toast.success(`${book.name} (x${quantity}) added to cart!`);
  };

  // const handleBuyNow = () => {
  //   // Add to cart first, then immediately go to checkout
  //   handleAddToCart();
  //   navigate('/cart');
  // };

    const handleBuyNow = () => {
    if (!user) {
      navigate("/login");
      return;  
    }

    addToCart({ ...book, quantity });
    navigate("/cart");
  };


  // --- 3. Loading/Error State ---
  if (!book) {
    if (books.length > 0) {
      return <div className="max-padd-container py-12 text-center text-red-500">Book not found. Please check the URL.</div>;
    }
    return <div className="max-padd-container py-12 text-center text-gray-600">Loading book data...</div>;
  }

  // --- 4. Simple Placeholder Data for Reviews/Author ---
  const reviews = [
    { user: 'Reader A', comment: 'A masterpiece! Couldn\'t put it down.' },
    { user: 'Bookworm B', comment: 'Great plot and characters. Highly recommended.' },
  ];

  const authorDetails = {
    name: book.writer || 'Unknown Author',
    bio: 'An acclaimed author known for blending narrative depth with emotional storytelling.',
  };

  const isAvailable = book.instock;

  return (
    <section className="max-padd-container py-12 bg-gray-50">

      {/* The main 4-column grid layout for desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* -------------------- Column 1: Image & Title -------------------- */}
        <div className="lg:col-span-1">
          <img
            src={book.image}
            alt={book.name}
            className="w-full h-auto object-contain rounded-lg shadow-xl border border-gray-200"
          />
          <div className="mt-4 text-center">
            <h2 className="text-xl font-bold">{book.name}</h2>
            <p className="text-gray-700">by {book.writer || 'N/A'}</p>
          </div>
        </div>

        {/* -------------------- Column 2: Details & Reviews -------------------- */}
        <div className="lg:col-span-2 space-y-6">

          {/* Author Metadata Box */}
          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-lg font-semibold mb-2">About the Author</h3>
            <p className="text-gray-700">Name: <span className="font-medium">{authorDetails.name}</span></p>
            <p className="text-gray-700">Pub. Date: <span className="font-medium">{book.date}</span></p>
            <p className="text-sm text-gray-500 mt-2 line-clamp-2">{authorDetails.bio}</p>
          </div>

          {/* Book Description */}
          <div>
            <h3 className="text-2xl font-bold mb-3">Book Summary</h3>
            <p className="text-gray-700 leading-relaxed">{book.description}</p>
          </div>

          {/* Simple Reviews Section */}
          <div>
            <h3 className="text-xl font-bold mb-3">Customer Reviews</h3>
            <div className="flex items-center mb-2">
              {/* Static 4.0 Star Rating */}
              {Array(5).fill(0).map((_, i) => (
                <AiFillStar key={i} className={i < 4 ? "text-yellow-400" : "text-gray-300"} />
              ))}
              <span className="ml-2 text-gray-600 font-medium">4.0 out of 5 (2 reviews)</span>
            </div>
            <div className="space-y-3">
              {reviews.map((review, index) => (
                <div key={index} className="border-t pt-2">
                  <p className="font-semibold text-sm">{review.user}</p>
                  <p className="text-sm text-gray-600 italic">"{review.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* -------------------- Column 3: The Sticky Buy Box -------------------- */}
        <div className="lg:col-span-1">
          <div className="bg-white p-5 rounded-lg shadow-xl border border-gray-300 space-y-4 sticky top-4">
            <p className="text-3xl font-bold text-red-600">
              <span className='text-xl'>₹</span>{book.offerPrice.toFixed(2)}
              {/* Show discounted price if different from regular price */}
              {book.price && book.offerPrice !== book.price && (
                <span className="text-sm text-gray-500 line-through ml-2">₹{book.price.toFixed(2)}</span>
              )}
            </p>
            {/* Stock Status Indicator */}
            <p className={`text-sm font-semibold ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
              {isAvailable ? 'In Stock. Ready to Ship.' : 'Out of Stock.'}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3">
              <label className="text-base font-medium">Quantity:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 p-1 text-center border rounded-md"
                disabled={!isAvailable}
              />
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center bg-blue-500 text-white py-2 rounded-full font-semibold hover:bg-blue-600 transition shadow-md"
              disabled={!isAvailable}
            >
              <IoCart className="mr-2 text-xl" /> Add to Cart
            </button>

            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              className="w-full bg-orange-500 text-white py-2 rounded-full font-semibold hover:bg-orange-600 transition shadow-md"
              disabled={!isAvailable}
            >
              Buy Now
            </button>

            <p className="text-xs text-gray-500 text-center pt-2">
              Fast Delivery by Bookly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;