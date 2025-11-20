import React from "react";

export default function TaskItem({ task, toggleDone, deleteTask, editTask }) {
  return (
    <div className={`task-item ${task.done ? "done" : ""}`}>
      <div className="task-left">
        <input type="checkbox" checked={task.done} onChange={() => toggleDone(task.id)} />
        <div>
          <div className="title">{task.title}</div>
          <div className="smallmuted">{task.desc}</div>
        </div>
      </div>

      <div className="task-right">
        <div className={`chip importance-${task.importance.toLowerCase()}`}>{task.importance}</div>
        <div className="date">{task.date}</div>

        <button className="editBtn" onClick={() => editTask(task)}>Edit</button>
        <button className="deleteBtn" onClick={() => deleteTask(task.id)}>Delete</button>
      </div>
    </div>
  );
}
