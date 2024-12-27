import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "../store/useAuthStore";

function RecordCard() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [lastUpdated, setLastUpdated] = useState(null); // Track updates

  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md animate-fadeIn">
        <p className="text-red-500 dark:text-red-300">
          You are not logged in. Please log in to view your prescriptions.
        </p>
      </div>
    );
  }

  useEffect(() => {
    if (!authUser) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    const fetchRecords = async () => {
      try {
        const response = await axiosInstance.get(`/auth/prescriptions`);
        setRecords(response.data);
        setLastUpdated(Date.now()); // Track last update time
      } catch (err) {
        setError("Failed to fetch records");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();

    // Polling: Re-fetch records every 10 seconds
    const interval = setInterval(fetchRecords, 10000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [authUser]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md animate-fadeIn">
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md animate-fadeIn">
        <p className="text-red-500 dark:text-red-300">{error}</p>
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md animate-fadeIn">
        <p className="text-gray-500 dark:text-gray-400">No records found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {records.map((record) => {
        const { doctorName, hospitalName, date, _id, documentUpload } = record;

        return (
          <div
            key={_id}
            onClick={() => navigate(`/prescription/${_id}`)}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer dark:text-white animate-fadeIn"
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              {doctorName}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {hospitalName}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Last modified: {new Date(date).toLocaleDateString()}
            </p>
            <div className="mt-4">
              {documentUpload && documentUpload.length > 0 && (
                <a
                  href={documentUpload[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Prescription Document
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RecordCard;
