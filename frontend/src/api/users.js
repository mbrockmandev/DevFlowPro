import axios from "axios";
const baseUrl = "/api/users";

export const getAllUsers = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

export const register = async (user) => {
  const res = await axios.post(baseUrl, user)
  return res.data;
}
