const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const pool = require("./db");
const userRouter = require("./routes/userapi");
const ordersRouter = require("./routes/ordersapi");
app.use(bodyParser.json());
app.use("/", userRouter, ordersRouter);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
