import {Outlet, useNavigate} from "react-router-dom";
import NavItem from "../components/NavItem";
import NightIcon from "../assets/icons/night.jsx";
import ProfileIcon from "../assets/icons/profile.jsx";
import MoonIcon from "../assets/icons/moon.jsx";
import CalendarIcon from "../assets/icons/calendar.jsx";
import {authGuard} from "../guards/authGuard.js";
import {useEffect} from "react";
import "../styles/navbar.css";

export default function Navbar() {
    let navigate = useNavigate();
    useEffect(() => {
        authGuard(navigate);
    }, [navigate]);
    return (
        <div>
            <div className="pb-16">
                <Outlet/>
            </div>
            <nav>
                <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
                    <NavItem to="/" icon={<MoonIcon/>}/>
                    <NavItem to="/app/program" icon={<CalendarIcon/>}/>
                    <NavItem to="/app/night" icon={<NightIcon/>}/>
                    <NavItem to="/app/profile" icon={<ProfileIcon/>}/>
                </div>
            </nav>
        </div>
    );
}
