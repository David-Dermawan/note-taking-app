import styles from "./Navbar.module.css";
import logo from "../../../assets/images/logo.svg";
import { Link } from "react-router";
import homeIcon from "../../../assets/images/icon-home.svg";
import archiveIcon from "../../../assets/images/icon-archive.svg";

export default function Navbar() {
  return (
    <div className={styles.container}>
      <nav className={styles.navigation}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="Note Logo" className={styles.logo} />
        </div>
        <ul className={styles.navList}>
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
