var mysql = require("mysql2");
var express = require("express");
var cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

var connection = mysql.createConnection({
  host: "localhost",
  user: "Wojtek",
  password: "eConsulting123",
  database: "logins",
});

app.post("/user/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  connection.query(
    "INSERT INTO login_user (username, password) VALUES (?,?)",
    [username, password],
    (err) => {
      if (err) throw err;
    }
  );
  res.status(201).send();
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
        // res.status(400).send();
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Connected to database");
});
