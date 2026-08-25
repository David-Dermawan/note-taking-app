import { Link } from "react-router";
import styles from "./MobileNavbar.module.css";
import homeIcon from "../../../assets/images/icon-home.svg";
import searchIcon from "../../../assets/images/icon-search.svg";
import archiveIcon from "../../../assets/images/icon-archive.svg";
import tagIcon from "../../../assets/images/icon-tag.svg";

export default function MobileNavbar() {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.navList}>
        <li className={styles.item}>
          <Link to="/" className={styles.navLink}>
            <img src={homeIcon} alt="Home Icon" />
            <span className={styles.navLabel}>Home</span>
          </Link>
        </li>
        <li className={styles.item}>
          <Link to="/search" className={styles.navLink}>
            <img src={searchIcon} alt="Search Icon" />
            <span className={styles.navLabel}>Search</span>
          </Link>
        </li>
        <li className={styles.item}>
          <Link to="/" className={styles.navLink}>
            <img src={archiveIcon} alt="Archive Icon" />
            <span className={styles.navLabel}>Archived</span>
          </Link>
        </li>
        <li className={styles.item}>
          <Link to="/" className={styles.navLink}>
            <img src={tagIcon} alt="Tag Icon" />
            <span className={styles.navLabel}>Tags</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
