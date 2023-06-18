const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.json());

// cors
const options = {
  origin: "http://localhost:3000",
  useSuccessStatus: 200,
};
app.use(cors(options));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to FacebookWD");
});

readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

// Database
mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  .then(() => console.log("Mongodb Connected Successfully"))
  .catch((err) => console.log("Error Connecting to Mongodb", err));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
