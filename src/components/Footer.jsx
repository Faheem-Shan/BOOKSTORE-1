// import React from 'react'

// const Footer = () => {
//   return (
//     <div>Footer</div>
//   )
// }

// export default Footer

// import React from 'react';
// import { Link } from 'react-router-dom';

// const Footer = () => {
//   return (
//     <footer className="bg-gray-800 text-white py-6">
//       <div className="max-padd-container text-center">
//         <p>&copy; 2025 Bookly. All rights reserved.</p>
//         <div className="mt-2 space-x-4">
//           <Link to="/contact" className="hover:underline">Contact</Link>
//           <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-padd-container text-center">
        <p>&copy; 2025 Bookly. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <p>Email: bookly@gmail.com | Phone: +91-9876543210</p>
          <Link to="/contact" className="hover:underline">Contact</Link>
          <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;