const express = require("express");
const mongoose = require("mongoose"); //database
const morgan = require("morgan"); //logging purpose
const bodyParser = require("body-parser"); //for parsing the incoming request bodies in a middleware before you handle it
const cookieParser = require("cookie-parser"); //middleware which parses cookies attached to the client request object
const cors = require("cors");
const expressValidator = require("express-validator"); //installed 5.3.1 version bcuz of this error => express validator is not a function
require("dotenv").config();

//import users routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");

//app
const app = express();

//db
mongoose
  .connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database Connected!"));

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
