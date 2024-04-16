import { api } from "../utils/api";

//custom hook to fetch sleep data
const fetchUserInfo = async (userId) => {
  const tokenStore = localStorage.getItem("token") || "";
  const data = await api(tokenStore).get(`/user/${userId}`);
  return data;
};

export default fetchUserInfo;
