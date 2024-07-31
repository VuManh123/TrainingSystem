// Định nghĩa các thư mục sẽ sử dụng
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
var sql = require('mssql');
var consoleTable = require('console.table');
const fs = require('fs');
const { connect } = require('http2');
const session = require('express-session');

// Sử dụng body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(session({
    secret: 'manhvu',
    resave: true,
    saveUninitialized: true
}));


// Thiết lập Db cho trang đăng nhập
const configForLogIn = {
  server: 'MANHVU',
  database: 'TrainingManagement',
  port: 1433,
  authentication: {
    type: 'default',
    options: {
      userName: 'sa',
      password: 'manhvu123'
    }
  },
  options: {
    encrypt: false,
    enableArithAbort: true
  }
};

// Kết nối với Db để lấy thông tin bảng Users
sql.connect(configForLogIn, function(err) {
  if (err) {
    console.log("Failed to connect to database: " + err);
  } else {
    console.log("Connected to database to get Users table info");
  }
});

// // Endpoint đăng xuất
// app.post('/logout', function(req, res) {
//   // Ngắt kết nối config
//   sql.close(function(err) {
//     if (err) {
//       console.log("Failed to close database connection: " + err);
//     } else {
//       console.log("Closed database connection");
//     }
//   });

//   // Kết nối lại với configForLogIn
//   sql.connect(configForLogIn, function(err) {
//     if (err) {
//       console.log("Failed to connect to database: " + err);
//     } else {
//       console.log("Connected to database to get Users table info");
//     }
//   });

//   // Chuyển hướng người dùng về trang đăng nhập
//   res.redirect('/login.html');
// });
// // Endpoint đăng nhập
// app.post('/login', function(req, res) {
//   const username = req.body.username;
//   const password = req.body.password;
//   console.log('Handling login request...');

//   // Tạo truy vấn SQL để kiểm tra thông tin đăng nhập
//   const query = `SELECT * FROM Users WHERE UserName = '${username}' AND Password = '${password}'`;

//   // Thực hiện truy vấn SQL
//   const request = new sql.Request();
//   request.query(query, function(err, result) {
//     if (err) {
//       console.log("Error executing SQL query: " + err);
//       res.json({ success: false, message: "Error executing SQL query" });
//     } else {
//       // Kiểm tra kết quả truy vấn
//       if (result.recordset.length > 0) {
//         req.session.userName = username;
//         // Đóng kết nối configForLogIn sau khi đăng nhập thành công
//         sql.close(function(err) {
//           if (err) {
//             console.log("Failed to close database connection: " + err);
//           } else {
//             console.log("Closed database connection");
//           }
//         });

//         // Thiết lập Db để thực hiện các chức năng khác
//         const config = {
//           server: 'MANHVU',
//           database: 'MChart',
//           port: 1433,
//           authentication: {
//             type: 'default',
//             options: {
//               userName: username,
//               password: password
//             }
//           },
//           options: {
//             encrypt: false,
//             enableArithAbort: true
//           }
//         };

//         // Kết nối với Db để thực hiện các chức năng khác
//         sql.connect(config, function(err) {
//           if (err) {
//             console.log("Failed to connect to database: " + err);
//           } else {
//             console.log("Connected to database for other functions");
//           }
//         });

//         res.json({ success: true, message: "Login successful", userName: username });
//       } else {
//         res.json({ success: false, message: "Invalid username or password" });
//       }
//     }
//   });
// });

// // Middleware xác thực
// const authenticateUser = (req, res, next) => {
//   const exemptedRoutes = ['/login.html', '/public-route1', '/public-route2'];

//   if (exemptedRoutes.includes(req.path)) {
//     next();
//   } else {
//     if (!req.session.userName) {
//       // Nếu người dùng chưa đăng nhập, chuyển hướng về trang đăng nhập
//       res.redirect('/login.html');
//     } else {
//       next();
//     }
//   }
// };

// // Reset lai cac ket noi khi dang xuat
// module.exports = connect ;