-- 1. Chèn dữ liệu vào bảng Admin
INSERT INTO Admin (Name, Code, Email, Password, LastLogin, Role, Active)
VALUES 
(N'Nguyễn Văn A', 'ADMIN001', 'manhadmin@gmail.com', 'manh123', GETDATE(), 'System Manager', 1),
(N'Trần Thị B', 'ADMIN002', 'admin2@example.com', 'hashed_password2', GETDATE(), 'Account Manager', 1);

-- 2. Chèn dữ liệu vào bảng Teacher
INSERT INTO Teacher (Code, Name, Email, Password, Phone, Rank, WorkUnit, Active)
VALUES 
('TEACHER001', N'Phạm Văn C', 'manhtech@gmail.com', 'manh123', '0912345678', 'Senior', 'Mathematics Department', 1),
('TEACHER002', N'Lê Thị D', 'teacher2@example.com', 'hashed_password4', '0987654321', 'Junior', 'Physics Department', 1);

-- 3. Chèn dữ liệu vào bảng Student
INSERT INTO Student (Code, Name, Email, Password, Phone, Address, Status)
VALUES 
('STUDENT001', N'Ngô Văn E', 'manh@gmail.com', 'manh123', '0901234567', '123 Main St, City A', 1),
('STUDENT002', N'Đặng Thị F', 'student2@example.com', '123456', '0976543210', '456 Maple Ave, City B', 1);

-- 4. Chèn dữ liệu vào bảng Course
INSERT INTO Course (Title, Description, Image, CreatedBy, StartDate, EndDate)
VALUES 
(N'Khóa học Toán Cao cấp', N'<p>Khóa học này bao gồm các bài giảng về <strong>tích phân</strong> và <em>đạo hàm</em>.</p>', 'images/banner1.png', 1, '2024-09-01', '2025-01-01'),
(N'Khóa học Vật lý Lượng tử', N'<p>Khóa học này sẽ khám phá các khái niệm <u>cơ học lượng tử</u> và <strong>vật lý hạt</strong>.</p>', 'images/banner2.png', 2, '2024-10-01', '2025-02-01'),
(N'Khóa học Lập trình Python', N'<p>Khóa học này hướng dẫn <strong>lập trình Python</strong> từ cơ bản đến nâng cao.</p>', 'images/banner3.png', 1, '2024-08-15', '2024-12-15'),
(N'Khóa học Hóa Hữu cơ', N'<p>Khóa học này bao gồm các phản ứng <strong>hữu cơ</strong> và cách ứng dụng chúng.</p>', 'images/banner4.png', 2, '2024-09-10', '2025-01-10'),
(N'Khóa học Kỹ năng mềm', N'<p>Khóa học này giúp phát triển các <strong>kỹ năng mềm</strong> như giao tiếp và làm việc nhóm.</p>', 'images/banner5.png', 1, '2024-11-01', '2025-03-01');


-- 5. Chèn dữ liệu vào bảng Chapter
INSERT INTO Chapter (Title, Description, CourseID)
VALUES 
(N'Giới thiệu về Tích phân', N'<p>Chương này sẽ giúp bạn hiểu <strong>cơ bản</strong> về tích phân.</p>', 1),
(N'Giới thiệu về Đạo hàm', N'<p>Chương này sẽ giúp bạn nắm bắt các khái niệm <em>cơ bản</em> của đạo hàm.</p>', 1),
(N'Cơ học lượng tử căn bản', N'<p>Chương này bao gồm các nguyên lý <u>cơ bản</u> về cơ học lượng tử.</p>', 2),
(N'Phân tích hàm số', N'<p>Chương này hướng dẫn cách <strong>phân tích</strong> các hàm số phức tạp.</p>', 1),
(N'Giới thiệu về Python', N'<p>Chương này sẽ giới thiệu <strong>cơ bản</strong> về Python và các công cụ lập trình liên quan.</p>', 3),
(N'Phản ứng hữu cơ cơ bản', N'<p>Chương này sẽ giúp bạn hiểu rõ các <strong>phản ứng hữu cơ</strong> phổ biến.</p>', 4),
(N'Kỹ năng giao tiếp', N'<p>Chương này sẽ phát triển <strong>kỹ năng giao tiếp</strong> hiệu quả trong công việc.</p>', 5),
(N'Làm việc nhóm', N'<p>Chương này sẽ hướng dẫn các phương pháp <strong>làm việc nhóm</strong> hiệu quả.</p>', 5);

-- 6. Chèn dữ liệu vào bảng Course_User
INSERT INTO Course_User (CourseID, UserID, DateJoin, Status)
VALUES 
(1, 1, GETDATE(), 1),
(2, 2, GETDATE(), 1), 
(3, 1, GETDATE(), 1), 
(4, 2, GETDATE(), 0), 
(5, 1, GETDATE(), 1); 

-- 7. Chèn dữ liệu vào bảng Document
INSERT INTO Document (ChapterID, NameDocument, LinkDocument, Description, DateFile)
VALUES 
(1, N'Tài liệu Tích phân', 'documents/file1.pdf', N'<p>Đây là tài liệu <strong>tích phân</strong> căn bản.</p>', GETDATE()),
(1, N'Tài liệu Đạo hàm', 'documents/file2.pdf', N'<p>Đây là tài liệu <strong>đạo hàm</strong> căn bản.</p>', GETDATE()),
(1, N'Tài liệu Cơ học lượng tử', 'documents/ppt1.pptx', N'<p>Đây là tài liệu về <em>cơ học lượng tử</em>.</p>', GETDATE()),
(2, N'Tài liệu Phân tích hàm số', 'documents/file3.pdf', N'<p>Đây là tài liệu <strong>phân tích hàm số</strong>.</p>', GETDATE()),
(5, N'Tài liệu Python cơ bản', 'documents/ppt2.pptx', N'<p>Đây là tài liệu về <strong>lập trình Python</strong> cơ bản.</p>', GETDATE());

-- 8. Chèn dữ liệu vào bảng Videos
INSERT INTO Videos (ChapterID, Name, Link, Description, DateVideos)
VALUES 
(1, N'Video bài giảng Tích phân', 'videos/link.mp4', N'<p>Video này hướng dẫn về <strong>tích phân</strong>.</p>', GETDATE()),
(1, N'Video bài giảng Đạo hàm', 'videos/link1.mp4', N'<p>Video này hướng dẫn về <strong>đạo hàm</strong>.</p>', GETDATE()),
(1, N'Video bài giảng Cơ học lượng tử', 'videos/link3.mp4', N'<p>Video này giới thiệu về <strong>cơ học lượng tử</strong>.</p>', GETDATE()),
(2, N'Video bài giảng Phân tích hàm số', 'videos/link3.mp4', N'<p>Video này giới thiệu về <strong>phân tích hàm số</strong>.</p>', GETDATE()),
(5, N'Video bài giảng Python cơ bản', 'videos/link3.mp4', N'<p>Video này hướng dẫn <strong>lập trình Python</strong> cơ bản.</p>', GETDATE());

-- 9. Chèn dữ liệu vào bảng TestCourse
INSERT INTO TestCourse (CourseID, Name, StartDate, EndDate, Attemps)
VALUES 
(1, N'Test tổng kết khóa học Toán', '2024-01-10', '2024-01-20', 3),
(2, N'Test tổng kết khóa học Lý', '2024-02-10', '2024-02-20', 2),
(3, N'Test tổng kết khóa học Hóa', '2024-03-10', '2024-03-20', 3),
(4, N'Test tổng kết khóa học Sinh', '2024-04-10', '2024-04-20', 1),
(5, N'Test tổng kết khóa học Văn', '2024-05-10', '2024-05-20', 4);

-- 10. Chèn dữ liệu vào bảng TestCourseSession
INSERT INTO TestCourseSession (UserID, TestCourseID, Result, StartTime, TurnInTime)
VALUES 
(1, 1, 85.5, '2024-01-15 10:00:00', '2024-01-15 11:00:00'),
(2, 2, 75.0, '2024-02-15 10:00:00', '2024-02-15 11:00:00'),
(1, 3, 90.0, '2024-03-15 10:00:00', '2024-03-15 11:00:00'),
(2, 4, 80.0, '2024-04-15 10:00:00', '2024-04-15 11:00:00'),
(1, 5, 88.0, '2024-05-15 10:00:00', '2024-05-15 11:00:00');

-- 11. Chèn dữ liệu vào bảng TestChapter
INSERT INTO TestChapter (ChapterID, Name, StartDate, EndDate, Attemps)
VALUES 
(1, N'Test chương 1 Toán', '2024-01-01', '2024-01-10', 2),
(1, N'Test chương 1 Lý', '2024-02-01', '2024-02-10', 2),
(1, N'Test chương 1 Hóa', '2024-03-01', '2024-03-10', 3),
(2, N'Test chương 1 Sinh', '2024-04-01', '2024-04-10', 2),
(5, N'Test chương 1 Văn', '2024-05-01', '2024-05-10', 1);

-- 12. Chèn dữ liệu vào bảng TestChapterSession
INSERT INTO TestChapterSession (UserID, TestChapterID, Result, StartTime, TurnInTime)
VALUES 
(1, 1, 70.0, '2024-01-05 10:00:00', '2024-01-05 10:30:00'),
(2, 2, 65.0, '2024-02-05 10:00:00', '2024-02-05 10:30:00'),
(2, 3, 85.0, '2024-03-05 10:00:00', '2024-03-05 10:30:00'),
(1, 4, 75.0, '2024-04-05 10:00:00', '2024-04-05 10:30:00'),
(2, 5, 80.0, '2024-05-05 10:00:00', '2024-05-05 10:30:00');

-- 13. Chèn dữ liệu vào bảng Question
INSERT INTO Question (Description, Type, TestChapterID, TestCourseID, Status)
VALUES 
(N'Câu hỏi tổng kết về tích phân?', 1, 1, NULL, 1),
(N'Câu hỏi tổng kết về đạo hàm?', 2, 1, NULL, 1),
(N'Câu hỏi tổng kết về cơ học lượng tử?', 0, NULL, 1, 1),
(N'Câu hỏi tổng kết về Python cơ bản?', 1, NULL, 2, 1),
(N'Câu hỏi tổng kết về phản ứng hữu cơ?', 2, 1, NULL, 1),
(N'Nêu cảm nghĩ của bạn về bài test!', 0, 1, NULL, 1);

-- 14. Chèn dữ liệu vào bảng AnswerForQuestion
INSERT INTO AnswerForQuestion (Description, QuestionID, AnswerText, IsCorrect)
VALUES 
(N'∫(x^2)dx = (1/3)x^3 + C', 1, NULL, 1),
(N'∫(x^2)dx = x^2/2 + C', 1, NULL, 0),
(N'f''(x) = 2x', 2, NULL, 1),
(N'f''(x) = x^2', 2, NULL, 0),
(N'f''(x) = 2x', 5, NULL, 1),
(N'f''(x) = x^2', 5, NULL, 0),
(N'Đáp án cho câu hỏi cơ học lượng tử', 6, N'Hạt electron có tính chất sóng', 1);

-- 15. Chèn dữ liệu vào bảng AnswerOfUser_TestChapter
INSERT INTO AnswerOfUser_TestChapter (QuestionID, UserID, AnswerChoice, AnswerText, TestChapterSessionID)
VALUES 
(2, 1, 2, NULL, 4),
(3, 1, 4, NULL, 4),
(2, 2, 1, NULL, 5),
(3, 1, 3, NULL, 7);

-- 15. Chèn dữ liệu vào bảng AnswerOfUser_TestCourse
INSERT INTO AnswerOfUser_TestCourse (QuestionID, UserID, AnswerChoice, AnswerText, TestCourseSessionID)
VALUES 
(4, 1, NULL, N'∫(x^2)dx = (1/3)x^3 + C', 4),
(5, 1, 7, NULL, 4),
(4, 2, NULL, N'Hạt electron có tính chất sóng', 5),
(5, 2, 7, NULL, 5)

-- 16. Chèn dữ liệu vào bảng Reviews
INSERT INTO Reviews (Content, Rating, ReviewText, UserID, CourseID)
VALUES 
(N'Nội dung khóa học tuyệt vời!', 5, N'Khóa học rất hữu ích và dễ hiểu.', 1, 1),
(N'Khóa học khá tốt', 4, N'Nội dung rõ ràng nhưng có thể cải thiện.', 2, 2),
(N'Trải nghiệm không tốt lắm', 2, N'Nội dung quá khó hiểu.', 1, 3),
(N'Nội dung bình thường', 3, N'Nội dung tạm được, cần bổ sung thêm.', 2, 4),
(N'Tuyệt vời!', 5, N'Tôi đã học được rất nhiều từ khóa học này.', 1, 5);

