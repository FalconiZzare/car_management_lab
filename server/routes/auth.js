const express = require('express');
const { body } = require('express-validator');
const authControllers = require('../controllers/auth.controller');

const router = express.Router();

// @route   POST api/auth/signup
// @desc    POST create a user
// @access  Public
router.post(
  '/signup',
  [
    body('email', 'Enter a valid email!').trim().isEmail(),
    body('username', 'Username can not be empty!').trim().not().isEmpty(),
    body('password', 'Password must contain 6 or more characters.').trim().isLength({
      min: 6
    }),
    body('role').trim(),
  ],
  authControllers.addUser
);

// @route   POST api/auth/login
//desc POST login
//@access Public
router.post(
  '/login',
  [
    body('username', 'Username can not be empty!').trim().not().isEmpty(),
    body('password', 'Password can not be empty!').trim().not().isEmpty()
  ],
  authControllers.postLogin
)

module.exports = router;