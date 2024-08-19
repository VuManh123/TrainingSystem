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