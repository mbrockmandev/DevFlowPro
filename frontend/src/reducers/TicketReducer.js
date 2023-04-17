import { createSlice } from "@reduxjs/toolkit";
import {
  createNewTicket,
  getAllTickets,
  removeTicket,
  updateTicket,
} from "../api/tickets";

const ticketSlice = createSlice({
  name: "tickets",
  initialState: [],
  reducers: {
    setTickets(state, action) {
      return action.payload;
    },
    addTicket(state, action) {
      return [...state, action.payload];
    },
    applyChangesToTicket(state, action) {
      const newState = state.map((t) =>
        t._id === action.payload.id ? action.payload : t
      );
      return newState;
    },
    applyDelete(state, action) {
      const newState = state.filter((t) => t.id !== action.payload.id);
      return newState;
    },
  },
});

export const initializeTickets = (token) => {
  return async (dispatch) => {
    const tickets = await getAllTickets(token);
    dispatch(setTickets(tickets));
  };
};

export const makeNewTicket = (content, token) => {
  // console.log("make new ticket func in reducer: ", content, token);
  return async (dispatch) => {
    const newTicket = await createNewTicket(content, token);
    dispatch(addTicket(newTicket));
  };
};

export const applyUpdatesToTicket = (content, token) => {
  return async (dispatch) => {
    const updatedTicket = { ...content, status: content.status };
    await updateTicket(content.id, updatedTicket, token);
    dispatch(applyChangesToTicket(updatedTicket));
  };
};

export const applyRemoveTicket = (id, token) => {
  return async (dispatch) => {
    await removeTicket(id, token);
    dispatch(applyDelete(id));
  };
};

export const { setTickets, addTicket, applyChangesToTicket, applyDelete } =
  ticketSlice.actions;

export default ticketSlice.reducer;
