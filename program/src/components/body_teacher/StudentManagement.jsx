/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { Button, Table, Input, Select, Upload, message, Modal } from 'antd';
import { UploadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import styles from './StudentManagement.module.css';

const { Search } = Input;
const { Option } = Select;

const StudentManagement = () => {
    const { theme } = useContext(ThemeContext);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [students, setStudents] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

const showModal = () => {
    setIsModalVisible(true);
};

const handleOk = () => {
    exportToExcel();
    setIsModalVisible(false);
};

const handleCancel = () => {
    setIsModalVisible(false);
};


    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/studentall');
                const data = await response.json();
                const formattedData = data.map(student => ({
                    key: student.ID,
                    code: student.Code,
                    name: student.Name,
                    email: student.Email,
                    phone: student.Phone,
                    address: student.Address,
                    status: student.Status ? 'Hoạt động' : 'Không hoạt động',
                    workunit: student.WorkUnit
                }));
                setStudents(formattedData);
            } catch (error) {
                message.error('Không thể tải dữ liệu sinh viên');
            }
        };

        fetchStudents();
    }, []);

    const handleSelectChange = newSelectedRowKeys => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: handleSelectChange,
        selections: [
            {
                key: 'select-all',
                text: 'Chọn tất cả',
                onSelect: () => {
                    setSelectedRowKeys(students.map(item => item.key));
                },
            },
        ],
    };

    const columns = [
        {
            title: 'Mã học sinh',
            dataIndex: 'code',
            key: 'code',
            className: styles.tableCell,
        },
        {
            title: 'Tên học viên',
            dataIndex: 'name',
            key: 'name',
            className: styles.tableCell,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            className: styles.tableCell,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            className: styles.tableCell,
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            className: styles.tableCell,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            className: styles.tableCell,
        },
        {
            title: 'Bộ phận',
            dataIndex: 'workunit',
            key: 'workunit',
            className: styles.tableCell,
        },
    ];

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(students);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
        XLSX.writeFile(workbook, "StudentData.xlsx");
    };

    return (
        <div className={`${styles.bodyWrapper} ${theme === 'dark' ? styles.darkBody : ''}`}>
            <div className={styles.body}>
                <div className={styles.searchFilterContainer}>
                    <Search placeholder="Tìm kiếm học viên" style={{ width: 300, marginRight: 16 }} />
                    <Select placeholder="Tìm theo theo mã NV" style={{ width: 200 }}>
                        <Option value="it">Mã học viên</Option>
                        <Option value="adm">Tên học viên</Option>
                        <Option value="pp">Trạng thái</Option>
                        <Option value="pv">Bộ phận</Option>
                    </Select>
                    <Button 
                        type="default" 
                        className={styles.exportButton} 
                        onClick={showModal}
                    >
                        Xuất Excel
                    </Button>

                    <Upload>
                        <Button icon={<UploadOutlined />} className={styles.uploadButton}>Tải lên danh sách</Button>
                    </Upload>
                </div>
                
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={students}
                    pagination={false}
                    className={styles.table}
                    scroll={{ x: 'max-content' }}
                    style={{height: '74vh', overflow: 'auto'}}
                />
            </div>
            <Modal 
                title="Xác nhận xuất Excel" 
                visible={isModalVisible} 
                onOk={handleOk} 
                onCancel={handleCancel}
            >
                <p>Bạn có chắc chắn muốn xuất file Excel không?</p>
            </Modal>
        </div>
    );
};

export default StudentManagement;
