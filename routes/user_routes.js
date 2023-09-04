const express = require("express");
const router = express.Router();
const { createUser, loginUser ,getallUsers,getaUser, UpdateUser,deleteUser , blockUser,unblockUser , creatingAuthKeyByRefreshKey}  = require('../Controller/UserController')

const {ceckingTokenFromReq, isAdmin} = require('../middleware/authmiddinjwt');


router.post('/register', createUser);
router.post('/login',loginUser);
router.get('/all-user',getallUsers);
router.get('/:id',ceckingTokenFromReq,isAdmin,getaUser);
router.put('/update-profile',ceckingTokenFromReq,UpdateUser);
router.delete('/:id',deleteUser);
router.put("/block-user/:id", ceckingTokenFromReq, isAdmin, blockUser);
router.put("/unblock-user/:id", ceckingTokenFromReq, isAdmin, unblockUser);
router.get("/refersh",creatingAuthKeyByRefreshKey );
router.get("/logout", )
module.exports = router;