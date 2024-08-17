const express = require("express");
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");

const registerUser = async (req, res) => {
  try {
    const { user_name, email, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length) {
      return res.status(401).send("User already exists!");
    }

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (user_name, email, password) VALUES($1, $2, $3) RETURNING *",
      [user_name, email, encryptedPassword]
    );

    const token = jwtGenerator(newUser.rows[0].user_id);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = registerUser;
