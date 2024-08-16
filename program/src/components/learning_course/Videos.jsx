// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext } from 'react';
import { Tabs, Button } from 'antd';
import './Videos.css';
import {FileTextOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext';

const { TabPane } = Tabs;

const Videos = () => {
  const {theme} = useContext(ThemeContext)
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
    <div className={`videos ${theme === 'dark' ? 'darkS' : ''}`}>
      <div className="videos-container">  
        {videos.length > 0 ? (
          <>
            <Tabs activeKey={activeTab} onChange={handleTabChange} centered>
              {videos.map((video, index) => (
                <TabPane tab={<FileTextOutlined></FileTextOutlined>} key={index.toString()}>
                  <div className="video-content">
                      <h2>{video.Name}</h2>
                    <video width="100%" controls>
                      <source src={`/${video.Link}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <p><strong>Hướng dẫn: </strong><br/>
                      <div dangerouslySetInnerHTML={{ __html: video.Description }} />
                    </p>
                    <p><strong>Ngày tạo: </strong>{new Date(video.DateVideos).toLocaleDateString()}</p>
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
    </div>
  );
};

export default Videos;
