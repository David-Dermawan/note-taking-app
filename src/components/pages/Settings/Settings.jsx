import styles from "./Settings.module.css";
import sunIcon from "../../../assets/images/icon-sun.svg";
import fontIcon from "../../../assets/images/icon-font.svg";
import lockIcon from "../../../assets/images/icon-lock.svg";
import logoutIcon from "../../../assets/images/icon-logout.svg";
import { Link, Outlet } from "react-router";

export default function Settings() {
  return (
    <div className={styles.container}>
      <div className={styles.settingsPanel}>
        <ul className={styles.settingsMenu}>
          <li>
            <Link to="/settings/password">
              <img src={sunIcon} alt="Sun Icon" />
              <span>Color Theme</span>
              <span></span>
            </Link>
          </li>

          <li>
            <Link to="/settings/font">
              <img src={fontIcon} alt="Font Icon" />
              <span>Font Theme</span>
              <span></span>
            </Link>
          </li>

          <li>
            <Link to="/settings/password">
              <img src={lockIcon} alt="Lock Icon" />
              <span>Change Password</span>
              <span></span>
            </Link>
          </li>

          <li>
            <button type="button" className={styles.logoutButton}>
              <img src={logoutIcon} alt="Logout Icon" />
              <span>Logout</span>
              <span></span>
            </button>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}
