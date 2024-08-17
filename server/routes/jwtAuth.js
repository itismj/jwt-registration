const router = require("express").Router();
const registerUser = require("./register");
const loginUser = require("./login");
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

router.post("/register", validInfo, registerUser);

router.post("/login", validInfo, loginUser);

router.get("/is-verified", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
