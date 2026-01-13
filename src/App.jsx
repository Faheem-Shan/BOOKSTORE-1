// import React from 'react';
// import { Routes, Route, useLocation } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import Shop from './pages/Shop';
// import CategoryShop from './pages/CategoryShop';
// import ProductDetails from './pages/ProductDetails';
// import Contact from './pages/Contact';
// import NotFound from './pages/NotFound';
// import Login from './components/Login';
// import Cart from './pages/Cart';
// import AddressForm from './pages/AddressForm';
// import MyOrders from './pages/MyOrders';
// import Signup from './pages/Signup';
// import Wishlist from './pages/Wishlist';
// import Payment from './pages/Payment';
// import ProtectedRoute from './components/ProtectedRoute';


// const App = () => {
//   const location = useLocation();
//   const showFooter = location.pathname === '/';
//   return (
//     <main>
//       <Header />
//       <Toaster position='bottom-right' />
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/shop" element={<Shop />} />
//         <Route path="/shop/:category" element={<CategoryShop />} />
//         <Route path="/shop/:category/:id" element={<ProductDetails />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/wishlist" element={<Wishlist />} />

//         {/* Protected User Routes (FIX: Uncommented and correctly structured) */}
//         <Route element={<ProtectedRoute allowedRoles={['user']} />}>
//           <Route path="/home" element={<Home />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/address" element={<AddressForm />} />
//           <Route path="/payment" element={<Payment />} />
//           <Route path="/my-orders" element={<MyOrders />} />

//         </Route>


//         <Route path="*" element={<NotFound />} />
//       </Routes>
//       { showFooter && <Footer /> }
//     </main >
//   )
// }

// export default App;

import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';


import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import CategoryShop from './pages/CategoryShop';
import ProductDetails from './pages/ProductDetails';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Login from './components/Login';
import Cart from './pages/Cart';
import AddressForm from './pages/AddressForm';
import MyOrders from './pages/MyOrders';
import Signup from './pages/Signup';
import Wishlist from './pages/Wishlist';
import Payment from './pages/Payment';
import ProtectedRoute from './components/ProtectedRoute';

import AdminLayout from './Admin/AdminLayout';
import AdminProductList from './Admin/AdminProductList';
import AdminProductForm from './Admin/AdminProductForm';
import AdminOrders from './Admin/AdminOrders';
import AdminDashboard from './Admin/AdminDashboard';
import AdminCategoryList from './Admin/AdminCategoryList';
import AdminUserList from './Admin/AdminUserList';
import AdminOrderStats from './Admin/AdminOrderStats';

import MainLayout from './components/Mainlayout';


const App = () => {
  const location = useLocation();


  const showFooter = location.pathname === '/';

  return (
    <main className="min-h-screen flex flex-col">
      <Toaster position='bottom-right' toastOptions={{ duration: 3000 }} />

      <div className="flex-1">
        <Routes>
          {/* -------------------- PUBLIC ROUTES -------------------- */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:category" element={<CategoryShop />} />
            <Route path="/shop/:category/:id" element={<ProductDetails />} />
            <Route path="/contact" element={<Contact />} />
            {/* <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} /> */}

            <Route element={<ProtectedRoute allowedRoles={['user']} />}>
              {/* <Route path="/home" element={<Home />} /> is redundant, use path="/" */}
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/address" element={<AddressForm />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/my-orders" element={<MyOrders />} />
              
            </Route>
          </Route>

          <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

          {/* -------------------- PROTECTED ADMIN ROUTES (Optional) -------------------- */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminLayout />} >
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProductList />} />
              <Route path="product-form" element={<AdminProductForm />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path='categories' element={<AdminCategoryList />} />
              <Route path="users" element={<AdminUserList />} />
              <Route path="order-stats" element={<AdminOrderStats />} />

            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {showFooter && <Footer />}
    </main >
  )
}

export default App;