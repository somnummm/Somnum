import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

// Sous-composant NavItem
function NavItem({ to, icon }) {
  return (
    <NavLink
      type="button"
      className={
        (({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : "",
        "inline-flex flex-col items-center justify-center px-5   group")
      }
      to={to}
    >
      {icon}
    </NavLink>
  );
}
export default NavItem;
