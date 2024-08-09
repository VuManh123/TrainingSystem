// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useContext } from 'react';
import { Collapse, Button, List, Space, Typography } from 'antd';
import { CheckCircleOutlined, FileTextOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import './CourseOutline.css'
import { ThemeContext } from '../ThemeContext';

const { Panel } = Collapse;
const { Text } = Typography;

const chapterTabs = [
  {
    key: '1',
    title: 'Slide bài giảng',
    completed: false,
  },
  {
    key: '2',
    title: 'Tài liệu tham khảo',
    completed: false,
  },
  {
    key: '3',
    title: 'Tổng kết khóa học',
    completed: false,
  },
];

const defaultLessons = ['Học liệu', 'Video bài giảng', 'Bài kiểm tra cuối chương'];

const CourseOutline = () => {
  const { theme } = useContext(ThemeContext);
  const [courseData, setCourseData] = useState([]);
  const [courseData1, setCourseData1] = useState([]); // Lấy title cho khóa học
  const { userID, ID } = useParams();
  const numericUserID = Number(userID);
  const numericCourseID = Number(ID);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isNaN(numericUserID) || isNaN(numericCourseID)) {
          throw new Error('Invalid ID');
        }
        const response = await fetch(`http://localhost:3000/api/chapter-complete/${numericUserID}/${numericCourseID}`);
        const responseForTitleCourse = await fetch(`http://localhost:3000/api/course/${numericCourseID}`);
        const data = await response.json();
        const data2 = await responseForTitleCourse.json();
        setCourseData(data);
        setCourseData1(data2);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchData();
  }, [numericUserID, numericCourseID]);

  const handleClick = (item, chapterID) => {
    let path = '';
    if (item === 'Học liệu') {
      path = `/learning-course/${numericUserID}/${numericCourseID}/${chapterID}/document`;
    } else if (item === 'Video bài giảng') {
      path = `/learning-course/${numericUserID}/${numericCourseID}/${chapterID}/videos`;
    } else if (item === 'Bài kiểm tra cuối chương') {
      path = `/learning-course/${numericUserID}/${numericCourseID}/${chapterID}/testfinalchapter`;
    }
    navigate(path);
  };

  return (
    <div className={`course-outline-container-wrapper ${theme === 'dark' ? 'darkS' : ''}`}>
      <div className='course-outline-container'>
        {/* Cụm bên trái */}
        <div className="course-outline-left">
          <Typography.Title level={3} className="course-outline-title">{courseData1.Title}</Typography.Title>

          <Tabs defaultActiveKey="1">
            {chapterTabs.map((tab) => (
              <Tabs.TabPane
                tab={
                  <span>
                    <FileTextOutlined />
                    {tab.title} {tab.completed && <CheckCircleOutlined style={{ color: 'green' }} />}
                  </span>
                }
                key={tab.key}
              >
                <Typography.Title level={4}>{tab.title}</Typography.Title>
              </Tabs.TabPane>
            ))}
          </Tabs>
          {/* accordion */}
          <Collapse bordered={false} defaultActiveKey={['0']}>
            {courseData.map((chapter, index) => (
              <Panel
                header={
                  <Space>
                    <Text>{chapter.Title}</Text>
                    {chapter.Complete === 1 && <CheckCircleOutlined style={{ color: 'green' }} />}
                  </Space>
                }
                key={index}
              >
                <List
                  size="small"
                  bordered
                  dataSource={defaultLessons}
                  renderItem={(item) => (
                    <List.Item onClick={() => handleClick(item, chapter.ID)} style={{ cursor: 'pointer' }}>
                      {item}
                    </List.Item>
                  )}
                />
              </Panel>
            ))}
          </Collapse>
        </div>

        {/* Đường kẻ dọc */}
        <div className="vertical-divider"></div>

        {/* Cụm bên phải */}
        <div className="course-outline-right">
          <div className="course-outline-right-button">
            <Button type="primary" className="course-outline-button">Tiếp tục học</Button>
          </div>
          <div>
            <Typography.Title level={5} className="course-outline-timestamp-title">Lưu ý các mốc thời gian</Typography.Title>
            <Space direction="vertical">
              <Text className="course-outline-timestamp-text">
                <strong>{courseData1.EndDate}</strong> - Kết thúc khóa học
              </Text>
              <Text type="secondary" className="course-outline-timestamp-text-secondary">
                Khóa học này đã kết thúc, nghĩa là bạn chỉ có thể xem nội dung đã ghi lại của khóa học.
              </Text>
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseOutline;
