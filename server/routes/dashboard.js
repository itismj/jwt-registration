const pool = require("../db");
const router = require("express").Router();
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user]
    );
    res.json(user.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
