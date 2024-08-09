import React, { useState, useEffect } from 'react';

const Videos = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/chapter-video/2')
            .then(response => response.json())
            .then(data => setVideos(data))
            .catch(error => console.error('Error fetching videos:', error));
    }, []);

    return (
        <div>
            {videos.length > 0 ? (
                videos.map(video => (
                    <div key={video.ID} style={{ marginBottom: '20px' }}>
                        <h3>{video.Name}</h3>
                        <video width="600" controls>
                            <source src={`/${video.Link}`} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <p>{video.Description}</p>
                        <p>{new Date(video.DateVideos).toLocaleDateString()}</p>
                    </div>
                ))
            ) : (
                <p>No videos available</p>
            )}
        </div>
    );
};

export default Videos;
