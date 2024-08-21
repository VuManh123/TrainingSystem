import poolPromise from './dbConfig.mjs';
import sql from 'mssql';

export async function getStudentAll() {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query('SELECT * FROM Student');
        return result.recordset;
    } catch (err) {
        throw new Error('Failed to query students: ' + err.message);
    }
}

export async function getCourseAll() {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query(`SELECT c.*, t.Name, t.WorkUnit FROM Course c
                    JOIN Teacher t ON c.CreatedBy = t.ID`);
        return result.recordset;
    } catch (err) {
        throw new Error('Failed to query courses: ' + err.message);
    }
}

// Search courses
export async function searchCourseByName(name) {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('name', sql.NVarChar, name)
            .query(`SELECT c.*, t.Name, t.WorkUnit FROM Course c
                    JOIN Teacher t ON c.CreatedBy = t.ID
                    WHERE c.Title LIKE @name`);
        return result.recordset;
    } catch (err) {
        throw new Error('Failed to query course: ' + err.message);
    }
}
export async function searchCourseByTeacher(teacher) {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('teacher', sql.NVarChar, teacher)
            .query(`SELECT c.*, t.Name, t.WorkUnit FROM Course c
                    JOIN Teacher t ON c.CreatedBy = t.ID
                    WHERE t.Name LIKE @teacher`);
        return result.recordset;
    } catch (err) {
        throw new Error('Failed to query course: ' + err.message);
    }
}
export async function searchCourseByWorkUnit(workUnit) {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('workUnit', sql.NVarChar, workUnit)
            .query(`SELECT c.*, t.Name, t.WorkUnit FROM Course c
                    JOIN Teacher t ON c.CreatedBy = t.ID
                    WHERE t.WorkUnit LIKE @workUnit`);
        return result.recordset;
    } catch (err) {
        throw new Error('Failed to query course: ' + err.message);
    }
}

//Search for student:
export async function searchStudentByCode(code) {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('code', sql.NVarChar, code)
            .query(`SELECT * FROM Student s
                WHERE s.Code LIKE @code`);
        return result.recordset;
    } catch (err) {
        throw new Error('Failed to query student: ' + err.message);
    }
}export async function searchStudentByName(name) {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('name', sql.NVarChar, name)
            .query(`SELECT * FROM Student s
                WHERE s.Name LIKE @name`);
        return result.recordset;
    } catch (err) {
        throw new Error('Failed to query student: ' + err.message);
    }
}export async function searchStudentByWorkUnit(workUnit) {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('workUnit', sql.NVarChar, workUnit)
            .query(`SELECT * FROM Student s
                WHERE s.WorkUnit LIKE @workUnit`);
        return result.recordset;
    } catch (err) {
        throw new Error('Failed to query student: ' + err.message);
    }
}
export async function searchStudentByStatus(status) {
    try {
        const pool = await poolPromise;
        const activeKeywords = ['active', 'hoạt động', 'đang hoạt động'];
        const isActive = activeKeywords.some(keyword => status.toLowerCase().includes(keyword.toLowerCase()));
        
        const statusValue = isActive ? 1 : 0;

        const result = await pool.request()
            .input('status', sql.Int, statusValue)
            .query(`SELECT * FROM Student s
                    WHERE s.Status = @status`);

        return result.recordset;
    } catch (err) {
        throw new Error('Failed to query student: ' + err.message);
    }
}

export async function addCourse(course, userID) {
    try {
        const pool = await poolPromise;
        const userIDInt = parseInt(userID, 10);
        
        // Nếu course.image là null hoặc undefined, gán giá trị mặc định
        const image = course.image ? course.image : 'images/banner5.png';

        const result = await pool.request()
            .input('name', sql.NVarChar, course.name)
            .input('startDate', sql.Date, course.startDate)
            .input('endDate', sql.Date, course.endDate)
            .input('description', sql.NVarChar(sql.MAX), course.description) // Lưu HTML vào DB
            .input('image', sql.NVarChar, image) // Thêm hình ảnh
            .input('userID', sql.Int, userIDInt)
            .query(`INSERT INTO Course (Title, Image, StartDate, EndDate, Description, CreatedBy)
                    VALUES (@name, @image, @startDate, @endDate, @description, @userID)`);
        return result.recordset;
    } catch (err) {
        throw new Error('Failed to add course: ' + err.message);
    }
}
export async function updateCourse(course, userID) {
    try {
        const pool = await poolPromise;
        const userIDInt = parseInt(userID, 10);
        
        // Nếu course.image là null hoặc undefined, gán giá trị mặc định
        const image = course.image ? course.image : 'images/banner5.png';

        const result = await pool.request()
            .input('name', sql.NVarChar, course.name)
            .input('startDate', sql.Date, course.startDate)
            .input('endDate', sql.Date, course.endDate)
            .input('description', sql.NVarChar(sql.MAX), course.description) // Lưu HTML vào DB
            .input('image', sql.NVarChar, image) // Thêm hình ảnh
            .input('userID', sql.Int, userIDInt)
            .query(`INSERT INTO Course (Name, Image, StartDate, EndDate, Description, CreatedBy)
                    VALUES (@name, @image, @startDate, @endDate, @description, @userID)`);
        return result.recordset;
    } catch (err) {
        throw new Error('Failed to add course: ' + err.message);
    }
}


