import React, { useState } from 'react';
import PrescriptionForm from './PrescriptionForm';

function NewPrescriptionModal({ isOpen, onClose }) {
  const [showForm, setShowForm] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {!showForm ? (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Generate New Prescription
            </h2>
            <button
              onClick={() => setShowForm(true)}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                       transition-colors duration-200"
            >
              Generate by Yourself
            </button>
            <button
              onClick={() => {/* Handle PA generation */}}
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 
                       transition-colors duration-200"
            >
              Generate by PA
            </button>
            <button
              onClick={onClose}
              className="mt-4 text-gray-600 dark:text-gray-400 hover:text-gray-800 
                       dark:hover:text-gray-200"
            >
              Close
            </button>
          </div>
        ) : (
          <PrescriptionForm onClose={() => {
            setShowForm(false);
            onClose();
          }} />
        )}
      </div>
    </div>
  );
}

export default NewPrescriptionModal;