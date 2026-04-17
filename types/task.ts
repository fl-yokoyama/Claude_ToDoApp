export type Priority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  category: string;
  due_date: string | null;
  created_at: string;
}

export interface CreateTaskInput {
  title: string;
  priority: Priority;
  category: string;
  due_date: string | null;
}

export interface UpdateTaskInput {
  title?: string;
  completed?: boolean;
  priority?: Priority;
  category?: string;
  due_date?: string | null;
}

export type FilterState = {
  priority: Priority | "all";
  category: string;
  completed: "all" | "active" | "done";
};
