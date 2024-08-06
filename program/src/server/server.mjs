/* eslint-disable no-undef */
import express from 'express';
import session from 'express-session';
//import bcrypt from 'bcrypt';
import { getStudents, getCourses, poolPromise, getAdminByEmail, getTeacherByEmail } from './query.mjs';
import sql from 'mssql';
import cors from 'cors'
//import { message } from 'antd';



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
    secret: 'manhvu', // Thay thế bằng khóa bí mật của bạn
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } // Đặt `true` nếu bạn đang sử dụng HTTPS
}));

// 1. CHỨC NĂNG ĐĂNG NHẬP
app.post('/api/login', async (req, res) => {
    const { email, password, role } = req.body;
    console.log(email, password);

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

        //const isMatch = await bcrypt.compare(password, user.Password);
        
        console.log(user.Password);
        console.log(password);
        //console.log(isMatch)

        if (password === user.Password) {
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
        console.error('Error during login process:', err); // Ghi log lỗi chi tiết
        res.status(500).send(err.message);
    }
});


// 2. CHỨC NĂNG ĐĂNG KÝ
app.post('/api/register', async (req, res) => {
    const { email, password, role, username, phone, address, employeeId, rank, workUnit } = req.body;
    console.log(role, email, password, username, phone, address, employeeId, rank, workUnit)
  
    try {
      const pool = await poolPromise;
      let result;
  
      switch (role) {       
        case 'admin':
          result = await pool.request()
            .input('Name', sql.VarChar, username)
            .input('Email', sql.VarChar, email)
            .input('Password', sql.VarChar, password)
            .input('Role', sql.VarChar, 'Account Manager')
            .input('Active', sql.Bit, 1)
            .input('Code', sql.VarChar, employeeId)
            .query(`INSERT INTO Admin (Name, Email, Password, Role, Code, Active) 
                    VALUES (@Name, @Email, @Password, @Role, @Code, @Active)`);
          break;
  
        case 'teacher':
          result = await pool.request()
            .input('Code', sql.VarChar, employeeId)
            .input('Name', sql.VarChar, username)
            .input('Email', sql.VarChar, email)
            .input('Password', sql.VarChar, password)
            .input('Phone', sql.VarChar, phone)
            .input('Rank', sql.VarChar, rank)
            .input('WorkUnit', sql.VarChar, workUnit)
            .input('Active', sql.Bit, 1)
            .query(`INSERT INTO Teacher (Code, Name, Email, Password, Phone, Rank, WorkUnit, Active) 
                    VALUES (@Code, @Name, @Email, @Password, @Phone, @Rank, @WorkUnit, @Active)`);
          break;
  
        case 'student':
          // eslint-disable-next-line no-unused-vars
          result = await pool.request()
            .input('Code', sql.VarChar, employeeId)
            .input('Name', sql.VarChar, username)   
            .input('Email', sql.VarChar, email)
            .input('Password', sql.VarChar, password)
            .input('Phone', sql.VarChar, phone)
            .input('Address', sql.VarChar, address)
            .input('Status', sql.Bit, 1)
            .query(`INSERT INTO Student (Code, Name, Email, Password, Phone, Address, Status) 
                    VALUES (@Code, @Name, @Email, @Password, @Phone, @Address, @Status)`);
          break;
  
        default:
          return res.status(400).json({ error: 'Invalid role' });
      }
  
      res.json({ success: true });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ error: 'An error occurred during registration' });
    }
  });

//  API ĐĂNG XUẤT
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
