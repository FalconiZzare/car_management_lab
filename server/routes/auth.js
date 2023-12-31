const express = require("express");
const { body } = require("express-validator");
const authControllers = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// @route   POST api/auth/signup
// @desc    POST create a user
// @access  Public
router.post(
  "/signup",
  [
    body("fname", "First Name can not be empty!").trim().not().isEmpty(),
    body("lname", "Last Name can not be empty!").trim().not().isEmpty(),
    body("email", "Enter a valid email!").trim().isEmail(),
    body("username", "Username can not be empty!").trim().not().isEmpty(),
    body("password", "Password must contain 6 or more characters.").trim().isLength({
      min: 6
    })
  ],
  authControllers.addUser
);

//@route    POST api/auth/login
//desc      POST login
//@access   Public
router.post(
  "/login",
  [
    body("username", "Username can not be empty!").trim().not().isEmpty(),
    body("password", "Password can not be empty!").trim().not().isEmpty()
  ],
  authControllers.postLogin
);

//@route    GET api/auth/user
//desc      GET user
//@access   Public
router.get("/user", authControllers.getUser);

//@route    GET api/auth/users
//desc      GET users
//@access   Private
router.get("/users", authMiddleware, authControllers.getUsers);

//@route    DELETE api/auth/user/:id
//desc      DELETE user
//@access   Private
router.delete("/user/:id", authMiddleware, authControllers.deleteUser);

//@route    PUT api/auth/user/:id
//desc      PUT user
//@access   Public
router.put(
  "/user/:id",
  [
    body("email", "Enter a valid email!").trim().isEmail(),
    body("fname", "First Name can not be empty!").trim().not().isEmpty(),
    body("lname", "Last Name can not be empty!").trim().not().isEmpty(),
    body("username", "Username can not be empty!").trim().not().isEmpty(),
    body("password").custom((value) => {
      if (value && value.length < 6) {
        throw new Error("Password must contain 6 or more characters.");
      }
      return true;
    })
  ],
  authControllers.updateUser
);

//@route    PUT api/auth/user/update-role/:id
//desc      PUT user role
//@access   Private
router.put(
  "/user/update-role/:id",
  [authMiddleware, [body("roleId", "Role ID can not be empty!").trim().not().isEmpty()]],
  authControllers.updateUserRole
);

module.exports = router;
