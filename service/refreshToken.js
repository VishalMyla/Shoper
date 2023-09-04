const jwt = require("jsonwebtoken");
const secrete_key = process.env.REFRESH_SECRETE_KEY;
function genereateRefreshKey  (id , user) {
  const payload = {
    id,
    ... user,
  }
  return jwt.sign(payload,secrete_key, { expiresIn: "3d" })
}
module.exports ={
  genereateRefreshKey
}
// function setUser(id , user){
//   const payload = {
//     id,
//     ... user,
//   }
//   return jwt.sign(payload,secrete_key, { expiresIn: "1d" })
// }
// function getUser(token){
//   return jwt.verify( token , secrete_key)
// }

// module.exports = {
//   setUser,
//   getUser
// }