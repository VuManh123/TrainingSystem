/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from 'react';
import { Tabs, Button, Checkbox, Radio } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import './Results.css';
import { ThemeContext } from '../../ThemeContext';
import { useParams, useNavigate } from 'react-router-dom';

const { TabPane } = Tabs;

const ResultItem = ({ question }) => {
    const { theme } = useContext(ThemeContext);
    const { QuestionDescription, Type, MergedAnswerDescription, CorrectAnswer, AnswerChoice, AnswerText, Status } = question;
    const parsedAnswers = JSON.parse(MergedAnswerDescription);
    const correctAnswers = CorrectAnswer.split(',').map(Number);
    const selectedAnswers = AnswerChoice ? AnswerChoice.split(',').map(Number) : [];

    return (
        <div className={`result-item ${theme === 'dark' ? 'dark' : ''} ${Status === 'Correct' ? 'correct' : 'incorrect'}`}>
            <h3>
                {QuestionDescription}
                {Status === 'Correct' ? <CheckCircleOutlined style={{ color: '#52c41a', marginLeft: 8 }} /> : <CloseCircleOutlined style={{ color: '#ff4d4f', marginLeft: 8 }} />}
            </h3>
            {Type === 0 && (
                <div className="text-result">
                    <p><strong>Đáp án của bạn:</strong> {AnswerText}</p>
                </div>
            )}
            {Type === 1 && (
                <Radio.Group value={selectedAnswers[0]} className="single-choice">
                    {parsedAnswers.map((answer) => (
                        <Radio
                            key={answer.ID}
                            value={answer.ID}
                            className={selectedAnswers.includes(answer.ID) ? 'selected-answer' : ''}
                        >
                            {answer.Description}
                        </Radio>
                    ))}
                </Radio.Group>
            )}
            {Type === 2 && (
                <Checkbox.Group value={selectedAnswers} className="multiple-choice">
                    {parsedAnswers.map((answer) => (
                        <Checkbox
                            key={answer.ID}
                            value={answer.ID}
                            className={selectedAnswers.includes(answer.ID) ? 'selected-answer' : ''}
                        >
                            {answer.Description}
                        </Checkbox>
                    ))}
                </Checkbox.Group>
            )}
        </div>
    );
};

const TestResults = () => {
    const { theme } = useContext(ThemeContext);
    const [results, setResults] = useState(null);
    const [currentTab, setCurrentTab] = useState('1');
    const [totalPages, setTotalPages] = useState(1);
    const { testChapterSessionID, userID, ID } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/api/results-testchapter/${testChapterSessionID}`)
            .then(response => response.json())
            .then(data => {
                const pages = Math.ceil(data.details.length / 10);
                setResults(data);
                setTotalPages(pages);
            })
            .catch(error => console.error('Error fetching results:', error));
    }, [testChapterSessionID]);

    const handlePrevPage = () => {
        if (currentTab > 1) {
            setCurrentTab((prev) => (parseInt(prev) - 1).toString());
        }
    };

    const handleNextPage = () => {
        if (currentTab < totalPages) {
            setCurrentTab((prev) => (parseInt(prev) + 1).toString());
        }
    };

    const handleBackToCourse = () => {
        navigate(`/learning-course/${userID}/${ID}`);
    };

    const resultsPerPage = 10;
    const paginatedResults = [];
    if (results) {
        for (let i = 0; i < results.details.length; i += resultsPerPage) {
            paginatedResults.push(results.details.slice(i, i + resultsPerPage));
        }
    }

    if (!results) {
        return <div>Loading...</div>;
    }

    const isPassed = results.sessionResult.Result === 100;

    return (
        <div className={`test-wrapper ${theme === 'dark' ? 'dark-mode-container' : ''}`}>
            <div className={`test-results-wrapper ${theme === 'dark' ? 'dark' : ''}`}>
                <div className="test-results">
                    <h2>
                        Kết quả của bạn: {results.sessionResult.Result} điểm
                        <span className={`result-status ${isPassed ? 'passed' : 'failed'}`}>
                            {isPassed ? ' - Đạt' : ' - Không đạt'}
                        </span>
                    </h2>
                    <Tabs activeKey={currentTab} onChange={setCurrentTab}>
                        {paginatedResults.map((resultsChunk, index) => (
                            <TabPane tab={`Trang ${index + 1}`} key={`${index + 1}`}>
                                {resultsChunk.map((question) => (
                                    <ResultItem
                                        key={question.QuestionID}
                                        question={question}
                                    />
                                ))}
                            </TabPane>
                        ))}
                    </Tabs>

                    {totalPages > 1 && ( <div className="pagination-controls">
                        <Button type="default" onClick={handlePrevPage} disabled={currentTab === '1'}>
                            Trang trước
                        </Button>
                        <Button type="default" onClick={handleNextPage} disabled={currentTab === totalPages.toString()}>
                            Trang sau
                        </Button>
                    </div>
                    )}

                    <Button className="back-to-course-button" type="primary" onClick={handleBackToCourse}>
                        Quay về khóa học
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TestResults;
