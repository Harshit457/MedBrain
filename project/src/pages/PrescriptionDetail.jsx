import React from "react";
import { useParams } from "react-router-dom";

function PrescriptionDetail() {
  const { id } = useParams();
  // In a real app, fetch prescription details using the id

  return (
    <div className=" mx-auto p-8 bg-base-100 shadow-xl rounded-lg mt-20 w-10/12">
      <div className="border-b-2 border-base-300 pb-4 mb-4">
        <h2 className="text-2xl font-bold">Prescription Details</h2>
        <p>Dr. John Doe - City General Hospital</p>
        <p className="text-sm">Date: March 15, 2024</p>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg">Diagnosis</h3>
          <p className="">Sample diagnosis details</p>
        </div>

        <div>
          <h3 className="font-semibold text-lg">Medications</h3>
          <ul className="list-disc pl-5 ">
            <li>Medicine 1 - 2 times daily</li>
            <li>Medicine 2 - 1 time daily</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg">Instructions</h3>
          <p className="">Sample instructions for the patient</p>
        </div>
      </div>
    </div>
  );
}

export default PrescriptionDetail;
