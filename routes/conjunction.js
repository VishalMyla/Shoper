const express = require("express");
const router = express.Router();

const user_routes = require('./user_routes');
router.use('/api/user',user_routes);

router.get('/api', function(req, res){
  res.send('Hello World  from the jam in the routes');
})

router.get('/', function(req, res) {
  console.log('working'); 
    res.status(200).json({
        message:'working fine from the jam in the routes ',

    })
})

module.exports = router;