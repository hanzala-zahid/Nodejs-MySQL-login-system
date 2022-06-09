const express = require("express");
const mysql = require("mysql");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const app = express();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.set("view engine", "hbs");

db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Connected to MySql database...");
  }
});

//Define Routes
app.use("/", require("./routes/pages"));

app.use("/auth", require("./routes/auth"));

app.listen(3000, () => {
  console.log("server has been started at port 3000");
});
