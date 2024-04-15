import { NavLink } from "react-router-dom";

// Sous-composant NavItem
function NavItem({ to, icon }) {
  return (
    <NavLink
      type="button"
      className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
      to={to}
    >
      {icon}
    </NavLink>
  );
}
export default NavItem;
