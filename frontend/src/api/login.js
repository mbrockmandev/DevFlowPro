import axios from "axios";
const baseUrl = "/api/users/login";

export const login = async (credentials) => {
  // console.log(credentials);
  const res = await axios.post(baseUrl, credentials);
  return res.data;
};

export const getCredentials = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`${baseUrl}/getCredentials`, config);
  return res.data;
};
