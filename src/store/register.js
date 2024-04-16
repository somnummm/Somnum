import {mande} from "mande";

const api = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    return mande(`${apiUrl}`);
};

export async function register(email, firstName, lastName, password) {
    return await api().post("/register", {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
    });
}
