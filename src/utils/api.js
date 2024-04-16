import { mande } from "mande";
export const api = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const api = mande(`${apiUrl}`);
  api.options.headers.Authorization = `Bearer ${
    localStorage.getItem("token") || ""
  }`;
  return api;
};
