const { model } = require('mongoose');
const User = require('../model/UserModel');
const  asyncHandler = require("express-async-handler");
const {setUser} = require('../service/token');
const {genereateRefreshKey} = require("../service/refreshToken");


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
          const refreshToken = genereateRefreshKey(findUser?._id,findUser );

          const updateuser = await User.findByIdAndUpdate(
            findUser.id,
            {
              refreshToken: refreshToken,
            },
            { new: true }
          );
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
          });
           const Authtoken = setUser(findUser?._id,findUser );
           res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            Authtoken: Authtoken,
            refreshToken:refreshToken,
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
      throw new Error(`Users are not fetched for :${error}`)
  }
})

const getaUser =  asyncHandler(async (req, res) => {
  const {id } = req.params;
  validateMongoDbId(_id);
  try{
    const findUser = await User.findOne({ _id:id });
    if(findUser){
      res.json({
        _id: findUser?._id,
        firstname: findUser?.firstname,
        lastname: findUser?.lastname,
        email: findUser?.email,
        mobile: findUser?.mobile,
       })
    }
    else{
      res.json({
        msg:"User with this ID Dosen't exist"
      })
    }
  }
  catch(error){
    throw new Error(`User can not be fetched for : ${error}`)
}
  
})
//  delete a User 

const deleteUser = asyncHandler(async (req, res) => {
  const {id } = req.params;
  validateMongoDbId(_id);
  try{
    const deleteUser = await User.findByIdAndDelete(id);
    res.json({
      deleteUser,
      msg: "User now is deleted check once in the terminal"
    })

  }
  catch(error){
    throw new Error(`User can not be deleted for : ${error}`)
  }
})


const UpdateUser = asyncHandler(async (req, res) => {
  const {_id } = req.user;

  validateMongoDbId(_id);

  try{
    const UpdateUser = await User.findByIdAndUpdate(_id , 
      {
      firstname : req?.body?.firstname,
      lastname : req?.body?.lastname,
      email: req?.body?.email,
      mobile: req?.body?.mobile,

    }, {
      next:true,
    });
    res.json({
      UpdateUser
    })

  }
  catch(error){
    throw new Error(`User can not be Updated for : ${error}`)
  }
})


const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const blockusr = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json(blockusr);
  } catch (error) {
    throw new Error(error);
  }
});

const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User is now UnBlocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});


const creatingAuthKeyByRefreshKey = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error(" No Refresh token present in db or not matched");
  jwt.verify(refreshToken, process.env.REFRESH_SECRETE_KEY, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const Authtoken = setUser(user?._id,user );
    res.json({ Authtoken });
  });
  
})


const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204).json({
      msg : "User with this refresh Token dosen't exits"
    }); // forbidden
  }
  await User.findOneAndUpdate(refreshToken, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); // forbidden
})


module.exports = {
  createUser,
  loginUser,
  getallUsers,
  getaUser,
  UpdateUser,
  deleteUser,
  blockUser,
  unblockUser,
  creatingAuthKeyByRefreshKey,
  logout

}