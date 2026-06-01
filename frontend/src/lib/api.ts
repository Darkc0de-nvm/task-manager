import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export interface Task {
  id: number;
  title: string;
  dueDate: string;
  status: "open" | "completed";
  createdAt: string;
  isOverdue: boolean;
}

export const tasksApi = {
  getAll: (status?: string) =>
    api
      .get<Task[]>("/tasks", { params: status ? { status } : {} })
      .then((r) => r.data),

  create: (data: { title: string; dueDate: string }) =>
    api.post<Task>("/tasks", data).then((r) => r.data),

  complete: (id: number) =>
    api.patch<Task>(`/tasks/${id}/complete`).then((r) => r.data),
};
