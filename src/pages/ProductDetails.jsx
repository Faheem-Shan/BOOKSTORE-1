// import React, { useState, useContext, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { CartContext } from '../context/CartContext';
// import { AiFillStar } from 'react-icons/ai';
// import { IoCart } from 'react-icons/io5';
// import { AuthContext } from '../context/AuthContext'; 
// import toast from 'react-hot-toast'; // Good for user feedback

// const ProductDetails = () => {
//   const { id, category } = useParams();
//   const navigate = useNavigate();

//   const { books, addToCart } = useContext(CartContext);
//   const { user } = useContext(AuthContext); 

//   const [book, setBook] = useState(null);
//   const [quantity, setQuantity] = useState(1);

//   // --- 1. Fetch, Map, and Validate Book Data ---
//   useEffect(() => {
//     // 1. Find the book by matching ID and Category (case-insensitive)
//     const foundBookData = books.find(
//       (b) => b.id === id && b.category.toLowerCase() === category.toLowerCase()
//     );

//     if (foundBookData) {
//       // 2. Map the data.jsx keys (title, author) to the component's keys (name, writer)
//       const mappedBook = {
//         ...foundBookData,
//         name: foundBookData.title,
//         writer: foundBookData.author,
//       };
//       setBook(mappedBook);
//     } else {
//       setBook(null);
//     }

//     window.scrollTo(0, 0);
//   }, [id, category, books]);

//   // --- 2. Handlers ---
//   const handleAddToCart = () => {
//     if (!book || !book.instock) return;
//     addToCart({ ...book, quantity });
//     toast.success(`${book.name} (x${quantity}) added to cart!`);
//   };

//   // const handleBuyNow = () => {
//   //   // Add to cart first, then immediately go to checkout
//   //   handleAddToCart();
//   //   navigate('/cart');
//   // };

//     const handleBuyNow = () => {
//     if (!user) {
//       navigate("/login");
//       return;  
//     }

//     addToCart({ ...book, quantity });
//     navigate("/cart");
//   };


//   // --- 3. Loading/Error State ---
//   if (!book) {
//     if (books.length > 0) {
//       return <div className="max-padd-container py-12 text-center text-red-500">Book not found. Please check the URL.</div>;
//     }
//     return <div className="max-padd-container py-12 text-center text-gray-600">Loading book data...</div>;
//   }

//   // --- 4. Simple Placeholder Data for Reviews/Author ---
//   const reviews = [
//     { user: 'Reader A', comment: 'A masterpiece! Couldn\'t put it down.' },
//     { user: 'Bookworm B', comment: 'Great plot and characters. Highly recommended.' },
//   ];

//   const authorDetails = {
//     name: book.writer || 'Unknown Author',
//     bio: 'An acclaimed author known for blending narrative depth with emotional storytelling.',
//   };

//   const isAvailable = book.instock;

//   return (
//     <section className="max-padd-container py-12 bg-gray-50">

//       {/* The main 4-column grid layout for desktop */}
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

//         {/* -------------------- Column 1: Image & Title -------------------- */}
//         <div className="lg:col-span-1">
//           <img
//             src={book.image}
//             alt={book.name}
//             className="w-full h-auto object-contain rounded-lg shadow-xl border border-gray-200"
//           />
//           <div className="mt-4 text-center">
//             <h2 className="text-xl font-bold">{book.name}</h2>
//             <p className="text-gray-700">by {book.writer || 'N/A'}</p>
//           </div>
//         </div>

//         {/* -------------------- Column 2: Details & Reviews -------------------- */}
//         <div className="lg:col-span-2 space-y-6">

//           {/* Author Metadata Box */}
//           <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
//             <h3 className="text-lg font-semibold mb-2">About the Author</h3>
//             <p className="text-gray-700">Name: <span className="font-medium">{authorDetails.name}</span></p>
//             <p className="text-gray-700">Pub. Date: <span className="font-medium">{book.date}</span></p>
//             <p className="text-sm text-gray-500 mt-2 line-clamp-2">{authorDetails.bio}</p>
//           </div>

//           {/* Book Description */}
//           <div>
//             <h3 className="text-2xl font-bold mb-3">Book Summary</h3>
//             <p className="text-gray-700 leading-relaxed">{book.description}</p>
//           </div>

//           {/* Simple Reviews Section */}
//           <div>
//             <h3 className="text-xl font-bold mb-3">Customer Reviews</h3>
//             <div className="flex items-center mb-2">
//               {/* Static 4.0 Star Rating */}
//               {Array(5).fill(0).map((_, i) => (
//                 <AiFillStar key={i} className={i < 4 ? "text-yellow-400" : "text-gray-300"} />
//               ))}
//               <span className="ml-2 text-gray-600 font-medium">4.0 out of 5 (2 reviews)</span>
//             </div>
//             <div className="space-y-3">
//               {reviews.map((review, index) => (
//                 <div key={index} className="border-t pt-2">
//                   <p className="font-semibold text-sm">{review.user}</p>
//                   <p className="text-sm text-gray-600 italic">"{review.comment}"</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* -------------------- Column 3: The Sticky Buy Box -------------------- */}
//         <div className="lg:col-span-1">
//           <div className="bg-white p-5 rounded-lg shadow-xl border border-gray-300 space-y-4 sticky top-4">
//             <p className="text-3xl font-bold text-red-600">
//               <span className='text-xl'>₹</span>{book.offerPrice.toFixed(2)}
//               {/* Show discounted price if different from regular price */}
//               {book.price && book.offerPrice !== book.price && (
//                 <span className="text-sm text-gray-500 line-through ml-2">₹{book.price.toFixed(2)}</span>
//               )}
//             </p>
//             {/* Stock Status Indicator */}
//             <p className={`text-sm font-semibold ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
//               {isAvailable ? 'In Stock. Ready to Ship.' : 'Out of Stock.'}
//             </p>

//             {/* Quantity Selector */}
//             <div className="flex items-center gap-3">
//               <label className="text-base font-medium">Quantity:</label>
//               <input
//                 type="number"
//                 min="1"
//                 value={quantity}
//                 onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
//                 className="w-16 p-1 text-center border rounded-md"
//                 disabled={!isAvailable}
//               />
//             </div>

//             {/* Add to Cart Button */}
//             <button
//               onClick={handleAddToCart}
//               className="w-full flex items-center justify-center bg-blue-500 text-white py-2 rounded-full font-semibold hover:bg-blue-600 transition shadow-md"
//               disabled={!isAvailable}
//             >
//               <IoCart className="mr-2 text-xl" /> Add to Cart
//             </button>

//             {/* Buy Now Button */}
//             <button
//               onClick={handleBuyNow}
//               className="w-full bg-orange-500 text-white py-2 rounded-full font-semibold hover:bg-orange-600 transition shadow-md"
//               disabled={!isAvailable}
//             >
//               Buy Now
//             </button>

//             <p className="text-xs text-gray-500 text-center pt-2">
//               Fast Delivery by Bookly.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProductDetails;

import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { IoCart } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // UPDATED: Backend base URL to fix relative image paths
  const BACKEND_URL = "http://127.0.0.1:8000";

  // ---------------- FETCH PRODUCT ----------------
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // NOTE: Detail endpoints like products/id/ are NOT paginated, 
        // so res.data is the correct object.
        const res = await api.get(`products/${id}/`);
        setBook(res.data);
      } catch (err) {
        console.error("Failed to load product", err);
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  // ---------------- STATES ----------------
  if (loading) {
    return <p className="text-center py-40 animate-pulse">Loading product details...</p>;
  }

  if (!book) {
    return (
      <div className="text-center py-40">
        <p className="text-red-500 text-xl font-semibold">Product not found</p>
        <button onClick={() => navigate('/shop')} className="mt-4 text-blue-500 underline">
          Back to Shop
        </button>
      </div>
    );
  }

  // UPDATED: Fallback logic for price
  const price = book.offer_price ?? book.price;

  // ---------------- UI ----------------
  return (
    <section className="max-padd-container py-12 bg-gray-50">
      {/* UPDATED: Responsive grid - stack on mobile (col-1), side-by-side on lg */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

        {/* ---------------- IMAGE & BASIC INFO ---------------- */}
        <div className="lg:col-span-1">
          {/* UPDATED: Image source check to handle relative media paths from Django */}
          <img
            src={book.image?.startsWith('http') ? book.image : `${BACKEND_URL}${book.image}`}
            alt={book.title}
            className="w-full rounded-xl shadow-lg border bg-white object-contain"
          />
          <h2 className="mt-6 font-bold text-2xl text-gray-800">{book.title}</h2>
          <p className="text-gray-500 text-lg italic">by {book.author}</p>
        </div>

        {/* ---------------- DESCRIPTION & REVIEWS ---------------- */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h3 className="text-2xl font-bold border-b pb-2">Book Summary</h3>
            <p className="text-gray-700 mt-4 leading-relaxed text-justify">
              {book.description}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold">Customer Reviews</h3>
            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, i) => (
                <AiFillStar
                  key={i}
                  className={i < 4 ? "text-yellow-400" : "text-gray-300"}
                />
              ))}
              <span className="ml-2 text-gray-600 font-medium">4.0 out of 5</span>
            </div>
            {/* Review list */}
            <div className="mt-4 space-y-4">
               <div className="bg-white p-3 rounded-lg border-l-4 border-blue-400">
                  <p className="text-sm italic">"A masterpiece! Couldn’t put it down."</p>
                  <span className="text-xs text-gray-400">- Reader A</span>
               </div>
               <div className="bg-white p-3 rounded-lg border-l-4 border-blue-400">
                  <p className="text-sm italic">"Great plot and characters. Highly recommended."</p>
                  <span className="text-xs text-gray-400">- Reader B</span>
               </div>
            </div>
          </div>
        </div>

        {/* ---------------- BUY BOX (STICKY) ---------------- */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-xl space-y-5 sticky top-24 border border-gray-100">

            {/* PRICE SECTION */}
            <div>
              <p className="text-3xl font-bold text-blue-600">
                ₹{Number(price).toFixed(2)}
              </p>
              {book.offer_price && (
                <p className="text-sm text-gray-400 line-through">
                  MRP: ₹{Number(book.price).toFixed(2)}
                </p>
              )}
            </div>

            {/* STOCK STATUS */}
            {/* <div className={`text-sm font-bold px-3 py-1 rounded-full inline-block ${
              book.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}>
              {book.stock > 0 ? `In Stock (${book.stock})` : "Currently Unavailable"}
            </div> */}

            <div className={`text-sm font-bold px-3 py-1 rounded-full inline-block ${
              (typeof book.stock === 'number' ? book.stock > 0 : book.stock === true) 
                ? "bg-green-100 text-green-700" 
                : "bg-red-100 text-red-700"
            }`}>
              {/* If stock is a number, show the count. If it's just 'true', show 'In Stock' */}
              {typeof book.stock === 'number' 
                ? (book.stock > 0 ? `In Stock (${book.stock})` : "Out of Stock")
                : (book.stock === true ? "In Stock" : "Currently Unavailable")
              }
            </div>

            {/* QUANTITY UPDATED: Limit by stock */}
            <div className="flex items-center justify-between border-t pt-4">
              <label className="font-semibold text-gray-700">Quantity:</label>
              <input
                type="number"
                min="1"
                // max={book.stock || 1}
                max={typeof book.stock === 'number' ? book.stock : 100}
                value={quantity}
                // onChange={(e) =>
                //   setQuantity(Math.min(book.stock, Math.max(1, Number(e.target.value) || 1)))
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            
                className="w-16 border-2 border-gray-200 p-1 rounded-md text-center focus:border-blue-400 outline-none"
                disabled={book.stock <= 0 || book.stock === false}
               
              />
            </div>

            {/* ACTION BUTTONS */}
            <div className="space-y-3">
              <button
                disabled={book.stock <= 0}
                onClick={() => {
                  if (!user) return navigate("/login");
                  addToCart(book.id, quantity);
                }}
                className={`w-full py-3 rounded-xl text-white font-bold flex items-center justify-center transition-all ${
                  book.stock > 0
                    ? "bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-lg"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                <IoCart className="mr-2 text-xl" />
                Add to Cart
              </button>

              <button
                disabled={book.stock <= 0}
                onClick={() => {
                  if (!user) return navigate("/login");
                  addToCart(book.id, quantity);
                  navigate("/cart");
                }}
                className={`w-full py-3 rounded-xl text-white font-bold transition-all ${
                  book.stock > 0 
                  ? "bg-orange-500 hover:bg-orange-600 active:scale-95 shadow-lg" 
                  : "bg-gray-300 cursor-not-allowed text-gray-500"
                }`}
              >
                Buy Now
              </button>
            </div>

            <p className="text-[10px] text-gray-400 text-center leading-tight">
              Secure Transaction • Fast Delivery by Bookly
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductDetails;