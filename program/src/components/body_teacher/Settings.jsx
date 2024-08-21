import React, { useState } from 'react';
import { Form, Input, Button, Card, Modal, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const Settings = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();

  // Dữ liệu giả cho thông tin tài khoản
  const initialValues = {
    name: 'Nguyen Van A',
    email: 'nguyenvana@example.com',
  };

  const handleAccountUpdate = values => {
    // Xử lý cập nhật thông tin tài khoản ở đây
    message.success('Thông tin tài khoản đã được cập nhật thành công!');
  };

  const handlePasswordChange = values => {
    // Xử lý thay đổi mật khẩu ở đây
    message.success('Mật khẩu đã được thay đổi thành công!');
    setIsModalVisible(false);
    passwordForm.resetFields();
  };

  const showPasswordModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Thông tin tài khoản */}
      <Card title="Thông Tin Tài Khoản" bordered={false}>
        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
          onFinish={handleAccountUpdate}
        >
          <Form.Item
            label="Họ và tên"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Nhập họ và tên" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: 'email', message: 'Vui lòng nhập địa chỉ email hợp lệ!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Nhập địa chỉ email" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cập nhật thông tin
            </Button>
            <Button type="default" onClick={showPasswordModal} style={{ marginLeft: '10px' }}>
              Thay đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/* Modal thay đổi mật khẩu */}
      <Modal
        title="Thay Đổi Mật Khẩu"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={handlePasswordChange}
        >
          <Form.Item
            label="Mật khẩu hiện tại"
            name="currentPassword"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu hiện tại" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu mới" />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu mới"
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Xác nhận mật khẩu mới" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thay đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Settings;
