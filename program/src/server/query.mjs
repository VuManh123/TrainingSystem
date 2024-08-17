// eslint-disable-next-line no-unused-vars
import { Polygon } from '@react-google-maps/api';
import sql from 'mssql';
import poolPromise from './dbConfig.mjs';

export async function getStudentsByEmail(email) {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .query('SELECT * FROM Student WHERE Email=@email');
        return result.recordset;
    } catch (err) {
        throw new Error('Failed to query students: ' + err.message);
    }
}

export async function getCourses() {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query('SELECT * FROM Course');
        return result.recordset;
    } catch (err) {
        throw new Error('Failed to query courses: ' + err.message);
    }
}

export async function getAdminByEmail(email) {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .query('SELECT * FROM Admin WHERE Email = @email');
        return result.recordset[0];
    } catch (err) {
        throw new Error('Failed to query admin: ' + err.message);
    }
}

export async function getTeacherByEmail(email) {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .query('SELECT * FROM Teacher WHERE Email = @email');
        return result.recordset[0];
    } catch (err) {
        throw new Error('Failed to query teacher: ' + err.message);
    }
}
export async function getCourseByID(id) {
    try {
        const pool = await poolPromise;
        const numericId = Number(id);
        if (isNaN(numericId)) {
            throw new Error('ID must be a valid number');
        }

        // Truy vấn thông tin khóa học
        const courseResult = await pool.request()
            .input('id', sql.Int, numericId)
            .query(`
                SELECT 
                    c.*,
                    t.Name, 
                    t.Rank, 
                    t.WorkUnit, 
                    t.Email
                FROM Course c
                JOIN Teacher t ON c.CreatedBy = t.ID
                WHERE c.ID = @id;
            `);

        // Truy vấn thông tin chương
        const chaptersResult = await pool.request()
            .input('id', sql.Int, numericId)
            .query(`
                SELECT 
                    ch.CourseID, 
                    ch.Title AS ChapterTitle, 
                    ch.Description AS ChapterDescription
                FROM Chapter ch
                WHERE ch.CourseID = @id;
            `);

        if (courseResult.recordset.length === 0) {
            throw new Error('Course not found');
        }

        // Tạo cấu trúc JSON kết hợp
        const courseData = courseResult.recordset[0];
        courseData.Chapters = chaptersResult.recordset;

        return courseData;
    } catch (err) {
        throw new Error('Failed to query get course by id: ' + err.message);
    }
}

  export async function getCourseByUserID(userID) {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('userID', sql.Int, userID)
            .query('SELECT c.* FROM Course c JOIN Course_User cu ON c.ID = cu.CourseID WHERE cu.UserID = @userID');
        return result.recordset;
    } catch (err) {
        throw new Error('Failed to query teacher: ' + err.message);
    }
}

export async function getChapterByUserIDCourseID(userID, courseID) {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('userID', sql.Int, userID)
            .input('courseID', sql.Int, courseID)
            .query(`SELECT 
                    ch.*,
                    CASE 
                        WHEN EXISTS (
                            SELECT 1
                            FROM TestChapter tc
                            LEFT JOIN TestChapterSession rtc ON tc.ID = rtc.TestChapterID
                            LEFT JOIN Student s ON rtc.UserID = s.ID
                            WHERE tc.ChapterID = ch.ID AND s.ID = @userID
                        ) THEN 1
                        ELSE 0
                    END AS Complete
                FROM 
                    Course co
                    JOIN Chapter ch ON co.ID = ch.CourseID
                WHERE 
                co.ID = @courseID;`);
        return result.recordset;
    } catch (err) {
        throw new Error('Failed to query teacher: ' + err.message);
    }
}

export async function getVideoByChapterID(chapterID) {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('chapterID', sql.Int, chapterID)
            .query('SELECT * FROM Videos WHERE ChapterID = @chapterID');
        console.log(chapterID);
        return result.recordset;
    } catch (err) {
        throw new Error('Failed to query teacher: ' + err.message);
    }
}
export async function getDocumentByChapterID(chapterID) {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('chapterID', sql.Int, chapterID)
            .query('SELECT * FROM Document WHERE ChapterID = @chapterID');
        return result.recordset;
    }catch(err) {
        throw new Error('Failed to query document' + err.message);
    }
}
export async function getTestByChapterID(chapterID) {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('chapterID', sql.Int, chapterID)
            .query('SELECT * FROM TestChapter WHERE ChapterID = @chapterID');
        return result.recordset;
    }catch(err) {
        throw new Error('Failed to query test' + err.message);
    }
}
// Lay ra list cau hoi va cac lua chon cua cac cau hoi do
export async function getQuestionforTestChapter(testChapterID) {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('testChapterID', sql.Int, testChapterID)
            .query(`SELECT 
                    q.ID AS QuestionID,
                    q.Description AS QuestionDescription,
                    q.Type AS QuestionType,
                    (
                        SELECT 
                            a.ID AS AnswerID,
                            a.Description AS AnswerDescription,
                            a.AnswerText AS AnswerText,
                            a.IsCorrect AS IsCorrect
                        FROM 
                            AnswerForQuestion a
                        WHERE 
                            a.QuestionID = q.ID
                        FOR JSON PATH
                    ) AS Answers
                FROM 
                    Question q
                WHERE 
                    q.testChapterID = @testChapterID;`);
        return result.recordset;
    } catch(err) {
        throw new Error('Failed to query question test chapter' + err.message);
    }
}
// List cau hoi cua khoa hoc
export async function getQuestionforTestCourse(courseID) {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('courseID', sql.Int, courseID)
            .query('');
        return result.recordset;
    } catch(err) {
        throw new Error('Failed to query question test chapter' + err.message);
    }
}

export async function postAddSessionTestChapter(userID, testChapterID) {
    try {
        const pool = await poolPromise;
        const userIDInt = parseInt(userID, 10);
        const testChapterIDInt = parseInt(testChapterID, 10);
        
        const result = await pool.request()
            .input('UserID', sql.Int, userIDInt)
            .input('TestChapterID', sql.Int, testChapterIDInt)
            .query(`
                INSERT INTO TestChapterSession (UserID, TestChapterID, StartTime)
                VALUES (@UserID, @TestChapterID, GETDATE());
                SELECT SCOPE_IDENTITY() AS ID;
            `);
        
        const testChapterSessionID = result.recordset[0].ID;
        return testChapterSessionID;
    } catch (err) {
        throw new Error('Failed to add a session test chapter: ' + err.message);
    }
}



export async function postAddAnswerOfUser(answers, userID, testChapterSessionID) {
    try {
        const pool = await poolPromise;

        const userIDInt = parseInt(userID, 10);
        const testChapterSessionIDInt = parseInt(testChapterSessionID, 10);

        if (isNaN(userIDInt) || isNaN(testChapterSessionIDInt)) {
            throw new Error('UserID hoặc TestChapterID không hợp lệ');
        }

        const queries = answers.map(answer => {
            const { QuestionID, AnswerChoice, AnswerText } = answer;

            const questionIDInt = parseInt(QuestionID, 10);
            if (isNaN(questionIDInt)) {
                console.error(`Invalid data: QuestionID = ${QuestionID}`);
                throw new Error('QuestionID không hợp lệ');
            }

            // Xử lý AnswerChoice
            let answerChoiceValue = 'NULL';
            if (typeof AnswerChoice === 'string' && AnswerChoice.trim() !== '') {
                console.log('Answer choice before:' + AnswerChoice);
                // Tách AnswerChoice thành mảng, chuyển đổi sang số và sắp xếp
                let sortedChoices = AnswerChoice.split(',')
                    .map(choice => parseInt(choice.trim(), 10)) // Chuyển đổi sang số nguyên
                    .sort((a, b) => a - b) // Sắp xếp theo thứ tự số học
                    .map(choice => choice.toString()); // Chuyển đổi lại thành chuỗi

                answerChoiceValue = `'${sortedChoices.join(',').replace(/'/g, "''")}'`;
                console.log('Answer choice after:' + answerChoiceValue);
            } else if (typeof AnswerChoice === 'number') {
                answerChoiceValue = AnswerChoice;
            }

            let answerTextValue = 'NULL';
            if (typeof AnswerText === 'string' && AnswerText.trim() !== '') {
                answerTextValue = `'${AnswerText.replace(/'/g, "''")}'`;
            }

            return `INSERT INTO AnswerOfUser_TestChapter (QuestionID, UserID, AnswerChoice, AnswerText, TestChapterSessionID)
                    VALUES (${questionIDInt}, ${userIDInt}, ${answerChoiceValue}, ${answerTextValue}, ${testChapterSessionIDInt});`;
        }).join(' ');

        await pool.request().query(queries);

        return { success: true, message: 'Thêm câu trả lời thành công' };
    } catch (error) {
        console.error('Error adding answers:', error);
        throw new Error('Có lỗi xảy ra khi thêm câu trả lời: ' + error.message);
    }
}
