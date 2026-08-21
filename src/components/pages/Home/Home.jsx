import homeStyles from "./Home.module.css";
import tagIcon from "../../../assets/images/icon-tag.svg";
import clockIcon from "../../../assets/images/icon-clock.svg";
import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabase";

export default function Home() {
  const [isCreating, setIsCreating] = useState(false);
  const [note, setNote] = useState({
    title: "",
    tags: "",
    lastEdited: null,
    content: "",
  });

  const [selectedNote, setSelectedNote] = useState(null);
  const [noteList, setNoteList] = useState([]);

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
    <div className={homeStyles.container}>
      <div className={homeStyles.noteSidebar}>
        <button
          onClick={createNewNote}
          type="button"
          className={homeStyles.createNoteBtn}
        >
          + Create New Note
        </button>
        <div className={homeStyles.noteList}>
          {noteList.map((note) => (
            <div
              key={note.id}
              className={homeStyles.noteItem}
              onClick={() => selectNote(note)}
            >
              <h3 className={homeStyles.noteItemTitle}>
                {note.title || "Untitled Note"}
              </h3>
              <p className={homeStyles.noteItemTags}>
                {note.tags.map((tag) => (
                  <span key={tag} className={homeStyles.noteTags}>
                    {tag}
                  </span>
                ))}
              </p>
              <p className={homeStyles.noteItemDate}>
                {formatDate(note.last_edited)}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className={homeStyles.noteEditor}>
        {selectedNote || isCreating ? (
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
                    <img src={tagIcon} alt="Tag Icon" />
                    Tags
                  </label>
                  <input
                    className={homeStyles.tagsInput}
                    type="text"
                    placeholder="Add tags separated by commas (e.g. Work, Planning)"
                    value={note.tags}
                    onChange={(e) => setNote({ ...note, tags: e.target.value })}
                  />
                </div>

                <div className={homeStyles.metaRow}>
                  <p className={homeStyles.metaLabel}>
                    <img src={clockIcon} alt="Clock Icon" />
                    Last Edited
                  </p>
                  <p className={homeStyles.editStatus}>
                    {selectedNote
                      ? formatDate(note.lastEdited)
                      : "Not yet saved"}
                  </p>
                </div>
              </div>
            </div>
            <textarea
              className={homeStyles.noteContent}
              placeholder="Start typing your note here..."
              value={note.content}
              onChange={(e) => setNote({ ...note, content: e.target.value })}
            />
            <div className={homeStyles.noteActions}>
              <button
                onClick={saveNote}
                className={homeStyles.saveButton}
                type="button"
              >
                Save Note
              </button>
              <button
                onClick={cancelNote}
                className={homeStyles.cancelButton}
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
      <div className={homeStyles.noteActionSidebar}></div>
    </div>
  );
}
