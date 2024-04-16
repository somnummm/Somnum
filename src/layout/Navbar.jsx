import { Outlet } from "react-router-dom";
import NavItem from "../components/NavItem";
import NightIcon from "../assets/icons/night.jsx";
import ProfileIcon from "../assets/icons/profile.jsx";
import MoonIcon from "../assets/icons/moon.jsx";
import CalendarIcon from "../assets/icons/calendar.jsx";
import "../styles/navbar.css";

export default function Navbar() {
  return (
    <div>
      <Outlet />
      <nav>
        <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
          <NavItem to="/dashboard" icon={<MoonIcon />} />
          <NavItem to="/sleep" icon={<CalendarIcon />} />
          <NavItem to="/night" icon={<NightIcon />} />
          <NavItem to="/profile" icon={<ProfileIcon />} />
        </div>
      </nav>
    </div>
  );
}
