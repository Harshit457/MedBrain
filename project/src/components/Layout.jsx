import React from 'react';
import Navigation from './Navigation';

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <Navigation />
      <main className="container mx-auto px-4">
        {children}
      </main>
    </div>
  );
}

export default Layout;