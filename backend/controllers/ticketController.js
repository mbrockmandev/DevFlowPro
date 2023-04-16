const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

// Get User Tickets
// GET /api/tickets
// Private
const getAllTickets = asyncHandler(async (req, res) => {
  // get current ID with JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found.");
  }

  // filter all tickets by user -- need to update for admins
  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json(tickets);
});

// Get Ticket by ID
// GET /api/tickets/:id
// Private
const getTicketById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found!");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(401);
    throw new Error("Ticket Not Found!");
  }

  // not allowed to get others' tickets
  if (ticket.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Unauthorized access!");
  }
});

// Create/Submit New Ticket
// POST /api/tickets
// Private
const createTicket = asyncHandler(async (req, res) => {
  const { issue, description } = req.body;
  // console.log("backend: ", issue, description);

  if (!issue || !description) {
    res.status(400);
    throw new Error("Please include an issue and its description.");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found.");
  }

  const ticket = await Ticket.create({
    issue,
    description,
    user: req.user.id,
    status: "new",
  });

  res.status(201).json(ticket);
});

// Change Ticket by ID
// PUT /api/tickets/:id
// Private
const changeTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(401);
    throw new Error("Ticket Not Found!");
  }

  // prevent other users as above
  if (ticket.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Unauthorized Access!");
  }

  try {
    const newTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(newTicket);
  } catch (error) {
    res.status(400);
    throw new Error(
      `Unable to update item with ID: ${req.params.id}. Please double check ${req.body} for errors.`
    );
  }
});

// Delete Ticket by ID
// DELETE /api/tickets/:id
// Private
const deleteTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(401);
    throw new Error("Ticket not found!");
  }

  // User who is not the owner is attempting to delete
  // Disallowed for now -- will also look for isAdmin flag later
  if (ticket.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not Authorized.");
  }

  await Ticket.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: `Ticket with ID ${req.params.id} deleted.`,
  });
});

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  changeTicket,
  deleteTicket,
};
