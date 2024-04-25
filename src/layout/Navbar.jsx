import { Outlet, useNavigate } from "react-router-dom";
import NavItem from "../components/NavItem";
import NightIcon from "../assets/icons/night.jsx";
import ProfileIcon from "../assets/icons/profile.jsx";
import MoonIcon from "../assets/icons/moon.jsx";
import CalendarIcon from "../assets/icons/calendar.jsx";
import "../styles/navbar.css";
import DisconnectButton from "../components/DisconnectButton.jsx";
import { authGuard } from "../guards/authGuard.js";
import { useEffect } from "react";

export default function Navbar() {
  let navigate = useNavigate();
  useEffect(() => {
    authGuard(navigate);
  }, [navigate]);
  return (
    <div>
      <Outlet />
      <nav>
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
          <NavItem to="/" icon={<MoonIcon />} />
          <NavItem to="/program" icon={<CalendarIcon />} />
          <NavItem to="/night" icon={<NightIcon />} />
          <NavItem to="/profile" icon={<ProfileIcon />} />
          <DisconnectButton />
        </div>
      </nav>
    </div>
  );
}
