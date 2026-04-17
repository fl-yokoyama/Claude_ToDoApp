"use client";

import type { FilterState, Priority } from "@/types/task";

interface FilterBarProps {
  filter: FilterState;
  categories: string[];
  onChange: (filter: FilterState) => void;
}

export default function FilterBar({ filter, categories, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <select
        value={filter.completed}
        onChange={(e) =>
          onChange({ ...filter, completed: e.target.value as FilterState["completed"] })
        }
        className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="all">すべて</option>
        <option value="active">未完了</option>
        <option value="done">完了済み</option>
      </select>

      <select
        value={filter.priority}
        onChange={(e) =>
          onChange({ ...filter, priority: e.target.value as Priority | "all" })
        }
        className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="all">優先度: すべて</option>
        <option value="high">高</option>
        <option value="medium">中</option>
        <option value="low">低</option>
      </select>

      <select
        value={filter.category}
        onChange={(e) => onChange({ ...filter, category: e.target.value })}
        className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">カテゴリ: すべて</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {(filter.completed !== "all" || filter.priority !== "all" || filter.category !== "") && (
        <button
          onClick={() => onChange({ completed: "all", priority: "all", category: "" })}
          className="text-xs text-gray-400 hover:text-gray-600 underline"
        >
          リセット
        </button>
      )}
    </div>
  );
}
