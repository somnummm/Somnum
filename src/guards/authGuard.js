import {supabase} from "../supabaseClient.js";
import {useNavigate} from "react-router-dom";

async function isLogged() {
    const user = (await supabase.auth.getSession()).data.session;
    return user !== null;
}

export async function authGuard(navigation) {
    let navigate;
    if (navigation) {
        navigate = navigation;
    } else {
        navigate = useNavigate();
    }
    if (!(await isLogged())) {
        navigate(('/login'));
    }
}

// déjà connecté -> ne peut pas accéder aux pages login et register
export async function unAuthGuard(navigation) {
    let navigate;
    if (navigation) {
        navigate = navigation;
    } else {
        navigate = useNavigate();
    }
    if (await isLogged()) {
        navigate(('/'));
    }
}
