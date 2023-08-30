//  first name , last name , email , password , cart , watchlist , role , address 

const mongoose = require('mongoose')

var UserSchema = new mongoose.Schema(
  {
    firstname:{
        
        type : String,
        required : true,

    },
    lastname:{
        
      type : String,
      required : true,

    },
    email:{
      type : String,
      required : true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile:{
      type:String,
      required:true,
    },
    // cart: {
    //     type: Array,
    //     default: []
    // },
    address: {
      type: String,
    },
    role :{
      type:String,
      enum: ["Admin", "User"],
      required: true
    }
  }
)
module.exports = mongoose.model("User", UserSchema);
// module.exports = UserSchema;