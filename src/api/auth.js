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
  console.log(response.token);
  if (response.token) {
    console.log("setting token");
    localStorage.setItem("token", response.token);
  }
  return response;
}
