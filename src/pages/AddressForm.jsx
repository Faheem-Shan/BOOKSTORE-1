//  import React, { useState, useOutletContext } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AddressForm = () => {
//   const [address, setAddress] = useState({ name: '', street: '', city: '', pincode: '' });
//   const navigate = useNavigate();
//   const { userName } = useOutletContext();

//   const handleChange = (e) => {
//     setAddress({ ...address, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     navigate('/payment', { state: { address } });
//   };

//   return (
//     <section className="max-padd-container py-12 bg-gray-100">
//       <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Add Address, {userName}</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Full Name</label>
//             <input
//               type="text"
//               name="name"
//               value={address.name}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Street</label>
//             <input
//               type="text"
//               name="street"
//               value={address.street}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">City</label>
//             <input
//               type="text"
//               name="city"
//               value={address.city}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Pincode</label>
//             <input
//               type="text"
//               name="pincode"
//               value={address.pincode}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
//           >
//             Save and Proceed
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default AddressForm;


import React, { useState} from 'react';
import { useNavigate,useOutletContext } from 'react-router-dom';
import toast from 'react-hot-toast'; 

const AddressForm = () => {
  const [address, setAddress] = useState({ name: '', street: '', city: '', pincode: '' });
  const navigate = useNavigate();

  // This is correctly pulling the user name from the ProtectedRoute context
  const { userName } = useOutletContext();

  const handleChange = (e) => setAddress({ ...address, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any field value is empty
    if (Object.values(address).some((field) => !field)) {
      // Use the custom toast notification instead of the default browser alert
      toast.error('Please fill all fields!');
      return;
    }

    // Pass the address data to the next payment route
    navigate('/payment', { state: { address } });
  };

  return (
    <section className="max-padd-container py-12 bg-gray-50">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Shipping Address, {userName}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={address.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-200"
              required
            />
          </div>
          {/* (Remaining input fields are correct) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Street</label>
            <input
              type="text"
              name="street"
              value={address.street}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Pincode</label>
            <input
              type="number"
              name="pincode"
              value={address.pincode}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-200"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Save and Proceed
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddressForm;