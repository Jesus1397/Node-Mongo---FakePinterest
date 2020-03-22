const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/pinterest", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(db => {
    console.log("DB Connected");
  })
  .catch(error => {
    console.log("Error: " + error);
  });
