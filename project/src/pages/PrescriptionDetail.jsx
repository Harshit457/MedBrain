import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios"; // Import the Axios instance
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import L from "leaflet"; // Import Leaflet to customize the icon
import markerIconUrl from 'leaflet/dist/images/marker-icon.png'; // Import marker icon
import markerShadowUrl from 'leaflet/dist/images/marker-shadow.png'; // Import marker shadow

function PrescriptionDetail() {
  const { id } = useParams(); // Get the prescription ID from the URL params
  const [prescription, setPrescription] = useState(null); // State to store prescription data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors

  // Set the default Leaflet marker icon explicitly
  const defaultIcon = new L.Icon({
    iconUrl: markerIconUrl, // Use the imported marker icon
    iconSize: [30, 46], // Set icon size
    iconAnchor: [15, 46], // Anchor point for the icon
    popupAnchor: [0, -46], // Popup position relative to the icon
    shadowUrl: markerShadowUrl, // Use the imported shadow
    shadowSize: [50, 50], // Shadow size
  });

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
    return (
      <div className="text-center py-12">
        <div className="loader"></div> {/* Add a loading spinner */}
      </div>
    );
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
    medicines,
    documentUpload,
    location,
  } = prescription;

  const googleMapsUrl = `https://www.google.com/maps?q=${location.lat},${location.lng}`;

  return (
    <div className="mx-auto p-6 md:p-8 bg-white shadow-lg rounded-lg mt-12 w-full md:w-10/12 lg:w-9/12">
      {/* Header Section */}
      <div className="border-b-2 border-gray-200 pb-6 mb-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-primary text-center">{doctorName} - {hospitalName}</h2>
        <p className="text-lg text-gray-600 text-center">{new Date(date).toLocaleDateString()}</p>
      </div>

      {/* Medicines Section */}
      <div className="space-y-8">
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="font-semibold text-xl text-secondary">Medicines</h3>
          <ul className="list-disc pl-6 space-y-4 mt-4">
            {medicines.map((med, index) => (
              <li key={index} className="text-lg text-gray-700">
                <span className="font-bold">Medicine Name: {med.name}</span> Dosage: {med.dosage} Duration: ({med.timing})
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Prescription Files Section */}
      {documentUpload && documentUpload.length > 0 && (
        <div className="mt-8">
          <h3 className="font-semibold text-xl text-secondary">Prescription Files</h3>
          <div className="mt-4 space-y-4">
            {documentUpload.map((file, index) => (
              <a
                key={index}
                href={file}
                className="btn btn-primary btn-sm transition duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Prescription Document {index + 1}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Map Section */}
      <div className="mt-8">
        <h3 className="font-semibold text-xl text-secondary">Hospital Location</h3>
        <div className="mt-4 relative rounded-lg shadow-md overflow-hidden">
          <MapContainer
            center={[location.lat, location.lng]}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* Marker Section */}
            <Marker position={[location.lat, location.lng]} icon={defaultIcon}>
              <Popup>
                Location of {hospitalName}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>

      {/* Button to open location in Google Maps */}
      <div className="mt-6 text-center">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary py-2 px-6 text-lg transition duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg"
        >
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}

export default PrescriptionDetail;
