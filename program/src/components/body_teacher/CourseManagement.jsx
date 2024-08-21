/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { Button, Table, Input, Select, Upload, message, Modal } from 'antd';
import { UploadOutlined, EditOutlined, DeleteOutlined, ExportOutlined, PlusOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import styles from './StudentManagement.module.css';
import AddCourseModal from '../courses/AddCourseModal';

const { Search } = Input;
const { Option } = Select;

const CourseManagement = () => {
    const { theme } = useContext(ThemeContext);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [courses, setCourses] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAddCourseModalVisible, setIsAddCourseModalVisible] = useState(false);

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
    //Hàm cho button Add Course:
    // Các hàm cho AddCourseModal
    const showAddCourseModal = () => {
        setIsAddCourseModalVisible(true);
    };

    const handleAddCourseCancel = () => {
        setIsAddCourseModalVisible(false);
    };

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/coursesall');
                const data = await response.json();

                if (Array.isArray(data)) {
                    const formattedData = data.map(course => ({
                        key: course.ID,
                        name: course.Title,
                        start: new Date(course.StartDate).toLocaleDateString(),
                        end: new Date(course.EndDate).toLocaleDateString(),
                        create: new Date(course.CreatedDate).toLocaleDateString(),
                        teacher: course.Name,
                        workunit: course.WorkUnit
                    }));
                    setCourses(formattedData);
                } else {
                    message.error('Dữ liệu khóa học không đúng định dạng');
                }
            } catch (error) {
                message.error('Không thể tải dữ liệu khóa học');
            }
        };

        fetchCourses();
    }, []);

    const handleAddCourseCreate = (newCourse) => {
        console.log('New course data:', newCourse);

        // Giả sử bạn có API để lưu khóa học, bạn có thể gọi API ở đây
        // Sau đó cập nhật danh sách khóa học
        setCourses([...courses, { ...newCourse, key: courses.length + 1 }]);

        message.success('Khóa học mới đã được thêm!');
        setIsAddCourseModalVisible(false);
    };

    const fetchSearchResults = async (searchValue, searchType) => {
        setCourses([]); // Xóa dữ liệu cũ trước khi fetch dữ liệu mới
        let apiUrl = '';
        switch (searchType) {
            case 'nameCourse':
                apiUrl = `http://localhost:3000/api/search-course-by-name?name=${searchValue}`;
                break;
            case 'nameTeacher':
                apiUrl = `http://localhost:3000/api/search-course-by-teacher?teacher=${searchValue}`;
                break;
            case 'workUnit':
                apiUrl = `http://localhost:3000/api/search-course-by-workunit?workUnit=${searchValue}`;
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
                const formattedData = coursesArray.map(course => ({
                    key: course.ID,
                    name: course.Title,
                    start: new Date(course.StartDate).toLocaleDateString(),
                    end: new Date(course.EndDate).toLocaleDateString(),
                    create: new Date(course.CreatedDate).toLocaleDateString(),
                    teacher: course.Name,
                    workunit: course.WorkUnit
                }));
                console.log("Formatted Search Data:", formattedData);
                setCourses(formattedData);
                console.log(courses);
            } else {
                message.error('Dữ liệu khóa học không đúng định dạng');
            }
        } catch (error) {
            message.error('Không thể tải dữ liệu khóa học');
            console.error('Fail to get course by search:', error);
        }
    };    
    useEffect(() => {
        console.log("Courses state updated:", courses); // In ra dữ liệu courses khi state được cập nhật
    }, [courses]);
    
    const [searchType, setSearchType] = useState('nameCourse');
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
                    setSelectedRowKeys(courses.map(item => item.key));
                },
            },
        ],
    };

    const columns = [
        {
            title: 'Tên khóa học',
            dataIndex: 'name',
            key: 'name',
            className: styles.tableCell,
        },
        {
            title: 'Bắt đầu',
            dataIndex: 'start',
            key: 'start',
            className: styles.tableCell,
        },
        {
            title: 'Kết thúc',
            dataIndex: 'end',
            key: 'end',
            className: styles.tableCell,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'create',
            key: 'create',
            className: styles.tableCell,
        },
        {
            title: 'Giáo viên',
            dataIndex: 'teacher',
            key: 'teacher',
            className: styles.tableCell,
        },
        {
            title: 'Bộ phận',
            dataIndex: 'workunit',
            key: 'workunit',
            className: styles.tableCell,
        },
        {
            title: '',
            key: 'edit',
            render: (_, record) => (
                <Button type="text" icon={<EditOutlined />} className={styles.iconButton} onClick={() => handleEdit(record.courseID)}/>
            ),
            className: styles.actionCell,
        },
        {
            title: '',
            key: 'delete',
            render: (_, record) => (
                <Button type="text" icon={<DeleteOutlined />} className={`${styles.iconButton} ${styles.deleteButton}`} />
            ),
            className: styles.actionCell,
        },
    ];

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(courses);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Courses");
        XLSX.writeFile(workbook, "CoursesData.xlsx");
    };

    return (
        <div className={`${styles.bodyWrapper} ${theme === 'dark' ? styles.darkBody : ''}`}>
            <div className={styles.body}>
                <div className={styles.searchFilterContainer}>
                    <Search 
                        placeholder="Tìm kiếm khóa học" 
                        style={{ width: 300, marginRight: 16 }} 
                        onSearch={handleSearch} 
                        onChange={handleSearchInputChange} 
                        value={searchValue} 
                    />
                    <Select 
                        placeholder="Tìm theo" 
                        style={{ width: 200 }} 
                        onChange={handleSearchTypeChange} 
                        value={searchType}
                    >
                        <Option value="nameCourse">Tên khóa học</Option>
                        <Option value="nameTeacher">Giáo viên</Option>
                        <Option value="workUnit">Bộ phận</Option>
                    </Select>

                    <Button className={styles.addButton} icon={<PlusOutlined/>} onClick={showAddCourseModal}>Thêm khóa học</Button>
                    <Button 
                        type="default" 
                        className={styles.exportButton} 
                        onClick={showModal}
                        icon={<ExportOutlined/>}
                    >
                        Export danh sách
                    </Button>
                </div>
                
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={courses}
                    pagination={false}
                    className={styles.table}
                    scroll={{ x: 'max-content' }}
                    style={{ height: '74vh', overflow: 'auto' }}
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
            {/* Modal thêm khóa học */}
            <AddCourseModal
                visible={isAddCourseModalVisible}
                onCreate={handleAddCourseCreate}
                onCancel={handleAddCourseCancel}
            />
        </div>
    );
};

export default CourseManagement;
