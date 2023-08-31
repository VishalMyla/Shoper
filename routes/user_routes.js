const express = require("express");
const router = express.Router();
const { createUser, loginUser ,getallUsers}  = require('../Controller/UserController')

router.post('/register', createUser);
router.post('/login',loginUser);
router.get('/all-user',getallUsers);
module.exports = router;