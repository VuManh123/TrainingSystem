// eslint-disable-next-line no-unused-vars
import { Polygon } from '@react-google-maps/api';
import sql from 'mssql';

//MANHVU - manhvu123
const config = {
    server: 'S-PC392',
    database: 'TrainingManagement',
    port: 1433,
    authentication: {
        type: 'default',
        options: {
            userName: 'sa',
            password: 'Manhvu123@@'
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
      // Chuyển đổi id sang kiểu số nếu cột ID là kiểu số
      const numericId = Number(id);
      if (isNaN(numericId)) {
        throw new Error('ID must be a valid number');
      }
      const result = await pool.request()
        .input('id', sql.Int, numericId) // Sử dụng sql.Int nếu ID là kiểu số nguyên
        .query('SELECT * FROM Course WHERE ID = @id');
      return result.recordset[0];
    } catch (err) {
      throw new Error('Failed to query get course by id: ' + err.message);
    }
  }
