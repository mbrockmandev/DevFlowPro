import { useState } from "react";
import EditTicketForm from "./EditTicketForm";

const Ticket = ({ ticket }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();

    setShowEditModal(!showEditModal);
    console.log("need to pass ticket", ticket);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mx-4">
      <h2 className="text-xl font-medium mb-4">Issue: {ticket.issue}</h2>
      <p className="text-gray-600 mb-4">Description: {ticket.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Status: {ticket.status}</span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleClick}
        >
          Edit
        </button>
      </div>
      {showEditModal && <EditTicketForm ticket={ticket} setShowEditModal={setShowEditModal}/>}
    </div>
  );
};

export default Ticket;
