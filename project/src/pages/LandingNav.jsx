import React, { useState } from "react";

const LandingNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-white relative">
      {/* Logo Section */}
      <div className="flex items-center">
        <img
          src="/logo.png" // Replace with the actual logo URL
          alt="Logo"
          className="h-8"
        />
        <span className="text-lg font-semibold ml-2 text-blue-700">MEDrecord</span>
        <span className="text-sm text-gray-500 ml-2 hidden sm:block">
          eHealth platform as a Service
        </span>
      </div>

      {/* Hamburger Menu for Mobile */}
      <button
        className="text-gray-700 md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Navigation Links */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute top-full right-0 bg-white shadow-lg border rounded-md w-48 md:static md:flex md:space-x-6 md:items-center md:w-auto text-gray-700`}
      >
        <a
          href="#cases"
          className="block py-2 px-4 hover:text-blue-600"
        >
          Cases
        </a>
        <a
          href="#product"
          className="block py-2 px-4 hover:text-blue-600"
        >
          Product
        </a>
        <a
          href="#services"
          className="block py-2 px-4 hover:text-blue-600"
        >
          Services
        </a>
        <a
          href="#certifications"
          className="block py-2 px-4 hover:text-blue-600"
        >
          Certifications
        </a>
        <a
          href="#company"
          className="block py-2 px-4 hover:text-blue-600"
        >
          Company
        </a>
      </div>

      {/* Buttons and Language Switcher */}
      <div className="hidden md:flex items-center space-x-4">
        <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200">
          Contact
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Service Inquiry
        </button>
        <div className="flex space-x-2">
          <img
            src="/netherlands-flag.png" // Replace with the actual flag URL
            alt="Dutch"
            className="h-6 w-6 rounded-full border"
          />
          <img
            src="/uk-flag.png" // Replace with the actual flag URL
            alt="English"
            className="h-6 w-6 rounded-full border"
          />
        </div>
      </div>
    </nav>
  );
};

export default LandingNav;
