import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout, Card, Row, Col, Spin, Typography, Button, Menu } from 'antd';
import './CourseDetail.css';

const { Content } = Layout;
const { Title, Text } = Typography;

const CourseDetail = () => {
  const { ID } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const numericID = Number(ID);
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
    return <Spin size="large" className="loading-spinner" />;
  }

  if (error) {
    return <div>{`Error loading course details: ${error}`}</div>;
  }

  if (!course) {
    return <div>No course details available</div>;
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Layout className="course-detail-layout">
      <Content className="course-detail-content">
        <div className="course-header">
          <Title level={1} className="course-title">Lập trình Scratch</Title>
          <Text className="course-short-description">
            Ngôn ngữ lập trình Scratch đơn giản, dễ hiểu, giúp học sinh làm quen với các khối lệnh logic. 
            Các em có thể tự tạo ra những trò chơi theo sáng tạo của mình. Nhờ đó, học sinh không chỉ được phát triển tư duy logic, 
            tư duy tính toán mà còn phát huy khả năng sáng tạo một cách tự nhiên.
          </Text>
          <div className="course-dates">
            <Text className="course-date">Lịch đăng ký: 15/10/2023 - 28/10/2023</Text>
            <Text className="course-date">Lịch học: 28/10/2023 - 31/12/2023</Text>
          </div>
          <Button type="primary" className="enroll-button">Xem khóa học</Button>
        </div>
        <Menu mode="horizontal" defaultSelectedKeys={['introduction']}>
          <Menu.Item key="introduction" onClick={() => scrollToSection('introduction')}>Giới thiệu</Menu.Item>
          <Menu.Item key="content" onClick={() => scrollToSection('content')}>Nội dung khóa học</Menu.Item>
          <Menu.Item key="instructor" onClick={() => scrollToSection('instructor')}>Giảng viên</Menu.Item>
          <Menu.Item key="curriculum" onClick={() => scrollToSection('curriculum')}>Chương trình đào tạo</Menu.Item>
        </Menu>
        <Row gutter={[16, 16]} className="course-detail-info">
          <Col span={24} id="introduction">
            <Card title="Giới thiệu về khóa học">
              <Text>{course.Description}</Text>
            </Card>
          </Col>
          <Col span={24} id="content">
            <Card title="Nội dung khóa học">
              <Text>{course.Content}</Text>
            </Card>
          </Col>
          <Col span={24} id="instructor">
            <Card title="Giảng viên">
              <Text>{course.Instructor}</Text>
            </Card>
          </Col>
          <Col span={24} id="curriculum">
            <Card title="Chương trình đào tạo">
              <Text>{course.Curriculum}</Text>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default CourseDetail;
