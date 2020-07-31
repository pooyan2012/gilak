const User = require("../models/user");

//the id parameter after next description: https://www.geeksforgeeks.org/express-js-router-param-function/
exports.userById = (req, res, next, id) => {
  //exec: https://stackoverflow.com/questions/31549857/mongoose-what-does-the-exec-function-do
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    req.profile = user;
    next();
  });
};
