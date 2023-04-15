const express = require("express");

const router = express.Router();
const {
  getAllTickets,
  getTicketById,
  createTicket,
  changeTicket,
  deleteTicket,
} = require("../controllers/ticketController");

const { protect } = require("../middleware/authMiddleware");

// consider having unprotected route for all tickets?
/**
 * @swagger
 * /tickets:
 *   get:
 *     summary: Get All Tickets
 *     description: Returns All Tickets
 *     responses:
 *       200:
 *         description: A complete list of tickets
 */
router.route("/").get(protect, getAllTickets);

/**
 * @swagger
 * /tickets:
 *   post:
 *     summary: Create a New Ticket
 *     description: Make a new ticket
 *     responses:
 *       200:
 *         description: returns the newly created ticket
 */
router.route("/").post(protect, createTicket);

/**
 * @swagger
 * /tickets/:id:
 *   get:
 *     summary: Get A Ticket By ID
 *     description: Returns Ticket matching ID
 *     responses:
 *       200:
 *         description: returns ticket matching the ID provided
 */
router.route("/:id").get(protect, getTicketById);

/**
 * @swagger
 * /tickets/:id:
 *   put:
 *     summary: updates ticket matching ID
 *     description: updates the ticket matching the provided ID
 *     responses:
 *       200:
 *         description: returns updated ticket with that ID
 */
router.route("/:id").put(protect, changeTicket);

/**
 * @swagger
 * /tickets/:id:
 *   delete:
 *     summary: removes ticket matching that ID
 *     description: removes the ticket
 *     responses:
 *       200:
 *         description: removes the ticket and returns ticket
 */
router.route("/:id").delete(protect, deleteTicket);

module.exports = router;
