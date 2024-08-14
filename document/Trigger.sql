-- Trigger Update result khi submit bài làm phiên nào
CREATE TRIGGER CalculateTestChapterSessionResult
ON TestChapterSession
AFTER INSERT
AS
BEGIN
    -- Declare variables
    DECLARE @SessionID INT;
    DECLARE @TotalQuestions INT;
    DECLARE @CorrectOneChoice INT;
    DECLARE @CorrectMultiChoice INT;
    DECLARE @CorrectText INT;
    DECLARE @TotalScore FLOAT;
    
    -- Get the inserted session ID
    SELECT @SessionID = ID FROM inserted;

    -- Calculate the total number of questions
    SELECT @TotalQuestions = COUNT(*) 
    FROM Question 
    WHERE TestChapterID = (SELECT TestChapterID FROM TestChapterSession WHERE ID = @SessionID);
    
    -- Calculate the number of correct answers for each question type
    -- One-choice questions
    SELECT @CorrectOneChoice = COUNT(*)
    FROM AnswerOfUser_TestChapter aou
    INNER JOIN Question q ON aou.QuestionID = q.ID
    INNER JOIN AnswerForQuestion afq ON CONVERT(NVARCHAR(MAX), aou.AnswerChoice) = CONVERT(NVARCHAR(MAX), afq.Description)
    WHERE q.Type = 1
    AND afq.IsCorrect = 1
    AND aou.TestChapterSessionID = @SessionID;
    
    -- Multi-choice questions (must select all correct answers)
    SELECT @CorrectMultiChoice = COUNT(*)
    FROM (
        SELECT aou.QuestionID
        FROM AnswerOfUser_TestChapter aou[TrainingSystem]
        INNER JOIN Question q ON aou.QuestionID = q.ID
        INNER JOIN AnswerForQuestion afq ON CONVERT(NVARCHAR(MAX), aou.AnswerChoice) = CONVERT(NVARCHAR(MAX), afq.Description)
        WHERE q.Type = 2
        AND afq.IsCorrect = 1
        AND aou.TestChapterSessionID = @SessionID
        GROUP BY aou.QuestionID
        HAVING COUNT(*) = (SELECT COUNT(*) FROM AnswerForQuestion WHERE QuestionID = aou.QuestionID AND IsCorrect = 1)
    ) AS correct_multi_choice;
    
    -- Text answers (correct if any text answer exists)
    SELECT @CorrectText = COUNT(*)
    FROM AnswerOfUser_TestChapter aou
    INNER JOIN Question q ON aou.QuestionID = q.ID
    WHERE q.Type = 0
    AND CONVERT(NVARCHAR(MAX), aou.AnswerText) = (SELECT CONVERT(NVARCHAR(MAX), AnswerText) FROM AnswerForQuestion WHERE QuestionID = aou.QuestionID AND IsCorrect = 1)
    AND aou.TestChapterSessionID = @SessionID;

    -- Calculate the total score
    SET @TotalScore = ((@CorrectOneChoice + @CorrectMultiChoice + @CorrectText) * 100.0) / @TotalQuestions;

    -- Update the result in TestChapterSession
    UPDATE TestChapterSession
    SET Result = @TotalScore
    WHERE ID = @SessionID;
END;


-- Insert sample data into TestChapterSession table
INSERT INTO TestChapterSession (UserID, TestChapterID, StartTime)
VALUES (1, 1, GETDATE()); -- This should trigger the calculation

-- Insert sample answers for the user
INSERT INTO AnswerOfUser_TestChapter (QuestionID, UserID, AnswerChoice, AnswerText, TestChapterSessionID)
VALUES (1, 1, 'Paris', NULL, 1); -- Correct answer for one-choice question

INSERT INTO AnswerOfUser_TestChapter (QuestionID, UserID, AnswerChoice, AnswerText, TestChapterSessionID)
VALUES (2, 1, 'Red', NULL, 1); -- Partial answer for multi-choice question

INSERT INTO AnswerOfUser_TestChapter (QuestionID, UserID, AnswerChoice, AnswerText, TestChapterSessionID)
VALUES (2, 1, 'Green', NULL, 1); -- Complete answer for multi-choice question

INSERT INTO AnswerOfUser_TestChapter (QuestionID, UserID, AnswerChoice, AnswerText, TestChapterSessionID)
VALUES (3, 1, NULL, 'Photosynthesis is the process by which plants make their food.', 1); -- Correct text answer

-- Verify the result in TestChapterSession table
SELECT * FROM TestChapterSession WHERE ID = 1;
