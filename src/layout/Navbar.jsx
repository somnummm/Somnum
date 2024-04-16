import {Outlet, useNavigate} from "react-router-dom";
import NavItem from "../components/NavItem";
import NightIcon from "../assets/icons/night.jsx";
import ProfileIcon from "../assets/icons/profile.jsx";
import MoonIcon from "../assets/icons/moon.jsx";
import CalendarIcon from "../assets/icons/calendar.jsx";
import {useEffect} from "react";
import {authGuard} from "../guards/authGuard.js";
import DisconnectButton from "../components/DisconnectButton.jsx";

export default function Navbar() {
    let navigate = useNavigate();

    useEffect(() => {
        authGuard(navigate);
    }, [navigate]);

    return (
        <div>
            <Outlet/>
            <div
                className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium"> {/*Remettre en grid-cols-4 quand on enlèvera le bouton de deconnexion*/}
                    <NavItem to="/dashboard" icon={<MoonIcon/>}/>
                    <NavItem to="/sleep" icon={<CalendarIcon/>}/>
                    <NavItem to="/night" icon={<NightIcon/>}/>
                    <NavItem to="/profile" icon={<ProfileIcon/>}/>
                    <DisconnectButton/>
                </div>
            </div>
        </div>
    );
}
