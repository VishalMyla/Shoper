require('dotenv').config();
const express = require('express');
require('dotenv').config();
const app = express();
const dbConnect = require("./config/dbConnect")
const authrouter = require('./routes/authrouter');
const port = process.env.PORT ;
console.log(port);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect();
// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, World from Express!');
});

app.use('/api/user', authrouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});