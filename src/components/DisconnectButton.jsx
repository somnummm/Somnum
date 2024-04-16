import {LogoutIcon} from "../assets/icons/logout.jsx";

export default function DisconnectButton() {
    return (
        <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
            onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
            }}
        >
            <LogoutIcon/>
        </button>
    );
}