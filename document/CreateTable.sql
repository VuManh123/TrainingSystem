-- 1. Tạo bảng admin (người quản lý giáo dục và người quản lý hệ thống)
CREATE TABLE Admin (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
	Code VARCHAR(50) NOT NULL UNIQUE,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    LastLogin DATETIME,
    Role VARCHAR(50) NOT NULL CHECK (Role IN ('System Manager', 'Account Manager')),
    Active BIT NOT NULL
); -- OK

-- 2. Tạo bảng giáo viên dậy môn học
CREATE TABLE Teacher (	
    ID INT PRIMARY KEY IDENTITY(1,1),
    Code VARCHAR(50) NOT NULL UNIQUE, -- Mã giáo viên/ học viên
    Name NVARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    Phone VARCHAR(15) NOT NULL UNIQUE,
    Rank NVARCHAR(50),
    WorkUnit NVARCHAR(50),
    Active Bit NOT NULL
); --OK

-- 3. Tạo bảng học viên
CREATE TABLE Student (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Code VARCHAR(50) NOT NULL UNIQUE, -- Mã giáo viên/ học viên
    Name NVARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    Phone VARCHAR(15) NOT NULL UNIQUE,
    Address NVARCHAR(255) NOT NULL,
    Status BIT NOT NULL
); -- OK

-- 4. Tạo bảng khóa học
CREATE TABLE Course (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX) NOT NULL, 
    Image NVARCHAR(255),
    CreatedBy INT NOT NULL, -- Khóa ngoại đến teacherID
    CreatedDate DATETIME DEFAULT GETDATE(),
    StartDate DATE,
    EndDate DATE,
    FOREIGN KEY (CreatedBy) REFERENCES Teacher(ID)
);-- OK

-- 5. Tạo bảng chương cho từng khóa học
CREATE TABLE Chapter (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX),
    CreatedDate DATETIME DEFAULT GETDATE(),
    CourseID INT,
    FOREIGN KEY (CourseID) REFERENCES Course(ID)
); -- OK


-- 6. Tạo bảng học viên đăng ký khóa học
CREATE TABLE Course_User (
    ID INT PRIMARY KEY IDENTITY(1,1),
    CourseID INT,
    UserID INT,
    DateJoin DATETIME DEFAULT GETDATE(),
    Status BIT NOT NULL DEFAULT 0,
    FOREIGN KEY (CourseID) REFERENCES Course(ID),
    FOREIGN KEY (UserID) REFERENCES Student(ID)
); --OK

-- 7. Tạo bảng tài liệu cho từng chương học
CREATE TABLE Document (
    ID INT PRIMARY KEY IDENTITY(1,1),
    ChapterID INT,
    NameDocument NVARCHAR(255) NOT NULL,
    LinkDocument NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX),
    DateFile DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (ChapterID) REFERENCES Chapter(ID)
); --OK

-- 8. Tạo bảng video cho từng chương học
CREATE TABLE Videos (
    ID INT PRIMARY KEY IDENTITY(1,1),
    ChapterID INT NOT NULL,
    Name NVARCHAR(255) NOT NULL,
    Link NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX),
    DateVideos DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (ChapterID) REFERENCES Chapter(ID)
); --OK

-- 9. Tạo bảng kiểm tra tổng kết khóa học
CREATE TABLE TestCourse (
    ID INT PRIMARY KEY IDENTITY(1,1),
    CourseID INT NOT NULL,
    Name NVARCHAR(255) NOT NULL,
    StartDate DATE,
    EndDate DATE,
    Attemps INT,
    FOREIGN KEY (CourseID) REFERENCES Course(ID)
); -- OK

-- 10. Tạo bảng kết quả của ài kiểm tra tổng cho từng người dùng
CREATE TABLE TestCourseSession (
    ID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    TestCourseID INT NOT NULL,
    Result FLOAT,
	StartTime DATETIME,
    TurnInTime DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Student(ID),
    FOREIGN KEY (TestCourseID) REFERENCES TestCourse(ID)
);

-- 11. Tạo bảng kiếm tra cho từng chương
CREATE TABLE TestChapter (
    ID INT PRIMARY KEY IDENTITY(1,1),
    ChapterID INT NOT NULL,
    Name NVARCHAR(255) NOT NULL,
    StartDate DATE,
    EndDate DATE,
    Attemps INT,
    FOREIGN KEY (ChapterID) REFERENCES Chapter(ID)
);

-- 12. Tao bảng kết quả của học viên sau bài tét từng chương
CREATE TABLE TestChapterSession (
    ID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    TestChapterID INT NOT NULL,	
    Result FLOAT,
	StartTime DATETIME,
    TurnInTime DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Student(ID),
    FOREIGN KEY (TestChapterID) REFERENCES TestChapter(ID)
);

	-- 13. Tạo bảng câu hỏi cho bài test
	CREATE TABLE Question (
		ID INT PRIMARY KEY IDENTITY(1,1),
		Description NVARCHAR(MAX) NOT NULL,
		Type INT NOT NULL, -- 0: nochoice, 1: onechoice, 2: multichoice
		TestChapterID INT,
		TestCourseID INT,
		Status BIT NOT NULL DEFAULT 1,
		FOREIGN KEY (TestChapterID) REFERENCES TestChapter(ID),
		FOREIGN KEY (TestCourseID) REFERENCES TestCourse(ID)
	);
	-- 14. Tạo bảng dáp án  cho câu hỏi
	CREATE TABLE AnswerForQuestion (
		ID INT PRIMARY KEY IDENTITY(1,1),
		Description NVARCHAR(MAX),
		QuestionID INT NOT NULL,
		AnswerText NVARCHAR(MAX),
		IsCorrect BIT,
		FOREIGN KEY (QuestionID) REFERENCES Question(ID)
	);
	-- 15. Tạo bảng câu trả lời của học viên cho từng câu hỏi
	CREATE TABLE AnswerOfUser_TestChapter (
		ID INT PRIMARY KEY IDENTITY(1,1),
		QuestionID INT NOT NULL,
		UserID INT NOT NULL,
		AnswerChoice NVARCHAR(255),
		AnswerText NVARCHAR(MAX),
		TestChapterSessionID INT NOT NULL DEFAULT 0,
		FOREIGN KEY (TestChapterSessionID) REFERENCES  TestChapterSession(ID),
		FOREIGN KEY (QuestionID) REFERENCES Question(ID),
		FOREIGN KEY (UserID) REFERENCES Student(ID)
	);

	CREATE TABLE AnswerOfUser_TestCourse (
		ID INT PRIMARY KEY IDENTITY(1,1),
		QuestionID INT NOT NULL,
		UserID INT NOT NULL,
		AnswerChoice NVARCHAR(255),
		AnswerText NVARCHAR(MAX),
		TestCourseSessionID INT NOT NULL DEFAULT 0,
		FOREIGN KEY (TestCourseSessionID) REFERENCES  TestCourseSession(ID),
		FOREIGN KEY (QuestionID) REFERENCES Question(ID),
		FOREIGN KEY (UserID) REFERENCES Student(ID)
	);



-- 16. Tạo bảng đánh giá khóa học cho học viên
CREATE TABLE Reviews (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Content NVARCHAR(MAX) NOT NULL,
    Rating INT NOT NULL,
    ReviewText NVARCHAR(MAX),
    ReviewsDate DATETIME DEFAULT GETDATE(),
    UserID INT NOT NULL,
    CourseID INT NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Student(ID),
    FOREIGN KEY (CourseID) REFERENCES Course(ID)
);
