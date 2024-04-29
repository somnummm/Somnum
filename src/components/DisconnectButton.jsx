import {LogoutIcon} from "../assets/icons/logout.jsx";
import {useNavigate} from "react-router-dom";
import {supabase} from "../supabaseClient.js";

export default function DisconnectButton() {
    let navigate = useNavigate();
    return (
        <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
            onClick={async () => {
                await supabase.auth.signOut()
                navigate("/login");
            }}
        >
            <LogoutIcon/>
        </button>
    );
}