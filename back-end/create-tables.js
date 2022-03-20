var mysql = require('mysql');
var db = require('./dbconfig')

var con = mysql.createConnection(db.config);

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    /*Create tables:*/
    var DELETE_BLOGS_TABLE = "DROP TABLE IF EXISTS blogs;";
    var CREATE_BLOGS_TABLE = "CREATE TABLE blogs (blog_id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(45),body VARCHAR(10000), date DATETIME default CURRENT_TIMESTAMP);";
    var DELETE_USERS_TABLE = "DROP TABLE IF EXISTS users;";
    var CREATE_USERS_TABLE = "CREATE TABLE users (user_id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(45),password VARCHAR(45));";
    var INSERT_ADMIN_DATA = "INSERT INTO `sample_app`.`users` (`name`, `password`) VALUES ('admin', 'admin');";
    con.query(DELETE_BLOGS_TABLE, function (err, result) {
        if (err) throw err;
        console.log("Blogs table deleted");
    });
    con.query(CREATE_BLOGS_TABLE, function (err, result) {
        if (err) throw err;
        console.log("Blogs table created");
    });
    con.query(DELETE_USERS_TABLE, function (err, result) {
        if (err) throw err;
        console.log("Blogs table deleted");
    });
    con.query(CREATE_USERS_TABLE, function (err, result) {
        if (err) throw err;
        console.log("Users Table created");
    });
    con.query(INSERT_ADMIN_DATA, function (err, result) {
        if (err) throw err;
        console.log("Admin data inserted");
    });
    con.end(function (err) {
        if (err) {
            return console.log('error:' + err.message);
        }
        console.log('Closed the database connection.');
    });
});