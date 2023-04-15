import { configureStore } from "@reduxjs/toolkit";

import ticketReducer from "./reducers/TicketReducer";
import notificationReducer from "./reducers/NotificationReducer";
import tokenReducer from "./reducers/TokenReducer";

const store = configureStore({
  reducer: {
    tickets: ticketReducer,
    notifications: notificationReducer,
    token: tokenReducer,
  },
});

export default store;
