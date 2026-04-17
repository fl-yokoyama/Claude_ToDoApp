"use client";

import type { Task } from "@/types/task";

const PRIORITY_STYLES = {
  high: "bg-red-100 text-red-700",
  medium: "bg-yellow-100 text-yellow-700",
  low: "bg-green-100 text-green-700",
} as const;

const PRIORITY_LABELS = {
  high: "高",
  medium: "中",
  low: "低",
} as const;

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const isOverdue =
    task.due_date && !task.completed && task.due_date < new Date().toISOString().slice(0, 10);

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-xl border transition-all ${
        task.completed ? "bg-gray-50 border-gray-100 opacity-60" : "bg-white border-gray-200 shadow-sm"
      }`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id, !task.completed)}
        className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-500 cursor-pointer"
      />
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium truncate ${
            task.completed ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {task.title}
        </p>
        <div className="flex flex-wrap items-center gap-2 mt-1">
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${PRIORITY_STYLES[task.priority]}`}
          >
            {PRIORITY_LABELS[task.priority]}
          </span>
          {task.category && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
              {task.category}
            </span>
          )}
          {task.due_date && (
            <span
              className={`text-xs ${isOverdue ? "text-red-500 font-medium" : "text-gray-400"}`}
            >
              {isOverdue ? "期限切れ: " : "期限: "}
              {task.due_date}
            </span>
          )}
        </div>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="text-gray-300 hover:text-red-400 transition-colors text-lg leading-none flex-shrink-0"
        aria-label="削除"
      >
        ×
      </button>
    </div>
  );
}
