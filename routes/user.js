const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

const { userById, read, update } = require("../controllers/user");

router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    User: req.profile,
  });
});
router.get("/user/:userd", requireSignin, isAuth, read);
router.get("/user/:userd", requireSignin, isAuth, update);

router.param("userId", userById);

module.exports = router;
