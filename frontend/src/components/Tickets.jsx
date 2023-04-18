import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeTickets } from "../reducers/TicketReducer";
import Ticket from "./Ticket";
import { v4 as uuid } from "uuid";
import NewTicketForm from "./NewTicketForm";
import Spinner from "./Spinner";

const Tickets = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const tickets = useSelector((state) => state.tickets);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(initializeTickets(token));
    };
    fetchData();
  }, [token, dispatch]);

  const handleAddBtnClick = (e) => {
    e.preventDefault();
    setShowModal(!showModal);
  };

  if (!tickets) return <Spinner />;

  return (
    <div className="max-h-screen-60">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
        {tickets.map((ticket) => <Ticket key={uuid()} ticket={ticket} />)}
      </div>
      <div className="container-new-ticket">
        <button
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 m-4"
          type="button"
          data-modal-target="new-ticket-modal"
          data-modal-toggle="new-ticket-modal"
          onClick={handleAddBtnClick}
        >
          New Ticket
        </button>
      </div>
      {showModal && <NewTicketForm show={setShowModal} />}
    </div>
  );
};

export default Tickets;
