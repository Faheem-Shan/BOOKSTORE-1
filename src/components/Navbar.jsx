// import React from 'react'
// import {TbHome} from "react-icons/tb"
// import {IoLibraryOutline} from "react-icons/io5"
// import {PiEnvelopeDuotone} from "react-icons/pi"
// import {NavLink} from 'react-router-dom'

// const Navbar = ({containerStyles,setmenuOpened}) => {

//     const navItems= [
//         {to: "/", label:"Home", icon:<TbHome />},
//         {to:"/shop",label:"Shop" , icon:<IoLibraryOutline />},
//         { to: "/contact", label: "Contact", icon: <PiEnvelopeDuotone /> },

//     ]

//   return(
//     <nav className={containerStyles}>
//         {navItems.map(({to,label,icon})=>(
//             <div key={label}>
//                 <NavLink onClick={()=>setmenuOpened(false)} to={to} className={({isActive})=> `${isActive ? "bg-white ring-1 ring-slate-900/10" :""} flexCenter gap-x-2 px-3 py-1.5 rounded-full` }>
//                     <span className="text-xl">{icon}</span>
//                     <span className="medium-16">{label}</span>
//                  </NavLink>
//              </div>
//         ))}
   
//     </nav>
//   )
// }

// export default Navbar;


// import React from 'react';
// import { TbHome } from 'react-icons/tb';
// import { IoLibraryOutline } from 'react-icons/io5';
// import { PiEnvelopeDuotone } from 'react-icons/pi';
// import { NavLink } from 'react-router-dom';

// const Navbar = ({ containerStyles, setMenuOpened }) => {
//   const navItems = [
//     { to: '/', label: 'Home', icon: <TbHome /> },
//     { to: '/shop', label: 'Shop', icon: <IoLibraryOutline /> },
//     { to: '/contact', label: 'Contact', icon: <PiEnvelopeDuotone /> },
//   ];

//   return (
//     <nav className={containerStyles}>
//       {navItems.map(({ to, label, icon }) => (
//         <NavLink
//           key={label}
//           to={to}
//           onClick={() => setMenuOpened && setMenuOpened(false)}
//           className={({ isActive }) =>
//             `${isActive ? 'bg-white ring-1 ring-gray-200' : ''} flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors`
//           }
//         >
//           <span className="text-lg">{icon}</span>
//           <span className="text-sm font-medium">{label}</span>
//         </NavLink>
//       ))}
//     </nav>
//   );
// };

// export default Navbar;

// import React from 'react'
// import {TbHome} from "react-icons/tb"
// import {IoLibraryOutline} from "react-icons/io5"
// import {PiEnvelopeDuotone} from "react-icons/pi"
// import {NavLink} from 'react-router-dom'

// const Navbar = ({containerStyles, setMenuOpened}) => { // Renamed setmenuOpened to setMenuOpened for consistency

//     const navItems= [
//         {to: "/", label:"Home", icon:<TbHome />},
//         {to:"/shop",label:"Shop" , icon:<IoLibraryOutline />},
//         {to: "/contact", label: "Contact", icon: <PiEnvelopeDuotone />},
//     ];

//   return(
//     <nav className={containerStyles}>
//         {navItems.map(({to, label, icon}) => (
//             <NavLink 
//                 key={label}
//                 to={to} 
//                 // Close the menu only if the function exists
//                 onClick={()=> setMenuOpened && setMenuOpened(false)} 
//                 className={({isActive})=> 
//                     // Use a slightly larger size and simple hover effect for the clean look
//                     `${isActive ? "text-blue-600 font-bold" : "text-gray-700"} flex items-center gap-1 hover:text-blue-600 transition-colors text-base` 
//                 }
//             >
//                 {/* Icons are now hidden on desktop for the clean look, but can be added back if needed */}
//                 {/* <span className="text-xl">{icon}</span> */}
//                 {label}
//              </NavLink>
//         ))}
   
//     </nav>
//   )
// }

// export default Navbar;