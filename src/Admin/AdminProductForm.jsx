import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams, useSearchParams } from 'react-router-dom';

const API_URL = 'http://localhost:3000/products';

const initialProductData = {
    name: '',
    description: '',
    category: 'English',
    price: '',
    offerPrice: '',
    image: '',
    isPopular: false,
    date: new Date().toISOString().split('T')[0],
    author: '',
};

const AdminProductForm = () => {
    const [productData, setProductData] = useState(initialProductData);
    const [isEditMode, setIsEditMode] = useState(false);
    const [searchParams] = useSearchParams();
    const productId = searchParams.get('id');
    const [loadingProduct, setLoadingProduct] = useState(false);

    useEffect(() => {
        if (productId) {
            setIsEditMode(true);
            fetchProductDetails(productId);
        } else {
            setIsEditMode(false);
            setProductData(initialProductData);
        }
    }, [productId]);

    const fetchProductDetails = async (id) => {
        setLoadingProduct(true);
        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) throw new Error('Product not found');
            const data = await response.json();

            // Map the data.json structure to the form state
            setProductData({
                name: data.title, // map title to name
                description: data.description,
                category: data.category,
                price: data.price,
                offerPrice: data.offerPrice,
                image: data.image,
                isPopular: data.popular,
                date: data.date,
                author: data.author || '',
            });

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoadingProduct(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setProductData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Note: This handleImageChange is simplified for URL input
    const handleImageChange = (e) => {
        setProductData(prevData => ({ ...prevData, image: e.target.value }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!productData.name || !productData.price || !productData.offerPrice || !productData.image || !productData.author) {
            toast.error("Please fill in all required fields.");
            return;
        }

        if (Number(productData.offerPrice) > Number(productData.price)) {
            toast.error("Offer Price cannot be higher than Original Price.");
            return;
        }

        const dataToSend = {

            title: productData.name,
            author: productData.author || "Unknown",
            category: productData.category,
            type: productData.category,
            offerPrice: Number(productData.offerPrice),
            price: Number(productData.price),
            image: productData.image,
            description: productData.description,
            date: productData.date,
            popular: productData.isPopular,
            instock: true, // Assuming new products are in stock
        };

        try {
            let response;
            let method = isEditMode ? 'PUT' : 'POST';
            let url = isEditMode ? `${API_URL}/${productId}` : API_URL;

            response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) throw new Error(`Failed to ${isEditMode ? 'update' : 'add'} product`);

            const message = isEditMode
                ? `Product "${productData.name}" updated successfully!`
                : `Product "${productData.name}" added successfully!`;

            toast.success(message);

            // Reset form if adding new product
            if (!isEditMode) {
                setProductData(initialProductData);
            }

        } catch (error) {
            toast.error(error.message);
        }
    };

    if (loadingProduct) {
        return <div className="text-center py-10 text-gray-500">Loading product details...</div>
    }

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {isEditMode ? `Edit Item: ${productData.name}` : 'Add New Item'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Product Name (title) */}
                <div>
                    <label htmlFor="name" className="block text-lg font-semibold text-gray-700 mb-2">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none"
                        placeholder="Write here..."
                        required
                    />
                </div>
                <div>
                    <label htmlFor="author" className="block text-lg font-semibold text-gray-700 mb-2">Author Name</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={productData.author}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none"
                        placeholder="e.g., Jane Austen"
                        required // Books should usually have an author
                    />
                </div>

                {/* Product Description */}
                <div>
                    <label htmlFor="description" className="block text-lg font-semibold text-gray-700 mb-2">Product Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                        rows="4"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none resize-none"
                        placeholder="Write here..."
                        required
                    />
                </div>

                {/* Category, Product Price, Offer Price (Horizontal Group) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Category Dropdown */}
                    <div>
                        <label htmlFor="category" className="block text-lg font-semibold text-gray-700 mb-2">Category</label>
                        <select
                            id="category"
                            name="category"
                            value={productData.category}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-secondary focus:border-secondary outline-none"
                        >

                            <option value="English">English</option>
                            <option value="Malayalam">Malayalam</option>
                            <option value="Comic">Comic</option>
                            {/* Add more categories as needed */}
                        </select>
                    </div>

                    {/* Product Price */}
                    <div>
                        <label htmlFor="price" className="block text-lg font-semibold text-gray-700 mb-2">Original Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={productData.price}
                            onChange={handleChange}
                            min="0"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none"
                            placeholder="350"
                            required
                        />
                    </div>

                    {/* Offer Price */}
                    <div>
                        <label htmlFor="offerPrice" className="block text-lg font-semibold text-gray-700 mb-2">Offer Price</label>
                        <input
                            type="number"
                            id="offerPrice"
                            name="offerPrice"
                            value={productData.offerPrice}
                            onChange={handleChange}
                            min="0"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none"
                            placeholder="210"
                            required
                        />
                    </div>
                </div>

                {/* Image Upload Placeholder (URL Input) */}
                <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">Product Image (URL/Path)</label>
                    <input
                        type="text"
                        name="image"
                        placeholder="upload"
                        value={productData.image}
                        onChange={handleImageChange}
                        className="p-3 text-sm border border-gray-300 rounded-lg w-full focus:ring-secondary focus:border-secondary outline-none"
                    />
                </div>

                {/* Add to Popular Checkbox */}
                <div className="flex items-center pt-2">
                    <input
                        id="isPopular"
                        name="isPopular"
                        type="checkbox"
                        checked={productData.isPopular}
                        onChange={handleChange}
                        className="h-5 w-5 text-secondary border-gray-300 rounded focus:ring-secondary"
                    />
                    <label htmlFor="isPopular" className="ml-2 text-base text-gray-700">
                        Add to popular
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-fit px-8 py-3 mt-4 text-white bold-16 rounded-lg bg-black/90 hover:bg-black transition-colors shadow-md"
                >
                    {isEditMode ? 'Update Product' : 'Add Product'}
                </button>
            </form>
        </div>
    );
};

export default AdminProductForm;