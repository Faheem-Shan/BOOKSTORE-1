// import React, { createContext, useState, useEffect, useContext } from 'react';
// import { useAuth } from './AuthContext';
// import { dummyBooks } from "../assets/data";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const { user } = useAuth();
//   const [cart, setCart] = useState([]);
//   const [wishlist, setWishlist] = useState([]);
//   const [books, setBooks] = useState([]);

//  useEffect(() => {
//   setBooks(dummyBooks);
// }, []);


//   const saveCartToUser = async (newCart) => {
//     if (user) {
//       await fetch(`http://localhost:3000/users/${user.id}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ cart: newCart }),
//       });
//     }
//   };

//   // add the wishlist store
//   const saveWishlistToUser = async (newWishlist) => {
//     if (user) {
//       await fetch(`http://localhost:3000/users/${user.id}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ wishlist: newWishlist }),
//       });
//       setUser({ ...user, wishlist: newWishlist }); // update user state
//     }
//   };

//   const addToCart = (book) => {
//     setCart((prev) => {
//       const newCart = prev.find((item) => item.id === book.id)
//         ? prev.map((item) =>
//           item.id === book.id ? { ...item, quantity: item.quantity + book.quantity } : item
//         )
//         : [...prev, { ...book, quantity: book.quantity }];
//       saveCartToUser(newCart);
//       return newCart;
//     });
//   };

//   const removeFromCart = (id) => {
//     const newCart = cart.filter((item) => item.id !== id);
//     setCart(newCart);
//     saveCartToUser(newCart);
//   };

//   const updateQuantity = (id, quantity) => {
//     const newCart = cart.map((item) =>
//       item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
//     );
//     setCart(newCart);
//     saveCartToUser(newCart);
//   };

//   const addToWishlist = (book) => {
//     if (!wishlist.find((item) => item.id === book.id)) {
//       setWishlist((prev) => {
//         const newWishlist = [...prev, book];
//         saveWishlistToUser(newWishlist); 
//         return newWishlist;
//       });
//     }
//   };


//     const removeFromWishlist = (id) => {
//     setWishlist((prev) => {
//       const newWishlist = prev.filter((item) => item.id !== id);
//       saveWishlistToUser(newWishlist); 
//       return newWishlist;
//     });
//   };

//   const manageWishlist = (book, action) => {
//     if (action === 'add') {
//       addToWishlist(book);
//     } else if (action === 'remove') {
//       removeFromWishlist(book.id);
//     }
//   };

//   const moveToCart = (book) => {
//     removeFromWishlist(book.id);
//     addToCart({ ...book, quantity: 1 });
//   };

//   const cartTotal = () => cart.reduce((total, item) => total + item.offerPrice * item.quantity, 0);

//   const placeOrder = async (address, paymentMethod, upiId = '') => {
//     const order = {
//       userId: user.id,
//       items: cart.map((item) => ({ ...item, id: item.id.toString() })),
//       address,
//       total: cartTotal(),
//       paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' : `UPI (${upiId})`,
//       status: 'Processing',
//       createdAt: new Date().toISOString(),
//     };

//     await fetch('http://localhost:3000/orders', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(order),
//     });

//     const updatedBooks = books.map((book) => {
//       const cartItem = cart.find((item) => item.id === book.id);
//       return cartItem ? { ...book, count: book.count - cartItem.quantity } : book;
//     });
//     await Promise.all(
//       updatedBooks.map((book) =>
//         fetch(`http://localhost:3000/products/${book.id}`, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(book),
//         })
//       )
//     );
//     setBooks(updatedBooks);
//     setCart([]);
//     saveCartToUser([]);
//   };

//   return (
//     <CartContext.Provider value={{ books, cart, wishlist, addToCart, removeFromCart, updateQuantity, addToWishlist, removeFromWishlist, manageWishlist, moveToCart, cartTotal, placeOrder }}>
//       {children}
//     </CartContext.Provider>
//   );
// };


// import React, { createContext, useContext, useEffect, useState } from "react";
// import api from "../api/axios";
// import { AuthContext } from "./AuthContext";
// import toast from "react-hot-toast";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const { user } = useContext(AuthContext);

//   const [cart, setCart] = useState({ items: [], total_price: 0 });
//   const [wishlist, setWishlist] = useState([]);
//   const [loadingCart, setLoadingCart] = useState(false);


//   // ---------------- FETCH CART ----------------
//   const fetchCart = async () => {
//   if (!user) {
//     setCart(null);
//     return;
//   }

//   try {
//     setLoadingCart(true);
//     const res = await api.get("cart/");
//     setCart(res.data || { items: [], total_price: 0 }); 
//   } catch (err) {
//     console.error(err);
//     setCart({ items: [], total_price: 0 });
//   } finally {
//     setLoadingCart(false);
//   }
// };

// const getCartTotal = () => {
//   if (!cart?.items) return 0;
//   return cart.items.reduce((acc, item) => {
//     // Force conversion to Number to avoid NaN
//     const price = Number(item.product.price) || 0;
//     return acc + (price * item.quantity);
//   }, 0);
// };


//   // ---------------- ADD TO CART ----------------
//   const addToCart = async (productId, quantity = 1) => {
//     if (!user) return;

//     try {
//       await api.post("cart/add/", {
//         product_id: productId,
//         quantity,
//       });
//       fetchCart();
//       toast.success("Added to cart");
//     } catch {
//       toast.error("Failed to add to cart");
//     }
//   };

//   // ---------------- REMOVE FROM CART ----------------
//   // const removeFromCart = async (productId) => {
//   //   try {
//   //     await api.post("cart/remove/", {
//   //       product_id: productId,
//   //     });
//   //     fetchCart();
//   //   } catch {
//   //     toast.error("Failed to remove item");
//   //   }
//   // };

//   const removeFromCart = async (productId) => {
//   await api.post("cart/remove/", { product_id: productId });
//   fetchCart();
// };





//   // ---------------- FETCH WISHLIST ----------------
//   const fetchWishlist = async () => {
//     if (!user) {
//       setWishlist([]);
//       return;
//     }

//     try {
//       const res = await api.get("wishlist/");
//       setWishlist(res.data.products);
//     } catch {
//       setWishlist([]);
//     }
//   };

//   // ---------------- WISHLIST ACTIONS ----------------
//   const addToWishlist = async (productId) => {
//     if (!user) return;
//     await api.post("wishlist/add/", { product_id: productId });
//     fetchWishlist();
//   };

//  const removeFromWishlist = async (productId) => {
//   if (!user) return;
//   await api.post("wishlist/remove/", { product_id: productId });
//   fetchWishlist();
// };


//   // ---------------- PLACE ORDER ----------------
//   const placeOrder = async () => {
//     try {
//       await api.post("orders/place/");
//       toast.success("Order placed successfully");
//       fetchCart();
//     } catch {
//       toast.error("Order failed");
//     }
//   };

//   // ---------------- EFFECT ----------------
//  useEffect(() => {
//   if (user) {
//     fetchCart();
//     fetchWishlist();
//   } else {
//     setCart(null);
//     setWishlist([]);
//   }
// }, [user]);


//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         wishlist,
//         loadingCart,
//         addToCart,
//         removeFromCart,
//         addToWishlist,
//         removeFromWishlist,
//         placeOrder,
//         fetchCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };


import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [cart, setCart] = useState({ items: [], total_price: 0 });
  const [wishlist, setWishlist] = useState([]);
  const [loadingCart, setLoadingCart] = useState(false);

  // ---------------- FETCH CART ----------------
  const fetchCart = async () => {
    if (!user) {
      setCart({ items: [], total_price: 0 });
      return;
    }

    try {
      setLoadingCart(true);
      const res = await api.get("cart/");
      // Django now returns items with 'product_price', 'product_title', etc.
      setCart(res.data || { items: [], total_price: 0 }); 
    } catch (err) {
      console.error("Fetch Cart Error:", err);
      setCart({ items: [], total_price: 0 });
    } finally {
      setLoadingCart(false);
    }
  };

  // ---------------- CALCULATE TOTAL ----------------
// Inside CartContext.js
  const getCartTotal = () => {
    if (!cart || !cart.items) return 0;

    return cart.items.reduce((total, item) => {
      // Check if offer_price exists and is valid, otherwise use product_price
      const activePrice = item.product_offer_price && Number(item.product_offer_price) > 0 
        ? Number(item.product_offer_price) 
        : Number(item.product_price);
        
      return total + (activePrice * item.quantity);
    }, 0);
  };
  // ---------------- ADD TO CART ----------------
  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }

    try {
      await api.post("cart/add/", {
        product_id: productId,
        quantity,
      });
      fetchCart();
      toast.success("Added to cart");
    } catch (err) {
      toast.error("Failed to add to cart");
    }
  };

  // ---------------- REMOVE FROM CART ----------------
  const removeFromCart = async (productId) => {
    try {
      await api.post("cart/remove/", { product_id: productId });
      fetchCart();
      toast.success("Removed from cart");
    } catch (err) {
      toast.error("Failed to remove item");
    }
  };

  // ---------------- FETCH WISHLIST ----------------
  const fetchWishlist = async () => {
    if (!user) {
      setWishlist([]);
      return;
    }

    try {
      const res = await api.get("wishlist/");
      setWishlist(res.data.products || res.data || []);
    } catch (err) {
      setWishlist([]);
    }
  };

  // ---------------- WISHLIST ACTIONS ----------------
  const addToWishlist = async (productId) => {
    if (!user) return;
    try {
      await api.post("wishlist/add/", { product_id: productId });
      fetchWishlist();
      toast.success("Added to wishlist");
    } catch (err) {
      toast.error("Error updating wishlist");
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!user) return;
    try {
      await api.post("wishlist/remove/", { product_id: productId });
      fetchWishlist();
    } catch (err) {
      toast.error("Error removing from wishlist");
    }
  };

  // ---------------- PLACE ORDER ----------------
  const placeOrder = async () => {
    try {
      await api.post("orders/place/");
      toast.success("Order placed successfully");
      fetchCart();
    } catch (err) {
      toast.error("Order failed");
    }
  };

  // ---------------- EFFECT ----------------
  useEffect(() => {
    if (user) {
      fetchCart();
      fetchWishlist();
    } else {
      setCart({ items: [], total_price: 0 });
      setWishlist([]);
    }
  }, [user]);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        loadingCart,
        addToCart,
        removeFromCart,
        addToWishlist,
        removeFromWishlist,
        placeOrder,
        fetchCart,
        getCartTotal, 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};