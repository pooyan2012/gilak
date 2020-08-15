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

exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.jason(req.profile);
};

exports.update = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.body._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to preform this action",
        });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      res.json(user);
    }
  );
};
