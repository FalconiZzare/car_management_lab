const mysql = require("mysql2");
const config = require("../config/config");

const pool = mysql.createPool(config);

const executeQuery = async (query, params) => {
  try {
    const [rows, fields] = await pool.promise().execute(query, params);
    return rows;
  } catch (err) {
    console.log("Error executing query: ", err);
    return null;
  }
};

const adminChecker = async (id) => {
  const user = await executeQuery(`
    SELECT roleId
    FROM users
    WHERE id = '${id}'
  `);

  if (user?.length <= 0) {
    return null;
  }

  return user[0].roleId;
};

module.exports = { executeQuery, adminChecker };
