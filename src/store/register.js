import {mande} from "mande";
import {supabase} from "../supabaseClient.js";

const api = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    return mande(`${apiUrl}`);
};

const errorMessages = {
    'User already registered': 'Cette adresse e-mail est déjà utilisée.',
    // Ajoutez d'autres messages d'erreur à traduire ici...
};

export async function register(email, password, firstName, lastName, age, job) {
    if (!email || !firstName || !lastName || !password || !age || !job) {
        throw new Error("Tous les champs sont obligatoires.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error("L'adresse e-mail n'est pas valide.");
    }

    if (password.length < 6) {
        throw new Error("Le mot de passe doit contenir au moins 6 caractères.");
    }

    try {
        const {user, error} = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            const translatedMessage = errorMessages[error.message] || 'Une erreur s\'est produite lors de l\'inscription.';
            throw new Error(translatedMessage);
        }


        const updateUser = await supabase.auth.updateUser({
            data: {
                "firstName": firstName,
                "lastName": lastName,
                "age": age,
                "job": job,
            },
        });

        if (updateUser.error) {
            const translatedMessage = errorMessages[updateUser.error.message] || 'Une erreur s\'est produite lors de la mise à jour de l\'utilisateur.';
            throw new Error(translatedMessage);
        }

        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}
