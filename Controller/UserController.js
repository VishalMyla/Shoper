const { model } = require('mongoose');
const User = require('../model/UserModel');
const  asyncHandler = require("express-async-handler");
const {setUser} = require('../service/token');

const createUser = asyncHandler(async (req, res) => {
 
  const email = req.body.email;
 
  const findUser = await User.findOne({ email: email });

  if (!findUser) {
    
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    
    throw new Error("User Already Exists");
  }
});
const loginUser = asyncHandler(async (req, res) => {
    const {email, password } =req.body;
    console.log(email , password);
    
    const findUser = await User.findOne({ email: email });
    if (findUser) {
        if(await findUser.ComapringPassword(password)){
           const token = setUser(findUser?._id,findUser );
           res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: token,
           })
           res.cookie("uid" , token);
        }
        else {
          throw new Error("Invalid Credentials");
        }
    } else {    
      throw new Error("User not Exists , First sign up");
    }

})

//  get all user 

const getallUsers  =  asyncHandler(async (req, res) => {
 
  try{
    const getuser = await User.find();
    
    res.send(getuser);
  }
  catch(error){
      throw new Error(`Users are not fetched ${error}`)
  }
})
module.exports = {
  createUser,
  loginUser,
  getallUsers
}