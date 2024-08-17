import poolPromise from './dbConfig.mjs';
import sql from 'mssql';

export async function setResults(testChapterID, testChapterSessionID) {
    const testChapterIDInt = parseInt(testChapterID, 10);
    const testChapterSessionIDInt = parseInt(testChapterSessionID, 10);
    try {
        const pool = await poolPromise;
        const queries =  `WITH TotalQuestions AS (
                                SELECT COUNT(*) AS TotalQuestions
                                FROM Question
                                WHERE TestChapterID = ${testChapterIDInt}
                            ),
                            CorrectAnswers AS (
                                SELECT 
                                    QuestionID,
                                    STRING_AGG(CONVERT(NVARCHAR(MAX), ID), ',') WITHIN GROUP (ORDER BY ID) AS CorrectAnswers
                                FROM 
                                    AnswerForQuestion
                                WHERE 
                                    IsCorrect = 1
                                GROUP BY 
                                    QuestionID
                            ),
                            UserAnswers AS (
                                SELECT 
                                    aou.QuestionID,
                                    STRING_AGG(CONVERT(NVARCHAR(MAX), aou.AnswerChoice) , ',') WITHIN GROUP (ORDER BY aou.AnswerChoice) AS UserAnswersChoice,
                                    MAX(aou.AnswerText) AS AnswerText,
                                    aou.TestChapterSessionID
                                FROM 
                                    AnswerOfUser_TestChapter aou
                                WHERE 
                                    aou.TestChapterSessionID = ${testChapterSessionIDInt}
                                GROUP BY 
                                    aou.QuestionID, aou.TestChapterSessionID
                            ),
                            Comparison AS (
                                SELECT 
                                    ua.TestChapterSessionID,
                                    ua.QuestionID,
                                    ua.UserAnswersChoice AS AnswerOfUser,
                                    ca.CorrectAnswers AS AnswerTrue,
                                    CASE 
                                        WHEN ISNULL(ua.AnswerText, '') != '' THEN 1
                                        WHEN ua.UserAnswersChoice = ca.CorrectAnswers THEN 1
                                        ELSE 0
                                    END AS IsCorrect
                                FROM 
                                    UserAnswers ua
                                LEFT JOIN 
                                    CorrectAnswers ca ON ua.QuestionID = ca.QuestionID
                            ),
                            ScoreCalculation AS (
                                SELECT 
                                    ua.TestChapterSessionID,
                                    tq.TotalQuestions,
                                    COUNT(ua.QuestionID) AS AnsweredQuestions,
                                    SUM(IsCorrect) AS CorrectAnswers,
                                    (SUM(IsCorrect) * 100.0) / tq.TotalQuestions AS Score
                                FROM 
                                    Comparison ua
                                JOIN 
                                    TotalQuestions tq ON 1 = 1
                                GROUP BY 
                                    ua.TestChapterSessionID, tq.TotalQuestions
                            )
                            -- Cập nhật điểm và thời gian nộp bài vào bảng TestChapterSession
                            UPDATE TestChapterSession
                            SET 
                                Result = sc.Score,
                                TurnInTime = GETDATE()
                            FROM 
                                TestChapterSession tcs
                            JOIN 
                                ScoreCalculation sc ON tcs.ID = sc.TestChapterSessionID
                            WHERE 
                                tcs.ID = ${testChapterSessionIDInt};`;
        await pool.request().query(queries);

        return { success: true, message: 'Cập nhật điểm thành công' };
    } catch (error) {
        console.error('Error adding answers:', error);
        throw new Error('Có lỗi xảy ra khi cập nhật điểm: ' + error.message);
    }
}

export async function getHistoryTestChapter(userID, testChapterID) {
    try {
        const testChapterIDInt = parseInt(testChapterID, 10);
        const pool = await poolPromise;
        const result = await pool.request()
            .input('userID', sql.Int, userID)
            .input('testChapterID', sql.Int, testChapterIDInt)
            .query(`SELECT * FROM TestChapterSession
                    WHERE UserID = @userID AND TestChapterID = @testChapterID`);
        return result.recordset;
    } catch (err) {
        throw new Error('Failed to query gethistory: ' + err.message);
    }
}


export async function getResultsTestChapterCurrent(testChapterSessionID) {
    try {
        const testChapterSessionIDInt = parseInt(testChapterSessionID, 10);
        const pool = await poolPromise;
        
        // Thực hiện truy vấn đầu tiên để lấy kết quả `Result` từ `TestChapterSession`
        const resultSession = await pool.request()
            .input('testChapterSessionID', sql.Int, testChapterSessionIDInt)
            .query(`
                SELECT tcs.Result
                FROM TestChapterSession tcs
                WHERE ID = @testChapterSessionID
            `);

        // Thực hiện truy vấn thứ hai để lấy chi tiết kết quả
        const resultDetails = await pool.request()
            .input('testChapterSessionID', sql.Int, testChapterSessionIDInt)
            .query(`
                SELECT 
                    q.ID AS QuestionID,
                    q.Description AS QuestionDescription,
                    q.Type,
                    (
                        SELECT afq.ID, afq.Description 
                        FROM AnswerForQuestion afq 
                        WHERE afq.QuestionID = q.ID 
                        FOR JSON PATH
                    ) AS MergedAnswerDescription,
                    STRING_AGG(CASE WHEN afq.IsCorrect = 1 THEN afq.ID ELSE NULL END, ', ') AS CorrectAnswer,
                    atc.AnswerChoice,
                    atc.AnswerText,
                    CASE 
                        WHEN q.Type = 0 AND atc.AnswerText IS NOT NULL THEN 'Correct'
                        WHEN q.Type != 0 AND STRING_AGG(CASE WHEN afq.IsCorrect = 1 THEN afq.ID ELSE NULL END, ',') = atc.AnswerChoice 
                        THEN 'Correct' 
                        ELSE 'Incorrect' 
                    END AS Status
                FROM 
                    Question q
                LEFT JOIN 
                    TestChapter tc ON q.TestChapterID = tc.ID
                RIGHT JOIN 
                    AnswerOfUser_TestChapter atc ON q.ID = atc.QuestionID
                RIGHT JOIN 
                    AnswerForQuestion afq ON afq.QuestionID = q.ID
                WHERE 
                    atc.TestChapterSessionID = @testChapterSessionID
                GROUP BY 
                    q.ID, q.Description, atc.AnswerChoice, q.Type, atc.AnswerText;
            `);

        // Kết hợp kết quả từ cả hai truy vấn
        return {
            sessionResult: resultSession.recordset[0], // Lấy `Result` từ truy vấn đầu tiên
            details: resultDetails.recordset, // Kết quả từ truy vấn thứ hai
        };
    } catch (err) {
        throw new Error('Failed to query getResultsTestChapterCurrent: ' + err.message);
    }
}
