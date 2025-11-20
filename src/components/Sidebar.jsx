import React from "react";
import "../styles/Sidebar.css";

export default function Sidebar({ filter, setFilter, stats, setDark, logoPath }) {
  const categories = ["General", "Work", "Study", "Personal"];
  return (
    <aside className="sidebar">
      <div className="brand">
        
        <span>Todo App</span>
      </div>

      <div className="nav">
        <button className={filter === "All" ? "active" : ""} onClick={() => setFilter("All")}>🏠 All Tasks</button>
        <button className={filter === "In Progress" ? "active" : ""} onClick={() => setFilter("In Progress")}>⏳ In Progress</button>
        <button className={filter === "Completed" ? "active" : ""} onClick={() => setFilter("Completed")}>✅ Completed</button>

        <hr />
        <button onClick={() => setFilter("Today")}>📅 Today</button>
        <button onClick={() => setFilter("Tomorrow")}>🔜 Tomorrow</button>
        <button onClick={() => setFilter("Month")}>📆 This Month</button>

        <hr />
        <div className="cat-title">Categories</div>
        {categories.map(c => (
          <button
            key={c}
            className={filter === `Category:${c}` ? "active" : ""}
            onClick={() => setFilter(`Category:${c}`)}
          >
            🗂 {c}
          </button>
        ))}

        <hr />
        <div className="stats">
          <div>Total: {stats?.total ?? 0}</div>
          <div>Completed: {stats?.completed ?? 0}</div>
          <div>In Progress: {stats?.inprogress ?? 0}</div>
        </div>

        
      </div>
    </aside>
  );
}
