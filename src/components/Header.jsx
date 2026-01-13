// import React, { useContext, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import logoImg from '../assets/images/logo.png';
// import userImg from '../assets/images/user.png';
// import { FaBars, FaBarsStaggered } from 'react-icons/fa6';
// import { FaSearch } from 'react-icons/fa';
// import { RiUserLine } from 'react-icons/ri';
// import { TbHeart, TbShoppingBag } from 'react-icons/tb'; 
// import Navbar from './Navbar';
// import { AuthContext } from '../Context/AuthContext';
// import { CartContext } from '../Context/CartContext';

// const Header = () => {
//   const [menuOpened, setMenuOpened] = useState(false);
//   const [showSearch, setShowSearch] = useState(false);
//   const { user, logout } = useContext(AuthContext);
//   const { cart, wishlist } = useContext(CartContext); // Added wishlist
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const handleSearch = (e) => {
//     if (e.key === 'Enter' && e.target.value.trim()) {
//       navigate(`/shop?search=${encodeURIComponent(e.target.value.trim())}`);
//       setShowSearch(false);
//     }
//   };

//   const toggleMenu = () => setMenuOpened((prev) => !prev); // Kept toggle function for clarity

//   return (
//     <header className="top-0 left-0 right-0 max-padd-container flex justify-between items-center py-3 bg-white shadow-md">
//       {/* Logo Section */}
//       <div className="flex-1">
//         <Link to="/" className="text-xl font-bold flex items-center gap-2">
//           <img src={logoImg} alt="Bookly Logo" className="h-8 w-auto hidden sm:block" />
//           <span className="relative top-0.5">Bookl<span className="text-blue-600">.</span></span>
//         </Link>
//       </div>

//       {/* NAVBAR FOR MOBILE & DESKTOP */}
//       <div className="flex-1 flex justify-center">
//         <Navbar
//           setMenuOpened={setMenuOpened}
//           containerStyles={`${menuOpened ? 'flex items-start flex-col gap-6 fixed top-16 right-6 p-5 bg-white rounded-lg shadow-lg w-48 ring-1 ring-gray-200 z-50' : 'hidden lg:flex gap-x-6 text-sm font-medium ring-1 ring-gray-200 rounded-full p-2 bg-gray-100'}`}
//         />
//       </div>

//       {/* Action Icons Section */}
//       <div className="flex-1 flex items-center justify-end gap-4">

//         {/* SearchBar */}
//         <div className="relative hidden xl:flex">
//           {/* Toggle input */}
//           <div className={`bg-white ring-1 ring-gray-200 rounded-full overflow-hidden transition-all duration-300 ${showSearch ? 'w-64 p-2 opacity-100' : 'w-0 p-0 opacity-0'}`}>
//             <input
//               type="text"
//               placeholder="Search books..."
//               className="w-full bg-transparent text-sm outline-none placeholder-gray-400"
//               onKeyPress={handleSearch}
//             />
//           </div>
//           {/* Toggle button */}
//           <button
//             onClick={() => setShowSearch((prev) => !prev)}
//             className="absolute right-0 bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 transition-colors"
//           >
//             <FaSearch className="text-lg" />
//           </button>
//         </div>

//         {/* Wishlist */}
//         <Link to="/wishlist" className="hidden xl:flex relative hover:text-blue-600 transition-colors">
//           <TbHeart className="text-xl" />
//           {wishlist.length > 0 && (
//             <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//               {wishlist.length}
//             </span>
//           )}
//         </Link>

//         {/* Menu Toggle */}
//         <button className="lg:hidden text-xl" onClick={toggleMenu}>
//           {menuOpened ? <FaBarsStaggered /> : <FaBars />}
//         </button>

//         {/* CART */}
//         <Link to="/cart" className="flex relative hover:text-blue-600 transition-colors">
//           <TbShoppingBag className="text-xl" />
//           {cart.length > 0 && (
//             <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//               {cart.length}
//             </span>
//           )}
//         </Link>

//         {/* USER PROFILE */}
//         <div className="group relative">
//           {user ? (
//             <div className="flex items-center gap-2 cursor-pointer">
//               <img src={userImg} alt="User" className="h-8 w-8 rounded-full object-cover" />
//             </div>
//           ) : (
//             <Link to="/login" className="text-sm font-medium text-blue-600 hover:underline">
//               Login <RiUserLine className="inline text-base" />
//             </Link>
//           )}
//           {/* DROPDOWN */}
//           {user && (
//             <ul className="absolute right-0 top-10 hidden group-hover:flex flex-col bg-white p-2 rounded-md shadow-md ring-1 ring-gray-200 z-50">
//               <li
//                 className="px-3 py-1 hover:bg-gray-100 cursor-pointer text-sm"
//                 onClick={() => navigate('/my-orders')}
//               >
//                 Orders
//               </li>
//               <li
//                 className="px-3 py-1 hover:bg-gray-100 cursor-pointer text-sm"
//                 onClick={handleLogout}
//               >
//                 Logout
//               </li>
//             </ul>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;


// import React, { useContext, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import logoImg from '../assets/images/logo.png';
// import userImg from '../assets/images/user.png';
// import { FaBars, FaBarsStaggered } from 'react-icons/fa6';
// import { FaSearch } from 'react-icons/fa';
// import { RiUserLine } from 'react-icons/ri';
// import { TbHeart, TbShoppingBag } from 'react-icons/tb';
// import Navbar from './Navbar';
// import { AuthContext } from '../context/AuthContext';
// import { CartContext } from '../context/CartContext';

// const Header = () => {
//   const [menuOpened, setMenuOpened] = useState(false);
//   const [showSearch, setShowSearch] = useState(false);
//   const { user, logout } = useContext(AuthContext);
//   const { cart, wishlist } = useContext(CartContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const handleSearch = (e) => {
//     if (e.key === 'Enter' && e.target.value.trim()) {
//       navigate(`/shop?search=${encodeURIComponent(e.target.value.trim())}`);
//       setShowSearch(false);
//     }
//   };

//   const toggleMenu = () => setMenuOpened((prev) => !prev);

//   return (
//     <header className="top-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center py-3 bg-white shadow-md">
//       {/* Logo (Left Side) */}
//       <div className="flex-shrink-0">
//         <Link to="/" className="text-xl font-bold flex items-center gap-2">
//           <img src={logoImg} alt="Bookly Logo" className="h-8 w-auto" />
//           <span className="relative top-0.5">Bookl<span className="text-blue-600">.</span></span>
//         </Link>
//       </div>

//       {/* Navigation (Center, Slightly Left-Shifted) */}
//       <div className="flex-1 flex justify-center ml-[-2rem] lg:ml-0">
//         <Navbar
//           setMenuOpened={setMenuOpened}
//           containerStyles={`${menuOpened ? 'flex items-start flex-col gap-4 fixed top-16 left-1/2 transform -translate-x-1/2 p-4 bg-white rounded-lg shadow-lg w-48 ring-1 ring-gray-200 z-50' : 'hidden lg:flex gap-x-6 text-sm font-medium'}`}
//         />
//       </div>

//       {/* Action Icons (Right Side, Congested as Requested) */}
//       <div className="flex-shrink-0 flex items-center gap-2">
//         {/* Search */}
//         <div className="relative">
//           <div className={`bg-white ring-1 ring-gray-200 rounded-full overflow-hidden transition-all duration-300 ${showSearch ? 'w-48 p-2 opacity-100' : 'w-0 p-0 opacity-0'}`}>
//             <input
//               type="text"
//               placeholder="Search..."
//               className="w-full bg-transparent text-sm outline-none placeholder-gray-400"
//               onKeyPress={handleSearch}
//               aria-label="Search books"
//             />
//           </div>
//           <button
//             onClick={() => setShowSearch((prev) => !prev)}
//             className="bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 transition-colors"
//             aria-label="Toggle search"
//           >
//             <FaSearch className="text-lg" />
//           </button>
//         </div>

//         {/* Wishlist */}
//         <Link to="/wishlist" className="relative hover:text-blue-600 transition-colors">
//           <TbHeart className="text-xl" />
//           {wishlist.length > 0 && (
//             <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//               {wishlist.length}
//             </span>
//           )}
//         </Link>

//         {/* Cart */}
//         <Link to="/cart" className="relative hover:text-blue-600 transition-colors">
//           <TbShoppingBag className="text-xl" />
//           {cart.length > 0 && (
//             <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//               {cart.length}
//             </span>
//           )}
//         </Link>

//         {/* User/Login */}
//         <div className="group relative">
//           {user ? (
//             <div className="flex items-center gap-1 cursor-pointer">
//               <img src={userImg} alt="User" className="h-6 w-6 rounded-full object-cover" />
//             </div>
//           ) : (
//             <Link to="/login" className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1">
//               <RiUserLine className="text-base" /> Login
//             </Link>
//           )}
//           {user && (
//             <ul className="absolute right-0 top-8 hidden group-hover:flex flex-col bg-white p-2 rounded-md shadow-md ring-1 ring-gray-200 z-50">
//               <li
//                 className="px-3 py-1 hover:bg-gray-100 cursor-pointer text-sm"
//                 onClick={() => navigate('/my-orders')}
//               >
//                 Orders
//               </li>
//               <li
//                 className="px-3 py-1 hover:bg-gray-100 cursor-pointer text-sm"
//                 onClick={handleLogout}
//               >
//                 Logout
//               </li>
//             </ul>
//           )}
//         </div>

//         {/* Mobile Menu Toggle */}
//         <button
//           className="lg:hidden text-xl ml-2"
//           onClick={toggleMenu}
//           aria-label="Toggle menu"
//         >
//           {menuOpened ? <FaBarsStaggered /> : <FaBars />}
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useContext, useState } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import logoImg from '../assets/images/logo.png'; // Update path as needed
import userImg from '../assets/images/user.png'; // Update path as needed
import { FaSearch } from "react-icons/fa";
import { FaBars, FaBarsStaggered } from 'react-icons/fa6';
import { RiUserLine } from 'react-icons/ri';
import { TbHeart, TbShoppingBag } from 'react-icons/tb';
import { AuthContext } from '../context/AuthContext'; // Must be lowercase 'context'
import { CartContext } from '../context/CartContext'; // Must be lowercase 'context'

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // This is where the crash happens if the Contexts are not provided correctly!
  const { user, logout } = useContext(AuthContext);
  const { cart, wishlist } = useContext(CartContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // navigate('/');
  toast.success("Logged out successfully!");
  navigate('/', { replace: true });
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      navigate(`/shop?search=${encodeURIComponent(e.target.value.trim())}`);
      setShowSearch(false);
    }
  };

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/contact', label: 'Contact' },
  ];

  const toggleMenu = () => setMenuOpened((prev) => !prev);
  const isCustomer = user && user.role !== 'admin';

  return (
    <header className="sticky top-0 left-0 w-full z-40 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

        {/* Left Side: Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <img src={logoImg} alt="Bookly Logo" className="h-7 w-auto" />
          <span className="text-gray-800 font-semibold text-xl">Bookl<span className="text-blue-600">y.</span></span>
        </Link>

        {/* Center: Nav links (Desktop) */}
        <nav className="hidden lg:flex p-1.5 rounded-full bg-gray-100/70 border border-gray-200 shadow-inner mx-auto">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={label}
              to={to}
              onClick={() => setMenuOpened(false)}
              className={({ isActive }) =>
                `${isActive
                  ? 'bg-white shadow-md text-gray-800 font-bold'
                  : 'text-gray-700 hover:text-blue-600'
                } px-5 py-2 rounded-full transition-all duration-200 text-sm flex items-center gap-1`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right Side: Icons and Login/User */}
        <div className="flex items-center gap-5 text-gray-700 flex-shrink-0">

          {/* Search Icon & Input Container */}
          {/* <div className="relative flex items-center">
            <div
              className={`absolute right-0 bg-white ring-1 ring-gray-200 rounded-full overflow-hidden transition-all duration-300 flex items-center ${showSearch ? 'w-48 p-2 opacity-100 z-50 mr-12' : 'w-0 p-0 opacity-0 z-0 mr-0 pointer-events-none'
                }`}
            >
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-transparent text-sm outline-none placeholder-gray-400"
                onKeyPress={handleSearch}
                autoFocus={showSearch}
                disabled={!showSearch}
              />
            </div>
            <button
              onClick={() => setShowSearch((prev) => !prev)}
              className="hover:text-blue-600 z-10"
              aria-label="Search"
            >
              <FaSearch className="text-xl" />
            </button>
          </div> */}


          <div className="flex gap-4 sm:gap-5 items-center">
            {/* WISHLIST ICON */}
            <Link to={user ? "/wishlist" : "/login"} className="relative hover:text-red-500" aria-label="Wishlist">
              <TbHeart className="text-2xl" />
              {user && wishlist && wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-medium">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* CART ICON */}
            <Link to={user ? "/cart" : "/login"} className="relative hover:text-blue-600" aria-label="Cart">
              <TbShoppingBag className="text-2xl" />
              {user && cart && cart.length > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-blue-600 text-white text-xs font-medium">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>


          {user ? (
            // User is logged in: Show profile icon and dropdown
            <div className="group relative cursor-pointer hidden sm:block">
              <img src={userImg} alt="User Profile" className="w-8 h-8 rounded-full ring-2 ring-blue-500/50" />
              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full -mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto z-50">
                <div className="p-3 text-sm font-semibold border-b border-gray-100 line-clamp-1">{user.name || "My Account"}</div>

                {/* {user && user.role === "admin" && (
                  <Link to="/admin" className="block px-3 py-2 text-gray-700 hover:bg-gray-100">
                    Admin
                  </Link>
                )} */}

                <Link to="/my-orders" className="block px-3 py-2 text-gray-700 hover:bg-gray-100">My Orders</Link>
                <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-red-500 hover:bg-red-50">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            // User is logged out: Show Login button
            <Link to="/login" className="flex items-center gap-2 text-white bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-700 transition-colors hidden sm:flex">
              <RiUserLine className="text-lg" />
              <span className="font-medium text-sm">Login</span>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-2xl"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {menuOpened ? <FaBarsStaggered /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Container */}
      {menuOpened && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg p-4 z-30 ring-1 ring-gray-200">
          <div className="flex flex-col gap-2">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={label}
                to={to}
                onClick={toggleMenu}
                className={({ isActive }) =>
                  `${isActive
                    ? 'text-blue-600 font-bold'
                    : 'text-gray-700'
                  } py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors`
                }
              >
                {label}
              </NavLink>
            ))}
            {user ? (
              <button onClick={handleLogout} className="w-full text-left py-2 px-3 text-red-500 font-medium hover:bg-red-50 rounded-lg transition-colors border-t mt-1">
                Logout ({user.name})
              </button>
            ) : (
              <Link to="/login" onClick={toggleMenu} className="w-full text-left py-2 px-3 text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors border-t mt-1">
                Login / Sign Up
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;