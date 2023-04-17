/// ************SERVER.JS****************
/// express app using mongodb for storage
/// for development purposes, mongodb is in local docker image
/// *************************************
const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT || 8000;
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDb = require("./config/db");

// DB setup
connectDb();
const app = express();

// built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/users/", require("./routes/userRoutes"));
app.use("/api/tickets/", require("./routes/ticketRoutes"));
app.use("/api/help/", require("./swagger"));

// middleware
app.use(errorHandler);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

// start server
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
