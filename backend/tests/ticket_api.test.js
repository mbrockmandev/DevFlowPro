const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./helper");
const app = require("../server");
const api = supertest(app);
const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");

beforeEach(async () => {
  // empty user table
  await User.deleteMany({});

  // empty ticket table
  await Ticket.deleteMany({});
  const ticketObjects = helper.initialTickets.map((t) => new Ticket(t));
  const promiseArray = ticketObjects.map((t) => t.save());
  await Promise.all(promiseArray);
});
