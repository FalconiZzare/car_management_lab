const { validationResult } = require("express-validator");
const { executeQuery, removeUploadedImages } = require("../utils/utils");

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

exports.addCar = async (req, res) => {
  const errors = validationResult(req);
  let imagesArray = req.files;
  if (!errors.isEmpty()) {
    removeUploadedImages(imagesArray);
    return res.status(400).json({ message: errors.array()[0].msg, success: false });
  }

  const { makeId, model, rent } = req.body;

  try {
    const modelFound = await executeQuery(`
        SELECT model
        FROM cars
        WHERE model = '${model}'
    `);

    if (modelFound?.length > 0) {
      return res.status(400).json({
        message: "A car already exists with this model!",
        success: false
      });
    }

    await executeQuery(`
        INSERT INTO cars (makeId, model, rent, photo)
        VALUES ('${makeId}', '${model}', '${rent}', '${imagesArray[0].filename}')
    `);
    return res.status(200).json({
      message: "Car added successfully!",
      success: true
    });
  } catch (error) {
    console.log(error);
  }
};
