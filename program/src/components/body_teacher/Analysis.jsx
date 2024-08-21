import React from 'react';
import { Card, Col, Row, Table } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

// Dữ liệu giả cho biểu đồ
const data = [
  { name: 'Jan', uv: 4000, pv: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398 },
  { name: 'Mar', uv: 2000, pv: 9800 },
  { name: 'Apr', uv: 2780, pv: 3908 },
  { name: 'May', uv: 1890, pv: 4800 },
  { name: 'Jun', uv: 2390, pv: 3800 },
  { name: 'Jul', uv: 3490, pv: 4300 },
];

// Dữ liệu giả cho bảng
const tableData = [
  { key: '1', name: 'Nguyen Van A', score: 85, status: 'Passed' },
  { key: '2', name: 'Tran Thi B', score: 92, status: 'Passed' },
  { key: '3', name: 'Le Van C', score: 78, status: 'Passed' },
  { key: '4', name: 'Hoang Thi D', score: 66, status: 'Failed' },
  { key: '5', name: 'Pham Van E', score: 90, status: 'Passed' },
];

const columns = [
  { title: 'Tên Sinh Viên', dataIndex: 'name', key: 'name' },
  { title: 'Điểm', dataIndex: 'score', key: 'score' },
  { title: 'Trạng Thái', dataIndex: 'status', key: 'status' },
];

const Analysis = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Biểu Đồ Đường" bordered={false}>
            <LineChart width={500} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
            </LineChart>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Biểu Đồ Cột" bordered={false}>
            <BarChart width={500} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="uv" fill="#8884d8" />
              <Bar dataKey="pv" fill="#82ca9d" />
            </BarChart>
          </Card>
        </Col>
      </Row>

      <Card title="Bảng Kết Quả" bordered={false} style={{ marginTop: '20px' }}>
        <Table columns={columns} dataSource={tableData} />
      </Card>
    </div>
  );
};

export default Analysis;
