import { mande } from "mande";
const api = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const api = mande(`${apiUrl}`);
  return api;
};

export async function login() {
  return await api().post("/login", {
    email: "clement.gambier@gmail.com",
    password: "clement",
  });
}
