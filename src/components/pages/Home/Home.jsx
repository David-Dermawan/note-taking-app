import homeStyles from "./Home.module.css";
import { useState } from "react";

export default function Home() {
  const [isCreating, setIsCreating] = useState(false);
  const [note, setNote] = useState({
    title: "",
    tags: [],
    lastEdited: null,
    content: "",
  });

  function createNewNote() {
    setIsCreating(true);
  }

  return (
    <div className={homeStyles.container}>
      <div className={homeStyles.noteSidebar}>
        <button
          onClick={createNewNote}
          type="button"
          className={homeStyles.createNoteBtn}
        >
          + Create New Note
        </button>
        <div className={homeStyles.noteList}></div>
      </div>
      <div className={homeStyles.noteEditor}>
        {!isCreating ? (
          <>
            <h2>No notes yet</h2>
            <p>Create your first note to get started.</p>
            <button type="button" className={homeStyles.createNoteBtn}>
              + Create New Note
            </button>
          </>
        ) : (
          <>
            <div className={homeStyles.noteInfo}>
              <input
                type="text"
                placeholder="Enter a title..."
                className={homeStyles.noteTitle}
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
              />

              <div className={homeStyles.metaData}>
                <div className={homeStyles.metaRow}>
                  <label htmlFor="tags" className={homeStyles.metaLabel}>
                    Tags
                  </label>
                  <input
                    type="text"
                    value={note.tags}
                    onChange={(e) => setNote({ ...note, tags: e.target.value })}
                  />
                </div>

                <div className={homeStyles.metaRow}>
                  <p className={homeStyles.metaLabel}>Last Edited</p>
                </div>
              </div>
            </div>
            <textarea
              className={homeStyles.noteContent}
              placeholder="Start typing your note here..."
            />
            <div className={homeStyles.noteActions}>
              <button className={homeStyles.saveButton} type="button">
                Save Note
              </button>
              <button className={homeStyles.cancelButton} type="button">
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
      <div className={homeStyles.noteActionSidebar}></div>
    </div>
  );
}
