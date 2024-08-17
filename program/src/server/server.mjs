/* eslint-disable no-undef */
import express from 'express';
import session from 'express-session';
//import bcrypt from 'bcrypt';
import { getCourses, getAdminByEmail, getTeacherByEmail, getCourseByID, getCourseByUserID, getChapterByUserIDCourseID, getVideoByChapterID, getDocumentByChapterID, getTestByChapterID, getQuestionforTestChapter, postAddSessionTestChapter, postAddAnswerOfUser } from './query.mjs';
import sql from 'mssql';
import poolPromise from './dbConfig.mjs';
import cors from 'cors'
import { getHistoryTestChapter, getResultsTestChapterCurrent, setResults } from './Score.mjs';

const app = express();
app.use(cors());
app.use(express.json());

// Cấu hình express-session
app.use(session({
    secret: 'manhvu', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
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
        console.log(user.ID, user.Status, user.Active)
        if (user.Status === false || user.Active === false) {
            res.status(401).send('This account is not active!')
        } else {
            if (password === user.Password) {
                // Lưu thông tin người dùng vào phiên làm việc
                console.log('User ID trước khi lưu vào session:', user.ID);
                req.session.user = { id: user.ID, name: user.Name, role: role };
                console.log('User ID sau khi lưu vào session:', req.session.user.id);

                if (role === 'teacher') {
                    req.session.user.workUnit = user.WorkUnit;
                }
                res.json({ message: 'Login successful', user: req.session.user });
            } else {
                res.status(401).send('Invalid email or password');
            }
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
            .input('Active', sql.Bit, 0)
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
            .input('Active', sql.Bit, 0)
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

// API lấy danh sách khóa học
app.get('/api/courses', async (req, res) => {
    try {
        const courses = await getCourses();
        res.json(courses);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.get('/api/course/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const course = await getCourseByID(id);
      if (course) {
        res.json(course);
      } else {
        res.status(404).json({ message: 'Course not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to get course details' });
    }
});
app.get('/api/coursestudent/:userID', async (req, res) => {
    const { userID } = req.params;
  
    try {
      const course = await getCourseByUserID(userID);
      if (course) {
        res.json(course);
      } else {
        res.status(404).json({ message: 'Course not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to get course details' });
    }
});

app.get('/api/chapter-complete/:userID/:courseID', async (req, res) =>{
  const {userID} = req.params;
  const {courseID} = req.params;

  try{
    const chapterComplete = await getChapterByUserIDCourseID(userID, courseID);
    if (chapterComplete) {
      res.json(chapterComplete);
    } else {
      res.status(404).json({ message: 'Chapter not found'})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get chapter of this course'})
  }
})
app.get('/api/chapter-video/:chapterID', async (req, res) =>{
  const {chapterID} = req.params;

  try{
    const videos = await getVideoByChapterID(chapterID);
    if (videos) {
      res.json(videos);
    } else {
      res.status(404).json({ message: 'video not found'})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get videos of this chapter'})
  }
})
app.get('/api/chapter-document/:chapterID', async (req, res) =>{
  const {chapterID} = req.params;

  try{
    const documents = await getDocumentByChapterID(chapterID);
    if (documents) {
      res.json(documents);
    } else {
      res.status(404).json({ message: 'document not found'})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get videos of this chapter'})
  }
})
app.get('/api/chapter-test/:chapterID', async (req, res) =>{
  const {chapterID} = req.params;

  try{
    const tests = await getTestByChapterID(chapterID);
    if (tests) {
      res.json(tests);
    } else {
      res.status(404).json({ message: 'test not found'})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get tests of this chapter'})
  }
})
app.get('/api/test-question/:testChapterID', async (req, res) =>{
  const {testChapterID} = req.params;

  try{
    const questions = await getQuestionforTestChapter(testChapterID);
    if (questions) {
      res.json(questions);
    } else {
      res.status(404).json({ message: 'question not found'})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get questions of this chapter'})
  }
})

app.post('/api/addAnswerOfUser', async (req, res) => {
  const answers = req.body.answers;
  const userID = req.body.userID;
  const testChapterSessionID = req.body.testChapterSessionID;
  const testChapterID = req.body.testChapterID;

  try {
      // Thực hiện thêm câu trả lời của người dùng
      const result = await postAddAnswerOfUser(answers, userID, testChapterSessionID);

      // Cập nhật kết quả bài kiểm tra
      const resultUpdate = await setResults(testChapterID, testChapterSessionID);

      // Gửi phản hồi với cả hai kết quả
      res.json({
          success: true,
          message: 'Câu trả lời đã được thêm và kết quả đã được cập nhật.',
          result: result,
          resultUpdate: resultUpdate
      });
  } catch (error) {
      console.error('Error adding answers:', error);
      res.status(500).json({
          success: false,
          message: 'Có lỗi xảy ra khi thêm câu trả lời: ' + error.message
      });
  }
});


app.post('/api/addTestChapterSession', async (req, res) => {
  const { userID, testChapterID } = req.body;

  try {
      const testChapterSessionID = await postAddSessionTestChapter(userID, testChapterID);
      res.json({ testChapterSessionID });
  } catch (error) {
      console.error('Error creating session:', error); // Log thêm chi tiết lỗi
      res.status(500).json({ success: false, message: error.message });
  }
});

// Lấy lịch sử thi cyar nguoif dùng:
app.get('/api/history-testchapter/:userID/:testChapterID', async (req, res) =>{
  const {userID} = req.params;
  const {testChapterID} = req.params;

  try{
    const history = await getHistoryTestChapter(userID, testChapterID);
    if (history) {
      res.json(history);
    } else {
      res.status(404).json({ message: 'History not found'})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get history of this testchapter'})
  }
})
app.get('/api/results-testchapter/:testChapterSessionID', async (req, res) =>{
  const {testChapterSessionID} = req.params;

  try{
    const rs = await getResultsTestChapterCurrent(testChapterSessionID);
    if (rs) { 
      res.json(rs);
    } else {
      res.status(404).json({ message: 'Result not found'})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get Result of this testchapter'})
  }
})
























































const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
