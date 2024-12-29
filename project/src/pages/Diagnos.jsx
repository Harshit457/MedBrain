import React, { useState } from "react";

function ImageUploadComponent() {
  const [image, setImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type === "image/png") {
      setImage(URL.createObjectURL(file));
    } else {
      alert("Only PNG files are allowed!");
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files?.[0];
    if (file && file.type === "image/png") {
      setImage(URL.createObjectURL(file));
    } else {
      alert("Only PNG files are allowed!");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleSubmit = () => {
    if (image) {
      alert("Image submitted!");
    } else {
      alert("Please upload an image first!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 p-6">
      {/* Drag and Drop Area */}
      <div
        className={`relative w-full max-w-lg p-6 border-2 border-dashed rounded-lg transition-all ${
          dragActive
            ? "border-blue-500 bg-blue-100"
            : "border-gray-300 bg-white dark:bg-gray-900"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/png" // Restrict file input to PNG
          onChange={handleImageUpload}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        {image ? (
          <div className="flex flex-col items-center">
            <img
              src={image}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-lg shadow-md"
            />
            <span className="text-gray-600 dark:text-gray-300 mt-4">
              Drag and drop or click to replace the image.
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-16 h-16 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5v-13m0 13l3-3m-3 3l-3-3m7.5-6.75A6 6 0 115.25 9m13.5 0a6 6 0 11-12 0"
              />
            </svg>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Drag and drop an image or click to upload (PNG only).
            </p>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="btn btn-primary mt-6 w-40 transition-transform hover:scale-105"
      >
        Submit
      </button>
    </div>
  );
}

export default ImageUploadComponent;
