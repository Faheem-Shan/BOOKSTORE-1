// import React, { useState, useEffect } from 'react';
// import api from "../api/axios";
// import Item from '../components/Item';

// const Shop = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('All');
//   const [sortOption, setSortOption] = useState('price-asc');

//   const [currentPage, setCurrentPage] = useState(1);
//   const booksPerPage = 8;

//   useEffect(() => {
//   const fetchProducts = async () => {
//     try {
//       const res = await api.get("products/");
//       setBooks(res.data);
//     } catch (err) {
//       console.error("Failed to fetch products", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchProducts();
// }, []);



//     useEffect(() => {
//     setCurrentPage(1);
//     }, [searchTerm, categoryFilter, sortOption]);


//     const filteredBooks = books.filter((book) =>
//         (book.stock === true) &&
//         (categoryFilter === 'All' || book.category.name  === categoryFilter) &&
//         (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//          book.author.toLowerCase().includes(searchTerm.toLowerCase()))
// );


//     const sortedBooks = [...filteredBooks].sort((a, b) => {
//         // Use offerPrice for sorting if it exists, otherwise use price
//         const priceA = a.offer_price ?? a.price;
//         const priceB = b.offer_price ?? b.price;

//         if (sortOption === 'price-asc') return priceA - priceB;
//         if (sortOption === 'price-desc') return priceB - priceA;
//         return 0;
//     });

//     const totalPages = Math.ceil(sortedBooks.length / booksPerPage);
//     const indexOfLastBook = currentPage * booksPerPage;
//     const indexOfFirstBook = indexOfLastBook - booksPerPage;
//     const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

//     const categories = ['All', ...new Set(books.map((book) => book.category.name))];

//     const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

//     if (loading) return <p className="text-center py-20">Loading books...</p>;

//      return (
//         <section className="max-padd-container py-12 bg-gray-100">
//         <div className="flex flex-col gap-6">
//          <div className="flex flex-col sm:flex-row gap-4">
//         {/* Search Input */}
//          <input
//              type="text"
//              placeholder="Search books..."
//              value={searchTerm}
//              onChange={(e) => setSearchTerm(e.target.value)}
//              className="px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 w-full sm:w-1/2"
//           />
//          {/* Category Filter */}
//          <select
//          value={categoryFilter}
//          onChange={(e) => setCategoryFilter(e.target.value)}
//          className="px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 w-full sm:w-1/3"
//          >
//          {categories.map((cat) => (
//          <option key={cat} value={cat}>{cat}</option>
//           ))}
//           </select>
//           {/* Sort Option */}
//           <select
//             value={sortOption}
//             onChange={(e) => setSortOption(e.target.value)}
//             className="px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 w-full sm:w-1/4"
//           >
//             <option value="price-asc">Price: Low to High</option>
//             <option value="price-desc">Price: High to Low</option>
//           </select>

//             {/* CLEAR FILTER BUTTON */}
//             <button
//                 onClick={() => {
//                 setSearchTerm('');
//                 setCategoryFilter('All');
//                 setSortOption('price-asc');
//                 setCurrentPage(1); // IMPORTANT reset page
//                 }}
//                 className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800"
//             >
//                 Clear Filters
//             </button>

//         </div>
//         {/* Products Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//          {currentBooks.map((book) => (
//          <Item key={book.id} book={book} />
//          ))}
//          </div>
//          <div className="flex justify-center gap-3 mt-6">
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i + 1}
//               onClick={() => handlePageChange(i + 1)}
//               className={`px-3 py-1 rounded-md border ${
//                 currentPage === i + 1
//                   ? 'bg-blue-500 text-white border-blue-500'
//                   : 'bg-white text-gray-700 border-gray-300'
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//      </div>
//      </section>
//  );
// };

// export default Shop;

// import React, { useState, useEffect } from 'react';
// import api from "../api/axios";
// import Item from '../components/Item';

// const Shop = () => {
//   const [books, setBooks] = useState([]);
//   const [categories, setCategories] = useState(['All']);
//   const [loading, setLoading] = useState(true);
//   const [totalCount, setTotalCount] = useState(0);

//   // 1. ADDED: Local input state to prevent focus loss
//   const [searchQuery, setSearchQuery] = useState(''); 
  
//   // Filters and Pagination State
//   const [searchTerm, setSearchTerm] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('All');
//   const [sortOption, setSortOption] = useState('price-asc');
//   const [currentPage, setCurrentPage] = useState(1);
//   const booksPerPage = 8;

//   // 2. ADDED: Debounce logic for searching
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setSearchTerm(searchQuery);
//     }, 500); // Wait 500ms after typing stops to call the API

//     return () => clearTimeout(handler);
//   }, [searchQuery]);

//   // Fetch Categories once on mount
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await api.get("products/categories/");
//         const data = Array.isArray(res.data) ? res.data : (res.data.results || []);
//         const names = data.map(cat => cat.name);
//         setCategories(['All', ...names]);
//       } catch (err) {
//         console.error("Failed to fetch categories", err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Fetch Products whenever filters or page changes
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const res = await api.get("products/", {
//           params: {
//             search: searchTerm, // This only updates after the debounce
//             category: categoryFilter,
//             sort: sortOption,
//             page: currentPage,
//           }
//         });

//         setBooks(res.data.results || []); 
//         setTotalCount(res.data.count || 0);
//       } catch (err) {
//         console.error("Failed to fetch products", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [searchTerm, categoryFilter, sortOption, currentPage]);

//   // Reset to page 1 when filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, categoryFilter, sortOption]);

//   const totalPages = Math.ceil(totalCount / booksPerPage);

//   const handleClearFilters = () => {
//     setSearchQuery(''); // Clear the local input
//     setSearchTerm('');
//     setCategoryFilter('All');
//     setSortOption('price-asc');
//     setCurrentPage(1);
//   };

//   return (
//     <section className="max-padd-container py-12 bg-gray-100">
//       <div className="flex flex-col gap-6">
//         <div className="flex flex-col sm:flex-row gap-4">
//           {/* 3. UPDATED: Search Input bound to searchQuery */}
//           <input
//             type="text"
//             placeholder="Search books..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 w-full sm:w-1/2"
//           />

//           {/* Category Filter */}
//           <select
//             value={categoryFilter}
//             onChange={(e) => setCategoryFilter(e.target.value)}
//             className="px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none w-full sm:w-1/3"
//           >
//             {categories.map((cat) => (
//               <option key={cat} value={cat}>{cat}</option>
//             ))}
//           </select>

//           {/* Sort Option */}
//           <select
//             value={sortOption}
//             onChange={(e) => setSortOption(e.target.value)}
//             className="px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none w-full sm:w-1/4"
//           >
//             <option value="price-asc">Price: Low to High</option>
//             <option value="price-desc">Price: High to Low</option>
//           </select>

//           <button
//             onClick={handleClearFilters}
//             className="px-4 py-2 rounded-md bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 transition"
//           >
//             Clear
//           </button>
//         </div>

//         {/* Loading and Results Grid */}
//         {loading && currentPage === 1 ? (
//           <p className="text-center py-20">Loading books...</p>
//         ) : (
//           <>
//             {books.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {books.map((book) => (
//                   <Item key={book.id} book={book} />
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-20 bg-white rounded-lg shadow-sm">
//                 <p className="text-gray-500">No books found matching your criteria.</p>
//               </div>
//             )}
//           </>
//         )}

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-center gap-3 mt-6">
//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={i + 1}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`px-4 py-2 rounded-md border transition ${
//                   currentPage === i + 1
//                     ? 'bg-blue-600 text-white border-blue-600 shadow-md'
//                     : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Shop;

import React, { useState, useEffect } from 'react';
import api from "../api/axios";
import Item from '../components/Item';

const Shop = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // Search and Filters State
  const [searchQuery, setSearchQuery] = useState(''); 
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortOption, setSortOption] = useState('price-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  // 1. UPDATED: Debounce logic to prevent unnecessary API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(searchQuery);
    }, 500); 

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // 2. UPDATED: Fetch Categories with Pagination/Array check
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Updated URL to include 'products/' prefix based on your Django router
        const res = await api.get("products/categories/");
        
        // CHECK: Django might return simple list or paginated object {results: []}
        const data = Array.isArray(res.data) ? res.data : (res.data.results || []);
        
        const names = data.map(cat => cat.name);
        setCategories(['All', ...names]);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  // 3. UPDATED: Fetch Products targeting 'res.data.results'
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await api.get("products/", {
          params: {
            search: searchTerm,
            category: categoryFilter === 'All' ? '' : categoryFilter,
            sort: sortOption,
            page: currentPage,
          }
        });

        // UPDATE: Django Pagination returns { count, results, next, previous }
        // We MUST set books to res.data.results
        setBooks(res.data.results || []); 
        setTotalCount(res.data.count || 0);
      } catch (err) {
        console.error("Failed to fetch products", err);
        setBooks([]); // Clear books on error
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm, categoryFilter, sortOption, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, sortOption]);

  const totalPages = Math.ceil(totalCount / booksPerPage);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSearchTerm('');
    setCategoryFilter('All');
    setSortOption('price-asc');
    setCurrentPage(1);
  };

  return (
    <section className="max-padd-container py-12 bg-gray-100">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 w-full sm:w-1/2"
          />

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none w-full sm:w-1/3"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Sort Option */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none w-full sm:w-1/4"
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>

          <button
            onClick={handleClearFilters}
            className="px-4 py-2 rounded-md bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 transition"
          >
            Clear
          </button>
        </div>

        {/* Loading and Results Grid */}
        {loading && currentPage === 1 ? (
          <p className="text-center py-20">Loading books...</p>
        ) : (
          <>
            {books.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {books.map((book) => (
                  <Item key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500">No books found matching your criteria.</p>
              </div>
            )}
          </>
        )}

        {/* Pagination Buttons */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-6">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-md border transition ${
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Shop;