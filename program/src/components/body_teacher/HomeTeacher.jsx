import React from 'react';
import { Card, Input, Table, Button, Row, Col, Tag } from 'antd';
import { SearchOutlined, PlusOutlined, ExportOutlined, UploadOutlined } from '@ant-design/icons';

const HomeTeacher = () => {
  // Fake Data cho danh sách sinh viên
  const studentData = [
    {
      key: '1',
      name: 'Nguyen Van A',
      course: 'ReactJS',
      progress: '70%',
      status: 'Active',
    },
    {
      key: '2',
      name: 'Tran Thi B',
      course: 'NodeJS',
      progress: '90%',
      status: 'Inactive',
    },
    {
      key: '3',
      name: 'Le Van C',
      course: 'SQL Server',
      progress: '50%',
      status: 'Active',
    },
  ];

  // Cột cho bảng sinh viên
  const columns = [
    {
      title: 'Tên Sinh Viên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Khóa Học',
      dataIndex: 'course',
      key: 'course',
    },
    {
      title: 'Tiến Độ',
      dataIndex: 'progress',
      key: 'progress',
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color={status === 'Active' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Thao Tác',
      key: 'action',
      render: (_, record) => (
        <span>
          <Button type="link">Sửa</Button>
          <Button type="link" danger>Xóa</Button>
        </span>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      {/* Hộp tìm kiếm */}
      <Input
        placeholder="Tìm kiếm sinh viên"
        prefix={<SearchOutlined />}
        style={{ width: '300px', marginBottom: '20px' }}
      />

      {/* Thẻ hiển thị thông tin khóa học */}
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card title="ReactJS" bordered={false}>
            Tổng số sinh viên: 50
          </Card>
        </Col>
        <Col span={8}>
          <Card title="NodeJS" bordered={false}>
            Tổng số sinh viên: 40
          </Card>
        </Col>
        <Col span={8}>
          <Card title="SQL Server" bordered={false}>
            Tổng số sinh viên: 30
          </Card>
        </Col>
      </Row>

      {/* Bảng sinh viên */}
      <Table
        columns={columns}
        dataSource={studentData}
        pagination={{ pageSize: 5 }}
        style={{ marginTop: '20px' }}
      />

      {/* Button thêm sinh viên, export và upload danh sách */}
      <Row justify="end" style={{ marginTop: '20px' }}>
        <Button type="primary" icon={<PlusOutlined />} style={{ marginRight: '10px' }}>
          Thêm sinh viên
        </Button>
        <Button type="default" icon={<ExportOutlined />} style={{ marginRight: '10px' }}>
          Export danh sách
        </Button>
        <Button type="default" icon={<UploadOutlined />}>
          Upload danh sách
        </Button>
      </Row>
    </div>
  );
};

export default HomeTeacher;
