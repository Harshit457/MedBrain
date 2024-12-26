import React from "react";

function Profile() {
  const profileSections = [
    { title: "Personal Information", completion: 80 },
    { title: "Medical Education", completion: 60 },
    { title: "License & Certifications", completion: 40 },
    { title: "Work Experience", completion: 90 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-200 mb-8">
        Profile Completion
      </h1>

      <div className=" rounded-lg shadow-md p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold">Overall Completion</span>
            <span className="text-blue-600 font-semibold">70%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: "70%" }}
            ></div>
          </div>
        </div>

        <div className="space-y-6">
          {profileSections.map((section, index) => (
            <div key={index} className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{section.title}</span>
                <span className="text-sm text-gray-600">
                  {section.completion}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${section.completion}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
