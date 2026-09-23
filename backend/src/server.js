const express = require("express"); //use to create server and API endpoints
const connectDB = require("./config/db"); //use to connect to the database
const cors = require("cors"); //helps frontend communicate with backend without any issues

const dotenv = require("dotenv");

dotenv.config(); //load environment variables from .env file

connectDB(); //connect to the database

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "ResQPlate API is running"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
