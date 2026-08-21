import headerStyles from "./Header.module.css";
import settingsIcon from "../../../assets/images/icon-settings.svg";
import { Link } from "react-router";

export default function Header({ title }) {
  return (
    <div className={headerStyles.container}>
      <h1 className={headerStyles.title}>{title}</h1>
      <div className={headerStyles.searchBar}>
        <input
          type="search"
          placeholder="Search by title, content, or tags..."
        />
        <Link to="/settings" className={headerStyles.settingBtn}>
          <img src={settingsIcon} alt="setting" />
        </Link>
      </div>
    </div>
  );
}
