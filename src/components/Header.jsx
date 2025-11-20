import React from "react";
import "../styles/Header.css";

export default function Header({ onNew, query, setQuery, dark, setDark }) {
  return (
    <header className="header">
      <div className="left">
        <h1>My All Tasks</h1>
        <p className="sub">Manage and track your tasks easily</p>
      </div>

      <div className="right">
        <button className="newTaskBtn" onClick={onNew}>+ New Task</button>
        
      </div>
    </header>
  );
}
