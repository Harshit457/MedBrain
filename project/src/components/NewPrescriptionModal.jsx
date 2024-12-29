import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import PrescriptionForm from "./PrescriptionForm";

function NewPrescriptionModal({ isOpen, onClose }) {
  const [showForm, setShowForm] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false); // State to control QR code visibility
  const [qrCodeData, setQrCodeData] = useState(""); // Store the QR code data
  const qrCodeCanvasRef = useRef(null); // Create a reference for the canvas

  // Make sure this effect runs always, not conditionally
  useEffect(() => {
    if (qrCodeData && qrCodeCanvasRef.current) {
      QRCode.toCanvas(qrCodeCanvasRef.current, qrCodeData, function (error) {
        if (error) {
          console.error("Error generating QR code:", error);
        } else {
          console.log("QR code generated successfully");
        }
      });
    }
  }, [qrCodeData]); // Runs whenever qrCodeData changes

  if (!isOpen) return null;

  const generateQRCode = () => {
    // Generate a random prescription ID
    const prescriptionId =
      "prescription-" + Math.random().toString(36).substr(2, 9);

    // You can customize the URL or data to pass in the QR code
    const formUrl = `https://docs.google.com/forms/d/e/1FAIpQLSfHCYq-sVvprhYCAL1h0h56uIx9b8CD75K1adgCJnzLANfcsw/viewform?prescriptionId=${prescriptionId}`;

    // Set the QR code data
    setQrCodeData(formUrl);
    setShowQRCode(true); // Show QR code after generation
  };

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
              onClick={generateQRCode} // On click, generate QR code
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 
                       transition-colors duration-200"
            >
              Generate by PA
            </button>

            {/* Display QR code if generated */}
            {showQRCode && (
              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Scan this QR Code to fill the form
                </h3>
                <div className="flex justify-center">
                  <canvas ref={qrCodeCanvasRef}></canvas>
                </div>
              </div>
            )}

            <button
              onClick={onClose}
              className="mt-4 text-gray-600 dark:text-gray-400 hover:text-gray-800 
                       dark:hover:text-gray-200"
            >
              Close
            </button>
          </div>
        ) : (
          <PrescriptionForm
            onClose={() => {
              setShowForm(false);
              onClose();
            }}
          />
        )}
      </div>
    </div>
  );
}

export default NewPrescriptionModal;
