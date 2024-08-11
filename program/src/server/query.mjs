// eslint-disable-next-line no-unused-vars
import { Polygon } from '@react-google-maps/api';
import sql from 'mssql';

//S-PC392 - manhvu123
const config = {
    server: 'MANHVU',
    database: 'TrainingManagement',
    port: 1433,
    authentication: {
        type: 'default',
        options: {
            userName: 'sa',
            password: 'manhvu123'
        }
    },
    options: {
        encrypt: false,
        enableArithAbort: true
    }
};

// Tạo một pool kết nối
export const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch(err => {
        console.error('Database connection failed:', err);
        // eslint-disable-next-line no-undef
        process.exit(1); // Thoát nếu không thể kết nối với cơ sở dữ liệu
    });

export async function getStudents() {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query('SELECT * FROM Student');
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
                            LEFT JOIN Result_TestChapter rtc ON tc.ID = rtc.TestChapterID
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