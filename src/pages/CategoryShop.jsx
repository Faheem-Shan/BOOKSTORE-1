// import React, { useContext, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { CartContext } from '../Context/CartContext';
// import Item from '../components/Item';

// const CategoryShop = () => {
//   const { books } = useContext(CartContext);
//   const { category } = useParams();
//   const filteredBooks = books.filter((book) => book.category.toLowerCase() === category);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [category]);

//   return (
//     <section className="max-padd-container py-12 bg-gray-100">
//       <h2 className="text-2xl font-bold mb-6 text-center capitalize">{category}</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {filteredBooks.map((book) => (
//           <Item key={book.id} book={book} />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default CategoryShop;

// import React, { useContext, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { CartContext } from '../context/CartContext';
// import Item from '../components/Item';
// import Title from '../components/Title';

// const CategoryShop = () => {
//   const { books } = useContext(CartContext);
//   const { category } = useParams();
//   const filteredBooks = books.filter((book) => book.category.toLowerCase() === category.toLowerCase());

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [category]);

//   return (
//     <section className="max-padd-container py-12 bg-gray-50">
//       <Title text={category} />
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {filteredBooks.map((book) => (
//           <Item key={book.id} book={book} />
//         ))}
//       </div>
//       {filteredBooks.length === 0 && <p className="text-center text-gray-600">No books found in this category.</p>}
//     </section>
//   );
// };

// export default CategoryShop;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../api/axios";
// import Item from "../components/Item";
// import Title from "../components/Title";

// const CategoryShop = () => {
//   const { category } = useParams();
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await api.get("products/");
//         setBooks(res.data.results || []);
//       } catch (err) {
//         console.error(err);
//         setBooks([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//     window.scrollTo(0, 0);
//   }, [category]);

//   const filteredBooks = books.filter(
//     (book) =>
//       book.category?.name?.toLowerCase() === category.toLowerCase()
//   );

//   if (loading) {
//     return <p className="text-center py-20">Loading books...</p>;
//   }

//   return (
//     <section className="max-padd-container py-12 bg-gray-50">
//       <Title title1={category} />

//       {filteredBooks.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {filteredBooks.map((book) => (
//             <Item key={book.id} book={book} />
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-600">
//           No books found in this category.
//         </p>
//       )}
//     </section>
//   );
// };

// export default CategoryShop;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Item from "../components/Item";
import Title from "../components/Title";

const CategoryShop = () => {
  const { category } = useParams(); // Get the category name from the URL
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. UPDATED: Fetching products and handling paginated response
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await api.get(`products/category/${category}/`);
        
        // UPDATE: Django Rest Framework with pagination returns an object.
        // We must access '.results' to get the array for filtering.
        setBooks(res.data.results || res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setBooks([]); // Fallback to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    window.scrollTo(0, 0);
  }, [category]);

  // 2. UPDATED: Safe filtering with optional chaining
  // Added ?. to handle cases where a book might not have a category assigned
  // const filteredBooks = books.filter(
  //   (book) =>
  //     book.category?.name?.toLowerCase() === category?.toLowerCase()
  // );

  const displayBooks = books;

  if (loading) {
    return (
      <div className="flexCenter py-40">
        <p className="text-gray-500 animate-pulse">Loading books...</p>
      </div>
    );
  }

  return (
    <section className="max-padd-container py-12 bg-gray-50">
      {/* Title component showing the current category */}
      <Title title1={category} />

      {/* 3. UPDATED: Responsive Grid check */}
      {displayBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {displayBooks.map((book) => (
            <Item key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm mt-10">
          <p className="text-gray-500">
            No books found in the "{category}" category.
          </p>
        </div>
      )}
    </section>
  );
};

export default CategoryShop;