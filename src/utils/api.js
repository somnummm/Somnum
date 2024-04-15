import { mande } from "mande";
export const api = (token) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const api = mande(`${apiUrl}`);
  api.options.headers.Authorization = `Bearer ${token}`;
  return api;
};
