import React from "react";

const Ticket = ({ ticket }) => {
  return (
    <div>
      <p>Issue: {ticket.issue}</p>
      <p>Description: {ticket.description}</p>
    </div>
  );
};

export default Ticket;
