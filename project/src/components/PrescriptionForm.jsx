import React, { useState } from 'react';

function PrescriptionForm({ onClose }) {
  const [formData, setFormData] = useState({
    doctorName: '',
    hospitalName: '',
    medicineCount: '1',
    medicines: [{ name: '', dosage: '', duration: '' }],
    prescriptionFile: null
  });

  const handleMedicineCountChange = (e) => {
    const count = parseInt(e.target.value);
    setFormData(prev => ({
      ...prev,
      medicineCount: e.target.value,
      medicines: Array(count).fill().map((_, i) => 
        prev.medicines[i] || { name: '', dosage: '', duration: '' }
      )
    }));
  };

  const handleMedicineChange = (index, field, value) => {
    const newMedicines = [...formData.medicines];
    newMedicines[index] = { ...newMedicines[index], [field]: value };
    setFormData(prev => ({ ...prev, medicines: newMedicines }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-slideIn">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Doctor Name
        </label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                     focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 
                     dark:border-gray-600 dark:text-white"
          value={formData.doctorName}
          onChange={(e) => setFormData(prev => ({ ...prev, doctorName: e.target.value }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Hospital Name
        </label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                     focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 
                     dark:border-gray-600 dark:text-white"
          value={formData.hospitalName}
          onChange={(e) => setFormData(prev => ({ ...prev, hospitalName: e.target.value }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Number of Medicines
        </label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                     focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 
                     dark:border-gray-600 dark:text-white"
          value={formData.medicineCount}
          onChange={handleMedicineCountChange}
        >
          {[1, 2, 3, 4, 5].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

      {formData.medicines.map((medicine, index) => (
        <div key={index} className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h4 className="font-medium text-gray-700 dark:text-gray-300">Medicine {index + 1}</h4>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                           focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 
                           dark:border-gray-600 dark:text-white"
                value={medicine.name}
                onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Dosage
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                           focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 
                           dark:border-gray-600 dark:text-white"
                value={medicine.dosage}
                onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Duration
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                           focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 
                           dark:border-gray-600 dark:text-white"
                value={medicine.duration}
                onChange={(e) => handleMedicineChange(index, 'duration', e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Upload Prescription (PDF or Image)
        </label>
        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100
                     dark:file:bg-gray-700 dark:file:text-gray-300"
          onChange={(e) => setFormData(prev => ({ ...prev, prescriptionFile: e.target.files[0] }))}
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 
                     rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 
                     dark:hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 
                     rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default PrescriptionForm;