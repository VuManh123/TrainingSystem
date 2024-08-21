/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Modal, Form, Input, DatePicker, message, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill'; 
import { useParams } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css'; 
import axios from 'axios'; 
import styles from './AddCourseModal.module.css';

const UpdateCourseModal = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const {userID} = useParams();
    const handleImageUpload = (info) => {
        if (info.file.status === 'done') {
            setImage(info.file.originFileObj);
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const onOk = () => {
        form
            .validateFields()
            .then((values) => {
                const formData = new FormData();
                formData.append('name', values.name);
                formData.append('startDate', values.startDate.format('YYYY-MM-DD'));
                formData.append('endDate', values.endDate.format('YYYY-MM-DD'));
                formData.append('description', description);
                formData.append('userID', userID);
                if (image) {
                    formData.append('image', image);
                }

                axios.post('http://localhost:3000/api/updateCourses', formData) // Gửi dữ liệu tới API
                    .then((response) => {
                        onCreate(response.data);
                        form.resetFields();
                        setDescription('');
                        setImage(null);
                    })
                    .catch((error) => {
                        message.error('Failed to create course. Please try again.');
                    });
            })
            .catch((info) => {
                message.error('Please check the form and fill out all required fields.');
            });
    };

    return (
        <Modal
            visible={visible}
            title="Thêm Khóa Học"
            okText="Tạo"
            cancelText="Hủy"
            onCancel={onCancel}
            onOk={onOk}
        >
            <Form style={{padding: '10px 10px'}}
                form={form}
                layout="vertical"
                name="addCourseForm"
            >
                <Form.Item
                    name="name"
                    label="Tên khóa học"
                    rules={[{ required: true, message: 'Vui lòng nhập tên khóa học!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item 
                    name="startDate"
                    label="Ngày bắt đầu"
                    rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu!' }]}
                >
                    <DatePicker style={{width: '100%'}}/>
                </Form.Item>

                <Form.Item
                    name="endDate"
                    label="Ngày kết thúc"
                    rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc!' }]}
                >
                    <DatePicker style={{width: '100%'}}/>
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Mô tả"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả khóa học!' }]}
                >
                    <ReactQuill
                        value={description}
                        onChange={setDescription}
                        className={styles.editor}
                    />
                </Form.Item>

                <Form.Item
                    name="image"
                    label="Upload Hình Ảnh"
                    rules={[{ required: true, message: 'Vui lòng upload hình ảnh!' }]}
                >
                    <Upload
                        listType="picture"
                        maxCount={1}
                        beforeUpload={() => false}
                        onChange={handleImageUpload}
                    >
                        <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UpdateCourseModal;
