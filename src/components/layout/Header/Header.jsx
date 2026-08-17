import headerStyles from "./Header.module.css";
import settingsIcon from "../../../assets/images/icon-settings.svg";

export default function Header() {
  return (
    <div className={headerStyles.container}>
      <h1 className={headerStyles.title}>All Notes</h1>
      <div className={headerStyles.searchBar}>
        <input
          type="search"
          placeholder="Search by title, content, or tags..."
        />
        <button type="button" className={headerStyles.settingBtn}>
          <img src={settingsIcon} alt="setting" />
        </button>
      </div>
    </div>
  );
}
