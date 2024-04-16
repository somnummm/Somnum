import {LogoutIcon} from "../assets/icons/logout.jsx";
import {useNavigate} from "react-router-dom";

export default function DisconnectButton() {
    let navigate = useNavigate();
    return (
        <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
            onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
            }}
        >
            <LogoutIcon/>
        </button>
    );
}