import {mande} from "mande";
import {supabase} from "../supabaseClient.js";

const api = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    return mande(`${apiUrl}`);
};

export async function register(email, password, firstName, lastName, age, job) {
    if (!email || !firstName || !lastName || !password || !age || !job) {
        throw new Error("Tous les champs sont obligatoires.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error("L'adresse e-mail n'est pas valide.");
    }

    return await supabase.auth.signUp({
        email: email,
        password: password,
    }).then(async response => {
        await supabase.auth.updateUser({
            data: {
                "firstName": firstName,
                "lastName": lastName,
                "age": age,
                "job": job,
            },
        });
    });
}
