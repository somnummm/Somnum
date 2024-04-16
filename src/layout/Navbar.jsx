import { Outlet } from "react-router-dom";
import NavItem from "../components/NavItem";
import NightIcon from "../assets/icons/night.jsx";
import ProfileIcon from "../assets/icons/profile.jsx";
import MoonIcon from "../assets/icons/moon.jsx";
import CalendarIcon from "../assets/icons/calendar.jsx";
import "../styles/navbar.css";
// import { useEffect } from "react";
// import { authGuard } from "../guards/authGuard.js";
import DisconnectButton from "../components/DisconnectButton.jsx";

export default function Navbar() {
  // let navigate = useNavigate();
  // useEffect(() => {
  //     authGuard(navigate);
  // }, [navigate]);
  return (
    <div>
      <Outlet />
      <nav>
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
          <NavItem to="/dashboard" icon={<MoonIcon />} />
          <NavItem to="/sleep" icon={<CalendarIcon />} />
          <NavItem to="/night" icon={<NightIcon />} />
          <NavItem to="/profile" icon={<ProfileIcon />} />
          <DisconnectButton />
        </div>
      </nav>
    </div>
  );
}
