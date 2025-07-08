const mysql = require("mysql2");
require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.getConnection((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
  } else {
    console.log("Connected to MySQL database ✅");
  }
});
module.exports = connection.promise();
