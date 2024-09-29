
import React, { useState } from 'react';
import axios from 'axios';

function UploadSupportingDocs() {

    const [file, setFile] = useState();
    const [uploadedFile, setUploadedFile] = useState();
    const [error, setError] = useState();

    function handleChange(event) {
        setFile(event.target.files[0])
    }

    function handleSubmit(event) {
        event.preventDefault()
        const url = 'http://localhost:8080/api/files1/upload';
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        axios.post(url, formData, config)
            .then((response) => {
                console.log(response.data);
                setUploadedFile(response.data.file);
            })
            .catch((error) => {
                console.error("Error uploading file: ", error);
                setError(error);
            });
    }


    return (
        <form onSubmit={handleSubmit}>
            <h1>Upload Supporting File</h1>
            <input type="file" onChange={handleChange} />
            <button type="submit">Upload</button>

            { 
            uploadedFile && <img src={uploadedFile} alt="Uploaded content" /> 
            
        }
    { error && <p>Error uploading file: {error.message}</p> }
   
        </form>
         
         
  );
}

export default UploadSupportingDocs;