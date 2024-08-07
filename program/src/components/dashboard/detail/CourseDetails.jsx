// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout, Descriptions, Spin } from 'antd';
import './CourseDetail.css';

const { Content } = Layout;

const CourseDetail = () => {
  const { ID } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const numericID = Number(ID);
        console.log('ID:', ID); // Kiểm tra giá trị ID
        console.log('Numeric ID:', numericID); // Kiểm tra giá trị numericID
  
        if (isNaN(numericID)) {
          throw new Error('Invalid course ID');
        }
  
        const response = await fetch(`http://localhost:3000/api/course/${numericID}`);
        const contentType = response.headers.get('content-type');
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        if (!contentType || !contentType.includes('application/json')) {
          throw new TypeError('Expected JSON response');
        }
  
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error('Error fetching course details:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCourseDetail();
  }, [ID]);
  

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <div>{`Error loading course details: ${error}`}</div>;
  }

  if (!course) {
    return <div>No course details available</div>;
  }

  return (
    <Layout className="course-detail-layout">
      <Content className="course-detail-content">
        <Descriptions title={course.Title} bordered>
          <Descriptions.Item label="Created By">{course.CreatedBy}</Descriptions.Item>
          <Descriptions.Item label="Start Date">{course.StartDate.split('T')[0]}</Descriptions.Item>
          <Descriptions.Item label="End Date">{course.EndDate.split('T')[0]}</Descriptions.Item>
          <Descriptions.Item label="Description">{course.Description}</Descriptions.Item>
        </Descriptions>
      </Content>
    </Layout>
  );
};

export default CourseDetail;
