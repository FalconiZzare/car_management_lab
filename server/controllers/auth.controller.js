const { validationResult } = require("express-validator");
const { executeQuery } = require("../utils/utils");

exports.addUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, success: false });
  }

  const { username, email, password, role } = req.body;

  try {
    const userFound = await executeQuery(`
        SELECT username
        FROM users
        WHERE username = '${username}'
           OR email = '${email}'
    `);

    if (userFound?.length > 0) {
      return res.status(400).json({
        message: "A user already exists with this username/email!",
        success: false,
        data: {}
      });
    }

    await executeQuery(`
        INSERT INTO users (username, password, email, role)
        VALUES ('${username}', '${password}', '${email}', '${role}')
    `);

    res.status(200).json({
      message: "User created successfully!",
      success: true
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error!");
  }
};

exports.postLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, success: false });
  }

  const { username, password } = req.body;

  try {
    const user = await executeQuery(`
        SELECT *
        FROM users
        WHERE username = '${username}'
    `);

    if (user?.length <= 0) {
      return res.status(400).json({
        message: "No user found with that username!",
        success: false,
        data: {}
      });
    }

    if (user[0].password === password) {
      delete user[0].password;

      return res.status(200).json({
        message: "Login successful!",
        success: true,
        data: user[0]
      });
    } else {
      return res.status(400).json({
        message: "Invalid password!",
        success: false,
        data: {}
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error!");
  }
};