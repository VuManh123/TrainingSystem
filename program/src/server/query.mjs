import sql from 'mssql';

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
