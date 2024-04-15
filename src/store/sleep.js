import { api } from "../utils/api";

//custom hook to fetch sleep data
const fetchSleep = async (userId) => {
  const tokenStore = localStorage.getItem("token") || "";
  const data = await api(tokenStore).get(`/program/${userId}`);
  return data;
};

export default fetchSleep;
