const express = require("express");
const router = express.Router();
const { createUser }  = require('../Controller/UserController')

router.post('/register', createUser);

module.exports = router;