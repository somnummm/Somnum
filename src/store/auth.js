import {atom} from "jotai";
import {mande} from "mande";
import {supabase} from "../supabaseClient.js";

const api = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    return mande(`${apiUrl}`);
};

export const token = atom(localStorage.getItem("token") ?? "no token");
export const userId = atom(localStorage.getItem("userId") ?? 3);

export async function auth(email, password) {
    const response = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (response.error) {
        throw new Error(response.error.message);
    }

    return response;
}
