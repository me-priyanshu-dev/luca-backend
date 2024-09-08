const express = require("express");
const connectDB = require("./config/db");
const router = require("./routes/authRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(express.json());
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is at http://localhost:${PORT}`);
});
