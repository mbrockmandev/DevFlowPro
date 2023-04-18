import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: "",
    isVisible: false,
    duration: 0,
  },
  reducers: {
    setNotification(state, action) {
      state.isVisible = true;
      state.message = action.payload.message;
      state.duration = action.payload.duration;
    },
    clearNotification(state) {
      state.isVisible = false;
      state.message = "";
      state.duration = 0;
    },
  },
});

export const showThis = (notification) => {
  return (dispatch) => {
    dispatch(setNotification(notification));
    setTimeout(() => {
      clearNotification();
    }, notification.duration);
  };
};

export const { setNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
