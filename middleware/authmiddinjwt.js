const User = require('../model/UserModel');
const  asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const ceckingTokenFromReq = asyncHandler(async (req, res, next) => {
  const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - Token not provided' });
      // throw new Error(`The token is invaalid or it might be expired :${error} `)
    }
    if (!token.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token format' });
    }
    const authToken = token.slice(7);
    try{
      const decode = jwt.verify(authToken, process.env.JWT_SECRETE_KEY);
      const user = await User.findById(decode?.id);
      req.user=user;
      next ();
    }
    catch(error){
      throw new Error(`The token is invaalid or it might be expired :${error} `)
    }
})

const isAdmin  = asyncHandler(async (req, res, next) => {
    const {email} = req.user;
    console.log(req.user);
    const adminUser = await User.findOne({email});
    if(adminUser.role != 'Admin'){
        throw new Error(`The actor who is trying to authorise is not the admin`);
    }
    else{
      next();
    }
})
// cosnt isAdmin = async (req, res, next) => {})
module.exports = {
  ceckingTokenFromReq,
  isAdmin
}