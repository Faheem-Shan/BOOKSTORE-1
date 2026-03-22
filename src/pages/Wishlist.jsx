// import React, { useContext} from 'react';
// import { useOutletContext } from 'react-router-dom';
// import { CartContext } from '../context/CartContext';

// const Wishlist = () => {
//   const { wishlist, removeFromWishlist, moveToCart } = useContext(CartContext);
//   const { userName } = useOutletContext();

//   return (
//     <section className="max-padd-container py-12 bg-gray-50">
//       <h2 className="text-2xl font-bold mb-6 text-center">Wishlist, {userName}</h2>
//       {wishlist.length === 0 ? (
//         <p className="text-center text-gray-600">Your wishlist is empty. <a href="/shop" className="text-blue-600 hover:underline">Shop now</a>.</p>
//       ) : (
//         <div className="space-y-4">
//           {wishlist.map((item) => (
//             <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
//               <img src={item.image} alt={item.name} className="w-16 h-24 object-cover rounded" />
//               <div className="flex-1 ml-4">
//                 <h3 className="text-sm font-medium">{item.name}</h3>
//                 <p className="text-gray-600">₹{item.offerPrice}.00</p>
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => moveToCart(item)}
//                   className="text-green-600 hover:text-green-800"
//                 >
//                   Move to Cart
//                 </button>
//                 <button
//                   onClick={() => removeFromWishlist(item.id)}
//                   className="text-red-600 hover:text-red-800"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// };

// export default Wishlist;

import React, { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const BACKEND_URL = "http://localhost:8000"; // 👈 change if needed

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useContext(CartContext);
  const { userName } = useOutletContext();

  return (
    <section className="max-padd-container py-12 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Wishlist{userName ? `, ${userName}` : ""}
      </h2>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-600">
          Your wishlist is empty.{" "}
          <a href="/shop" className="text-blue-600 hover:underline">
            Shop now
          </a>
          .
        </p>
      ) : (
        <div className="space-y-4">
          {wishlist.map((item) => {
            const price = item.offer_price ?? item.price;

            return (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
              >
                {/* IMAGE */}
                <img
                  src={
                    item.image
                      ? `${BACKEND_URL}${item.image}`
                      : "/placeholder.png"
                  }
                  alt={item.title}
                  className="w-16 h-24 object-cover rounded"
                />

                {/* INFO */}
                <div className="flex-1 ml-4">
                  <h3 className="text-sm font-medium">{item.title}</h3>
                  <p className="text-gray-600">₹{price}</p>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-3">
                  {/* <button
                    onClick={() => addToCart(item.id, 1)}
                    className="text-green-600 hover:text-green-800"
                  >
                    Move to Cart
                  </button> */}

                  <button
                    onClick={async () => {
                      await addToCart(item.id, 1);      // 1️⃣ add to cart
                      await removeFromWishlist(item.id); // 2️⃣ remove from wishlist
                    }}
                    className="text-green-600 hover:text-green-800"
                  >
                    Move to Cart
                  </button>


                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Wishlist;
