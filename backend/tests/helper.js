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

const getToken = (user) => {
  const userForToken = {
    username: user.username,
    id: user._id,
  };

  return jwt.sign(userForToken, process.env.JWT_SECRET);
};

// initial tickets array
const initialTickets = [
  {},
];

module.exports = {
  ticketsInDb,
  usersInDb,
  getToken,
  initialTickets,
};
