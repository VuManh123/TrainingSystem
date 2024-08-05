/* eslint-disable no-undef */
import express from 'express';
import session from 'express-session';
import bcrypt from 'bcrypt';
import { getStudents, getCourses, poolPromise } from './query.mjs';
import sql from 'mssql';
import cors from 'cors'



const app = express();
app.use(cors());
app.use(express.json());
// const corsOptions = {
//     origin: 'http://localhost:5173', // Địa chỉ frontend của bạn
//     methods: ['GET', 'POST'], // Các phương thức HTTP được phép
//     allowedHeaders: ['Content-Type'] // Các header được phép
//   };
  
//   app.use(cors(corsOptions));

// Cấu hình express-session
app.use(session({
    secret: 'your_secret_key', // Thay thế bằng khóa bí mật của bạn
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Đặt `true` nếu bạn đang sử dụng HTTPS
}));

// API đăng nhập cho sinh viên, admin và giáo viên
app.post('/api/login', async (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return res.status(400).send('Email, password and role are required');
    }

    try {
        let user;
        if (role === 'student') {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('email', sql.NVarChar, email)
                .query('SELECT * FROM Student WHERE Email = @email');
            user = result.recordset[0];
        } else if (role === 'admin') {
            user = await getAdminByEmail(email);
        } else if (role === 'teacher') {
            user = await getTeacherByEmail(email);
        } else {
            return res.status(400).send('Invalid role');
        }

        if (!user) {
            return res.status(401).send('Invalid email or password');
        }

        const isMatch = await bcrypt.compare(password, user.Password);

        if (isMatch) {
            // Lưu thông tin người dùng vào phiên làm việc
            req.session.user = { id: user.ID, name: user.Name, role: role };
            if (role === 'teacher') {
                req.session.user.workUnit = user.WorkUnit;
            }
            res.json({ message: 'Login successful', user: req.session.user });
        } else {
            res.status(401).send('Invalid email or password');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// API đăng xuất
app.post('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.send('Logout successful');
    });
});

// API kiểm tra trạng thái đăng nhập
app.get('/api/status', (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
});

// API lấy danh sách học sinh
app.get('/api/students', async (req, res) => {
    try {
        const students = await getStudents();
        res.json(students);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// API lấy danh sách khóa học
app.get('/api/courses', async (req, res) => {
    try {
        const courses = await getCourses();
        res.json(courses);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
