// import React, {useContext,useEffect,useState } from 'react'
// import bg from "../assets/images/bg.jpg"
// import bgHero from "../assets/images/bg-hero.png"
// import { FaArrowRight} from 'react-icons/fa6'
// import {Link} from "react-router-dom"
// import Item from './Item'
// //import Swiper React components
// import {Swiper,SwiperSlide} from'swiper/react';
// //import swiper styles
// import 'swiper/css';
// //import required modules
// import {Autoplay} from 'swiper/modules';
// import {CartContext} from '../context/CartContext';





// const Hero =()=> {
//     const [popularBooks, setPopularBooks] = useState([])
//     const{books} = useContext(CartContext);

//     //Getting popular books
//     // useEffect(()=> {
//     // const data =books.filter((item)=>item.popular)
//     // setpopularBooks(data.slice(0,6))
//     // },[books])

//     // useEffect(()=>{
//     //     console.log(popularBooks)
//     // })

//     useEffect(() => {
//         if (books && books.length > 0) { // Add a check to ensure books array exists and is not empty
//             const data = books.filter((item) => item.popular);
//             setPopularBooks(data.slice(0, 6)); // Get the first 6 popular books
//         } else {
//             setPopularBooks([]); // Clear popular books if no books are available
//         }
//     }, [books]); // Rerun when 'books' data changes


//     return (
//        <section className='max-padd-container flex gap-6 h-[634px] mt-16'>
//         <div className="flex-[5] bg-cover bg-center bg-no-repeat rounded-2xl" style={{backgroundImage: `url(${bg})`}} >
//             {/* LEFT SIDE */}
//             <div className='max-padd-container flex flex-col h-full justify-center pt-8'>
//                 <h3 className='bold-24 text-secondary font-thin'>Explore Books You'll Love</h3>
//                 <h1 className='h1 max-w-[699px] !font-[800] leading-none'>Find Your Next Book</h1>
//                 <h2 className='capitalize h2 tracking-wider'>Up to 40% Off This Week</h2>
//                 <p className='max-w-xl pt-5 text-gray-700'>Discover the joy of reading with our carefully curated collection of books. Whether you're searching for the latest bestsellers, timeless classics, or hidden gems, we've got something for every reader. Enjoy fast delivery, secure checkout and unbeatable prices your next great read is just a click away!</p>
//                 {/* BUTTON */}
//                 <div className='flex mt-4'>
//                     <Link to={'/shop'} className='bg-white text-xs font-medium pl-6 rounded-full flexCenter gap-x-6 group'>Check our latest Stock
//                     <FaArrowRight className='bg-secondary text-white rounded-full h-11 w-11 p-3 m-[3px] border border-white group-hover:bg-primary group-hover:text-black transition-all duration-500' />
//                     </Link>
//                 </div>
//             </div>
//         </div>
//         {/* RIGHT SIDE :Popular books swiper*/}
//         <div className='hidden lg:block flex-[2] bg-primary rounded-2xl bg-center  bg-cover bg-no-repeat flex justify-center items-center'  style={{backgroundImage: `url(${bgHero})`}}>
//             {/* <div className="max-w-sm "> */}
//             <div className="w-full flex justify-center py-7"> 
//                 {/* CONTAINER */}
//                 <div className="w-full">
//                     {popularBooks.length > 0 ? (
//                      <Swiper
//                     autoplay={{
//                         delay:4000,
//                         disableOnInteraction:false,
//                     }}
//                     breakpoints={{
//                         355: {
//                             slidesPerView:1,
//                             spaceBetween:10,
//                         },
//                     }}
//                     modules={[Autoplay]} className='min-h-[399px] max-w-64'
//                     >
//                         {
//                             popularBooks.map((book)=>(
//                                 <SwiperSlide key={book.id}>
//                                     <Item book={book} fromHero={true}/>
//                                 </SwiperSlide>
//                             ))
//                         }
//                 </Swiper>
//                     ):(
//                          // Renders a loading message if no popular books are loaded yet
//                             <div className="flex justify-center items-center h-[399px] text-white">
//                                 {!books || books.length === 0 ? "Loading popular books..." : "No popular books available."}
//                             </div>
//                     )
//             }
//                 </div>
//             </div>
//         </div>
//        </section>
//     )
// }
// export default Hero

// import React, { useContext, useEffect, useState } from 'react';
// import bg from "../assets/images/bg.jpg";
// import bgHero from "../assets/images/bg-hero.png";
// import { FaArrowRight } from 'react-icons/fa6';
// import { Link } from "react-router-dom";
// import Item from './Item'; // Assuming Item.jsx is in the same directory
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import { Autoplay } from 'swiper/modules';
// import { CartContext } from '../context/CartContext';

// const Hero = () => {
//     const [popularBooks, setPopularBooks] = useState([]);
//     const { books } = useContext(CartContext);

//     // Filter books to find the first 6 marked as popular
//     useEffect(() => {
//         if (books && books.length > 0) {
//             const data = books.filter((item) => item.popular);
//             setPopularBooks(data.slice(0, 6));
//         } else {
//             setPopularBooks([]);
//         }
//     }, [books]);

//     return (
//         <section className='max-padd-container flex gap-6 h-[634px] mt-16'>
//             <div className="flex-[5] bg-cover bg-center bg-no-repeat rounded-2xl" style={{ backgroundImage: `url(${bg})` }} >
//                 {/* LEFT SIDE: Hero Content */}
//                 <div className='max-padd-container flex flex-col h-full justify-center pt-8'>
//                     <h3 className='bold-24 text-secondary font-thin'>Explore Books You'll Love</h3>
//                     <h1 className='h1 max-w-[699px] !font-[800] leading-none'>Find Your Next Book</h1>
//                     <h2 className='capitalize h2 tracking-wider'>Up to 40% Off This Week</h2>
//                     <p className='max-w-xl pt-5 text-gray-700'>Discover the joy of reading with our carefully curated collection of books. Whether you're searching for the latest bestsellers, timeless classics, or hidden gems, we've got something for every reader. Enjoy fast delivery, secure checkout and unbeatable prices—your next great read is just a click away!</p>
                    
//                     {/* BUTTON */}
//                     <div className='flex mt-4'>
//                         <Link to={'/shop'} className='bg-white text-xs font-medium pl-6 rounded-full flexCenter gap-x-6 group'>
//                             Check our latest Stock
//                             <FaArrowRight className='bg-secondary text-white rounded-full h-11 w-11 p-3 m-[3px] border border-white group-hover:bg-primary group-hover:text-black transition-all duration-500' />
//                         </Link>
//                     </div>
//                 </div>
//             </div>
            
//             {/* RIGHT SIDE: Popular books swiper */}
//             <div className='hidden lg:block flex-[2] bg-primary rounded-2xl bg-center bg-cover bg-no-repeat flex justify-center items-center' style={{ backgroundImage: `url(${bgHero})` }}>
//                 <div className="w-full flex justify-center py-7">
//                     {/* CONTAINER */}
//                     <div className="w-full">
//                         {popularBooks.length > 0 ? (
//                            <Swiper
//                                 autoplay={{
//                                     delay: 4000,
//                                     disableOnInteraction: false,
//                                 }}
//                                 breakpoints={{
//                                     // Use a single breakpoint for the Hero slider
//                                     355: {
//                                         slidesPerView: 1,
//                                         spaceBetween: 0, // Ensure no extra space is added between slides
//                                     },
//                                 }}
//                                 modules={[Autoplay]} 
//                                 // FIX: Use w-full instead of max-w-64 to let the flex container manage width
//                                 className='min-h-[399px] w-full' 
//                             >
//                                 {
//                                     popularBooks.map((book) => (
//                                         <SwiperSlide key={book.id}>
//                                             {/* Pass fromHero={true} to apply specific styling */}
//                                             <Item book={book} fromHero={true} />
//                                         </SwiperSlide>
//                                     ))
//                                 }
//                             </Swiper>
//                         ) : (
//                             // Renders a loading message if no popular books are loaded yet
//                             <div className="flex justify-center items-center h-[399px] text-white">
//                                 {!books || books.length === 0 ? "Loading popular books..." : "No popular books available."}
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     )
// }

// export default Hero;

import React, { useContext, useEffect, useState } from 'react';
import bg from "../assets/images/bg.jpg";
import bgHero from "../assets/images/bg-hero.png";
import { FaArrowRight } from 'react-icons/fa6';
import { Link } from "react-router-dom";
import Item from './Item'; // Assuming Item.jsx is in the same directory
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { CartContext } from '../context/CartContext';

const Hero = () => {
    const [popularBooks, setPopularBooks] = useState([]);
    const { books } = useContext(CartContext);

    // Filter books to find the first 6 marked as popular
    useEffect(() => {
        if (books && books.length > 0) {
            const data = books.filter((item) => item.popular);
            setPopularBooks(data.slice(0, 6));
        } else {
            setPopularBooks([]);
        }
    }, [books]);

    return (
        <section className='max-padd-container flex flex-col lg:flex-row gap-6 py-8 lg:py-16 min-h-[600px] lg:min-h-[700px] mt-16'>
            
            {/* LEFT SIDE: Hero Content */}
            
            <div className="lg:w-7/12 w-full bg-cover bg-center bg-no-repeat rounded-2xl" style={{ backgroundImage: `url(${bg})` }} >
                <div className='max-padd-container flex flex-col h-full justify-center pt-8'>
                    <h3 className='bold-24 text-secondary font-thin'>Explore Books You'll Love</h3>
                    <h1 className='h1 max-w-[699px] !font-[800] leading-none'>Find Your Next Book</h1>
                    <h2 className='capitalize h2 tracking-wider'>Up to 40% Off This Week</h2>
                    <p className='max-w-xl pt-5 text-gray-700'>Discover the joy of reading with our carefully curated collection of books. Whether you're searching for the latest bestsellers, timeless classics, or hidden gems, we've got something for every reader. Enjoy fast delivery, secure checkout and unbeatable prices—your next great read is just a click away!</p>
                    
                    {/* BUTTON */}
                    <div className='flex mt-4'>
                        <Link to={'/shop'} className='bg-white text-xs font-medium pl-6 rounded-full flexCenter gap-x-6 group'>
                            Check our latest Stock
                            <FaArrowRight className='bg-secondary text-white rounded-full h-11 w-11 p-3 m-[3px] border border-white group-hover:bg-primary group-hover:text-black transition-all duration-500' />
                        </Link>
                    </div>
                </div>
            </div>
            
            {/* RIGHT SIDE: Popular books swiper */}
           
            <div className='hidden lg:block lg:w-4/12 w-full bg-primary rounded-2xl bg-center bg-cover bg-no-repeat flex justify-center items-center' style={{ backgroundImage: `url(${bgHero})` }}>
                <div className="w-full flex justify-center px-20 py-30">
                    
                    {/* CONTAINER */}
                  
                    <div className="w-full">
                        {popularBooks.length > 0 ? (
                           <Swiper
                                autoplay={{
                                    delay: 4000,
                                    disableOnInteraction: false,
                                }}
                                breakpoints={{
                                    355: {
                                        slidesPerView: 1,
                                        spaceBetween: 0,
                                    },
                                }}
                                modules={[Autoplay]} 
                                
                                className='h-[400px] w-full' 
                            >
                                {
                                    popularBooks.map((book) => (
                                        <SwiperSlide key={book.id}>
                                            <Item book={book} fromHero={true} />
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                        ) : (
                            <div className="flex justify-center items-center h-[400px] text-white">
                                {!books || books.length === 0 ? "Loading popular books..." : "No popular books available."}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero;