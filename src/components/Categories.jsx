// import React, { useContext } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import Title from '../components/Title'
// import { categories } from '../assets/data'

// const Categories = () => {

//   const { navigate } = useContext(ShopContext)
//   const colors = ["bg-[#aedae6]", "bg-[#fff6c9]", "bg-[#fddbdb]"]

//   return (
//     <section>
//       <Title title1={"Category"} title2={"List"} titleStyle={"pb-6"} paraStyles={"hidden"} />
//       {/* CONTAINER */}
//       <div>
//         {categories.map((cat, index) => (
//           <div key={index} onClick={() => navigate(`/shop/${cat.title.toLowercase()}`)}
//             className=''></div> ))}
//       </div>
//     </section>
//   )
// }

// export default Categories


import React from 'react';
import { Link } from 'react-router-dom';
import Title from './Title';
import { categories } from '../assets/data';

const Categories = () => {
  const colors = ['bg-[#aedae6]', 'bg-[#fff6c9]', 'bg-[#fddbdb]'];

  return (
    <section className="max-padd-container py-12 bg-gray-100">
      <Title title1="Category" title2="List" titleStyle="pb-6" paraStyles="hidden" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, index) => (
          <Link
            key={index}
            to={`/shop/${cat.title.toLowerCase()}`}
            className={`flex items-center justify-center h-40 ${colors[index % colors.length]} rounded-lg shadow-md hover:shadow-lg transition`}
          >
            <img src={cat.image} alt={cat.title} className="w-32 h-32 object-cover rounded-lg" />
            <span className="ml-4 text-lg font-semibold">{cat.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};
export default Categories