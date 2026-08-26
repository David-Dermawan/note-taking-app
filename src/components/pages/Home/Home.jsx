import styles from "./Home.module.css";
import tagIcon from "../../../assets/images/icon-tag.svg";
import clockIcon from "../../../assets/images/icon-clock.svg";
import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabase";
import useMediaQuery from "../../../hooks/useMediaQuery";
import { useOutletContext } from "react-router";

export default function Home() {
  const { title, isSearchOpen, isTagView } = useOutletContext();
  const [isCreating, setIsCreating] = useState(false);
  const [note, setNote] = useState({
    title: "",
    tags: "",
    lastEdited: null,
    content: "",
  });

  const [selectedNote, setSelectedNote] = useState(null);
  const [noteList, setNoteList] = useState([]);
  const isTablet = useMediaQuery("(max-width: 1024px)");

  function formatDate(date) {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  async function getNotes() {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("last_edited", { ascending: false });

    if (error) {
      console.error("Error fetching notes:", error);
      return;
    }

    setNoteList(data);
  }

  function createNewNote() {
    setSelectedNote(null);

    setNote({
      title: "",
      tags: "",
      lastEdited: null,
      content: "",
    });

    setIsCreating(true);
  }

  function selectNote(note) {
    setSelectedNote(note);

    setNote({
      title: note.title,
      tags: note.tags.join(", "),
      lastEdited: note.last_edited,
      content: note.content,
    });
  }

  async function saveNote() {
    const tags = note.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    let data;
    let error;

    if (selectedNote) {
      const response = await supabase
        .from("notes")
        .update({
          title: note.title,
          tags: tags,
          content: note.content,
          last_edited: new Date().toISOString(),
        })
        .eq("id", selectedNote.id)
        .select()
        .single();

      data = response.data;
      error = response.error;
    } else {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const user = session?.user;

      const response = await supabase
        .from("notes")
        .insert({
          user_id: user.id,
          title: note.title,
          tags: tags,
          content: note.content,
        })
        .select()
        .single();

      data = response.data;
      error = response.error;
    }

    if (error) {
      console.error("Error saving note:", error);
      return;
    }

    setNoteList((prev) => {
      if (selectedNote) {
        return prev.map((item) => (item.id === data.id ? data : item));
      }

      return [data, ...prev];
    });

    setSelectedNote(data);
    setIsCreating(false);
  }

  function cancelNote() {
    setSelectedNote(null);
    setIsCreating(false);
  }

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className={styles.container}>
      {(!isTablet || (!selectedNote && !isCreating)) && (
        <div className={styles.noteSidebar}>
          {!isTablet && (
            <button
              onClick={createNewNote}
              type="button"
              className={styles.createNoteBtn}
            >
              + Create New Note
            </button>
          )}
          {isTablet && !isSearchOpen ? (
            <h2 className={styles.noteListTitle}>{title}</h2>
          ) : (
            <div className={styles.searchBar}>
              <input
                type="search"
                placeholder="Search by title, content, or tags..."
              />
            </div>
          )}
          <div className={styles.noteList}>
            {noteList.map((note) => (
              <div
                key={note.id}
                className={styles.noteItem}
                onClick={() => selectNote(note)}
              >
                <h3 className={styles.noteItemTitle}>
                  {note.title || "Untitled Note"}
                </h3>
                <p className={styles.noteItemTags}>
                  {note.tags.map((tag) => (
                    <span key={tag} className={styles.noteTags}>
                      {tag}
                    </span>
                  ))}
                </p>
                <p className={styles.noteItemDate}>
                  {formatDate(note.last_edited)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      {(!isTablet || selectedNote || isCreating) && (
        <div className={styles.noteEditor}>
          {isTablet && (
            <div className={styles.noteControls}>
              <div className={styles.noteNavigation}>
                <button
                  type="button"
                  className={styles.backButton}
                  onClick={cancelNote}
                >
                  <span>&lt;</span>
                  <span>Go Back</span>
                </button>
              </div>

              <div className={styles.noteActions}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={cancelNote}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={styles.saveButton}
                  onClick={saveNote}
                >
                  Save Note
                </button>
              </div>
            </div>
          )}

          {selectedNote || isCreating ? (
            <>
              <div className={styles.noteInfo}>
                <input
                  type="text"
                  placeholder="Enter a title..."
                  className={styles.noteTitle}
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />

                <div className={styles.metaData}>
                  <div className={styles.metaRow}>
                    <label htmlFor="tags" className={styles.metaLabel}>
                      <img src={tagIcon} alt="Tag Icon" />
                      Tags
                    </label>
                    <input
                      className={styles.tagsInput}
                      type="text"
                      placeholder="Add tags separated by commas (e.g. Work, Planning)"
                      value={note.tags}
                      onChange={(e) =>
                        setNote({ ...note, tags: e.target.value })
                      }
                    />
                  </div>

                  <div className={styles.metaRow}>
                    <p className={styles.metaLabel}>
                      <img src={clockIcon} alt="Clock Icon" />
                      Last Edited
                    </p>
                    <p className={styles.editStatus}>
                      {selectedNote
                        ? formatDate(note.lastEdited)
                        : "Not yet saved"}
                    </p>
                  </div>
                </div>
              </div>
              <textarea
                className={styles.noteContent}
                placeholder="Start typing your note here..."
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
              />
              <div className={styles.noteActions}>
                <button
                  onClick={saveNote}
                  className={styles.saveButton}
                  type="button"
                >
                  Save Note
                </button>
                <button
                  onClick={cancelNote}
                  className={styles.cancelButton}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h1>No Notes</h1>
            </>
          )}
        </div>
      )}
      {!isTablet && <div className={styles.noteActionSidebar}></div>}
    </div>
  );
}
