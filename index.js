const express = require("express");
const session = require("express-session");
const path = require("path");
const contact = require("./backend/contact.js");
const log = require("./backend/server.js");
const session = require("express-session");

const app = express();

app.use(session({
  secret: generateRandomString(32), // Random string of length 32
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true } // Note: For production, set secure: true if using HTTPS
}));

// Set the directory where HTML and CSS files are located
const publicDirectoryPath = path.join(__dirname, "./frontend");
app.use(express.static(publicDirectoryPath));

const publicDirectoryPath2 = path.join(__dirname, "./backend");
app.use(express.static(publicDirectoryPath2));

// Define routes to serve HTML files
app.get("/home", (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, "./index.html"));
});

app.get("/login.html", (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, "./login.html"));
  res.end(log);
});

app.get("/index.html#contact", (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, "./index.html"));
  res.end(contact);
});

app.get("/index.html#about", (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, "./index.html"));
});

app.get("/dogbreeds.html", (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, "./dogbreeds.html"));
});
app.get("/dogs.html", (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, "./dogs.html"));
});

app.get("/catbreeds.html", (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, "./catbreeds.html"));
});
app.get("/cats.html", (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, "./cats.html"));
});

app.get("/rabbitbreeds.html", (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, "./rabbitbreeds.html"));
});
app.get("/rabbits.html", (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, "./rabbits.html"));
});
app.get("/services.html", (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, "./cats.html"));
});
app.get("/products.html", (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, "./cats.html"));
});

app.post("/submit-contact", contact);
app.post("/login", log);
app.post("/signup", log);

app.listen(8000, () => {
  console.log(`Server is up and running`);
});

function generateRandomString(length) {
  const crypto = require('crypto');
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex') // Convert to hexadecimal format
    .slice(0, length); // Trim to desired length
}