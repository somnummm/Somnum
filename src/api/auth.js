import { mande } from "mande";
const api = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const api = mande(`${apiUrl}`);
  return api;
};

export async function login(email, password) {
  const response = await api().post("/login", {
    email: email,
    password: password,
  });
  if (response.token) {
    localStorage.setItem("token", response.token);
  }
  return response;
}
