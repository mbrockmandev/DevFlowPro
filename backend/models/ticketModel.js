const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  issue: {
    type: String,
    required: true,
    enum: ["Epic", "Bug", "Story", "Task", "Subtask"], // pulled from Jira issue types -- could extend this functionality?
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
  },
  status: {
    type: String,
    enum: ["New", "Open", "Closed"],
    default: "New",
  },
});

ticketSchema.set("toJSON", {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Ticket", ticketSchema);
