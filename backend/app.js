const express = require("express");
const cors = require("cors");
const userRoutes = require("../backend/routes/users");
const expenseRoutes = require("../backend/routes/Expense");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoutes);
app.use(expenseRoutes);
app.listen(process.env.PORT, () => {
  console.log("server is running");
});
