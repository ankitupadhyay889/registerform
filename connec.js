var mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/register-page", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connection success"))
  .catch((e) => console.log("NO Connection"));
