const router = require("express").Router();

router.get('/' , (req,res) =>{
  res.status(200).json({
    message:"auth route"
  })
})

module.exports = {
  authRouter: router,
};
