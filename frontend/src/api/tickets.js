import axios from "axios";
const baseUrl = "/api/tickets";

const applyAuthToken = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getAllTickets = async (token) => {
  console.log("getAllTickets called");
  console.log("token:", token);
  const config = applyAuthToken(token);
  const res = await axios.get(baseUrl, config);
  console.log("should be tickets=", res.data);
  return res.data;
};

export const getTicketById = async (id, token) => {
  const config = applyAuthToken(token);
  const res = await axios.get(`${baseUrl}/${id}`, config);
  return res.data;
};

export const createNewTicket = async (newTicket, token) => {
  const config = applyAuthToken(token);
  const res = await axios.post(baseUrl, newTicket, config);
  return res.data;
};

export const updateTicket = async (id, data, token) => {
  const config = applyAuthToken(token);
  const res = await axios.put(`${baseUrl}/${id}`, data, config);
  return res.data;
};

export const removeTicket = async (id, token) => {
  const config = applyAuthToken(token);
  const res = await axios.delete(`${baseUrl}/${id}`, config);
  return res.data;
};
