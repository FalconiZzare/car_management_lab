const { validationResult } = require("express-validator");
const { executeQuery } = require("../utils/utils");

exports.addPart = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, success: false });
  }

  const { makeId, model, name, price } = req.body;

  try {
    const partFound = await executeQuery(`
        SELECT *
        FROM parts
        WHERE makeId = '${makeId}'
          AND model = '${model}'
          AND name = '${name}'
    `);

    if (partFound?.length > 0) {
      return res.status(400).json({
        message: "Part exists!",
        success: false
      });
    }

    await executeQuery(`
    INSERT INTO parts (makeId, model, name, price)
    VALUES ('${makeId}', '${model}', '${name}', '${price}')
    `);

    res.status(200).json({
      message: "Part added successfully!",
      success: true
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error!");
  }
};

exports.getParts = async (req, res) => {
  const { id } = req.params;

  try {
    const parts = await executeQuery(`
        SELECT parts.id, parts.name, parts.price
        FROM parts
        INNER JOIN cars ON parts.makeId = cars.makeId AND parts.model = cars.model
        WHERE cars.id = '${id}';
    `);

    console.log(parts);

    res.status(200).json({
      message: "Get part list success!",
      success: true,
      data: parts
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error!");
  }
};
