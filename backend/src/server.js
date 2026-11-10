const express = require("express"); //use to create server and API endpoints
const mongoose = require("mongoose"); //used to close the database connection on shutdown
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

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown: when Docker stops the container it sends SIGTERM.
// Stop accepting new requests, finish current ones, close MongoDB, then exit with code 0.
const shutdown = (signal) => {
  console.log(`${signal} received, shutting down gracefully...`);

  server.close(async () => {
    await mongoose.connection.close();
    console.log("HTTP server and MongoDB connection closed");
    process.exit(0);
  });

  // Safety net: if shutdown takes longer than 8 seconds, force exit
  setTimeout(() => {
    console.error("Shutdown took too long, forcing exit");
    process.exit(1);
  }, 8000).unref();
};

process.on("SIGTERM", () => shutdown("SIGTERM")); // sent by docker stop
process.on("SIGINT", () => shutdown("SIGINT"));   // sent by Ctrl + C
