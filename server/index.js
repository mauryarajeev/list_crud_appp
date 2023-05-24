const express = require("express");
const path = require("path");
const cors = require("cors");
const axios = require("axios").default;

const port = 3001;
const app = express();
app.use(cors());

let users = [];

const listUsers = async () => {
  try {
    const res = await axios.get("https://randomuser.me/api/?results=50&nat=us");
    users = res.data.results;
  } catch (err) {
    console.error(err);
  }
};

listUsers();

app.get("/api/users", (req, res) => {
  console.log("api/users called!");
  res.json(users);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});
// 192.168.1.104