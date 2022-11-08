const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");
const { send } = require("process");

const app = express();
app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
  host: "localhost",
  user: "Wojtek",
  password: "eConsulting123",
  database: "logins",
});

app.post("/user/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  connection.query(
    "SELECT * FROM login_user WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) throw err;
      if (result.length >= 1) {
        res.sendStatus(409);
      } else {
        connection.query(
          "INSERT INTO login_user (username, password) VALUES (?,?)",
          [username, password],
          (err) => {
            if (err) throw err;
            res.sendStatus(201);
          }
        );
      }
    }
  );
});

app.post("/user/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  connection.query(
    "SELECT * FROM login_user WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Wrong username or password combination" });
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Connected to database");
});
