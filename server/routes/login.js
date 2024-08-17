const express = require("express");
const pool = require("../db");
const jwtGenerator = require("../utils/jwtGenerator");
const bcrypt = require("bcrypt");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (!user.rows.length) {
      return res.status(401).send("Password or Email is incorrect!");
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwtGenerator(user.rows[0].user_id);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = loginUser;
