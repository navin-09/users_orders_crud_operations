const express = require("express");
const pool = require("../db");
const router = express.Router();
// Create a new user.
router.post("/createUser", async (req, res) => {
  const { username, email } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users(username, email,createdat,updatedat) VALUES ($1,$2,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP) RETURNING *",
      [username, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});
// Update a user's information (username or email) by their ID.
router.put("/updateUser/:id", async (req, res) => {
  const { username, email } = req.body;
  let { id } = req.params;
  id = parseInt(id);
  console.log({ id });
  try {
    const result = await pool.query(
      "UPDATE users SET username=$1, email=$2,updatedat=CURRENT_TIMESTAMP WHERE id = $3 RETURNING *",
      [username, email, id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});
// Delete a user by their ID.
router.delete("/deleteUser/:id", async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  try {
    const result = await pool.query(
      "DELETE FROM public.users WHERE id = $1 RETURNING *",
      [id]
    );
    res.status(201).send("user has been deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

router.get("/getUsers", (req, res) => {
  pool.query("select * from users", (err, users) => {
    if (err) {
      res.send(err);
    }
    res.send(users.rows);
  });
});

module.exports = router;
