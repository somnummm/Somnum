// useAuth.js
import {useEffect, useState} from "react";
import {supabase} from "../supabaseClient.js";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if the user is authenticated here.
        // This could be done by checking for a token in local storage or a cookie,
        // or by making an API call to your backend to verify the user's authentication status.
        // For example:
        async function isAuth() {
            return (await supabase.auth.getSession()).data.session
        }

        if (isAuth !== null) {
            setIsAuthenticated(true);
        }
    }, []);

    return isAuthenticated;
};

export default useAuth;
