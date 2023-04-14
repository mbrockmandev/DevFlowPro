const express = require('express');

const router = express.Router();
const {
  getAllTickets,
  getTicketById,
  createTicket,
  changeTicket,
  deleteTicket,
} = require('../controllers/ticketController');

const { protect } = require('../middleware/authMiddleware');

// consider having unprotected route for all tickets?
router.route('/').get(protect, getAllTickets).post(protect, createTicket);

router
  .route('/:id')
  .get(protect, getTicketById)
  .put(protect, changeTicket)
  .delete(protect, deleteTicket);

module.exports = router;
