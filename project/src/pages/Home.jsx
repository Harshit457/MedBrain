import React, { useState } from "react";
import RecordCard from "../components/RecordCard";
import NewPrescriptionModal from "../components/NewPrescriptionModal";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChatClick = () => {
    console.log("Chatbot opened!");
  };

  return (
    <div className="container mx-auto px-6 py-8 relative">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white animate-fadeIn">
          Medical Records
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary btn-md transform hover:scale-105"
        >
          Generate New Prescription
        </button>
      </div>

      {/* Records Section */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="animate-fadeIn w-full sm:w-1/2 lg:w-full">
          <RecordCard />
        </div>
      </div>

      {/* Modal */}
      <NewPrescriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Chatbot Icon with Hover Effect */}
      <div className="fixed bottom-5 right-5 group">
        {/* Main Chatbot Icon */}
        <div
          onClick={handleChatClick}
          className="bg-blue-500 text-white rounded-full p-4 shadow-lg cursor-pointer transition-transform transform hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="30"
            height="30"
            fill="currentColor"
          >
            <path d="M21.21,10.29,19.48,8.57a4.37,4.37,0,0,0,.65-2.26,4.31,4.31,0,1,0-4.32,4.32A4.35,4.35,0,0,0,18.07,10l1.72,1.73a1,1,0,0,0,1.42,0A1,1,0,0,0,21.21,10.29ZM17.45,8A2.32,2.32,0,0,1,13.5,6.31a2.29,2.29,0,0,1,.68-1.63,2.32,2.32,0,0,1,3.27,0,2.31,2.31,0,0,1,0,3.27ZM19.5,14a1,1,0,0,0-1.22.72A7,7,0,0,1,11.5,20H5.91l.64-.63a1,1,0,0,0,0-1.41,7,7,0,0,1-2-5A7,7,0,0,1,8.87,6.52a1,1,0,1,0-.74-1.86,9,9,0,0,0-3.66,14L2.79,20.29a1,1,0,0,0-.21,1.09A1,1,0,0,0,3.5,22h8a9,9,0,0,0,8.72-6.75A1,1,0,0,0,19.5,14Z"></path>
          </svg>
        </div>

        {/* Tooltip */}
        <div className="hidden group-hover:flex absolute -top-14 right-0 bg-gray-800 text-white py-1 px-3 rounded-lg shadow-lg transform transition-opacity opacity-0 group-hover:opacity-100">
          <span className="text-sm font-medium">Chatbot</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
