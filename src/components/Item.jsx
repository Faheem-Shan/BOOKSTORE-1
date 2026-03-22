// import React, { useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { TbShoppingBagPlus } from 'react-icons/tb';
// // Use the heart icon for the wishlist for better UX/semantics
// import { FaRegHeart, FaHeart } from 'react-icons/fa';
// import { CartContext } from '../context/CartContext';

// const Item = ({ book, fromHero }) => {
//     const { addToCart, manageWishlist, wishlist } = useContext(CartContext);
//     const navigate = useNavigate();

    
//     const isInWishlist = wishlist.some((item) => item.id === book.id);

//     // Handlers
//     const handleAddToCart = () => addToCart(book);
//     const handleWishlist = () => manageWishlist(book, isInWishlist ? 'remove' : 'add');

//     const imageClasses = fromHero
//         ? 'w-full h-72 object-cover rounded-lg'
//         : 'w-full h-65 object-cover rounded-lg';

//     const detailPath = `/shop/${book.category.toLowerCase()}/${book.id}`

//     return book ? (
//         <div className={`overflow-hidden sm:p-4 transition-shadow duration-300 hover:shadow-lg ${fromHero ? 'bg-white' : 'sm:bg-primary'}`}>

//             {/* IMAGE */}
//             <Link to={detailPath}>
//                 <div className="overflow-hidden rounded-xl shadow-[0px_0px_2px_0px_rgba(0,_0,_0,_0.1)] flex justify-center items-center">
//                     <img src={book.image} alt={book.title} className={imageClasses} />
//                 </div>
//             </Link>

//             {/* INFO */}
//             <div className="pt-4">
//                 <div className="flexBetween gap-2">
//                     <Link to={detailPath}>
//                         <h4 className="h5 line-clamp-1">{book.title}</h4>
//                     </Link>

//                     {/* PRICE DISPLAY LOGIC (NOW USING book.price) */}
//                     <div className="flex flex-col items-end whitespace-nowrap">
//                         {/* 1. Original Price (Cut) - Conditional Render */}
//                         {book.price && book.price > book.offerPrice && (
//                             <span className="text-gray-400 line-through text-xs">
//                                 ₹{book.price}.00
//                             </span>
//                         )}
//                         {/* 2. Offer Price - Always Render */}
//                         <span className="text-secondary bold-15">
//                             ₹{book.offerPrice}.00
//                         </span>
//                     </div>
//                 </div>

//                 <div className="flex justify-between items-start gap-2 mt-1">
//                     <p className="line-clamp-1 text-gray-600 text-sm">{book.description}</p>
//                     <div className="flex gap-2 items-center">
//                         {/* 1. WISHLIST BUTTON */}
//                         <button onClick={handleWishlist} className="text-red-500 hover:text-red-700 transition-colors">
//                             {isInWishlist ? <FaHeart className="text-xl" /> : <FaRegHeart className="text-xl" />}
//                         </button>
//                         {/* 2. ADD TO CART BUTTON */}
//                         <button onClick={handleAddToCart} className="text-blue-500 hover:text-blue-700 transition-colors">
//                             <TbShoppingBagPlus className="text-xl" />
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     ) : (
//         <div className="p-5 text-red-600 text-sm rounded-md">No book found!</div>
//     );
// };

// export default Item;


import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbShoppingBagPlus } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import toast from "react-hot-toast";

import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

// Define backend URL for images
const BACKEND_URL = "http://127.0.0.1:8000";

const Item = ({ book }) => {
  const { user } = useContext(AuthContext);
  const { addToCart, addToWishlist } = useContext(CartContext);
  const navigate = useNavigate();

  const isOutOfStock = !book.stock;
  

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
    addToCart(book.id, 1);
  };

  const handleWishlist = () => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
    addToWishlist(book.id);
  };

  // const categorySlug = book.category?.name?.toLowerCase();
  const detailPath = `/product/${book.id}`;

  return (
    <div className={`overflow-hidden sm:p-4 bg-white rounded-xl h-full flex flex-col transition-all duration-300 ${
      // Apply grayscale and opacity to the whole card if out of stock
      isOutOfStock ? "opacity-75 grayscale shadow-none" : "hover:shadow-lg"
    }`}>
      {/* IMAGE - Prefixed with Backend URL */}
      <Link to={detailPath}>
        <img
          src={book.image?.startsWith('http') ? book.image : `${BACKEND_URL}${book.image}`}
          alt={book.title}
          className={`w-full h-64 object-contain rounded-lg bg-gray-100 transition-all ${
            // Blur effect specifically for the image
            isOutOfStock ? "blur-[2px]" : ""
          }`}
        />

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/20 rounded-lg">
            <span className="bg-red-600 text-white px-3 py-1 rounded-md font-bold uppercase text-[10px] tracking-widest shadow-lg">
              Out of Stock
            </span>
          </div>
        )}

      </Link>

      {/* INFO */}
      <div className="pt-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start">
          <h4 className="font-semibold line-clamp-1 flex-1">{book.title}</h4>

          <div className="text-right ml-2">
            {book.offer_price && (
              <p className="line-through text-xs text-gray-400">
                ₹{Number(book.price)}
              </p>
            )}
            <p className="text-secondary font-bold">
              ₹{Number(book.offer_price ?? book.price)}
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mt-1 flex-grow">
          {book.description}
        </p>

        <div className="flex justify-end gap-3 mt-3">
          <button onClick={handleWishlist} className="text-red-500 hover:scale-110 transition">
            <FaRegHeart size={18} />
          </button>
          {/* <button onClick={handleAddToCart} className="text-blue-500 hover:scale-110 transition">
           */}
           <button 
            onClick={handleAddToCart} 
            disabled={isOutOfStock} // Disable click
            className={`transition ${
              isOutOfStock 
                ? "text-gray-300 cursor-not-allowed" 
                : "text-blue-500 hover:scale-110"
            }`}
          >
            <TbShoppingBagPlus size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;