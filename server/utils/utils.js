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

module.exports = { executeQuery };
