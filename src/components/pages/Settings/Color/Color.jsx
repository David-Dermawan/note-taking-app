import styles from "./Color.module.css";
import sunIcon from "../../../../assets/images/icon-sun.svg";
import moonIcon from "../../../../assets/images/icon-moon.svg";
import systemThemeIcon from "../../../../assets/images/icon-system-theme.svg";
import { Link } from "react-router";
import useMediaQuery from "../../../../hooks/useMediaQuery";

export default function Color() {
  const isTablet = useMediaQuery("(max-width:1024px)");
  return (
    <div className={styles.colorSettings}>
      {isTablet && (
        <Link to={"/settings"} className={styles.back}>
          &lt; Settings
        </Link>
      )}
      <div className={styles.header}>
        <h1 className={styles.title}>Color Theme</h1>
        <h2 className={styles.subtitle}>Choose your color theme:</h2>

        <div className={styles.themeOptions}>
          <label htmlFor="light" className={styles.themeOption}>
            <div className={styles.themeInfo}>
              <div className={styles.iconWrapper}>
                <img
                  src={sunIcon}
                  alt="Sun Icon"
                  className={styles.themeIcon}
                />
              </div>
              <div className={styles.themeDetails}>
                <span className={styles.optionTitle}>Light Mode</span>
                <small>Pick a clean and classic light theme</small>
              </div>
            </div>
            <input type="radio" id="light" name="theme_options" value="light" />
          </label>
          <label htmlFor="dark" className={styles.themeOption}>
            <div className={styles.themeInfo}>
              <div className={styles.iconWrapper}>
                <img
                  src={moonIcon}
                  alt="Moon Icon"
                  className={styles.themeIcon}
                />
              </div>
              <div className={styles.themeDetails}>
                <span className={styles.optionTitle}>Dark Mode</span>
                <small>Select a sleek and modern dark theme</small>
              </div>
            </div>
            <input type="radio" id="dark" name="theme_options" value="dark" />
          </label>
          <label htmlFor="default" className={styles.themeOption}>
            <div className={styles.themeInfo}>
              <div className={styles.iconWrapper}>
                <img
                  src={systemThemeIcon}
                  alt="System Theme Icon"
                  className={styles.themeIcon}
                />
              </div>
              <div className={styles.themeDetails}>
                <span className={styles.optionTitle}>System</span>
                <small>Adapts to your device's theme</small>
              </div>
            </div>
            <input
              type="radio"
              id="default"
              name="theme_options"
              value="default"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
