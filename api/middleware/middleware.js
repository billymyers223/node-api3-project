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
      next({status: 404, message: "user not found" })
    } else{
      req.user = user
      next()
    }
  }
  catch (err){
//later
    next(err)
  }

}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const {name} = req.body
  if (!name || typeof name !== 'string' || !name.trim()) {
    next({ status: 400, message: "missing required name field"})
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const {text} = req.body
  if(!text || typeof text !== 'string' || !text.trim()) {
    next({ status: 400, message: "missing required text field"})
  } else {
    next()
  }
}

// do not forget to expose these functions to other modules

module.exports ={
  logger,
  validateUser,
  validateUserId,
  validatePost
}