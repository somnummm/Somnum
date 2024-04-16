import { api } from "../utils/api";

const fetchSleep = async (userId) => {
  const data = await api().get(`/program/${userId}`);
  return data;
};

export default fetchSleep;
