import React from "react";
import { Link,useLocation } from "react-router-dom";

const NotFound = () => {

  const location = useLocation();
  const homePath = location.pathname.startsWith('/admin') ? '/admin' : '/';

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-white font-serif text-center p-6">
      <div className="w-full max-w-lg">
        <div
          className="h-96 bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
          }}
        >
          <h1 className="text-[80px] font-bold text-gray-800 mt-10">404</h1>
        </div>

        <div className="-mt-8">
          <h3 className="text-2xl font-semibold">Looks like you're lost</h3>
          <p className="mt-2 text-gray-600">
            The page you’re looking for is not available!
          </p>

          <Link
            to={homePath}
            className="inline-block mt-6 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
