import React, { useState } from 'react';
import axios from 'axios';

const UploadVideo = () => {
    const [video, setVideo] = useState(null);

    const handleUpload = async () => {
        if (!video) return;

        const data = new FormData();
        data.append('file', video);

        try {
            const response = await axios.post('http://localhost:5000/api/upload', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            console.log('IPFS Hash:', response.data.ipfsHash);
        } catch (error) {
            console.error('Error uploading video:', error);
        }
    };

    return (
        <div>
            <h2>Upload Video</h2>
            <input type="file" onChange={(e) => setVideo(e.target.files[0])} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default UploadVideo;
