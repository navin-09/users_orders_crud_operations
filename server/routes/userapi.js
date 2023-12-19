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
// Retrieve a single user by their ID along with their orders.
router.get("/getUserOrder/:id", async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  try {
    const result = await pool.query("select * from orders where userid = $1", [
      id,
    ]);
    res.status(201).json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});
// Retrieve a list of all users with their associated orders.
router.get("/getUserOrder/:id", async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  try {
    const res1 = {};
    const result = await pool.query("select id,username from users");
    for (let index = 0; index < result.length; index++) {
      const id = array[index].id;
      const result = await pool.query(
        "select * from orders where userid = $1",
        [id]
      );
      console.log({ result });
      res1["username"] = username;
      res1["orders"] = result.rows;
    }
    console.log(res1);
    res.status(201).json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
