const express = require("express");
const { body } = require("express-validator");
const rentControllers = require("../controllers/rent.controller");

const router = express.Router();

// @route   POST api/rent/new
// @desc    POST add a rent
// @access  Public
router.post(
  "/new",
  [
    body("userId", "User ID can not be empty!").trim().not().isEmpty(),
    body("carId", "Car ID can not be empty!").trim().not().isEmpty()
  ],
  rentControllers.addRent
);

// @route   DELETE api/rent/:id
// @desc    DELETE delete a rent
// @access  Public
router.delete("/:id", rentControllers.deleteRent);

// @route   GET api/rent/list/:id
// @desc    GET rent list
// @access  Public
router.get("/list/:id", rentControllers.getRentList);

module.exports = router;
