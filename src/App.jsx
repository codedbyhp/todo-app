import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import TaskModal from "./components/TaskModal";
import TaskList from "./components/TaskList";
import "./styles/App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [dark, setDark] = useState(false);

  
  // Save
  useEffect(() => {
    localStorage.setItem("todo_v3_tasks", JSON.stringify(tasks));
  }, [tasks]);

  
  // Add or update
  function handleSave(task) {
    if (task.id) {
      setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    } else {
      setTasks([{ ...task, id: Date.now() }, ...tasks]);
    }
    setShowModal(false);
    setEditTask(null);
  }

  function handleDelete(id) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  function toggleDone(id) {
    setTasks(tasks.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  // Drag & Drop (HTML5)
  function onDragStart(e, idx) {
    e.dataTransfer.setData("text/plain", String(idx));
    e.currentTarget.style.opacity = "0.6";
  }
  function onDragEnd(e) {
    e.currentTarget.style.opacity = "1";
  }
  function onDrop(e, dropIdx) {
    e.preventDefault();
    const dragIdx = Number(e.dataTransfer.getData("text/plain"));
    if (Number.isNaN(dragIdx)) return;
    const copy = [...tasks];
    const [moved] = copy.splice(dragIdx, 1);
    copy.splice(dropIdx, 0, moved);
    setTasks(copy);
  }
  function onDragOver(e) {
    e.preventDefault();
  }

  // Date helpers
  function isToday(dateStr) {
    if (!dateStr) return false;
    const d = new Date(dateStr);
    const today = new Date();
    return d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate();
  }
  function isTomorrow(dateStr) {
    if (!dateStr) return false;
    const d = new Date(dateStr);
    const t = new Date();
    t.setDate(t.getDate() + 1);
    return d.getFullYear() === t.getFullYear() &&
      d.getMonth() === t.getMonth() &&
      d.getDate() === t.getDate();
  }
  function isThisMonth(dateStr) {
    if (!dateStr) return false;
    const d = new Date(dateStr);
    const today = new Date();
    return d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth();
  }

  // Filtering + Search
  const filtered = useMemo(() => {
    return tasks.filter(t => {
      // search
      if (query && !t.title.toLowerCase().includes(query.toLowerCase())) return false;
      // filter
      if (filter === "All") return true;
      if (filter === "Completed") return t.done;
      if (filter === "In Progress") return !t.done;
      if (filter === "Today") return isToday(t.date);
      if (filter === "Tomorrow") return isTomorrow(t.date);
      if (filter === "Month") return isThisMonth(t.date);
      if (filter.startsWith("Category:")) {
        const cat = filter.split(":")[1];
        return t.category === cat;
      }
      return true;
    });
  }, [tasks, filter, query]);

  // Stats
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.done).length;
    const inprogress = total - completed;
    const today = tasks.filter(t => isToday(t.date)).length;
    return { total, completed, inprogress, today };
  }, [tasks]);

  // Open Edit
  function openEdit(t) {
    setEditTask(t);
    setShowModal(true);
  }

  // Add new
  function openNew() {
    setEditTask(null);
    setShowModal(true);
  }

  return (
    <div className={dark ? "app-container dark" : "app-container"}>
      <Sidebar
        filter={filter}
        setFilter={setFilter}
        stats={stats}
        setDark={setDark}
        
      />

      <div className="main-area">
        <Header
          onNew={openNew}
          query={query}
          setQuery={setQuery}
          dark={dark}
          setDark={setDark}
        />

        <div className="tasks-panel">
          <div className="panel-head">
            <h2>My All Tasks</h2>
            <div className="panel-sub">Manage and track your tasks easily</div>
          </div>

          <SearchBar query={query} setQuery={setQuery} />

          <TaskList
            tasks={filtered}
            toggleDone={toggleDone}
            deleteTask={handleDelete}
            editTask={openEdit}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDrop={onDrop}
            onDragOver={onDragOver}
          />
        </div>
      </div>

      <TaskModal
        show={showModal}
        close={() => setShowModal(false)}
        onSave={handleSave}
        editTask={editTask}
      />
    </div>
  );
}
