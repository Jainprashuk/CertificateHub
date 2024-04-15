import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Sample({userEmail}) {
  const [files, setFiles] = useState([]);

  const fetchFilesRef = useRef(); // Create a ref for fetchFiles function
  // console.log(userEmail)
  useEffect(() => {
    fetchFilesRef.current = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/files',{
          params:{
            userEmail: userEmail
          }
        });
        if (Array.isArray(response.data)) {
          setFiles(response.data);
        } else {
          setFiles([]);
        }
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    // Fetch files on component mount
    fetchFilesRef.current();
  }, [userEmail]); // Empty dependency array to fetch files only once on component mount

  const handleFileUpload = async (event) => {
    try {
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('userEmail', userEmail);

      await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Refetch files after successful upload
      fetchFilesRef.current(); // Access fetchFiles function via ref
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="App">
      <h1>File Upload App</h1>
      <input type="file" onChange={handleFileUpload} />
      <div className="files-container">
        {files.length > 0 ? (
          files.map((file, index) => (
            <div key={index}>
              {/* Display uploaded file (e.g., image) */}
              {/* <img src={`/api/files/${file.filename}`} alt={file.filename} /> */}
            </div>
          ))
        ) : (
          <p>No files uploaded yet.</p>
        )}
      </div>
    </div>
  );
}

export default Sample;
