import React, { useState } from 'react';
import axios from 'axios';

const ReportVideo = ({ videoId }) => {
    const [reason, setReason] = useState('');

    const handleReport = async () => {
        try {
            await axios.post('http://localhost:5000/api/report', { videoId, reason });
            alert('Report submitted successfully');
        } catch (error) {
            console.error('Error reporting video:', error);
        }
    };

    return (
        <div>
            <h4>Report Video</h4>
            <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Reason for reporting"
            />
            <button onClick={handleReport}>Submit Report</button>
        </div>
    );
};

export default ReportVideo;
