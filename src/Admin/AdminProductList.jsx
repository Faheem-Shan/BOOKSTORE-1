import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3000/products';

const AdminProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // --- 1. Fetching Products ---
    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch product list');
            }
            const data = await response.json();
            setProducts(data);
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // --- 2. Toggle Stock Status ---
    const handleToggleStock = async (id, currentStatus) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ instock: !currentStatus }),
            });

            if (!response.ok) throw new Error('Failed to update stock status');

            setProducts((prev) =>
                prev.map((p) =>
                    p.id === id ? { ...p, instock: !currentStatus } : p
                )
            );

            toast.success(`Product marked as ${!currentStatus ? 'In Stock' : 'Out of Stock'}`);
        } catch (err) {
            toast.error(err.message);
        }
    };


    // --- 3. Action Handlers ---

    const handleEdit = (id) => {
        navigate(`/admin/product-form?id=${id}`);
    };

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Are you sure you want to delete product: "${name}"?`)) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete product');
            }

            // Update the state to reflect the deletion without re-fetching everything
            setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
            toast.success(`Product "${name}" deleted successfully.`);

        } catch (err) {
            toast.error(err.message);
        }
    };

    // --- 4. Render Logic ---

    if (loading) {
        return <div className="text-center py-20 text-xl text-gray-500">Loading products...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-600">Error: {error}</div>;
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-xl text-gray-600 mb-4">No products found.</p>
                <button
                    onClick={() => navigate('/admin/product-form')}
                    className="px-6 py-2 bg-black text-white rounded-lg hover:bg-black/90 transition-colors"
                >
                    Add New Product
                </button>
            </div>
        );
    }



    return (
        <div className="max-w-7xl mx-auto p-8 bg-white rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Product List ({products.length})</h2>
                <button
                    onClick={() => navigate('/admin/product-form')}
                    className="px-4 py-2 bg-black text-white bold-16 rounded-lg hover:bg-black/90 transition-colors"
                >
                    + Add New Product
                </button>
            </div>

            {/* <div>
                <h2 className='w-50 h-10 font-bold'>Search</h2>
                <input 
                type='text'
                placeholder='Book' className='w-50 h-10 border-gray-200'
                ></input>

              const filtSearch= productlist.filter(item)=>{
                produc
              }
            </div> */}

            <div className="overflow-x-auto border border-gray-200 rounded-xl">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Popular</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.id}</td>
                                <td className="px-6 py-4 max-w-xs truncate text-sm text-gray-700">{product.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    ${product.price} {product.offerPrice && <span className="text-xs text-red-500">({product.offerPrice})</span>}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {product.popular ? (
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Yes</span>
                                    ) : (
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">No</span>
                                    )}
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => handleToggleStock(product.id, product.instock)}
                                        className={`px-3 py-1 rounded-lg text-xs font-semibold ${product.instock
                                                ? 'bg-green-500 text-white hover:bg-green-600'
                                                : 'bg-red-500 text-white hover:bg-red-600'
                                            }`}
                                    >
                                        {product.instock ? 'In Stock' : 'Out of Stock'}
                                    </button>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                    <button
                                        onClick={() => handleEdit(product.id)}
                                        className="text-indigo-600 hover:text-indigo-900 mr-4 font-semibold"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id, product.title)}
                                        className="text-red-600 hover:text-red-900 font-semibold"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProductList;