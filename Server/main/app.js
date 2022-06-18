const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

// Service checking method
app.get('/api/sample', function (req, res) {
  res
    .status(200)
    .json({ Success: true, Message: 'Welcome Hello ', Data: null });
});
module.exports = app;
