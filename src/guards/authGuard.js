import {useNavigate} from "react-router-dom";

function isLogged() {
    return localStorage.getItem('token') !== null;
}

export function authGuard(navigation) {
    let navigate;
    if (navigation) {
        navigate = navigation;
    } else {
        navigate = useNavigate();
    }
    if (!isLogged()) {
        navigate(('/login'));
    }
}

export function unAuthGuard(navigation) {
    let navigate;
    if (navigation) {
        navigate = navigation;
    } else {
        navigate = useNavigate();
    }
    if (isLogged()) {
        navigate(('/'));
    }
}