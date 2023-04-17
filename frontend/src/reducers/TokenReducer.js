import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { login } from "../api/login";

const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: null,
    isValid: false,
    email: "",
  },
  reducers: {
    setTokenFromLocalStorage(state, action) {
      console.log("set from local: ", action.payload);
      window.localStorage.setItem("jwt", JSON.stringify(action.payload.user));
    },
    getToken: (state, action) => {
      const token = JSON.parse(window.localStorage.getItem("jwt"));
      // no token found
      if (!token) {
        return state;
      }

      // console.log("token info:", token.email, token.token, token.isValid);
      return {
        ...state,
        email: token.email,
        token: token.token,
        isValid: true,
      };
    },
    setToken: (state, action) => {
      window.localStorage.setItem("jwt", JSON.stringify(action.payload));
    },
    checkIfTokenIsValid: async (state, action) => {
      const token = action.payload;

      try {
        //TODO: define this route for checking token validity
        const res = await axios.post("/api/users/checkToken", {
          headers: { Authorization: `Bearer ${token}` },
        });
        state.isValid = res.success; // should be true if verified JWT
        return;
      } catch (error) {
        state.isValid = false;
        return;
      }
    },
    updateLoggedInUser: (state, action) => {
      const { email, token } = action.payload;
      return { ...state, email, token, isValid: true };
    },
  },
});

export const logUserIn = (credentials) => {
  return async (dispatch) => {
    const user = await login(credentials);
    dispatch(setToken(user));
    dispatch(updateLoggedInUser(user));
  };
};

export const { setToken, getToken, checkIfTokenIsValid, updateLoggedInUser } =
  tokenSlice.actions;

export default tokenSlice.reducer;
