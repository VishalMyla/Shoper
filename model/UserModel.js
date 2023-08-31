//  first name , last name , email , password , cart , watchlist , role , address 

const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
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
UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    next(); // If not modified, move on to the next middleware or step
  }
  try {
    // Generate a salt for password hashing
    const salt = await bcrypt.genSalt(10); // You can use async/await here
    
    // Hash the password with the generated salt
    this.password = await bcrypt.hash(this.password, salt);
    
    next(); // Move on to the next middleware or step
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
})
UserSchema.methods.ComapringPassword = async function(enteredPassword){
  return  await bcrypt.compare(enteredPassword, this.password);
     
}
module.exports = mongoose.model("User", UserSchema);
// module.exports = UserSchema;