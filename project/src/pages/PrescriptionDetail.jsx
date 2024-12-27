import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios"; // Import the Axios instance

function PrescriptionDetail() {
  const { id } = useParams(); // Get the prescription ID from the URL params
  const [prescription, setPrescription] = useState(null); // State to store prescription data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors

  // Fetch the prescription details from the backend API
  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const response = await axiosInstance.get(`/auth/prescriptions/${id}`);
        setPrescription(response.data); // Set the prescription data in state
      } catch (err) {
        setError("Failed to fetch prescription details.");
      } finally {
        setLoading(false); // Set loading to false when request is completed
      }
    };

    fetchPrescription();
  }, [id]); // Run the effect when the `id` parameter changes

  if (loading) {
    return <div className="text-center">Loading...</div>; // Display loading message
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>; // Display error message
  }

  if (!prescription) {
    return <div className="text-center">No prescription found.</div>; // Display message if no prescription found
  }

  // Destructure the prescription data
  const {
    doctorName,
    hospitalName,
    date,
    medicines, // Changed to medicines
    documentUpload
  } = prescription;

  return (
    <div className="mx-auto p-8 bg-base-100 shadow-xl rounded-lg mt-20 w-10/12">
      {/* Header Section */}
      <div className="border-b-2 border-base-300 pb-4 mb-4">
        <h2 className="text-3xl font-semibold text-primary">{doctorName} - {hospitalName}</h2>
        <p className="text-sm text-gray-500">Date: {new Date(date).toLocaleDateString()}</p>
      </div>

      {/* Medicines Section */}
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg text-secondary">Medicines</h3>
          <ul className="list-disc pl-5 space-y-2">
            {medicines.map((med, index) => (
              <li key={index} className="text-base">{med.name} - {med.dosage} ({med.timing})</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Prescription Files Section */}
      {documentUpload && documentUpload.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold text-lg text-secondary">Prescription Files</h3>
          <div className="mt-2 space-y-2">
            {documentUpload.map((file, index) => (
              <a
                key={index}
                href={file}
                className="btn btn-primary btn-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Prescription Document {index + 1}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PrescriptionDetail;
