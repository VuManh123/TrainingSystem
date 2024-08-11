import React, { useState, useEffect } from 'react';
import { Tabs, Button } from 'antd';
import './Videos.css';
import { useParams } from 'react-router-dom';

const { TabPane } = Tabs;

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [activeTab, setActiveTab] = useState('0');
  const {chapterID} = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/api/chapter-video/${chapterID}`)
      .then(response => response.json())
      .then(data => {
        setVideos(data);
        setActiveTab('0'); // Set the first tab as active by default
      })
      .catch(error => console.error('Error fetching videos:', error));
  }, []);

  const handleTabChange = key => {
    setActiveTab(key);
  };

  const handleNext = () => {
    const nextTab = (parseInt(activeTab) + 1) % videos.length;
    setActiveTab(nextTab.toString());
  };

  const handlePrev = () => {
    const prevTab = (parseInt(activeTab) - 1 + videos.length) % videos.length;
    setActiveTab(prevTab.toString());
  };

  return (
    <div className="videos-container">
      {videos.length > 0 ? (
        <>
          <Tabs activeKey={activeTab} onChange={handleTabChange} centered>
            {videos.map((video, index) => (
              <TabPane tab={video.Name} key={index.toString()}>
                <div className="video-content">
                    <h2>{video.Name}</h2>
                  <video width="100%" controls>
                    <source src={`/${video.Link}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <p>Hướng dẫn: <br/>{video.Description}</p>
                  <p>Ngày tạo: {new Date(video.DateVideos).toLocaleDateString()}</p>
                </div>
              </TabPane>
            ))}
          </Tabs>
          <div className="video-navigation">
            <Button onClick={handlePrev} disabled={activeTab === '0'}>
              Previous
            </Button>
            <Button onClick={handleNext} disabled={activeTab === (videos.length - 1).toString()}>
              Next
            </Button>
          </div>
        </>
      ) : (
        <p>No videos available</p>
      )}
    </div>
  );
};

export default Videos;
