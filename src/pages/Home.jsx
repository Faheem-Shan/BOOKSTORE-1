// import React, { useContext, useEffect } from 'react';
// import { CartContext } from '../context/CartContext';
// import Item from '../components/Item';
// import Hero from '../components/Hero';
// import Categories from '../components/Categories';
// import Title from '../components/Title';

// const Home = () => {
//   const { books } = useContext(CartContext);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <section className="bg-gray-70">
//       <Hero />
//       <div className="max-padd-container py-12">
//         <Categories />
//         <Title title1="Featured Books"  titleStyles="mb-6" />
//        <div className=" bg-white p-6 rounded-xl shadow-md border border-gray-100 mt-4"
//             >
//                 {/* This is the original grid containing the four book cards */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                     {books.slice(0, 4).map((book) => (
//                         <Item key={book.id} book={book} fromHero />
//                     ))}
//                 </div>
//             </div>
//       </div>
//     </section>
//   );
// };

// export default Home;

// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import Item from "../components/Item";
// import Hero from "../components/Hero";
// import Categories from "../components/Categories";
// import Title from "../components/Title";

// const Home = () => {
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     window.scrollTo(0, 0);

//     const fetchFeatured = async () => {
//       try {
//         const res = await api.get("products/");
//         setBooks(res.data || []);
//       } catch (err) {
//         console.error("Failed to load featured books", err);
//         setBooks([]);
//       }
//     };

//     fetchFeatured();
//   }, []);

//   return (
//     <section className="bg-gray-70">
//       <Hero books={books}/>

//       <div className="max-padd-container py-12">
//         <Categories />
//         <Title title1="Featured Books" titleStyles="mb-6" />

//         <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mt-4">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {books.slice(0, 4).map((book) => (
//               <Item key={book.id} book={book} fromHero />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Item from "../components/Item";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Title from "../components/Title";

const Home = () => {
  // Initialize as an empty array to be safe
  const [books, setBooks] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchFeatured = async () => {
      try {
        const res = await api.get("products/");
        /**
         * CHANGE: 
         * Access 'res.data.results' because Django pagination 
         * wraps the list in a "results" key.
         */
        setBooks(res.data.results || []); 
      } catch (err) {
        console.error("Failed to load featured books", err);
        setBooks([]);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <section className="bg-gray-70">
      <Hero books={books}/>

      <div className="max-padd-container py-12">
        <Categories />
        <Title title1="Featured Books" titleStyles="mb-6" />

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Now that books is an array again, .slice(0, 4) will work */}
            {books.length > 0 ? (
              books.slice(0, 4).map((book) => (
                <Item key={book.id} book={book} fromHero />
              ))
            ) : (
              <p className="text-center col-span-full py-10 text-gray-400">
                No featured books available.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;