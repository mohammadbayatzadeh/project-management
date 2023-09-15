const router = require("express").Router();

router.get('/' , (req,res) =>{
  res.status(200).json({
    message:"project route"
  })
})


module.exports = {
  projectRouter: router,
};
