let mysql = require("mysql");
const express = require("express");
require("dotenv").config();
// const router = express.Router();
const app = express();
let con = mysql.createConnection({
  host: process.env.HOST,
  user: "avnadmin",
  port: 16471,
  password: process.env.DB_PASSWORD,
  database: "defaultdb",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("connected");

  // let first =
  //   "create table test01 (id int not null primary key auto_increment, company varchar(255), domain varchar(255), other varchar(255))";
  let second = "select * from test01";

  con.query(second, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});

app.get(`/test`, (req, res) => {
  let results = con.query("select * from test01", function (err, result) {
    if (err) throw err;
    res.json({ data: result });
  });
});
app.get(`/test/search`, (req, res) => {
  console.log("here", req._parsedUrl.query);
  let test = req._parsedUrl.query;
  let results = con.query(
    `select * from test01 where domain='${test}'`,
    function (err, result) {
      if (err) throw err;
      console.log(result);
      res.json({ data: result });
    },
  );
});
const port = process.env.PORT ? process.env.PORT : 3001;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
