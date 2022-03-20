var mysql = require('mysql');

var con = mysql.createConnection(config);

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    /*Create tables:*/
    var CREATE_BLOGS_TABLE = "CREATE TABLE IF NOT EXISTS blogs (blog_id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(45),body VARCHAR(10000), date DATETIME default CURRENT_TIMESTAMP)";
    var CREATE_USERS_TABLE = "CREATE TABLE IF NOT EXISTS users (user_id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(45),password VARCHAR(45))";
    con.query(CREATE_BLOGS_TABLE, function (err, result) {
        if (err) throw err;
        console.log("Blogs table created");
    });
    con.query(CREATE_USERS_TABLE, function (err, result) {
        if (err) throw err;
        console.log("Users Table created");
    });
    con.end(function (err) {
        if (err) {
            return console.log('error:' + err.message);
        }
        console.log('Closed the database connection.');
    });
});