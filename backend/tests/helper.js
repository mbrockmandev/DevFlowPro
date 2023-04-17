const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const ticketsInDb = async () => {
  const tickets = await Ticket.find({});
  return tickets.map((t) => t.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

// get token
//
// initial tickets array
//

module.exports = {
  ticketsInDb,
  usersInDb,
};
