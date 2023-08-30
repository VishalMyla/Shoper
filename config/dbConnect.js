const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    const conn = mongoose.connect(process.env.MONGODB_URL);
    console.log("Database Connected Successfully yep!!");
  } catch (error) {
    console.log("DAtabase error");
  }
};
module.exports = dbConnect;