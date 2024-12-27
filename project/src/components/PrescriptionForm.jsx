import React, { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useRef } from "react";
function PrescriptionForm({ onClose }) {
  const [formData, setFormData] = useState({
    doctorName: "",
    hospitalName: "",
    medicines: [{ name: "", dosage: "", timing: "" }],
    
    location: { lat: "", lng: "" },
    date: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Could not fetch location. Please enable location services.");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);
  
  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleMedicineChange = (index, field, value) => {
    const newMedicines = [...formData.medicines];
    newMedicines[index] = { ...newMedicines[index], [field]: value };
    setFormData((prev) => ({ ...prev, medicines: newMedicines }));
  };

  const handleAddMedicine = () => {
    setFormData((prev) => ({
      ...prev,
      medicines: [...prev.medicines, { name: "", dosage: "", timing: "" }],
    }));
  };

  const handleRemoveMedicine = (index) => {
    const newMedicines = formData.medicines.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, medicines: newMedicines }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
  
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // Store base64 string in state
    };
    reader.readAsDataURL(file); // Convert image to base64 string
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { doctorName, hospitalName, medicines, location, date } = formData;
  
    // Validate fields
    if (
      !doctorName ||
      !hospitalName ||
      !date ||
      !location.lat ||
      !location.lng ||
      medicines.some((med) => !med.name || !med.dosage || !med.timing)
    ) {
      alert("Please fill in all required fields.");
      return;
    }
  
    try {
      const formDataPayload = new FormData();
      formDataPayload.append("doctorName", doctorName);
      formDataPayload.append("hospitalName", hospitalName);
      formDataPayload.append("date", new Date(date).toISOString());
      formDataPayload.append("location", JSON.stringify(location)); // Send as JSON string
      formDataPayload.append("medicines", JSON.stringify(medicines)); // Send as JSON string
  
      if (imagePreview) {
        formDataPayload.append("documentUpload", imagePreview); // Add base64 string
      }
  
      const response = await axiosInstance.post("/auth/prescriptions", formDataPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      alert("Prescription created successfully.");
      onClose();
    } catch (error) {
      console.error("Error creating prescription:", error);
      alert("Failed to create prescription.");
    }
  };
  
  

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-base-100 shadow-lg rounded-lg relative"
    >
      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        aria-label="Close"
      >
        ✕
      </button>

      <div>
        <label className="block text-sm font-medium">Doctor Name</label>
        <input
          type="text"
          required
          className="input input-bordered w-full mt-2"
          value={formData.doctorName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, doctorName: e.target.value }))
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Hospital Name</label>
        <input
          type="text"
          required
          className="input input-bordered w-full mt-2"
          value={formData.hospitalName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, hospitalName: e.target.value }))
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Date</label>
        <input
          type="date"
          required
          className="input input-bordered w-full mt-2"
          value={formData.date}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, date: e.target.value }))
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Location</label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <input
            type="text"
            placeholder="Latitude"
            value={formData.location.lat}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                location: { ...prev.location, lat: e.target.value },
              }))
            }
            className="input input-bordered"
          />
          <input
            type="text"
            placeholder="Longitude"
            value={formData.location.lng}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                location: { ...prev.location, lng: e.target.value },
              }))
            }
            className="input input-bordered"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Medicines</label>
        {formData.medicines.map((medicine, index) => (
          <div key={index} className="mt-4 space-y-2">
            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                required
                className="input input-bordered"
                placeholder="Medicine Name"
                value={medicine.name}
                onChange={(e) =>
                  handleMedicineChange(index, "name", e.target.value)
                }
              />
              <input
                type="text"
                required
                className="input input-bordered"
                placeholder="Dosage"
                value={medicine.dosage}
                onChange={(e) =>
                  handleMedicineChange(index, "dosage", e.target.value)
                }
              />
              <input
                type="text"
                required
                className="input input-bordered"
                placeholder="Duration"
                value={medicine.timing}
                onChange={(e) =>
                  handleMedicineChange(index, "timing", e.target.value)
                }
              />
            </div>
            {formData.medicines.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveMedicine(index)}
                className="btn btn-error btn-sm"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddMedicine}
          className="btn btn-primary btn-sm mt-4"
        >
          Add Medicine
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium">
          Prescription File (optional)
        </label>
        <input
            type="file"
            accept="image/*"
            className="w-full"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
      </div>

      <button type="submit" className="btn btn-primary w-full">
        Create Prescription
      </button>
    </form>
  );
}

export default PrescriptionForm;
