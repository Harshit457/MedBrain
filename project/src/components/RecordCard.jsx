import React from 'react';
import { useNavigate } from 'react-router-dom';

function RecordCard({ doctor, hospital, lastModified, id }) {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/prescription/${id}`)}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg 
                 transition-all duration-300 ease-in-out transform hover:-translate-y-1 
                 cursor-pointer dark:text-white animate-fadeIn"
    >
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{doctor}</h3>
      <p className="text-gray-600 dark:text-gray-300 mt-2">{hospital}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
        Last modified: {new Date(lastModified).toLocaleDateString()}
      </p>
    </div>
  );
}

export default RecordCard;