import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
     return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-amber-50 text-center p-6">
      <img
        src="https://i.ibb.co/jnVKsRt/error.jpg"
        alt="404 Food Not Found"
        className="w-64 mb-6"
      />
      <h1 className="text-5xl font-bold text-red-400 mb-4">404</h1>
      <p className="text-xl font-medium mb-6 text-gray-700">
        Oops! Looks like the recipe you are searching for is missing.
      </p>
      <Link
        to="/"
        className="btn bg-red-400 hover:bg-red-500 text-white font-semibold px-6 py-2 rounded"
      >
        Back to Home
      </Link>
    </div>
  );
};
export default ErrorPage;