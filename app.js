const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
//installed 5.3.1 version bcuz of this error => express validator is not a function
const expressValidator = require("express-validator");
require("dotenv").config();
//TEST COMMENT
//import users routes
const userRoutes = require("./routes/user");

//app
const app = express();

//db
mongoose
  .connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Database Connected!"));

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

//routes middleware
app.use("/api", userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
