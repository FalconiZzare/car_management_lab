const express = require("express");
const { body } = require("express-validator");
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

// @route   GET api/car/makes
// @desc    GET make list
// @access  Public
router.get("/makes", carControllers.getMakes);

// @route   GET api/car/models
// @desc    GET model list that belongs to a specific make
// @access  Public
router.post(
  "/models",
  [body("makeId", "MakeID can not be empty!").trim().not().isEmpty()],
  carControllers.getModels
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
      body("rent", "Rent can not be empty!").trim().not().isEmpty(),
      body("state").trim()
    ]
  ],
  carControllers.addCar
);

// @route   GET api/car/:id
// @desc    GET Get car details
// @access  Public
router.get("/details/:id", carControllers.getCar);

// @route   POST api/car/cars
// @desc    POST Get cars list
// @access  Public
router.post(
  "/cars",
  [body("search").trim(), body("make").trim(), body("model").trim()],
  carControllers.getCars
);

// @route   DELETE api/car/:id
// @desc    DELETE delete a car
// @access  Private
router.delete("/:id", authMiddleware, carControllers.deleteCar);

module.exports = router;
