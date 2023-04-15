const swaggerUI = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const express = require("express");
const router = express.Router();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Dev Flow Pro API",
      version: "0.0.1",
    },
  },
  apis: ["./routes/userRoutes.js", "./routes/ticketRoutes.js"],
};

const specs = swaggerJsdoc(options);
router.use("/", swaggerUI.serve);
router.get("/", swaggerUI.setup(specs));

module.exports = router;
