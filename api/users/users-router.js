const express = require('express');
const {
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware")
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const Users = require('./users-model')
const router = express.Router();
const Post = require('../posts/posts-model')
router.get('/', async (req, res, next) => {
  try {
    const users = await Users.get()
    res.status(200).json(users)
  }
  catch (err) {
    next(err)
  }
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  try{
    res.status(200).json(req.user)
  }
  catch{
//
  }
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert(req.body)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(
//
  )
});

router.put('/:id', validateUser, validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update(req.params.id, req.body)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(next);
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  try {
    await Users.remove(req.params.id)
    res.status(200).json(req.user)
  }
  catch (err) {
    next(err)
  }
});

router.get('/:id/posts', validateUserId,(req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Users.getUserPosts(req.params.id)
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(next);
});

router.post('/:id/posts', validateUserId, validatePost,(req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const {id} = req.params
  const postInfo = { ...req.body, user_id: id };
  Post.insert(postInfo)
    .then(posts => {
      res.status(201).json(posts)
    })
    .catch(next );
});

// do not forget to export the router
module.exports = router