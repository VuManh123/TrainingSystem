/* eslint-disable react/jsx-no-undef */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Breadcrumb, Button, Tabs, Typography } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

import {
  LeftOutlined,
  RightOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import './CourseOutline.css';

const { Text } = Typography;
    
const chapterTabs = [
  {
    key: '1',
    title: 'Slide bài giảng',
    completed: true,
  },
  {
    key: '2',
    title: 'Tài liệu tham khảo',
    completed: true,
  },
  {
    key: '3',
    title: 'Bài tập',
    completed: true,
  },
];

const ChapterContent = () => {
  const { chapterId } = useParams();
  const navigate = useNavigate();

  const goToPreviousPage = () => {
    // Điều hướng tới trang trước
    navigate(-1);
  };

  return (
    <div className="chapter-container">
      <Breadcrumb>
        <Breadcrumb.Item onClick={() => navigate('/')}>Khóa học</Breadcrumb.Item>
        <Breadcrumb.Item>Chương {chapterId}</Breadcrumb.Item>
        <Breadcrumb.Item>Học liệu</Breadcrumb.Item>
        <Breadcrumb.Item>Slide bài giảng</Breadcrumb.Item>
      </Breadcrumb>

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
            <Text>Đánh dấu trang này</Text>
          </Tabs.TabPane>
        ))}
      </Tabs>

      <div className="chapter-navigation">
        <Button icon={<LeftOutlined />} onClick={goToPreviousPage}>
          Trang trước
        </Button>
        <Button icon={<RightOutlined />}>Trang sau</Button>
      </div>
    </div>
  );
};

export default ChapterContent;
