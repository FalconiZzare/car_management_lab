const express = require("express");
const { body, validationResult } = require("express-validator");
const carControllers = require("../controllers/car.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// @route   POST api/car/add-make
// @desc    POST add a make
// @access  Private
router.post(
  "/add-make",
  [authMiddleware, [body("make", "Make can not be empty!").trim().not().isEmpty()]],
  carControllers.addMake
);

// @route   POST api/car/new
// @desc    POST add a new car
// @access  Private
router.post(
  "/new",
  [
    authMiddleware,
    [
      body("makeId", "Make ID can not be empty!").trim().not().isEmpty(),
      body("model", "Model can not be empty!").trim().not().isEmpty(),
      body("rent", "Rent can not be empty!").trim().not().isEmpty()
    ]
  ],
  carControllers.addCar
);

module.exports = router;
