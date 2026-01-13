// import React from 'react'
// import Hero from '../components/Hero'
// import Categories from '../components/Categories'

// const Home = () => {
//   return (
//     <div>
//       <Hero />
//       <Categories />
//     </div>
//   )
// }

// export default Home


import React, { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import Item from '../components/Item';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import Title from '../components/Title';

const Home = () => {
  const { books } = useContext(CartContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="bg-gray-70">
      <Hero />
      <div className="max-padd-container py-12">
        <Categories />
        <Title title1="Featured Books"  titleStyles="mb-6" />
       <div className=" bg-white p-6 rounded-xl shadow-md border border-gray-100 mt-4"
            >
                {/* This is the original grid containing the four book cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {books.slice(0, 4).map((book) => (
                        <Item key={book.id} book={book} fromHero />
                    ))}
                </div>
            </div>
      </div>
    </section>
  );
};

export default Home;