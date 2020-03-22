//-----Requires-----//
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const multer = require("multer");
const uuid = require("uuid/v4");
const {format} = require("timeago.js");

//-----Initialization-----//
const app = express();
require("./database");

//-----Settings-----//
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//-----Middlewares-----//
// app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//***Obtengo la imagen , genero un id , y le agrego la ext para guardar la imagen
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/img/uploads"),
  filename: (req, file, cb, filename) => {
    cb(null, uuid() + path.extname(file.originalname));
  }
});
app.use(multer({ storage: storage }).single("image"));

//-----Global variables-----//
app.use((req, res, next) => {
  app.locals.format = format;
  next();
});

//-----Routes-----//
app.use(require("./routes/"));

//-----Static Folder-----//
app.use(express.static(path.join(__dirname, "public")));

//-----Server-----//
app.listen(3000, () => {
  console.log("Server started: http://localhost:3000");
});
