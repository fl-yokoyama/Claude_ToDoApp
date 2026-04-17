"use client";

import { useState } from "react";
import type { CreateTaskInput, Priority } from "@/types/task";

interface TaskFormProps {
  onAdd: (input: CreateTaskInput) => Promise<void>;
}

export default function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    await onAdd({ title, priority, category, due_date: dueDate || null });
    setTitle("");
    setPriority("medium");
    setCategory("");
    setDueDate("");
    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-4 flex flex-col gap-3"
    >
      <input
        type="text"
        placeholder="タスク名を入力..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <div className="flex flex-wrap gap-2">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="low">低 (Low)</option>
          <option value="medium">中 (Medium)</option>
          <option value="high">高 (High)</option>
        </select>
        <input
          type="text"
          placeholder="カテゴリ（例: 仕事）"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1 min-w-[120px]"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <button
        type="submit"
        disabled={loading || !title.trim()}
        className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
      >
        {loading ? "追加中..." : "タスクを追加"}
      </button>
    </form>
  );
}
