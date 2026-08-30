import styles from "./Settings.module.css";
import sunIcon from "../../../assets/images/icon-sun.svg";
import fontIcon from "../../../assets/images/icon-font.svg";
import lockIcon from "../../../assets/images/icon-lock.svg";
import logoutIcon from "../../../assets/images/icon-logout.svg";
import { Link, Outlet, useLocation } from "react-router";
import useMediaQuery from "../../../hooks/useMediaQuery";

export default function Settings() {
  const isTablet = useMediaQuery("(max-width:1024px)");
  const location = useLocation();
  const isSettingsChild = location.pathname !== "/settings";
  const showSettingsPanel = !isTablet || !isSettingsChild;

  return (
    <div className={styles.container}>
      {showSettingsPanel && (
        <div className={styles.settingsPanel}>
          <ul className={styles.settingsMenu}>
            <li>
              <Link to="/settings/color">
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
              <Link
                to="/settings/password"
                className={styles.changePasswordLink}
              >
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
      )}
      <div className={styles.settingsContent}>
        <Outlet />
      </div>
    </div>
  );
}
