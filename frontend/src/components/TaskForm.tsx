"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksApi, Task } from "@/lib/api";

export function TaskForm() {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: tasksApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setTitle("");
      setDueDate("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dueDate) return;
    mutation.mutate({ title, dueDate });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 p-4 bg-white rounded-lg shadow mb-6"
    >
      <h2 className="text-lg font-semibold">Нова задача</h2>
      <input
        type="text"
        placeholder="Назва задачі"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded px-3 py-2 text-sm"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border rounded px-3 py-2 text-sm"
      />
      <button
        type="submit"
        disabled={mutation.isPending}
        className="bg-blue-600 text-white rounded px-4 py-2 text-sm hover:bg-blue-700 disabled:opacity-50"
      >
        {mutation.isPending ? "Створення..." : "Створити задачу"}
      </button>
      {mutation.isError && (
        <p className="text-red-500 text-sm">Помилка при створенні задачі</p>
      )}
    </form>
  );
}
