import navbarStyles from "./Navbar.module.css";
import logo from "../../../assets/images/logo.svg";
import { Link } from "react-router";
import homeIcon from "../../../assets/images/icon-home.svg";
import archiveIcon from "../../../assets/images/icon-archive.svg";

export default function Navbar() {
  return (
    <div className={navbarStyles.container}>
      <nav className={navbarStyles.navigation}>
        <div className={navbarStyles.logoContainer}>
          <img src={logo} alt="Note Logo" className={navbarStyles.logo} />
        </div>
        <ul className={navbarStyles.navList}>
          <li>
            <Link to="/">
              <img src={homeIcon} alt="Home" />
              All Notes
            </Link>
          </li>
          <li>
            <Link to="/archived">
              <img src={archiveIcon} alt="Archive" />
              Archived Notes
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
