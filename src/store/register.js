import {mande} from "mande";
import {supabase} from "../supabaseClient.js";

const api = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    return mande(`${apiUrl}`);
};

export async function register(email, firstName, lastName, password) {
    supabase.from('User')
        .insert([
            {
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
            },
        ])
        .select()
        .then(response => {
            console.log(response)
        })

}
