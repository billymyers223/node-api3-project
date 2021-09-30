const User = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC

  console.log(`${Date().toLocaleString()} ${req.method} ${req.OriginalUrl}`);
  next();
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try{
    const user = await User.getById(req.params.id)
    if(!user){
      res.status(404).json({
        message:"No such user",
      })
    } else{
      req.user = user
      next()
    }
  }
  catch (err){
//later
  }
  next();
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  console.log(validateUser);
  next();
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  console.log(validatePost);
  next();
}

// do not forget to expose these functions to other modules

module.exports ={
  logger,
  validateUser,
  validateUserId,
  validatePost
}