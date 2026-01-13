// import React, { createContext, useState, useEffect, useContext } from 'react';
// import { dummyBooks } from '../assets/data';

// export const CartContext = createContext(); 

// export const CartProvider = ({ children }) => {
//     // Initialize the 'books' state using your imported dummyBooks.
//   const [books] = useState(dummyBooks);
//   const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
//   const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem('wishlist')) || []);

//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart));
//     localStorage.setItem('wishlist', JSON.stringify(wishlist));
//   }, [cart, wishlist]);

//   const addToCart = (book) => {
//     setCart((prev) => {
//       const existing = prev.find((item) => item.id === book.id);
//       return existing ? prev.map((item) =>
//         item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
//       ) : [...prev, { ...book, quantity: 1 }];
//     });
//   };

//   const removeFromCart = (id) => {
//     setCart((prev) => prev.filter((item) => item.id !== id));
//   };

//   const updateQuantity = (id, quantity) => {
//     setCart((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
//       )
//     );
//   };

//   const addToWishlist = (book) => {
//     if (!wishlist.find((item) => item.id === book.id)) {
//       setWishlist((prev) => [...prev, book]);
//     }
//   };

//   const removeFromWishlist = (id) => {
//     setWishlist((prev) => prev.filter((item) => item.id !== id));
//   };

//   const manageWishlist = (book, action) => {
//     if (action === 'add') addToWishlist(book);
//     if (action === 'remove') removeFromWishlist(book.id);
//   };

//   const moveToCart = (book) => {
//     removeFromWishlist(book.id);
//     addToCart(book);
//   };

//   const cartTotal = () => cart.reduce((total, item) => total + item.offerPrice * item.quantity, 0);

//   return (
//     <CartContext.Provider value={{
//       cart,
//       books, 
//       wishlist,
//       addToCart,
//       removeFromCart,
//       updateQuantity,
//       addToWishlist, 
//       removeFromWishlist,
//       manageWishlist,
//       moveToCart, 
//       cartTotal }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);


import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3000/users/${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setCart(data.cart || []);
          setWishlist(data.wishlist || []);
        });
    } else {
      setCart([]);
      setWishlist([]);
    }
  }, [user]);

  const saveCartToUser = async (newCart) => {
    if (user) {
      await fetch(`http://localhost:3000/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart: newCart }),
      });
    }
  };

  // add the wishlist store
  const saveWishlistToUser = async (newWishlist) => {
    if (user) {
      await fetch(`http://localhost:3000/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wishlist: newWishlist }),
      });
      setUser({ ...user, wishlist: newWishlist }); // update user state
    }
  };

  const addToCart = (book) => {
    setCart((prev) => {
      const newCart = prev.find((item) => item.id === book.id)
        ? prev.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + book.quantity } : item
        )
        : [...prev, { ...book, quantity: book.quantity }];
      saveCartToUser(newCart);
      return newCart;
    });
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    saveCartToUser(newCart);
  };

  const updateQuantity = (id, quantity) => {
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCart(newCart);
    saveCartToUser(newCart);
  };

  const addToWishlist = (book) => {
    if (!wishlist.find((item) => item.id === book.id)) {
      setWishlist((prev) => {
        const newWishlist = [...prev, book];
        saveWishlistToUser(newWishlist); 
        return newWishlist;
      });
    }
  };


    const removeFromWishlist = (id) => {
    setWishlist((prev) => {
      const newWishlist = prev.filter((item) => item.id !== id);
      saveWishlistToUser(newWishlist); 
      return newWishlist;
    });
  };

  const manageWishlist = (book, action) => {
    if (action === 'add') {
      addToWishlist(book);
    } else if (action === 'remove') {
      removeFromWishlist(book.id);
    }
  };

  const moveToCart = (book) => {
    removeFromWishlist(book.id);
    addToCart({ ...book, quantity: 1 });
  };

  const cartTotal = () => cart.reduce((total, item) => total + item.offerPrice * item.quantity, 0);

  const placeOrder = async (address, paymentMethod, upiId = '') => {
    const order = {
      userId: user.id,
      items: cart.map((item) => ({ ...item, id: item.id.toString() })),
      address,
      total: cartTotal(),
      paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' : `UPI (${upiId})`,
      status: 'Processing',
      createdAt: new Date().toISOString(),
    };

    await fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });

    const updatedBooks = books.map((book) => {
      const cartItem = cart.find((item) => item.id === book.id);
      return cartItem ? { ...book, count: book.count - cartItem.quantity } : book;
    });
    await Promise.all(
      updatedBooks.map((book) =>
        fetch(`http://localhost:3000/products/${book.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(book),
        })
      )
    );
    setBooks(updatedBooks);
    setCart([]);
    saveCartToUser([]);
  };

  return (
    <CartContext.Provider value={{ books, cart, wishlist, addToCart, removeFromCart, updateQuantity, addToWishlist, removeFromWishlist, manageWishlist, moveToCart, cartTotal, placeOrder }}>
      {children}
    </CartContext.Provider>
  );
};


