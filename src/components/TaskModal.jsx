import React, { useEffect, useState } from "react";
import "../styles/TaskModal.css";

export default function TaskModal({ show, close, onSave, editTask }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [importance, setImportance] = useState("Medium");
  const [category, setCategory] = useState("General");

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title || "");
      setDesc(editTask.desc || "");
      setDate(editTask.date || "");
      setImportance(editTask.importance || "Medium");
      setCategory(editTask.category || "General");
    } else {
      setTitle("");
      setDesc("");
      setDate("");
      setImportance("Medium");
      setCategory("General");
    }
  }, [editTask, show]);

  if (!show) return null;

  function handleSubmit() {
    if (!title.trim()) return;
    const payload = {
      id: editTask ? editTask.id : undefined,
      title,
      desc,
      date,
      importance,
      category,
      done: editTask ? editTask.done : false,
    };
    onSave(payload);
  }

  return (
    <div className="overlay" onClick={close}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={close}>×</button>

        <h3>{editTask ? "Edit Task" : "Add Task"}</h3>

        <div className="field">
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="field">
          <label>Description</label>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
        </div>

        <div className="row">
          <div className="field">
            <label>Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>

          <div className="field">
            <label>Importance</label>
            <select value={importance} onChange={(e) => setImportance(e.target.value)}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>

        <div className="field">
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>General</option>
            <option>Work</option>
            <option>Study</option>
            <option>Personal</option>
          </select>
        </div>

        <button className="submit" onClick={handleSubmit}>
          {editTask ? "Save Changes" : "Add New Task"}
        </button>
      </div>
    </div>
  );
}
