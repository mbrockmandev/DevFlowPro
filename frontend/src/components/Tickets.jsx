import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeTickets } from "../reducers/TicketReducer";
import Ticket from "./Ticket";
import { v4 as uuid } from "uuid";

const Tickets = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const tickets = useSelector((state) => state.tickets);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(initializeTickets(token));
    };
    fetchData();
  }, [dispatch]);

  if (!tickets) return null;

  return (
    <div>
      {tickets.map((ticket) => (
        <Ticket key={uuid()} ticket={ticket} />
      ))}
    </div>
  );
};

export default Tickets;
