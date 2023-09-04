require('dotenv').config();
const express = require('express');
const {notFound , errorHandler} = require('./middleware/errorHandler')
require('dotenv').config();
const app = express();
const dbConnect = require("./config/dbConnect")
const cookie = require("cookie-parser")
// const authrouter = require('./routes/user_routes');
const router = require('./routes/conjunction');
const cookieParser = require('cookie-parser');
const port = process.env.PORT ;
console.log(port);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
dbConnect();
app.use('/',router);
app.use(notFound);
app.use(errorHandler);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});