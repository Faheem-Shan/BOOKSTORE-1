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

import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Item from '../components/Item';
import Title from '../components/Title';

const CategoryShop = () => {
  const { books } = useContext(CartContext);
  const { category } = useParams();
  const filteredBooks = books.filter((book) => book.category.toLowerCase() === category.toLowerCase());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  return (
    <section className="max-padd-container py-12 bg-gray-50">
      <Title text={category} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <Item key={book.id} book={book} />
        ))}
      </div>
      {filteredBooks.length === 0 && <p className="text-center text-gray-600">No books found in this category.</p>}
    </section>
  );
};

export default CategoryShop;
