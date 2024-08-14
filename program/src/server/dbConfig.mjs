import sql from 'mssql';

// Cấu hình kết nối
const config = {
    server: 'S-PC392',
    database: 'Training_Management',
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
const poolPromise = new sql.ConnectionPool(config)
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

export default poolPromise;
