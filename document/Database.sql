CREATE DATABASE TrainingManagement;

-- 1. Tạo bảng admin (người quản lý giáo dục và người quản lý hệ thống)
CREATE TABLE Admin (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    LastLogin DATETIME,
    Role VARCHAR(50) NOT NULL CHECK (Role IN ('System Manager', 'Account Manager')),
    Active BIT NOT NULL
);
ALTER TABLE Admin
ADD Code VARCHAR(50) NOT NULL UNIQUE DEFAULT 0

INSERT INTO Admin(Name, Email, Password, LastLogin, Role, Active)
VALUES
('Dev Vu', 'vuducmanh11a@gmail.com', '12345678', N'2024-07-30 12:34:56.789', 'System Manager', '1')

-- 2. Tạo bảng giáo viên dậy môn học
CREATE TABLE Teacher (	
    ID INT PRIMARY KEY IDENTITY(1,1),
    Code VARCHAR(50) NOT NULL UNIQUE, -- Mã giáo viên/ học viên
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    Phone VARCHAR(15) NOT NULL UNIQUE,
    Rank VARCHAR(50),
    WorkUnit VARCHAR(50),
    Active Bit NOT NULL
);
INSERT INTO Teacher(Code, Name, Email, Password, Phone, Rank, WorkUnit, Active)
VALUES
('IT2930','Bui Van Hop', 'hopvanbui@gmail.com', 'hop12345', '0987635422', 'Leader', 'IT', '1')

-- 3. Tạo bảng học viên
CREATE TABLE Student (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Code VARCHAR(50) NOT NULL UNIQUE, -- Mã giáo viên/ học viên
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    Phone VARCHAR(15) NOT NULL UNIQUE,
    Address VARCHAR(255) NOT NULL,
    Status BIT NOT NULL
);

-- 4. Tạo bảng khóa học
CREATE TABLE Course (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Title VARCHAR(255) NOT NULL,
    Description TEXT NOT NULL, 
    Image VARCHAR(255),
    CreatedBy INT NOT NULL, -- Khóa ngoại đến teacherID
    CreatedDate DATETIME DEFAULT GETDATE(),
    StartDate DATE,
    EndDate DATE,
    FOREIGN KEY (CreatedBy) REFERENCES Teacher(ID)
);

-- 5. Tạo bảng chương cho từng khóa học
CREATE TABLE Chapter (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Title VARCHAR(255) NOT NULL,
    Description TEXT,
    CreatedDate DATETIME DEFAULT GETDATE(),
    CourseID INT,
    FOREIGN KEY (CourseID) REFERENCES Course(ID)
);


-- 6. Tạo bảng học viên đăng ký khóa học
CREATE TABLE Course_User (
    ID INT PRIMARY KEY IDENTITY(1,1),
    CourseID INT,
    UserID INT,
    DateJoin DATETIME DEFAULT GETDATE(),
    Status BIT NOT NULL,
    FOREIGN KEY (CourseID) REFERENCES Course(ID),
    FOREIGN KEY (UserID) REFERENCES Student(ID)
);

-- 7. Tạo bảng tài liệu cho từng chương học
CREATE TABLE Document (
    ID INT PRIMARY KEY IDENTITY(1,1),
    ChapterID INT,
    NameDocument VARCHAR(255) NOT NULL,
    LinkDocument VARCHAR(255) NOT NULL,
    Description TEXT,
    DateFile DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (ChapterID) REFERENCES Chapter(ID)
);

-- 8. Tạo bảng video cho từng chương học
CREATE TABLE Videos (
    ID INT PRIMARY KEY IDENTITY(1,1),
    ChapterID INT NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Link VARCHAR(255) NOT NULL,
    Description TEXT,
    DateVideos DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (ChapterID) REFERENCES Chapter(ID)
);

-- 9. Tạo bảng kiểm tra tổng kết khóa học
CREATE TABLE TestCourse (
    ID INT PRIMARY KEY IDENTITY(1,1),
    CourseID INT NOT NULL,
    Name VARCHAR(255) NOT NULL,
    StartDate DATE,
    EndDate DATE,
    Attemps INT NOT NULL,
    FOREIGN KEY (CourseID) REFERENCES Course(ID)
);

-- Thêm thuộc tính Status cho bảng để check ẩn hay hiện câu hỏi đó
ALTER TABLE TestCourse
ADD Status BIT NOT NULL DEFAULT 1

-- 10. Tạo bảng kết quả của ài kiểm tra tổng cho từng người dùng
CREATE TABLE Result_TestCourse (
    ID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    TestCourseID INT NOT NULL,
    Result FLOAT,
    TurnInTime DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Student(ID),
    FOREIGN KEY (TestCourseID) REFERENCES TestCourse(ID)
);

-- 11. Tạo bảng kiếm tra cho từng chương
CREATE TABLE TestChapter (
    ID INT PRIMARY KEY IDENTITY(1,1),
    ChapterID INT NOT NULL,
    Name VARCHAR(255) NOT NULL,
    StartDate DATE,
    EndDate DATE,
    Attemps INT,
    FOREIGN KEY (ChapterID) REFERENCES Chapter(ID)
);

-- 12. Tao bảng kết quả của học viên sau bài tét từng chương
CREATE TABLE Result_TestChapter (
    ID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    TestChapterID INT NOT NULL,
    Result FLOAT,
    TurnInTime DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Student(ID),
    FOREIGN KEY (TestChapterID) REFERENCES TestChapter(ID)
);

-- 13. Tạo bảng câu hỏi cho bài test
CREATE TABLE Question (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Description TEXT NOT NULL,
    Type INT NOT NULL, -- 0: nochoice, 1: onechoice, 2: multichoice
    TestChapterID INT,
    TestCourseID INT,
    FOREIGN KEY (TestChapterID) REFERENCES TestChapter(ID),
    FOREIGN KEY (TestCourseID) REFERENCES TestCourse(ID)
);
-- 14. Tạo bảng dáp án đúng cho câu hỏi
CREATE TABLE AnswerForQuestion (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Description TEXT,
    QuestionID INT NOT NULL,
    AnswerText TEXT,
    IsCorrect BIT,
    FOREIGN KEY (QuestionID) REFERENCES Question(ID)
);
-- 15. Tạo bảng câu trả lời của học viên cho từng câu hỏi
CREATE TABLE AnswerOfUser (
    ID INT PRIMARY KEY IDENTITY(1,1),
    QuestionID INT NOT NULL,
    UserID INT NOT NULL,
    AnswerChoice INT,
    AnswerText TEXT,
    FOREIGN KEY (QuestionID) REFERENCES Question(ID),
    FOREIGN KEY (UserID) REFERENCES Student(ID)
);
ALTER TABLE AnswerOfUser
ADD CONSTRAINT fk_answer FOREIGN KEY (AnswerChoice) REFERENCES AnswerForQuestion(ID);

-- 16. Tạo bảng đánh giá khóa học cho học viên
CREATE TABLE Reviews (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Content TEXT NOT NULL,
    Rating INT NOT NULL,
    ReviewText TEXT,
    ReviewsDate DATETIME DEFAULT GETDATE(),
    UserID INT NOT NULL,
    CourseID INT NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Student(ID),
    FOREIGN KEY (CourseID) REFERENCES Course(ID)
);

-- II. INSERT DỮ LIỆU
INSERT INTO Course (Title, Description, Image, CreatedBy, StartDate, EndDate) VALUES
('Lập trình Web với React.js', 
 'Khóa học này cung cấp kiến thức toàn diện về việc xây dựng ứng dụng web hiện đại bằng React.js, một thư viện JavaScript phổ biến. Bạn sẽ học cách tạo các thành phần React, quản lý trạng thái ứng dụng với hooks, và sử dụng các công cụ phát triển hiện đại để xây dựng ứng dụng web tương tác và hiệu quả.', 
 'images/banner1.png', 
 1, 
 '2024-08-15', 
 '2024-12-15'),

('Quản lý cơ sở dữ liệu với SQL Server', 
 'Khóa học này sẽ giúp bạn nắm vững các kỹ năng cần thiết để quản lý và tối ưu hóa cơ sở dữ liệu SQL Server. Bạn sẽ học cách tạo và quản lý cơ sở dữ liệu, viết các truy vấn SQL phức tạp, và áp dụng các phương pháp tối ưu hóa hiệu suất để đảm bảo cơ sở dữ liệu của bạn hoạt động hiệu quả.', 
 'images/banner1.png', 
 2, 
 '2024-09-01', 
 '2024-12-01'),

('Nhập môn Trí tuệ nhân tạo', 
 'Khóa học này cung cấp cái nhìn tổng quan về trí tuệ nhân tạo (AI), bao gồm các thuật toán học máy cơ bản, mạng nơ-ron, và các ứng dụng của AI trong thực tế. Bạn sẽ học cách xây dựng các mô hình AI đơn giản và áp dụng chúng vào các bài toán thực tế.', 
 'images/banner1.png', 
 1, 
 '2024-10-01', 
 '2025-01-01'),

('Xây dựng ứng dụng di động với Flutter', 
 'Khóa học này sẽ giúp bạn nắm vững cách xây dựng ứng dụng di động đa nền tảng bằng Flutter, một framework phát triển ứng dụng di động được Google phát triển. Bạn sẽ học cách tạo giao diện người dùng đẹp mắt, quản lý trạng thái ứng dụng, và triển khai ứng dụng của bạn lên các nền tảng di động khác nhau.', 
 'images/banner1.png', 
 2, 
 '2024-11-01', 
 '2025-02-01'),

('Phân tích dữ liệu với Python', 
 'Khóa học này cung cấp kỹ năng phân tích dữ liệu sử dụng Python, bao gồm các thư viện quan trọng như Pandas và NumPy. Bạn sẽ học cách xử lý và phân tích dữ liệu lớn, tạo các báo cáo và trực quan hóa dữ liệu để hỗ trợ các quyết định kinh doanh.', 
 'images/banner1.png', 
 1, 
 '2024-09-15', 
 '2024-12-15'),

('Phát triển phần mềm với Java', 
 'Khóa học này tập trung vào việc phát triển ứng dụng phần mềm bằng ngôn ngữ lập trình Java. Bạn sẽ học các khái niệm cơ bản về lập trình hướng đối tượng, xây dựng ứng dụng Java, và các kỹ thuật nâng cao như lập trình đa luồng và xử lý ngoại lệ.', 
 'images/banner1.png', 
 1, 
 '2024-08-20', 
 '2024-12-20'),

('Quản lý dự án phần mềm với Agile', 
 'Khóa học này cung cấp cái nhìn sâu sắc về phương pháp quản lý dự án phần mềm Agile, bao gồm Scrum và Kanban. Bạn sẽ học cách áp dụng các phương pháp Agile để quản lý các dự án phần mềm hiệu quả, từ lập kế hoạch đến triển khai và theo dõi tiến độ.', 
 'images/banner1.png', 
 1, 
 '2024-10-15', 
 '2025-01-15'),

('Kỹ thuật bảo mật mạng', 
 'Khóa học này giúp bạn hiểu về các phương pháp và kỹ thuật bảo mật mạng, bao gồm mã hóa, phát hiện xâm nhập và phòng chống tấn công mạng. Bạn sẽ học cách bảo vệ hệ thống mạng khỏi các mối đe dọa an ninh và duy trì sự an toàn cho dữ liệu và tài nguyên mạng.', 
 'images/banner1.png', 
 2, 
 '2024-11-10', 
 '2025-02-10'),

('Thiết kế trải nghiệm người dùng (UX)', 
 'Khóa học này tập trung vào việc thiết kế trải nghiệm người dùng hiệu quả. Bạn sẽ học cách nghiên cứu người dùng, tạo wireframes, và thực hiện kiểm tra người dùng để cải thiện giao diện và trải nghiệm người dùng cho các sản phẩm phần mềm.', 
 'images/banner1.png', 
 2, 
 '2024-12-01', 
 '2025-03-01'),

('Kỹ thuật học máy nâng cao', 
 'Khóa học này là sự tiếp nối của khóa học trí tuệ nhân tạo cơ bản, cung cấp cái nhìn sâu về các kỹ thuật học máy nâng cao như học sâu, mạng nơ-ron tích chập và học máy không giám sát. Bạn sẽ học cách triển khai các mô hình học máy phức tạp và áp dụng chúng vào các bài toán thực tế.', 
 'images/banner1.png', 
 1, 
 '2024-12-15', 
 '2025-03-15');

-- Insert data into Student table
INSERT INTO Student (Code, Name, Email, Password, Phone, Address, Status)
VALUES
('S001', 'Nguyen Van A', 'nguyenvana@example.com', 'password123', '0912345678', '123 Le Loi, Ha Noi', 1),
('S002', 'Tran Thi B', 'tranthib@example.com', 'password123', '0912345679', '456 Nguyen Trai, Ho Chi Minh', 1),
('S003', 'Le Van C', 'levanc@example.com', 'password123', '0912345680', '789 Hai Ba Trung, Da Nang', 1),
('S004', 'Pham Thi D', 'phamthid@example.com', 'password123', '0912345681', '101 Phan Chu Trinh, Can Tho', 1),
('S005', 'Hoang Van E', 'hoangvane@example.com', 'password123', '0912345682', '102 Tran Hung Dao, Hue', 1);

-- Insert data into Course table
INSERT INTO Course (Title, Description, Image, CreatedBy, StartDate, EndDate)
VALUES
('Course 1', 'Description for Course 1', 'image1.jpg', 1, '2024-01-01', '2024-03-01'),
('Course 2', 'Description for Course 2', 'image2.jpg', 1, '2024-02-01', '2024-04-01'),
('Course 3', 'Description for Course 3', 'image3.jpg', 1, '2024-03-01', '2024-05-01'),
('Course 4', 'Description for Course 4', 'image4.jpg', 1, '2024-04-01', '2024-06-01'),
('Course 5', 'Description for Course 5', 'image5.jpg', 1, '2024-05-01', '2024-07-01');

-- Insert data into Chapter table
INSERT INTO Chapter (Title, Description, CreatedDate, CourseID)
VALUES
('Chapter 1', 'Description for Chapter 1', GETDATE(), 4),
('Chapter 2', 'Description for Chapter 2', GETDATE(), 4),
('Chapter 3', 'Description for Chapter 3', GETDATE(), 4),
('Chapter 1', 'Description for Chapter 1 of Course 2', GETDATE(), 5),
('Chapter 2', 'Description for Chapter 2 of Course 2', GETDATE(), 5);

-- Insert data into Course_User table
INSERT INTO Course_User (CourseID, UserID, Status)
VALUES
(4, 1, 1),
(4, 2, 1),
(4, 3, 1),
(1, 1, 1),
(5, 5, 1);

-- Insert data into Document table
INSERT INTO Document (ChapterID, NameDocument, LinkDocument, Description)
VALUES
(2, 'Document 1', 'link1.doc', 'Description for Document 1'),
(3, 'Document 2', 'link2.doc', 'Description for Document 2'),
(4, 'Document 3', 'link3.doc', 'Description for Document 3'),
(5, 'Document 4', 'link4.doc', 'Description for Document 4'),
(1, 'Document 5', 'link5.doc', 'Description for Document 5');

-- Insert data into Videos table
INSERT INTO Videos (ChapterID, Name, Link, Description)
VALUES
(2, 'Video 1', 'link1.mp4', 'Description for Video 1'),
(3, 'Video 2', 'link2.mp4', 'Description for Video 2'),
(4, 'Video 3', 'link3.mp4', 'Description for Video 3'),
(5, 'Video 4', 'link4.mp4', 'Description for Video 4'),
(2, 'Video 5', 'link5.mp4', 'Description for Video 5');

-- Insert data into TestCourse table
INSERT INTO TestCourse (CourseID, Name, StartDate, EndDate, Attemps)
VALUES
(1, 'Test Course 1', '2024-01-15', '2024-01-20', 3),
(2, 'Test Course 2', '2024-02-15', '2024-02-20', 3),
(3, 'Test Course 3', '2024-03-15', '2024-03-20', 3),
(4, 'Test Course 4', '2024-04-15', '2024-04-20', 3),
(5, 'Test Course 5', '2024-05-15', '2024-05-20', 3);

-- Insert data into Result_TestCourse table
INSERT INTO Result_TestCourse (UserID, TestCourseID, Result)
VALUES
(1, 4, 40),
(2, 4, 32),
(3, 4, 35),
(4, 5, 30),
(5, 5, 38);

-- Insert data into TestChapter table
INSERT INTO TestChapter (ChapterID, Name, StartDate, EndDate, Attemps)
VALUES
(2, 'Test Chapter 1', '2024-01-10', '2024-01-15', 2),
(3, 'Test Chapter 2', '2024-02-10', '2024-02-15', 2),
(4, 'Test Chapter 3', '2024-03-10', '2024-03-15', 2),
(5, 'Test Chapter 4', '2024-04-10', '2024-04-15', 2),
(1, 'Test Chapter 5', '2024-05-10', '2024-05-15', 2);

-- Insert data into Result_TestChapter table
INSERT INTO Result_TestChapter (UserID, TestChapterID, Result)
VALUES
(1, 6, 80.0),
(2, 6, 85.0),
(3, 6, 70.0),
(4, 6, 75.0),
(5, 6, 90.0);

-- Insert data into Question table
INSERT INTO Question (Description, Type, TestChapterID, TestCourseID)
VALUES
('Question 1', 1, 6, NULL),
('Question 2', 2, 6, NULL),
('Question 3', 1, 6, NULL),
('Question 4', 2, 6, NULL),
('Question 5', 0, NULL, 6);

-- Insert data into AnswerForQuestion table
INSERT INTO AnswerForQuestion (Description, QuestionID, AnswerText, IsCorrect)
VALUES
('Answer 1', 2, NULL, 1),
('Answer 2', 2, NULL, 0),
('Answer 3', 2, NULL, 0),
('Answer 4', 2, NULL, 0),
('Answer 5', 2, NULL, 0);

-- Insert data into AnswerOfUser table
INSERT INTO AnswerOfUser (QuestionID, UserID, AnswerChoice, AnswerText)
VALUES
(2, 1, 3, NULL),
(3, 1, 3, NULL),
(4, 1, 4, NULL),
(5, 1, 4, NULL),
(2, 2, 5, NULL);

-- Insert data into Reviews table
INSERT INTO Reviews (Content, Rating, ReviewText, UserID, CourseID)
VALUES
('Great course!', 5, 'I learned a lot.', 1, 4),
('Good content', 4, 'Very helpful.', 2, 4),
('Average course', 3, 'Could be better.', 3, 4),
('Excellent', 5, 'Highly recommend.', 4, 4),
('Not bad', 4, 'Quite informative.', 5, 4);

