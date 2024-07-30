import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VideoPlayer from '../components/VideoPlayer';
import ReportVideo from '../components/ReportVideo'; // Add this line

const VideoList = () => {
    const [videos, setVideos] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchVideos = async () => {
            const response = await axios.get('http://localhost:5000/api/videos');
            setVideos(response.data);
        };
        fetchVideos();
    }, []);

    const filteredVideos = videos.filter(video =>
        video.metadata.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <h2>Video List</h2>
            <input
                type="text"
                placeholder="Search videos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <ul>
                {filteredVideos.map(video => (
                    <li key={video._id}>
                        <h3>{video.metadata.name}</h3>
                        <VideoPlayer ipfsHash={video.ipfsHash} />
                        <ReportVideo videoId={video._id} /> {/* Add this line */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VideoList;
