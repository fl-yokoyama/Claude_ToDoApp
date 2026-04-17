"use client";

import { useEffect, useMemo, useState } from "react";
import FilterBar from "@/components/FilterBar";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import type { CreateTaskInput, FilterState, Task } from "@/types/task";

const DEFAULT_FILTER: FilterState = {
  priority: "all",
  category: "",
  completed: "all",
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterState>(DEFAULT_FILTER);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tasks")
      .then((r) => r.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      });
  }, []);

  async function handleAdd(input: CreateTaskInput) {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const newTask: Task = await res.json();
    setTasks((prev) => [newTask, ...prev]);
  }

  async function handleToggle(id: string, completed: boolean) {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    const updated: Task = await res.json();
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }

  async function handleDelete(id: string) {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  const categories = useMemo(
    () => Array.from(new Set(tasks.map((t) => t.category).filter(Boolean))),
    [tasks]
  );

  const filtered = useMemo(() => {
    return tasks.filter((t) => {
      if (filter.completed === "active" && t.completed) return false;
      if (filter.completed === "done" && !t.completed) return false;
      if (filter.priority !== "all" && t.priority !== filter.priority) return false;
      if (filter.category && t.category !== filter.category) return false;
      return true;
    });
  }, [tasks, filter]);

  const stats = useMemo(() => ({
    total: tasks.length,
    done: tasks.filter((t) => t.completed).length,
  }), [tasks]);

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My ToDo</h1>
        <p className="text-sm text-gray-400 mt-1">
          {stats.done} / {stats.total} 完了
        </p>
      </header>

      <div className="flex flex-col gap-4">
        <TaskForm onAdd={handleAdd} />
        <FilterBar filter={filter} categories={categories} onChange={setFilter} />
        {loading ? (
          <div className="text-center py-12 text-gray-400 text-sm">読み込み中...</div>
        ) : (
          <TaskList tasks={filtered} onToggle={handleToggle} onDelete={handleDelete} />
        )}
      </div>
    </main>
  );
}
