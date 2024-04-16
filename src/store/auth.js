import {atom} from "jotai";
import {mande} from "mande";

const api = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return mande(`${apiUrl}`);
};

export const token = atom(localStorage.getItem("token") ?? "no token");
export const userId = atom(localStorage.getItem("userId") ?? 3);

export async function auth(email, password) {
  const response = await api().post("/login", {
    email: email,
    password: password,
  });
  if (response.token) {
    localStorage.setItem("token", response.token);
  }
  return response;
}
