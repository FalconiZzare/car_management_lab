const { validationResult } = require("express-validator");
const { executeQuery } = require("../utils/utils");
const { format } = require("date-fns");

exports.addRent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, success: false });
  }

  const { userId, carId } = req.body;
  const timeNow = format(new Date(), "yyyy-MM-dd");

  try {
    const isRented = await executeQuery(`
        SELECT *
        FROM cars
        WHERE cars.id = '${carId}'
          AND cars.isRented = true
    `);

    const car = await executeQuery(`
        SELECT *
        FROM cars
        WHERE cars.id = '${carId}'
    `);

    if (isRented?.length > 0) {
      return res.status(400).json({
        message: "This car is not available for rent!",
        success: false
      });
    }

    if (car?.length === 0) {
      return res.status(400).json({
        message: "This car does not exist!",
        success: false
      });
    }

    await executeQuery(`
        UPDATE cars
        SET isRented = true
        WHERE id = '${carId}'
    `);

    await executeQuery(`
        INSERT INTO rents (userId, carId, rentDate)
        VALUES ('${userId}', '${carId}', '${timeNow}')
    `);

    res.status(200).json({
      message: "Car rented successfully!",
      success: true
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error!");
  }
};

exports.deleteRent = async (req, res) => {
  const { id } = req.params;

  try {
    const rentFound = await executeQuery(`
        SELECT *
        FROM rents
        WHERE id = '${id}'
    `);

    if (rentFound?.length === 0) {
      return res.status(400).json({
        message: "No rent available!",
        success: false
      });
    }

    await executeQuery(`
        UPDATE cars
        SET isRented = false
        WHERE cars.id = (
            SELECT carId
            FROM rents
            WHERE rents.id = '${id}'
        ) 
    `);

    await executeQuery(`
        DELETE
        FROM rents
        WHERE id = '${id}'
    `);

    res.status(200).json({
      message: "Car returned successfully!",
      success: true
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error!");
  }
};

exports.getRentList = async (req, res) => {
  const { id } = req.params;

  try {
    const list = await executeQuery(`
        SELECT rents.id, makes.make, cars.model, rents.rentDate
        FROM rents
        LEFT OUTER JOIN cars ON rents.carId = cars.id
        LEFT OUTER JOIN makes ON cars.makeId = makes.id
        WHERE rents.userId = '${id}'
        ORDER BY rentDate
    `);

    res.status(200).json({
      message: "Get list success!",
      success: true,
      data: list
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error!");
  }
};
