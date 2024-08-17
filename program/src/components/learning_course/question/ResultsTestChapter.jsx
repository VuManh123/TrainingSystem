// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import './Results.css';
import { useParams } from 'react-router-dom';

const ResultsTestChapter = () => {
    const { testChapterSessionID } = useParams();
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/api/results/${testChapterSessionID}`)
            .then(response => response.json())
            .then(data => setResults(data))
            .catch(error => console.error('Error fetching results:', error));
    }, [testChapterSessionID]);

    const columns = [
        {
            title: 'Câu hỏi',
            dataIndex: 'QuestionID',
            key: 'questionID',
        },
        {
            title: 'Đáp án của bạn',
            dataIndex: 'UserAnswers',
            key: 'userAnswers',
            render: (text, record) => (
                <>
                    {text.split(', ').map((answer, index) => {
                        const isCorrect = record.AnswerTrue.split(', ').includes(answer);
                        return (
                            <Tag color={isCorrect ? 'green' : 'red'} key={index}>
                                {answer}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Đáp án đúng',
            dataIndex: 'CorrectAnswers',
            key: 'correctAnswers',
        },
    ];

    return (
        <div className="results-container">
            <h1>Kết quả bài thi</h1>
            <Table
                columns={columns}
                dataSource={results.map((result, index) => ({
                    key: index,
                    ...result,
                }))}
                pagination={false}
                bordered
            />
        </div>
    );
};

export default ResultsTestChapter;
