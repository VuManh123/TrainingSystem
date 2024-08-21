/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { Button, Table, Input, Select, Upload, message, Modal } from 'antd';
import { UploadOutlined, EditOutlined, DeleteOutlined, ExportOutlined } from '@ant-design/icons';
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

    //Search
    const fetchSearchResults = async (searchValue, searchType) => {
        setStudents([]); // Xóa dữ liệu cũ trước khi fetch dữ liệu mới
        let apiUrl = '';
        switch (searchType) {
            case 'name':
                apiUrl = `http://localhost:3000/api/search-student-by-name?name=${searchValue}`;
                break;
            case 'code':
                apiUrl = `http://localhost:3000/api/search-student-by-code?code=${searchValue}`;
                break;
            case 'status':
                apiUrl = `http://localhost:3000/api/search-student-by-status?status=${searchValue}`;
                break;
            case 'workUnit':
                apiUrl = `http://localhost:3000/api/search-student-by-workunit?workUnit=${searchValue}`;
                break;
            default:
                return;
        }
    
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
    
            console.log(data); // Kiểm tra cấu trúc dữ liệu trả về
    
            // Nếu API trả về một đối tượng thay vì mảng, hãy lấy mảng từ đối tượng đó
            const coursesArray = Array.isArray(data) ? data : (data && Array.isArray(data.courses)) ? data.courses : [];
    
            if (Array.isArray(coursesArray)) {
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
                console.log("Formatted Search Data:", formattedData);
                setStudents(formattedData);
                console.log(students);
            } else {
                message.error('Dữ liệu khóa học không đúng định dạng');
            }
        } catch (error) {
            message.error('Không thể tải dữ liệu khóa học');
            console.error('Fail to get course by search:', error);
        }
    };    
    
    const [searchType, setSearchType] = useState('code');
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = () => {
        fetchSearchResults(searchValue, searchType);
    };

    const handleSearchTypeChange = (value) => {
        setSearchType(value);
    };

    const handleSearchInputChange = (e) => {
        setSearchValue(e.target.value);
    };


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
                    <Search placeholder="Tìm kiếm học viên" 
                    style={{ width: 300, marginRight: 16 }} 
                    onSearch={handleSearch} 
                    onChange={handleSearchInputChange} 
                    value={searchValue} 
                    />
                    <Select placeholder="Tìm theo theo mã NV" 
                    style={{ width: 200 }}
                    onChange={handleSearchTypeChange} 
                    value={searchType}>
                        <Option value="code">Mã học viên</Option>
                        <Option value="name">Tên học viên</Option>
                        <Option value="status">Trạng thái</Option>
                        <Option value="workUnit">Bộ phận</Option>
                    </Select>
                    <Button 
                        type="default" 
                        className={styles.exportButton} 
                        onClick={showModal}
                        icon={<ExportOutlined />}
                    >
                        Export danh sách
                    </Button>
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
