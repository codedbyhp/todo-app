import React from "react";
import TaskItem from "./TaskItem";
import "../styles/TaskItem.css";

export default function TaskList({ tasks, toggleDone, deleteTask, editTask, onDragStart, onDragEnd, onDrop, onDragOver }) {
  if (!tasks.length) return <div className="empty-msg">No tasks yet — add one.</div>;

  return (
    <div className="task-list">
      {tasks.map((t, idx) => (
        <div
          key={t.id}
          draggable
          onDragStart={(e) => onDragStart(e, idx)}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, idx)}
        >
          <TaskItem task={t} toggleDone={toggleDone} deleteTask={deleteTask} editTask={editTask} />
        </div>
      ))}
    </div>
  );
}
