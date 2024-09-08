const express = require("express");
const { signup } = require("../controllers/authController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});
router.post("/signup", signup);

module.exports = router;
