const jwt = require("jsonwebtoken");
const secrete_key = process.env.JWT_SECRETE_KEY;
function setUser(id , user){
  const payload = {
    id,
    ... user,
  }
  return jwt.sign(payload,secrete_key, { expiresIn: "1d" })
}
function getUser(token){
  return jwt.verify( token , secrete_key)
}

module.exports = {
  setUser,
  getUser
}