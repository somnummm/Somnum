import { mande } from "mande";
import { useAtom } from "jotai";
import { token } from "../store/auth";
export const api = () => {
  const [tokenStore] = useAtom(token);
  const apiUrl = import.meta.env.VITE_API_URL;
  const api = mande(`${apiUrl}`);
  api.options.headers.Authorization = `Bearer ${tokenStore}`;
  return api;
};
