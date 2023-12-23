const mysql = require("mysql2");
const config = require("../config/config");
const fs = require("fs");

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

const removeUploadedImages = (imagesArray) => {
  if (imagesArray) {
    for (const image of imagesArray) {
      if (image) {
        fs.unlink(`images/${image.filename}`, (err) => {
          if (err) console.log("No image found");
          console.log(image.filename + " was deleted");
        });
      }
    }
  }
};

module.exports = { executeQuery, removeUploadedImages };
