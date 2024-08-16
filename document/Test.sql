-- Đếm số câu hỏi trong TestChapterID = 1
WITH TotalQuestions AS (
    SELECT COUNT(*) AS TotalQuestions
    FROM Question
    WHERE TestChapterID = 1
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
        aou.TestChapterSessionID = 3
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
            -- Nếu có đáp án văn bản không rỗng thì câu đó được coi là đúng
            WHEN ISNULL(ua.AnswerText, '') != '' THEN 1
            -- So sánh các đáp án của người dùng với các đáp án đúng sau khi sắp xếp
            WHEN ua.UserAnswersChoice = ca.CorrectAnswers THEN 1
            ELSE 0
        END AS IsCorrect
    FROM 
        UserAnswers ua
    LEFT JOIN 
        CorrectAnswers ca ON ua.QuestionID = ca.QuestionID
)
-- Tính điểm tổng hợp cho TestChapterSessionID
SELECT 
    ua.TestChapterSessionID,
    tq.TotalQuestions,
    COUNT(ua.QuestionID) AS AnsweredQuestions,
    SUM(IsCorrect) AS CorrectAnswers,
    (SUM(IsCorrect) * 100.0) / tq.TotalQuestions AS Score,
    STRING_AGG(CONVERT(NVARCHAR(MAX), ua.QuestionID), ',') AS QuestionIDs,
    STRING_AGG(CONVERT(NVARCHAR(MAX), AnswerOfUser), '; ') AS UserAnswers,
    STRING_AGG(CONVERT(NVARCHAR(MAX), AnswerTrue), '; ') AS CorrectAnswers
FROM 
    Comparison ua
JOIN 
    TotalQuestions tq ON 1 = 1
GROUP BY 
    ua.TestChapterSessionID, tq.TotalQuestions;
