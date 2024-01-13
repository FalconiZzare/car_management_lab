const { validationResult } = require("express-validator");
const { executeQuery, removeUploadedImages } = require("../utils/utils");
const fs = require("fs");

exports.addMake = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, success: false });
  }

  const { make } = req.body;

  try {
    const makeFound = await executeQuery(`
        SELECT make
        FROM makes
        WHERE make = '${make}'
    `);

    if (makeFound?.length > 0) {
      return res.status(400).json({
        message: "This make already exists!",
        success: false
      });
    }

    await executeQuery(`
        INSERT INTO makes (make)
        VALUES ('${make}')
    `);

    res.status(200).json({
      message: "Make added successfully!",
      success: true
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error!");
  }
};

exports.getMakes = async (req, res) => {
  try {
    const makes = await executeQuery(`
        SELECT *
        FROM makes
        ORDER BY make
    `);

    res.status(200).json({
      message: "Get make list success!",
      success: true,
      data: makes
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error!");
  }
};

exports.getModels = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, success: false });
  }

  const { makeId } = req.body;

  try {
    const models = await executeQuery(`
        SELECT DISTINCT model
        FROM cars
        WHERE makeId = '${makeId}'
        ORDER BY model
    `);

    res.status(200).json({
      message: "Get model list success!",
      success: true,
      data: models
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error!");
  }
};

exports.addCar = async (req, res) => {
  const errors = validationResult(req);
  let imagesArray = req.files;
  if (!errors.isEmpty()) {
    removeUploadedImages(imagesArray);
    return res.status(400).json({ message: errors.array()[0].msg, success: false });
  }

  const { makeId, model, rent, state } = req.body;

  try {
    const carFound = await executeQuery(`
        SELECT *
        FROM cars
        WHERE makeId = '${makeId}'
          AND model = '${model}'
    `);

    if (carFound?.length > 0) {
      return res.status(400).json({
        message: "This car already exists!",
        success: false
      });
    }

    await executeQuery(`
        INSERT INTO cars (makeId, model, rent, photo${state !== '' ? ', ' + 'state' : ''})
        VALUES ('${makeId}', '${model}', '${rent}', '${imagesArray[0].filename}'${state !== '' ? ', ' + state : ''})
    `);
    return res.status(200).json({
      message: "Car enlisted successfully!",
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error!");
  }
};

exports.getCar = async (req, res) => {
  const { id } = req.params;

  try {
    const car = await executeQuery(`
        SELECT cars.id AS 'Car ID', makes.make, cars.model, cars.rent, cars.photo, cars.state
        FROM cars
        LEFT OUTER JOIN makes ON (cars.makeId = makes.id)
        WHERE cars.id = ${id}
    `);

    if (car?.length === 0) {
      return res.status(400).json({
        message: "No car entry found!",
        success: false
      });
    }

    return res.status(200).json({
      message: "Get car success!",
      success: true,
      data: car[0]
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error!");
  }
};

exports.getCars = async (req, res) => {
  const { search, make, model } = req.body;

  try {
    const cars = await executeQuery(`
        SELECT c.id, c.makeId, c.model, c.rent, c.photo, c.state, c.isRented, m.make
        FROM cars c
        LEFT OUTER JOIN makes m ON c.makeId = m.id
        WHERE (m.make LIKE '%${search}%' OR c.model LIKE '%${search}%')
          AND (m.make = '${make}' OR '${make}' = '')
          AND (c.model = '${model}' OR '${model}' = '');
    `);

    return res.status(200).json({
      message: "Get car success!",
      success: true,
      data: cars
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error!");
  }
};

exports.deleteCar = async (req, res) => {
  const { id } = req.params;

  try {
    const car = await executeQuery(`
        SELECT *
        FROM cars
        WHERE id = '${id}'
    `);

    if (car?.length === 0) {
      return res.status(400).json({
        message: "No car entry found!",
        success: false
      });
    }

    await executeQuery(`
        DELETE
        FROM cars
        WHERE id = '${id}'
    `);

    fs.unlink(`images/${car[0].photo}`, (err) => {
      if (err) {
        console.log(err);
        return null;
      }
    });

    return res.status(200).json({
      message: "Car deleted successfully!",
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error!");
  }
};
