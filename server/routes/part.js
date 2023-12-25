const express = require("express");
const { body } = require("express-validator");
const partControllers = require("../controllers/part.controller");

const router = express.Router();

// @route   POST api/part/new
// @desc    POST add a part
// @access  Public
router.post(
  "/new",
  [
    body("makeId", "Make ID can not be empty!").trim().not().isEmpty(),
    body("model", "Model can not be empty!").trim().not().isEmpty(),
    body("name", "Name can not be empty!").trim().not().isEmpty(),
    body("price", "Price can not be empty!").trim().not().isEmpty()
  ],
  partControllers.addPart
);

// @route   GET api/part/:id
// @desc    GET ge part list of a car
// @access  Public
router.get("/:id", partControllers.getParts);

module.exports = router;
