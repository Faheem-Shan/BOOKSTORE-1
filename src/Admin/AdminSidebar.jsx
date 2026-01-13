import React from "react";
import { NavLink,useNavigate,Link} from "react-router-dom";
import {HiOutlineDocumentAdd, HiOutlineClipboardList, HiOutlineShoppingCart, HiOutlineUsers} from 'react-icons/hi';
import { FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast'; 
import logoImg from '../assets/images/logo.png';
import { FaChartBar } from "react-icons/fa";

const navItems = [
  { name: 'Add Item', path: '/admin/product-form', icon: HiOutlineDocumentAdd },
  { name: 'List', path: '/admin/products', icon: HiOutlineClipboardList },
  { name: 'Orders', path: '/admin/orders', icon: HiOutlineShoppingCart },
  { name: 'Users', path: '/admin/users', icon: HiOutlineUsers },
   { name: 'Reports', path: '/admin/order-stats',icon: FaChartBar },
];


const AdminSidebar = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate('/', { replace: true });
  };


    return(
        <div className="w-64 h-screen bg-white shadow-xl flex flex-col fixed top-0 left-0">
            <div className="p-6 border-b border-gray-100 flex items-center">
                <Link to="/admin" className="flex items-center gap-2">
                    <img src={logoImg} alt="Bookly Logo" className="h-7 w-auto" />
                    <span className="text-gray-800 font-semibold text-xl">Bookl<span className="text-blue-600">y.</span></span>
                </Link>
            </div>

            <div className="px-6 py-2 bg-primary-dull text-gray-700 font-medium text-sm border-b border-gray-100">
                ADMIN PANEL
            </div>
            
            {/* NAVIGATION LINKS */}
            <nav className="flex-grow p-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({isActive}) =>
                            `flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 
                            ${isActive 
                                ? 'bg-secondary text-white shadow-md' // Secondary color from your CSS theme
                                : 'text-gray-600 hover:bg-gray-100'
                            }`
                        }
                    >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.name}</span>
                        </NavLink>
                ))}

            </nav>
            {/* LOGOUT BUTTON */}
            <div className="p-4 border-t border-gray-100">
                <button onClick={handleLogout} className="flex items-center space-x-3 p-3 w-full rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200">
                    <FiLogOut className="h-5 w-5" />
                    <span className="font-medium">Logout</span>
                </button>

            </div>
        </div>
    )
}
export default AdminSidebar;