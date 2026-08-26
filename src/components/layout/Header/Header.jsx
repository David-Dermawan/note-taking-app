import styles from "./Header.module.css";
import settingsIcon from "../../../assets/images/icon-settings.svg";
import { Link } from "react-router";
import useMediaQuery from "../../../hooks/useMediaQuery";
import logoIcon from "../../../assets/images/logo.svg";

export default function Header({ title }) {
  const isTablet = useMediaQuery("(max-width: 1024px)");
  return (
    <div className={styles.container}>
      {!isTablet ? (
        <div className={styles.headerContent}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.searchBar}>
            <input
              type="search"
              className={styles.searchInput}
              placeholder="Search by title, content, or tags..."
            />
            <Link to="/settings" className={styles.settingBtn}>
              <img src={settingsIcon} alt="setting" />
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <img src={logoIcon} alt="Note logo" />
        </div>
      )}
    </div>
  );
}
