import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
function PrescriptionDetail() {
  const { id } = useParams();
  // In a real app, fetch prescription details using the id

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="border-b pb-4 mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Prescription Details
            </h2>
            <p className="text-gray-600">
              Dr. John Doe - City General Hospital
            </p>
            <p className="text-sm text-gray-500">Date: March 15, 2024</p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">Diagnosis</h3>
              <p className="text-gray-700">Sample diagnosis details</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Medications</h3>
              <ul className="list-disc pl-5 text-gray-700">
                <li>Medicine 1 - 2 times daily</li>
                <li>Medicine 2 - 1 time daily</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Instructions</h3>
              <p className="text-gray-700">
                Sample instructions for the patient
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PrescriptionDetail;
