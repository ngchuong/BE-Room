require("dotenv").config();
// require("./config/database");
const database = require("./config/database");

const cors = require("cors");
const express = require("express");

const app = express();

app.use(express.json());
app.use(cors());

// TODO: setup database;

// login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql_check_user_exist = `SELECT * FROM users WHERE email=${email} AND password=${password}`;

  database.query(sql_check_user_exist, (err, result) => {
    if (err)
      res.status(400).send({
        status: 400,
        error: err,
        text: "Email or password is incorrect",
      });

    res.status(200).send({ status: 200, text: "Login success" });
  });
});

// register user
app.post("/register-user", (req, res) => {
  const { username, email, password } = req.body;

  const sql_create_user = `INSERT INTO users (username, email, password, role) VALUES ('${username}', '${email}', '${password}', 1)`;

  database.query(sql_create_user, (err, result) => {
    if (err)
      res.status(400).send({
        status: 400,
        error: err,
        text: "Create user failed",
      });

    res.send({ status: 200, text: "Create user success" });
  });
});

// manage room
app.get("/manage/room", (req, res) => {
  const sql_get_rooms = `SELECT * FROM rooms`;

  database.query(sql_get_rooms, (err, result) => {
    if (err)
      res.status(400).send({
        status: 400,
        error: err,
        text: "Get list room failed",
      });

    res.send({ status: 200, data: result });
  });
});

app.post("/manage/room", (req, res) => {
  const {
    title,
    arr_image,
    address,
    acreage,
    bed,
    bethroom,
    price,
    id_user,
    type_room,
  } = req.body;

  const sql_create_room = `INSERT INTO rooms (id, title, address, acreage, bathroom, bed, phoneNumber, price, path, typeRoom, isActive, created) VALUES ('${username}', '${email}', '${password}', 1)`;

  database.query(sql_create_room, (err, result) => {
    if (err)
      res.status(400).send({
        status: 400,
        error: err,
        text: "Create room failed",
      });

    res.send({ status: 200, text: "Create room success" });
  });
});
app.patch("/manage/room:id", (req, res) => {});
app.delete("/manage/room:id", (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM rooms WHERE id = '${id}'`;
  database.query(sql, (err, result) => {
    if (err)
      res.status(400).send({
        status: 400,
        error: err,
        text: "Delete room failed",
      });

    res.send({ status: 200, text: "Delete success" });
  });
});

// client room
app.get("/room", (req, res) => {
  const sql_get_rooms = `SELECT * FROM rooms`;

  database.query(sql_get_rooms, (err, result) => {
    if (err)
      res.status(400).send({
        status: 400,
        error: err,
        text: "Get list room failed",
      });

    res.send({ status: 200, data: result });
  });
});

// manage user
app.get("/manage/user", (req, res) => {
  const sql = `SELECT * FROM users`;
  database.query(sql, (err, result) => {
    if (err)
      res.status(400).send({
        status: 400,
        error: err,
        text: "Get user failed",
      });

    res.send({ status: 200, data: result });
  });
});

app.post("/manage/user", (req, res) => {
  const { name, phone_number, email, password } = req.body;

  const sql_create_user = `INSERT INTO users (username, phone_number, email, password, role) VALUES ('${name}', '${phone_number}', '${email}', '${password}', '2')`;
  database.query(sql_create_user, (err, result) => {
    if (err)
      res.status(400).send({
        status: 400,
        error: err,
        text: "Create user failed",
      });

    res.send({ status: 200, text: "Create user success" });
  });
});
app.patch("/manage/user:id", (req, res) => {
  const id = req.params.id;
  const { name, phone_number, email, password } = req.body;

  const sql_create_user = `UPDATE users SET name = ${name}, phone_number=${phone_number}, email=${email}, password=${password} WHERE id = '${id}'`;
  database.query(sql_create_user, (err, result) => {
    if (err)
      res.status(400).send({
        status: 400,
        error: err,
        text: "Update user failed",
      });

    res.send({ status: 200, text: "Update user success" });
  });
});
app.delete("/manage/user:id", (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM users WHERE id = '${id}'`;
  database.query(sql, (err, result) => {
    if (err)
      res.status(400).send({
        status: 400,
        error: err,
        text: "Delete user failed",
      });

    res.send({ status: 200, text: "Delete success" });
  });
});

module.exports = app;
