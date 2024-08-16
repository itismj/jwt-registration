const router = require("express").Router();
const registerUser = require("./register");
const loginUser = require("./login");
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;
