const express = require("express");
const bodyparser = require("body-parser");
const http = require("http");
const multer = require("multer");

//ROUTE IMPORTS
const authRoutes = require("./routes/auth");
const carRoutes = require("./routes/car");

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") +
        "-" +
        file.originalname.replace(/ /g, "_").toLowerCase()
    );
  }
});

app.use(bodyparser.urlencoded({ extended: true }));
app.use(multer({ storage: fileStorage }).array("images", 5));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/car", carRoutes);

const PORT = 5000;

http.createServer(app).listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
