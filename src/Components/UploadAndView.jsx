import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./style.css";

function UploadAndView({ userEmail }) {
  const [files, setFiles] = useState([]);
  const [contentType, setContentType] = useState("view"); // Initialize with 'view'
  const [selectedFile, setSelectedFile] = useState(null); // Track selected file for modal

  const fetchFilesRef = useRef();

  useEffect(() => {
    fetchFilesRef.current = async () => {
      try {
        const response = await axios.get("https://certificatehub-backend.onrender.com/api/files",{
          params:{
            userEmail,
          }
        });
        if (Array.isArray(response.data)) {
          setFiles(response.data);
        } else {
          setFiles([]);
        }
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFilesRef.current(); // Fetch files on component mount
  }, []);

  const handleFileUpload = async (event) => {
    try {
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("userEmail", userEmail);
      await axios.post("https://certificatehub-backend.onrender.com/api/upload", formData, {
        headers: {
          "Content-Type": "image/jpeg",
        },
      });

      fetchFilesRef.current(); // Refetch files after successful upload
      
      setContentType("view"); // Switch back to view after upload
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const openModal = (file) => {
    setSelectedFile(file); // Set the selected file to open its modal
  };

  const closeModal = () => {
    setSelectedFile(null); // Clear selected file to close its modal
  };

  const renderModal = () => {
    if (!selectedFile) return null;

    const { _id, filename } = selectedFile;

    return (
      <div className="modal" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span className="close bg-white p-2 my-auto" onClick={closeModal}>
            &times;
          </span>
          
          <img
            className="rounded-lg w-1/3 h-auto p-3 mx-auto"
            src={`https://certificatehub-backend.onrender.com/api/files/${_id}`}
            alt=""
          />
          <div className="flex justify-center align-middle">
          <a  className="bg-gray-200 mx-auto p-2 rounded-lg hover:bg-slate-300"  href="https://certificatehub-backend.onrender.com/api/files/${_id}" download={`https://certificatehub-backend.onrender.com/api/files/${_id}`} > download</a>
          </div>
        </div>
        
      </div>
    );
  };

  const renderContent = () => {
    if (contentType === "view") {
      return (
        <div className="p-6">
          <p className="text-center text-3xl font-bold mb-6 text-shadow">Your Certificates</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {files.length > 0 ? (
              files.map((file, index) => (
                <div key={index} className="mb-4">
                  {file.contentType.startsWith("image") ? (
                    <img
                      className="h-auto max-w-full rounded-lg cursor-pointer"
                      src={`https://certificatehub-backend.onrender.com/api/files/${file._id}`}
                      alt=""
                      onClick={() => openModal(file)}
                    />
                  ) : (
                    <p>{" "}</p>
                  )}
                  {file.contentType.startsWith("application/pdf") ? (
                    <iframe
                      className="h-auto max-w-full rounded-lg cursor-pointer"
                      src={`https://certificatehub-backend.onrender.com/api/files/${file._id}`}
                      alt=""
                      onClick={() => openModal(file)}
                    />
                  ) : (
                    <p>{" "}</p>
                  )}
                </div>
              ))
            ) : (
              <p>No files uploaded yet.</p>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="p-6">
          <h2 className="text-center">Upload Your Certificates here</h2>
          <form className="m-5">
            <div className="flex gap-5">
              <input
                className="block w-full text-sm p-2 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input"
                type="file"
                onChange={handleFileUpload}
              />
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center"
                onClick={() => setContentType("view")}
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      );
    }
  };

  return (
    <>
      <div className="bg-white flex flex-col sm:flex-row gap-1 w-11/12 md:w-1/2 mx-auto p-2 mt-5 rounded-3xl">
        <button
          className={`bg-gradient-to-r from-amber-200 to-yellow-500 w-full sm:w-1/2 p-2 text-center rounded-tl-xl rounded-tr-xl sm:rounded-tl-xl sm:rounded-bl-xl ${
            contentType === "view" ? "bg-gradient-to-r from-amber-400 to-yellow-600" : ""
          }`}
          onClick={() => setContentType("view")}
        >
          View
        </button>
        <button
          className={`bg-gradient-to-r from-orange-600 to-orange-500 w-full sm:w-1/2 p-2 text-center rounded-bl-xl rounded-br-xl sm:rounded-tr-xl sm:rounded-br-xl ${
            contentType === "upload" ? "bg-gradient-to-r from-orange-700 to-orange-600" : ""
          }`}
          onClick={() => setContentType("upload")}
        >
          Upload
        </button>
      </div>
      <div id="mycontent" className="border-2 rounded-lg m-5">
        {renderContent()}
      </div>
      {renderModal()}
    </>
  );
}

export default UploadAndView;
