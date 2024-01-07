const { validationResult } = require("express-validator");
const { executeQuery } = require("../utils/utils");

exports.addUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, success: false });
  }

  const { fname, lname, username, email, password } = req.body;

  try {
    const userFound = await executeQuery(`
        SELECT username, email
        FROM users
        WHERE username = '${username}'
           OR email = '${email}'
    `);

    if (userFound?.length > 0) {
      return res.status(400).json({
        message: "User already exists with this username or email!",
        success: false,
        data: {}
      });
    }

    await executeQuery(`
        INSERT INTO users (fname, lname, username, password, email, roleId)
        VALUES ('${fname}', '${lname}', '${username}', '${password}', '${email}', 2)
    `);

    res.status(200).json({
      message: "Signed up successfully!",
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

exports.getUser = async (req, res) => {
  try {
    const user = await executeQuery(`
        SELECT users.id, username, email, roleId, roles.role
        FROM users
                 JOIN roles on users.roleId = roles.id
        WHERE users.id = '${req.query.id}'
    `);

    if (user?.length <= 0) {
      return res.status(400).json({
        message: "No user found!",
        success: false,
        data: {}
      });
    }

    return res.status(200).json({
      message: "Get user.",
      success: true,
      data: user[0]
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error!");
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await executeQuery(`
        SELECT users.id, username, email, roleId, roles.role
        FROM users
                 JOIN roles on users.roleId = roles.id
    `);

    return res.status(200).json({
      message: "Get users.",
      success: true,
      data: users
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error!");
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await executeQuery(`
        SELECT *
        FROM users
        WHERE id = '${id}'
    `);

    if (user?.length <= 0) {
      return res.status(400).json({
        message: "No user found!",
        success: false
      });
    }

    await executeQuery(`
        DELETE
        FROM users
        WHERE id = '${id}'
    `);

    return res.status(200).json({
      message: "User deleted!",
      success: true
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error!");
  }
};

exports.updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, success: false });
  }

  const { fname, lname, username, email, password } = req.body;
  const { id } = req.params;

  try {
    const currentUser = await executeQuery(`
        SELECT username, email
        FROM users
        WHERE id = '${id}'
    `);

    if (currentUser[0].username !== username) {
      const usernameFound = await executeQuery(`
          SELECT username, email
          FROM users
          WHERE username = '${username}'
      `);

      if (usernameFound?.length > 0) {
        return res.status(400).json({
          message: "A user already exists with this username",
          success: false
        });
      }
    }

    if (currentUser[0].email !== email) {
      const emailFound = await executeQuery(`
          SELECT username, email
          FROM users
          WHERE email = '${email}'
      `);

      if (emailFound?.length > 0) {
        return res.status(400).json({
          message: "A user already exists with this email",
          success: false
        });
      }
    }

    await executeQuery(`
        UPDATE users
        SET fname    = '${fname}',
            lname    = '${lname}',
            username = '${username}',
            email    = '${email}',
            password = '${password}'
        WHERE id = '${id}'
    `);

    return res.status(200).json({
      message: "User updated!",
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error!");
  }
};

exports.updateUserRole = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, success: false });
  }

  const { id } = req.params;

  try {
    await executeQuery(`
        UPDATE users
        SET roleId = '${req.body.roleId}'
        WHERE id = '${id}'
    `);

    return res.status(200).json({
      message: "User role updated!",
      success: true
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error!");
  }
};
