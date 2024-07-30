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

INSERT INTO Admin(Name, Email, Password, LastLogin, Role, Active)
VALUES
('Dev Vu', 'vuducmanh11a@gmail.com', '12345678', '2024-07-30 12:34:56.789', 'System Manager', '1')

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
    CreatedDate DATETIME NOT NULL,
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
