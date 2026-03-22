// import React, { useState, useEffect } from 'react';
// import toast from 'react-hot-toast';
// import { useParams, useSearchParams } from 'react-router-dom';

// const API_URL = 'http://localhost:3000/products';

// const initialProductData = {
//     name: '',
//     description: '',
//     category: 'English',
//     price: '',
//     offerPrice: '',
//     image: '',
//     isPopular: false,
//     date: new Date().toISOString().split('T')[0],
//     author: '',
// };

// const AdminProductForm = () => {
//     const [productData, setProductData] = useState(initialProductData);
//     const [isEditMode, setIsEditMode] = useState(false);
//     const [searchParams] = useSearchParams();
//     const productId = searchParams.get('id');
//     const [loadingProduct, setLoadingProduct] = useState(false);

//     useEffect(() => {
//         if (productId) {
//             setIsEditMode(true);
//             fetchProductDetails(productId);
//         } else {
//             setIsEditMode(false);
//             setProductData(initialProductData);
//         }
//     }, [productId]);

//     const fetchProductDetails = async (id) => {
//         setLoadingProduct(true);
//         try {
//             const response = await fetch(`${API_URL}/${id}`);
//             if (!response.ok) throw new Error('Product not found');
//             const data = await response.json();

//             // Map the data.json structure to the form state
//             setProductData({
//                 name: data.title, // map title to name
//                 description: data.description,
//                 category: data.category,
//                 price: data.price,
//                 offerPrice: data.offerPrice,
//                 image: data.image,
//                 isPopular: data.popular,
//                 date: data.date,
//                 author: data.author || '',
//             });

//         } catch (error) {
//             toast.error(error.message);
//         } finally {
//             setLoadingProduct(false);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;

//         setProductData(prevData => ({
//             ...prevData,
//             [name]: type === 'checkbox' ? checked : value,
//         }));
//     };

//     // Note: This handleImageChange is simplified for URL input
//     const handleImageChange = (e) => {
//         setProductData(prevData => ({ ...prevData, image: e.target.value }));
//     };


//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!productData.name || !productData.price || !productData.offerPrice || !productData.image || !productData.author) {
//             toast.error("Please fill in all required fields.");
//             return;
//         }

//         if (Number(productData.offerPrice) > Number(productData.price)) {
//             toast.error("Offer Price cannot be higher than Original Price.");
//             return;
//         }

//         const dataToSend = {

//             title: productData.name,
//             author: productData.author || "Unknown",
//             category: productData.category,
//             type: productData.category,
//             offerPrice: Number(productData.offerPrice),
//             price: Number(productData.price),
//             image: productData.image,
//             description: productData.description,
//             date: productData.date,
//             popular: productData.isPopular,
//             instock: true, // Assuming new products are in stock
//         };

//         try {
//             let response;
//             let method = isEditMode ? 'PUT' : 'POST';
//             let url = isEditMode ? `${API_URL}/${productId}` : API_URL;

//             response = await fetch(url, {
//                 method: method,
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(dataToSend),
//             });

//             if (!response.ok) throw new Error(`Failed to ${isEditMode ? 'update' : 'add'} product`);

//             const message = isEditMode
//                 ? `Product "${productData.name}" updated successfully!`
//                 : `Product "${productData.name}" added successfully!`;

//             toast.success(message);

//             // Reset form if adding new product
//             if (!isEditMode) {
//                 setProductData(initialProductData);
//             }

//         } catch (error) {
//             toast.error(error.message);
//         }
//     };

//     if (loadingProduct) {
//         return <div className="text-center py-10 text-gray-500">Loading product details...</div>
//     }

//     return (
//         <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
//             <h2 className="text-2xl font-bold mb-6 text-gray-800">
//                 {isEditMode ? `Edit Item: ${productData.name}` : 'Add New Item'}
//             </h2>

//             <form onSubmit={handleSubmit} className="space-y-6">

//                 {/* Product Name (title) */}
//                 <div>
//                     <label htmlFor="name" className="block text-lg font-semibold text-gray-700 mb-2">Product Name</label>
//                     <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={productData.name}
//                         onChange={handleChange}
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none"
//                         placeholder="Write here..."
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="author" className="block text-lg font-semibold text-gray-700 mb-2">Author Name</label>
//                     <input
//                         type="text"
//                         id="author"
//                         name="author"
//                         value={productData.author}
//                         onChange={handleChange}
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none"
//                         placeholder="e.g., Jane Austen"
//                         required // Books should usually have an author
//                     />
//                 </div>

//                 {/* Product Description */}
//                 <div>
//                     <label htmlFor="description" className="block text-lg font-semibold text-gray-700 mb-2">Product Description</label>
//                     <textarea
//                         id="description"
//                         name="description"
//                         value={productData.description}
//                         onChange={handleChange}
//                         rows="4"
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none resize-none"
//                         placeholder="Write here..."
//                         required
//                     />
//                 </div>

//                 {/* Category, Product Price, Offer Price (Horizontal Group) */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//                     {/* Category Dropdown */}
//                     <div>
//                         <label htmlFor="category" className="block text-lg font-semibold text-gray-700 mb-2">Category</label>
//                         <select
//                             id="category"
//                             name="category"
//                             value={productData.category}
//                             onChange={handleChange}
//                             className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-secondary focus:border-secondary outline-none"
//                         >

//                             <option value="English">English</option>
//                             <option value="Malayalam">Malayalam</option>
//                             <option value="Comic">Comic</option>
//                             {/* Add more categories as needed */}
//                         </select>
//                     </div>

//                     {/* Product Price */}
//                     <div>
//                         <label htmlFor="price" className="block text-lg font-semibold text-gray-700 mb-2">Original Price</label>
//                         <input
//                             type="number"
//                             id="price"
//                             name="price"
//                             value={productData.price}
//                             onChange={handleChange}
//                             min="0"
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none"
//                             placeholder="350"
//                             required
//                         />
//                     </div>

//                     {/* Offer Price */}
//                     <div>
//                         <label htmlFor="offerPrice" className="block text-lg font-semibold text-gray-700 mb-2">Offer Price</label>
//                         <input
//                             type="number"
//                             id="offerPrice"
//                             name="offerPrice"
//                             value={productData.offerPrice}
//                             onChange={handleChange}
//                             min="0"
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none"
//                             placeholder="210"
//                             required
//                         />
//                     </div>
//                 </div>

//                 {/* Image Upload Placeholder (URL Input) */}
//                 <div>
//                     <label className="block text-lg font-semibold text-gray-700 mb-2">Product Image (URL/Path)</label>
//                     <input
//                         type="text"
//                         name="image"
//                         placeholder="upload"
//                         value={productData.image}
//                         onChange={handleImageChange}
//                         className="p-3 text-sm border border-gray-300 rounded-lg w-full focus:ring-secondary focus:border-secondary outline-none"
//                     />
//                 </div>

//                 {/* Add to Popular Checkbox */}
//                 <div className="flex items-center pt-2">
//                     <input
//                         id="isPopular"
//                         name="isPopular"
//                         type="checkbox"
//                         checked={productData.isPopular}
//                         onChange={handleChange}
//                         className="h-5 w-5 text-secondary border-gray-300 rounded focus:ring-secondary"
//                     />
//                     <label htmlFor="isPopular" className="ml-2 text-base text-gray-700">
//                         Add to popular
//                     </label>
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                     type="submit"
//                     className="w-fit px-8 py-3 mt-4 text-white bold-16 rounded-lg bg-black/90 hover:bg-black transition-colors shadow-md"
//                 >
//                     {isEditMode ? 'Update Product' : 'Add Product'}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AdminProductForm;


import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSearchParams, useNavigate } from 'react-router-dom';

// Updated to point to Django
const API_URL = 'http://127.0.0.1:8000/api/admin/products/';
const CAT_URL = 'http://127.0.0.1:8000/api/admin/categories/'; 

const initialProductData = {
    name: '',
    description: '',
    category: '', // This will hold the Category ID
    price: '',
    offerPrice: '',
    image: '',
    isPopular: false,
    author: '',
};

const AdminProductForm = () => {
    const [productData, setProductData] = useState(initialProductData);
    const [categories, setCategories] = useState([]); // Store categories from Django
    const [isEditMode, setIsEditMode] = useState(false);
    const [searchParams] = useSearchParams();
    const productId = searchParams.get('id');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem('access_token');

    useEffect(() => {
        fetchCategories();
        if (productId) {
            setIsEditMode(true);
            fetchProductDetails(productId);
        }
    }, [productId]);

    const fetchCategories = async () => {
        try {
            const res = await fetch(CAT_URL);
            const data = await res.json();
            setCategories(data);
        } catch (err) {
            console.error("Failed to load categories");
        }
    };

    const fetchProductDetails = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}${id}/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Product not found');
            const data = await response.json();

            setProductData({
                name: data.title,
                description: data.description,
                category: data.category, 
                price: data.price,
                offerPrice: data.offerPrice,
                image: data.image,
                isPopular: data.is_popular,
                author: data.author,
            });
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProductData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Data mapping to match Django Model fields
        const dataToSend = {
            title: productData.name,
            author: productData.author,
            category: productData.category, // Sent as ID
            price: parseFloat(productData.price),
            offerPrice: parseFloat(productData.offerPrice),
            image: productData.image,
            description: productData.description,
            is_popular: productData.isPopular,
            is_instock: true, 
        };

        try {
            const url = isEditMode ? `${API_URL}${productId}/` : API_URL;
            const method = isEditMode ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || `Failed to ${isEditMode ? 'update' : 'add'} product`);
            }

            toast.success(`Product ${isEditMode ? 'updated' : 'added'} successfully!`);
            navigate('/admin/list'); // Redirect back to list
        } catch (error) {
            toast.error(error.message);
        }
    };

    if (loading) return <div className="text-center py-20 text-gray-500 text-xl">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100 my-10">
            <h2 className="text-3xl font-extrabold mb-8 text-gray-900 border-b pb-4">
                {isEditMode ? 'Edit Product Details' : 'Add New Book'}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Book Title</label>
                    <input type="text" name="name" value={productData.name} onChange={handleChange} className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-black outline-none transition-all" placeholder="Enter book title..." required />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Author</label>
                    <input type="text" name="author" value={productData.author} onChange={handleChange} className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-black outline-none" placeholder="Author name" required />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Category</label>
                    <select name="category" value={productData.category} onChange={handleChange} className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-black outline-none bg-white" required>
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Price (₹)</label>
                    <input type="number" name="price" value={productData.price} onChange={handleChange} className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-black outline-none" placeholder="0.00" required />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Offer Price (₹)</label>
                    <input type="number" name="offerPrice" value={productData.offerPrice} onChange={handleChange} className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-black outline-none" placeholder="0.00" required />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Image URL</label>
                    <input type="text" name="image" value={productData.image} onChange={handleChange} className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-black outline-none" placeholder="https://example.com/image.jpg" required />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Description</label>
                    <textarea name="description" value={productData.description} onChange={handleChange} rows="4" className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-black outline-none resize-none" placeholder="Describe the book..." required />
                </div>

                <div className="flex items-center gap-3 py-2">
                    <input id="isPopular" name="isPopular" type="checkbox" checked={productData.isPopular} onChange={handleChange} className="h-6 w-6 accent-black rounded" />
                    <label htmlFor="isPopular" className="text-gray-700 font-bold">Mark as Popular</label>
                </div>

                <div className="md:col-span-2 flex justify-end gap-4 mt-6">
                    <button type="button" onClick={() => navigate('/admin/list')} className="px-8 py-3 rounded-xl border border-gray-300 font-bold hover:bg-gray-50">Cancel</button>
                    <button type="submit" className="px-10 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 shadow-lg transition-transform active:scale-95">
                        {isEditMode ? 'Save Changes' : 'Create Product'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminProductForm;