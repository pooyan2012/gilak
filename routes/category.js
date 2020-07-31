const express = require("express");
const router = express.Router();

const { create } = require("../controllers/category");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);

router.param("userId", userById); //:userId is the parameter from above router\|/more: https://www.geeksforgeeks.org/express-js-router-param-function/

module.exports = router;
