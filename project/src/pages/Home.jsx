import React, { useState } from "react";
import RecordCard from "../components/RecordCard";
import NewPrescriptionModal from "../components/NewPrescriptionModal";
import Layout from "../components/Layout";
function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [records] = useState([
    {
      id: 1,
      doctor: "Dr. John Doe",
      hospital: "City General Hospital",
      lastModified: "2024-03-15",
    },
    {
      id: 2,
      doctor: "Dr. Sarah Smith",
      hospital: "Memorial Medical Center",
      lastModified: "2024-03-14",
    },
    {
      id: 3,
      doctor: "Dr. Michael Johnson",
      hospital: "St. Mary's Hospital",
      lastModified: "2024-03-13",
    },
    {
      id: 4,
      doctor: "Dr. Emily Brown",
      hospital: "Central Healthcare",
      lastModified: "2024-03-12",
    },
    {
      id: 5,
      doctor: "Dr. Robert Wilson",
      hospital: "Unity Medical Center",
      lastModified: "2024-03-11",
    },
  ]);

  return (
    <Layout children={<div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white animate-fadeIn">
          Medical Records
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 
                 transition-colors duration-200 transform hover:scale-105"
        >
          Generate New Prescription
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {records.map((record, index) => (
          <div
            key={record.id}
            className="animate-fadeIn"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <RecordCard {...record} />
          </div>
        ))}
      </div>

      <NewPrescriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>}>
      
    </Layout>
  );
}

export default Home;
