// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react';
import { Tabs, Button, Modal } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { notify } from '../notification/Notification';
import './ChapterTests.css';
import { ThemeContext } from '../ThemeContext';

const { TabPane } = Tabs;

const ChapterTests = () => {
    const { theme } = useContext(ThemeContext);
    const { userID, ID, chapterID } = useParams(); // Lấy chapterID từ params
    const [tests, setTests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch dữ liệu từ API
        fetch(`http://localhost:3000/api/chapter-test/${chapterID}`)
            .then(response => response.json())
            .then(data => setTests(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [chapterID]);

    const handleStartTest = (testChapterID, endDate) => {
        const endDateObject = new Date(endDate);
        if (Date.now() > endDateObject.getTime()) {
            notify('Bài kiểm tra đã hết hạn để làm!', 'error');
        } else {
            Modal.confirm({
                title: 'Xác nhận bắt đầu làm bài',
                content: (
                    <div>
                        <p><strong>Chú ý:</strong> Sau khi xác nhận, bạn không thể thoát, nếu thoát coi như đã kết thúc bài thi.</p>
                    </div>
                ),
                onOk:async () => {
                    try {
                        // Gửi yêu cầu tạo session mới
                        const response = await fetch('http://localhost:3000/api/addTestChapterSession', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                userID,
                                testChapterID,
                            }),
                        });
    
                        if (!response.ok) {
                            throw new Error('Failed to create session');
                        }
    
                        const { testChapterSessionID } = await response.json();
    
                        // Chuyển hướng đến trang làm bài với testChapterSessionID
                        const path = `/learning-course/${userID}/${ID}/${chapterID}/testfinalchapter/${testChapterID}/${testChapterSessionID}`;
                        navigate(path);
                    } catch (error) {
                        console.error('Error creating session:', error);
                        notify('Có lỗi xảy ra khi tạo phiên làm bài. Vui lòng thử lại.', 'error');
                    }
                },
                onCancel: () => {
                    // Không làm gì khi người dùng nhấn hủy
                },
            });
        }
    };

    return (
        <div className={`chapter-tests-wrapper ${theme === 'dark' ? 'dark' : ''}`}>
            <div className='chapter-tests'>
                <Tabs>
                    {tests.map(test => (
                        <TabPane tab={test.Name} key={test.ID}>
                            <p>Trước khi bắt đầu làm bài thi, xin quý vị lưu ý những quy chế quan trọng sau đây để đảm bảo quá trình thi được diễn ra một cách công bằng và hiệu quả:</p>

                            <ol>
                                <li><strong>1. Thời Gian Thi:</strong> Đảm bảo rằng bạn đã nắm rõ thời gian bắt đầu và kết thúc của bài thi. Quá thời gian quy định, hệ thống sẽ tự động khóa bài thi.</li>
                                <li><strong>2. Trung Thực Trong Thi Cử:</strong> Bạn không được phép sao chép, trao đổi đáp án hoặc sử dụng bất kỳ tài liệu không được phép nào trong khi làm bài. Việc phát hiện hành vi gian lận sẽ dẫn đến việc bị loại khỏi kỳ thi.</li>
                                <li><strong>3. Thực Hiện Theo Quy Định:</strong> Hãy đọc kỹ các hướng dẫn và yêu cầu của từng câu hỏi. Đảm bảo rằng bạn hiểu rõ trước khi bắt đầu trả lời.</li>
                                <li><strong>4. Kỹ Thuật Làm Bài:</strong> Đảm bảo rằng bạn làm bài trong điều kiện kỹ thuật ổn định. Nếu gặp bất kỳ sự cố nào, hãy liên hệ với ban tổ chức ngay lập tức.</li>
                                <li><strong>5. Hoàn Thành Bài Thi:</strong> Khi bạn hoàn tất bài thi, hãy kiểm tra lại tất cả các câu trả lời của mình trước khi nộp bài. Sau khi nộp, bạn không thể thực hiện bất kỳ thay đổi nào.</li>
                                <li><strong>6. Bảo Mật Thông Tin:</strong> Không chia sẻ thông tin bài thi, bao gồm câu hỏi và đáp án, với người khác. Việc làm này không chỉ vi phạm quy chế thi mà còn ảnh hưởng đến tính công bằng của kỳ thi.</li>
                            </ol>
                            <p className='date-info'><strong style={{ color: '#ff4d4f' }}>Bắt đầu ngày:</strong> {new Date(test.StartDate).toLocaleDateString()}</p>
                            <p className='date-info'><strong style={{ color: '#ff4d4f' }}>Kết thúc ngày:</strong> {new Date(test.EndDate).toLocaleDateString()}</p>
                            <div className="start-button-container">
                                <Button 
                                    type="primary" 
                                    className="start-button"
                                    onClick={() => handleStartTest(test.ID, test.EndDate)}
                                >
                                    Bắt đầu làm bài
                                </Button>
                            </div>
                        </TabPane>
                    ))}
                </Tabs>
            </div>
        </div>
    );
};

export default ChapterTests;
