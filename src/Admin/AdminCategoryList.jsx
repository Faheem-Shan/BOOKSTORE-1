import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaPlusCircle } from 'react-icons/fa';


const API_URL = 'http://localhost:3000/categories';

const AdminCategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingName, setEditingName] = useState('');

    // --- 1. Fetching Categories (READ) ---
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Failed to fetch categories.');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            toast.error('Error loading categories. Make sure JSON Server is running.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // --- 2. Adding a Category (CREATE) ---
    const handleAddCategory = async (e) => {
        e.preventDefault();
        const trimmedName = newCategoryName.trim();
        if (!trimmedName) return toast.error('Category name cannot be empty.');

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: trimmedName }),
            });

            if (!response.ok) throw new Error('Failed to add category.');

            const addedCategory = await response.json();
            
            // Update state locally
            setCategories(prev => [...prev, addedCategory]);
            setNewCategoryName('');
            toast.success(`Category "${trimmedName}" added successfully!`);

        } catch (error) {
            toast.error(error.message || 'Error adding category.');
        }
    };

    // --- 3. Deleting a Category (DELETE) ---
    const handleDelete = async (id, name) => {
        // Confirmation dialog for safety
        if (!window.confirm(`Are you sure you want to delete the category: "${name}"? This action cannot be undone.`)) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete category');

            // Update state locally
            setCategories(prev => prev.filter(cat => cat.id !== id));
            toast.success(`Category "${name}" deleted.`);

        } catch (error) {
            // Note: JSON Server may not prevent deletion if products reference this category, 
            // but in a real backend, this would often fail.
            toast.error('Error deleting category.');
        }
    };

    // --- 4. Editing a Category (UPDATE) ---
    const startEdit = (category) => {
        setEditingId(category.id);
        setEditingName(category.name);
    }
    
    const handleEditSave = async (category) => {
        const newName = editingName.trim();
        if (newName === category.name) {
            setEditingId(null); // No change, just close editing
            return;
        }
        if (!newName) return toast.error('Name cannot be empty.');

        try {
            const response = await fetch(`${API_URL}/${category.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newName }),
            });

            if (!response.ok) throw new Error('Failed to update category');
            
            const updatedCategory = await response.json();
            
            // Update state locally
            setCategories(prev => prev.map(cat => 
                cat.id === category.id ? updatedCategory : cat
            ));
            setEditingId(null);
            toast.success(`Category updated to "${updatedCategory.name}"`);

        } catch (error) {
            toast.error('Error updating category.');
        }
    };

    if (loading) {
        return <div className="text-center py-20 text-xl text-gray-500">Loading categories...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Manage Categories</h2>

            {/* Add New Category Form */}
            <form onSubmit={handleAddCategory} className="flex flex-col sm:flex-row gap-4 mb-12 p-5 border rounded-xl bg-gray-50">
                <input
                    type="text"
                    placeholder="Enter new category name (e.g., Thriller)"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-black focus:border-black text-gray-800"
                />
                <button
                    type="submit"
                    className="flex items-center justify-center px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                >
                    <FaPlusCircle className="mr-2" /> Add Category
                </button>
            </form>

            {/* Category List Table */}
            <div className="overflow-x-auto border border-gray-200 rounded-xl">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">Name</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {categories.map((category) => (
                            <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.id}</td>
                                <td className="px-6 py-4">
                                    {editingId === category.id ? (
                                        <input
                                            type="text"
                                            value={editingName}
                                            onChange={(e) => setEditingName(e.target.value)}
                                            onBlur={() => handleEditSave(category)} 
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    handleEditSave(category);
                                                }
                                                if (e.key === 'Escape') {
                                                    setEditingId(null);
                                                }
                                            }}
                                            className="w-full px-2 py-1 border rounded focus:ring-indigo-500 focus:border-indigo-500"
                                            autoFocus
                                        />
                                    ) : (
                                        <span className="text-sm text-gray-700">{category.name}</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                    {editingId === category.id ? (
                                        <button
                                            onClick={() => handleEditSave(category)}
                                            className="text-green-600 hover:text-green-800 font-semibold mr-4"
                                            title="Save Changes"
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => startEdit(category)}
                                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                                            title="Edit Category"
                                        >
                                            <FaEdit className="inline h-4 w-4" />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(category.id, category.name)}
                                        className="text-red-600 hover:text-red-900"
                                        title="Delete Category"
                                    >
                                        <FaTrash className="inline h-4 w-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {categories.length === 0 && !loading && (
                <div className="text-center py-10 text-gray-500">No categories found. Add one above!</div>
            )}
        </div>
    );
};

export default AdminCategoryList;