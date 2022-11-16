const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "myusername",
  password: "mypassword",
});


con.connect(function (err) {
  // if (err) throw err;
  if (err) {
    console.log("connect failed!");
    return;
  }
  console.log("Connected to database!");
});

module.exports = con;
