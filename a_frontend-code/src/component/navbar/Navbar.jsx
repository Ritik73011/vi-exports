import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <h2>Vi Exports</h2>
      <div className="navItemSec">
        <NavLink to={"/"}>User Panel</NavLink>
        <NavLink to={"/admin"}>Admin Panel</NavLink>
      </div>
    </div>
  );
};

export default Navbar;
