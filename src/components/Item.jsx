// import React, { useContext } from 'react'
// import { TbShoppingBagPlus } from 'react-icons/tb';


// const Item= ({book,fromHero}) =>{

//     const {navigate,currency,}=useContext(ShopContext);
//     const imageClassName =fromHero ? 'hero-image-size': 'book-cover-image'

//     return book ? ( 
//         <div className={`overflow-hidden sm:p-4 ${fromHero ? "bg-white" : "sm:bg-primary"}`}>
//             {/* IMAGE */}
//             <div className='overflow-hidden rounded-xl shadow-[0px_0px_2px_0px_rgba(0,_0,_0,_0.1)]'>
//                 <img src={book.image} alt='book.name' className={imageClassName} />
//             </div>
//      {/* INFO */}
//         <div className='pt-4'>
//             <div className='flexBetween gap-2'>
//                 <h4 className='h5 line-clamp-1'>{book.title}</h4>
//                 <p className='text-secondary bold-15'>{currency}{book.offerPrice}.00</p>
//             </div>
//             <div className='flex justify-between items-start gap-2 mt-1'>
//                 <p className='line-clamp-1'>{book.description}</p>
//                 <button className='cursor-pointer'><TbShoppingBagPlus className='text-xl' /></button>
//             </div>
//         </div>
//         </div>
//     ) : (
//         <div className='p-5 text-red-600 text-sm rounded-md'>
//             No book found!
//         </div>
//     )
// } 
// export default Item;


import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TbShoppingBagPlus } from 'react-icons/tb';
// Use the heart icon for the wishlist for better UX/semantics
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';

const Item = ({ book, fromHero }) => {
    const { addToCart, manageWishlist, wishlist } = useContext(CartContext);
    const navigate = useNavigate();

    
    const isInWishlist = wishlist.some((item) => item.id === book.id);

    // Handlers
    const handleAddToCart = () => addToCart(book);
    const handleWishlist = () => manageWishlist(book, isInWishlist ? 'remove' : 'add');

    const imageClasses = fromHero
        ? 'w-full h-72 object-cover rounded-lg'
        : 'w-full h-65 object-cover rounded-lg';

    const detailPath = `/shop/${book.category.toLowerCase()}/${book.id}`

    return book ? (
        <div className={`overflow-hidden sm:p-4 transition-shadow duration-300 hover:shadow-lg ${fromHero ? 'bg-white' : 'sm:bg-primary'}`}>

            {/* IMAGE */}
            <Link to={detailPath}>
                <div className="overflow-hidden rounded-xl shadow-[0px_0px_2px_0px_rgba(0,_0,_0,_0.1)] flex justify-center items-center">
                    <img src={book.image} alt={book.title} className={imageClasses} />
                </div>
            </Link>

            {/* INFO */}
            <div className="pt-4">
                <div className="flexBetween gap-2">
                    <Link to={detailPath}>
                        <h4 className="h5 line-clamp-1">{book.title}</h4>
                    </Link>

                    {/* PRICE DISPLAY LOGIC (NOW USING book.price) */}
                    <div className="flex flex-col items-end whitespace-nowrap">
                        {/* 1. Original Price (Cut) - Conditional Render */}
                        {book.price && book.price > book.offerPrice && (
                            <span className="text-gray-400 line-through text-xs">
                                ₹{book.price}.00
                            </span>
                        )}
                        {/* 2. Offer Price - Always Render */}
                        <span className="text-secondary bold-15">
                            ₹{book.offerPrice}.00
                        </span>
                    </div>
                </div>

                <div className="flex justify-between items-start gap-2 mt-1">
                    <p className="line-clamp-1 text-gray-600 text-sm">{book.description}</p>
                    <div className="flex gap-2 items-center">
                        {/* 1. WISHLIST BUTTON */}
                        <button onClick={handleWishlist} className="text-red-500 hover:text-red-700 transition-colors">
                            {isInWishlist ? <FaHeart className="text-xl" /> : <FaRegHeart className="text-xl" />}
                        </button>
                        {/* 2. ADD TO CART BUTTON */}
                        <button onClick={handleAddToCart} className="text-blue-500 hover:text-blue-700 transition-colors">
                            <TbShoppingBagPlus className="text-xl" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="p-5 text-red-600 text-sm rounded-md">No book found!</div>
    );
};

export default Item;