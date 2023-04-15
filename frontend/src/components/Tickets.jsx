import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeTickets } from "../reducers/TicketReducer";
import Ticket from "./Ticket";

const Tickets = () => {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(initializeTickets());
    };
    fetchData();
  }, [dispatch]);

  if (!tickets) return null;

  return (
    <div>
      {tickets.map((ticket) => (
        <Ticket ticket={ticket} />
      ))}
    </div>
  );
};

export default Tickets;
