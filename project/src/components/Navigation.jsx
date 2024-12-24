import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="text-xl font-bold text-gray-800 dark:text-white"
          >
            MedRecord
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            >
              Home
            </Link>
            <Link
              to="/profile"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
