import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

function UploadAndView({ userEmail }) {
  const [files, setFiles] = useState([]);
  const [contentType, setContentType] = useState("view");
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchFiles = async () => {
    try {
      const response = await axios.get("https://certificatehub-backend.onrender.com/api/files", {
        params: {
          userEmail,
        },
      });
      setFiles(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [userEmail]);

  const handleFileUpload = async (event) => {
    try {
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("userEmail", userEmail);
      await axios.post("https://certificatehub-backend.onrender.com/api/upload", formData, {
        headers: {
          "Content-Type": file.type,
        },
      });

      fetchFiles();
      setContentType("view");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const openModal = (file) => {
    setSelectedFile(file);
  };

  const closeModal = () => {
    setSelectedFile(null);
  };

  const renderModal = () => {
    if (!selectedFile) return null;

    const { _id } = selectedFile;

    return (
      <div
        className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 transition-opacity duration-300"
        onClick={closeModal}
      >
        <div
          className=" p-6 rounded-lg shadow-2xl max-w-lg mx-auto transform scale-105 transition-transform duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <span
            className="text-gray-500 hover:text-gray-700 cursor-pointer text-2xl absolute top-3 right-3"
            onClick={closeModal}
          >
            &times;
          </span>
          <img
            className="rounded-lg w-full h-auto p-3"
            src={`https://certificatehub-backend.onrender.com/api/files/${_id}`}
            alt=""
          />
          <div className="flex justify-center mt-4">
            <a
              className="text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 px-4 py-2 rounded-lg transition-all duration-300 shadow-lg transform hover:scale-110"
              href={`https://certificatehub-backend.onrender.com/api/files/${_id}`}
            >
              Download
            </a>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (contentType === "view") {
      return (
        <div className="p-6">
          <p className="text-center text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Your Certificates
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {files.length > 0 ? (
              files.map((file, index) => (
                <div key={index} className="relative group">
                  {file.contentType.startsWith("image") && (
                    <img
                      className="h-auto max-w-full rounded-lg shadow-xl cursor-pointer transform group-hover:scale-105 transition-transform duration-300"
                      src={`https://certificatehub-backend.onrender.com/api/files/${file._id}`}
                      alt=""
                      onClick={() => openModal(file)}
                      loading="lazy"
                    />
                  )}
                  {file.contentType.startsWith("application/pdf") && (
                    <iframe
                      className="h-auto max-w-full rounded-lg shadow-xl cursor-pointer transform group-hover:scale-105 transition-transform duration-300"
                      src={`https://certificatehub-backend.onrender.com/api/files/${file._id}`}
                      alt=""
                      onClick={() => openModal(file)}
                    />
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-600">No files uploaded yet.</p>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="p-6">
          <h2 className="text-center text-3xl font-semibold text-gray-700 mb-6">
            Upload Your Certificates
          </h2>
          <form className="flex flex-col items-center">
            <input
              className="block w-full text-sm text-gray-900 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-4 p-3"
              id="file_input"
              type="file"
              onChange={handleFileUpload}
            />
            <button
              type="button"
              className="text-white bg-gray-600 hover:from-green-600 hover:via-yellow-600 hover:to-orange-600 font-medium rounded-lg text-lg px-6 py-3 text-center shadow-xl transform transition-transform duration-300 hover:scale-110"
              onClick={() => setContentType("view")}
            >
              Upload
            </button>
          </form>
        </div>
      );
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl shadow-2xl p-8 mt-10 mx-auto max-w-5xl">
        <div className="flex justify-center mb-6">
          <div className="flex w-full sm:w-1/2 bg-gray-200 rounded-lg shadow-lg overflow-hidden">
            <button
              className={`flex-1 py-3 text-center font-semibold text-lg transition-all duration-300 ${
                contentType === "view"
                  ? "bg-white text-gray-900 shadow-inner"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setContentType("view")}
            >
              View
            </button>
            <button
              className={`flex-1 py-3 text-center font-semibold text-lg transition-all duration-300 ${
                contentType === "upload"
                  ? "bg-white text-gray-900 shadow-inner"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setContentType("upload")}
            >
              Upload
            </button>
            <button
              className={`flex-1 py-3 text-center font-semibold text-lg transition-all duration-300 ${
                contentType === "check"
                  ? "bg-white text-gray-900 shadow-inner"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setContentType("check")}
            >
              <a
                href="https://certificate-hub-ocr-frontend.vercel.app/"
                className="block"
              >
                Check Skills
              </a>
            </button>
          </div>
        </div>

        {renderContent()}
      </div>
      {renderModal()}
    </>
  );
}

export default UploadAndView;
