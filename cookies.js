const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

// Route to set a cookie
app.get('/set-cookie', (req, res) => {'
  res.cookie('myCookie', 'Hello, Cookie!');
  res.send('Cookie set successfully!');
});

// Route to check if the cookie is set
app.get('/check-cookie', (req, res) => {
  if (req.cookies.myCookie) {
    res.send('Cookie value: ' + req.cookies.myCookie);
  } else {
    res.send('Cookie not set!');
  }
});

app.get('/clear-cookie', (req, res) => {
  res.clearCookie('myCookie');
  res.send('Cookie cleared!');
});
