import { Link } from "react-router";
import styles from "./MobileNavbar.module.css";
import homeIcon from "../../../assets/images/icon-home.svg";
import searchIcon from "../../../assets/images/icon-search.svg";
import archiveIcon from "../../../assets/images/icon-archive.svg";
import tagIcon from "../../../assets/images/icon-tag.svg";

export default function MobileNavbar({ onHome, onSearch, onTags }) {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.navList}>
        <li className={styles.item}>
          <Link to="/" className={styles.navLink} onClick={onHome}>
            <img src={homeIcon} alt="Home Icon" />
            <span className={styles.navLabel}>Home</span>
          </Link>
        </li>
        <li className={styles.item}>
          <button
            type="button"
            className={styles.searchButton}
            onClick={onSearch}
          >
            <img src={searchIcon} alt="Search Icon" />
            <span className={styles.navLabel}>Search</span>
          </button>
        </li>
        <li className={styles.item}>
          <Link to="/archive" className={styles.navLink}>
            <img src={archiveIcon} alt="Archive Icon" />
            <span className={styles.navLabel}>Archived</span>
          </Link>
        </li>
        <li className={styles.item}>
          <button type="button" className={styles.tagsButton} onClick={onTags}>
            <img src={tagIcon} alt="Tag Icon" />
            <span className={styles.navLabel}>Tags</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
