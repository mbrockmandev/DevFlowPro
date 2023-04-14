const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Type.ObjectId,
    required: true,
    ref: 'User',
  },
  issue: {
    type: String,
    required: true,
    enum: ['Epic', 'Bug', 'Story', 'Task', 'Subtask'], // pulled from Jira issue types -- could extend this functionality?
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
  },
  status: {
    type: String,
    enum: ['new', 'open', 'closed'],
    default: 'new',
  },
});

module.exports = mongoose.model('Ticket', ticketSchema);
