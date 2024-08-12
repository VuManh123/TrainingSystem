// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext } from 'react';
import { Tabs, Button } from 'antd';
import './Documents.css';
import { FileTextOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext';

const { TabPane } = Tabs;

const Documents = () => {
  const { theme } = useContext(ThemeContext);
  const [documents, setDocuments] = useState([]);
  const [activeTab, setActiveTab] = useState('0');
  const { chapterID } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/api/chapter-document/${chapterID}`)
      .then(response => response.json())
      .then(data => {
        setDocuments(data);
        setActiveTab('0'); // Set the first tab as active by default
      })
      .catch(error => console.error('Error fetching documents:', error));
  }, [chapterID]);

  const handleTabChange = key => {
    setActiveTab(key);
  };

  const handleNext = () => {
    const nextTab = (parseInt(activeTab) + 1) % documents.length;
    setActiveTab(nextTab.toString());
  };

  const handlePrev = () => {
    const prevTab = (parseInt(activeTab) - 1 + documents.length) % documents.length;
    setActiveTab(prevTab.toString());
  };

  return (
    <div className={`documents ${theme === 'dark' ? 'darkS' : ''}`}>
      <div className="documents-container">  
        {documents.length > 0 ? (
          <>
            <Tabs activeKey={activeTab} onChange={handleTabChange} centered>
              {documents.map((document, index) => (
                <TabPane tab={<FileTextOutlined />} key={index.toString()}>
                  <div className="document-content">
                    <h2>{document.NameDocument}</h2>
                    
                    {document.LinkDocument.endsWith('.pdf') ? (
                        <iframe
                            src={`/${document.LinkDocument}`}
                            width="100%"
                            height="700px" // Đảm bảo chiều dài phù hợp với container
                            title={document.NameDocument}
   
                        />
                    ) : (
                        <a href={`/${document.LinkDocument}`} target="_blank" rel="noopener noreferrer">
                            Open {document.NameDocument} in PowerPoint Viewer or download it.
                        </a>
                    )}


                    <div>
                        {/* <strong>Description: </strong> */}
                        <div dangerouslySetInnerHTML={{ __html: document.Description }} />
                    </div>
                    <p><strong>Created on: </strong>{new Date(document.DateFile).toLocaleDateString()}</p>
                  </div>
                </TabPane>  
              ))}
            </Tabs>
            <div className="document-navigation">
              <Button onClick={handlePrev} disabled={activeTab === '0'}>
                Previous
              </Button>
              <Button onClick={handleNext} disabled={activeTab === (documents.length - 1).toString()}>
                Next
              </Button>
            </div>
          </>
        ) : (
          <p>No documents available</p>
        )}
      </div>
    </div>
  );
};

export default Documents;
