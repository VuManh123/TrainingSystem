/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useContext, useState, useEffect } from 'react';
import { Tabs, Button, Radio, Checkbox, Input, Modal } from 'antd';
import './TestQuestion.css';
import { ThemeContext } from '../../ThemeContext';
import { useNavigate, useParams } from 'react-router-dom';

const { TabPane } = Tabs;

const QuestionItem = ({ question, onAnswerChange }) => {
    const { theme } = useContext(ThemeContext);
    const { QuestionID, QuestionDescription, QuestionType, Answers } = question;
    const parsedAnswers = JSON.parse(Answers);

    const handleAnswerChange = (value) => {
        onAnswerChange(QuestionID, value);
    };

    return (
        <div className={`question-item ${theme === 'dark' ? 'dark' : ''}`}>
            <h3>{QuestionDescription}</h3>
            {QuestionType === 0 && (
                <Input
                    placeholder="Nhập câu trả lời của bạn"
                    className="text-input"
                    onChange={e => handleAnswerChange({ AnswerText: e.target.value })}
                />
            )}
            {QuestionType === 1 && (
                <Radio.Group
                    className="single-choice"
                    onChange={e => handleAnswerChange({ AnswerChoice: e.target.value })}
                >
                    {parsedAnswers.map((answer) => (
                        <Radio key={answer.AnswerID} value={answer.AnswerID}>
                            {answer.AnswerDescription}
                        </Radio>
                    ))}
                </Radio.Group>
            )}
            {QuestionType === 2 && (
                <Checkbox.Group
                    className="multiple-choice"
                    onChange={checkedValues => handleAnswerChange({ AnswerChoice: checkedValues.join(',') })}
                >
                    {parsedAnswers.map((answer) => (
                        <Checkbox key={answer.AnswerID} value={answer.AnswerID}>
                            {answer.AnswerDescription}
                        </Checkbox>
                    ))}
                </Checkbox.Group>
            )}
        </div>
    );
};

const TestQuestions = () => {
    const { theme } = useContext(ThemeContext);
    const [questions, setQuestions] = useState([]);
    const [currentTab, setCurrentTab] = useState('1');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { testChapterID } = useParams();
    const [answers, setAnswers] = useState({});
    const {userID, testChapterSessionID} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/api/test-question/${testChapterID}`)
            .then(response => response.json())
            .then(data => setQuestions(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [testChapterID]);

    const handleAnswerChange = (questionID, answer) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionID]: { ...prevAnswers[questionID], ...answer }
        }));
    };

    const handleSubmit = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);

        // Chuyển đổi đối tượng `answers` thành mảng
const answersArray = Object.keys(answers).map(questionID => {
    const answer = answers[questionID];
    return {
        QuestionID: questionID,
        AnswerChoice: answer.AnswerChoice || '',
        AnswerText: answer.AnswerText || ''
    };
});

        // Gửi yêu cầu POST đến API
        fetch('http://localhost:3000/api/addAnswerOfUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ answers: answersArray, userID, testChapterSessionID }) 
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const modal = Modal.success({
                    title: 'Cảm ơn bạn đã hoàn thành bài thi!',
                    content: (
                        <div>
                            <p>Bạn có thể chọn chuyển hướng hoặc xem kết quả.</p>
                        </div>
                    ),
                    okText: 'Xem kết quả',
                    onOk: () => {
                        Modal.destroyAll(); // Đóng popup trước khi chuyển hướng
                        navigate(`/results/${testChapterSessionID}`);
                    },
                    footer: [
                        <Button key="results" type="primary" onClick={() => {
                            Modal.destroyAll(); // Đóng popup trước khi chuyển hướng
                            navigate(`/results/${testChapterSessionID}`);
                        }}>
                            Xem kết quả
                        </Button>,
                        <Button key="home" onClick={() => {
                            Modal.destroyAll(); // Đóng popup trước khi chuyển hướng
                            navigate('/home');
                        }}>
                            Trở về trang chủ
                        </Button>,
                    ],
                    className: 'custom-modal',  // Thêm class tùy chỉnh cho modal
                });
            } else {
                Modal.error({
                    title: 'Có lỗi xảy ra',
                    content: 'Vui lòng thử lại.',
                    className: 'custom-modal-error',  // Thêm class tùy chỉnh cho modal lỗi
                });
            }
        })
        .catch(error => {
            console.error('Error submitting answers:', error);
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const questionsPerPage = 5;
    const paginatedQuestions = [];
    for (let i = 0; i < questions.length; i += questionsPerPage) {
        paginatedQuestions.push(questions.slice(i, i + questionsPerPage));
    }

    return (
        <div className={`test-questions-wrapper ${theme === 'dark' ? 'dark' : ''}`}>
            <div className={`test-questions `}>
                <Tabs activeKey={currentTab} onChange={setCurrentTab}>
                    {paginatedQuestions.map((questionsChunk, index) => (
                        <TabPane tab={`Trang ${index + 1}`} key={`${index + 1}`}>
                            {questionsChunk.map((question) => (
                                <QuestionItem
                                    key={question.QuestionID}
                                    question={question}
                                    onAnswerChange={handleAnswerChange}
                                />
                            ))}
                        </TabPane>
                    ))}
                </Tabs>

                <Button type="primary" className="submit-button" onClick={handleSubmit}>
                    Gửi
                </Button>

                <Modal
                    title="Xác nhận"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <p>Bạn có chắc chắn muốn nộp bài không?</p>
                </Modal>
            </div>
        </div>
    );
};

export default TestQuestions;
