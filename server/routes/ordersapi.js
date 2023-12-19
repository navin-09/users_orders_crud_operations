const express = require("express");
const pool = require("../db");
const router = express.Router();
// Create a new order for a specific user.
router.post("/createOrder", async (req, res) => {
  const { userid, totalamount } = req.body;
  console.log({ userid, totalamount });
  try {
    const result = await pool.query(
      "INSERT INTO orders(userid, totalamount,createdat,updatedat) VALUES ($1,$2,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP) RETURNING *",
      [userid, totalamount]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

// Retrieve all orders for a specific user.
router.get("/getUserOrders/:id", async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  console.log({ id });
  try {
    const result = await pool.query("SELECT * FROM orders where userid = $1", [
      id,
    ]);
    res.status(201).json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

//Retrieve a single order by its ID.
router.get("/getOrder/:id", async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  console.log({ id });
  try {
    const result = await pool.query("SELECT * FROM orders where id = $1", [id]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

// Update an order's total amount by its ID.
router.put("/updateOrder/:id", async (req, res) => {
  const { totalamount } = req.body;
  let { id } = req.params;
  id = parseInt(id);
  console.log({ id });
  try {
    const result = await pool.query(
      "UPDATE orders SET totalamount=$1 WHERE id = $2 RETURNING *",
      [totalamount, id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

// Delete an order by its ID.
router.delete("/deleteOrder/:id", async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  try {
    const result = await pool.query("DELETE FROM orders WHERE id = $1", [id]);
    res.status(201).send("user has been deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
