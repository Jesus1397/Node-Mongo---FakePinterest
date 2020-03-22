const express = require("express");
const { unlink } = require("fs-extra");
const path = require("path");

const Image = require("../models/Image");

const router = express.Router();

router.get("/", async (req, res) => {
  var images = await Image.find();
  res.render("index", {
    images: images
  });
});

router.get("/upload", (req, res) => {
  res.render("upload");
});

router.post("/upload", async (req, res) => {
  const image = new Image();
  image.title = req.body.title;
  image.description = req.body.description;
  image.filename = req.file.filename;
  image.path = "/img/uploads/" + req.file.filename;
  image.originalname = req.file.originalname;
  image.mimetype = req.file.mimetype;
  image.size = req.file.size;

  await image.save();

  res.redirect("/upload");
});

router.get("/image/:id", async (req, res) => {
  var image = await Image.findById(req.params.id);
  res.render("profile", {
    image: image
  });
});

router.get("/image/:id/delete", async (req, res) => {
  var imgDel = await Image.findByIdAndDelete(req.params.id);
  await unlink(path.resolve("./src/public/" + imgDel.path));
  res.redirect("/");
});

module.exports = router;
