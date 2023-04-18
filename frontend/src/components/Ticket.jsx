import { useState } from "react";
import EditTicketForm from "./EditTicketForm";

const Ticket = ({ ticket }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setShowEditModal(!showEditModal);
  };

  return (
    <div className="relative bg-white rounded-lg shadow-md p-6 mx-4 max-h-fit">
      <h2 className="text-xl font-medium mb-4">Issue: {ticket.issue}</h2>
      <p className="text-gray-600 mb-4">Description: {ticket.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Status: {ticket.status}</span>
        <button
          className="absolute right-3 bottom-3 px-4 py-2 bg-blue-500 text-white rounded shadow-sm hover:bg-blue-600"
          onClick={handleClick}
        >
          Edit
        </button>
      </div>
      {showEditModal && (
        <EditTicketForm ticket={ticket} setShowEditModal={setShowEditModal} />
      )}
    </div>
  );
};

export default Ticket;
