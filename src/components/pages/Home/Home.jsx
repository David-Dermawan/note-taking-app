import homeStyles from "./Home.module.css";

export default function Home() {
  return (
    <div className={homeStyles.container}>
      <div className={homeStyles.NoteSidebar}>
        <button type="button" className={homeStyles.createNoteBtn}>
          + Create New Note
        </button>
        <div className={homeStyles.noteList}></div>
      </div>
      <div className={homeStyles.noteEditor}></div>
      <div className={homeStyles.noteActionSidebar}></div>
    </div>
  );
}
