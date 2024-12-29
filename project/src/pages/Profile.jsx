import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Heart, Activity, Cigarette, Wine, UserPlus } from 'lucide-react';
import { axiosInstance } from '../lib/axios';

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: '', age: '', mobile: '', gender: '', email: '',
    dateOfBirth: '', height: '', weight: '', bloodType: '', phoneNumber: '',
    address: '', city: '', state: '', zipCode: '',
    emergencyContactName: '', emergencyContactRelationship: '', emergencyContactPhone: '',
    chronicDiseases: '', surgeries: '', allergies: '', currentMedications: '',
    familyHistory: '', smokingStatus: '', alcoholConsumption: '', physicalActivity: ''
  });

  useEffect(() => {
    // Fetch initial data from backend
    const fetchData = async () => {
      try {
        const response = await axiosInstance("/auth/check");
        const { fullName, age, mobile, gender, email } = response.data;
        setFormData(prevState => ({
          ...prevState,
          fullName,
          age,
          mobile,
          gender,
          email
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form to update profile
    axiosInstance.post('/auth/update-profile', formData)
      .then(response => {
        console.log("Profile updated successfully", response);
      })
      .catch(error => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-8 flex items-center gap-2">
            <User className="w-8 h-8" />
            Personal Medical Profile
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <section className="space-y-6">
              <h2 className="text-xl font-semibold text-blue-700 border-b border-blue-200 pb-2">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                  />
                </div>
                <div>
                  {/* Empty div for spacing */}
                </div>
              </div>
            </section>

            {/* Editable Fields */}
            <section className="space-y-6">
              {/* Contact Information */}
              <h2 className="text-xl font-semibold text-blue-700 border-b border-blue-200 pb-2 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                  />
                </div>
              </div>

              {/* Emergency Contact */}
              <h2 className="text-xl font-semibold text-blue-700 border-b border-blue-200 pb-2 flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                Emergency Contact
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Relationship</label>
                  <input
                    type="text"
                    name="emergencyContactRelationship"
                    value={formData.emergencyContactRelationship}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    name="emergencyContactPhone"
                    value={formData.emergencyContactPhone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                  />
                </div>
              </div>
            </section>

            <div className="text-center mt-8">
              <button
                type="submit"
                className="bg-blue-600 text-white rounded-lg px-6 py-2 text-lg font-medium hover:bg-blue-700 transition duration-300"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;