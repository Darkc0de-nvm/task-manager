"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { tasksApi } from "@/lib/api";
import { TaskForm } from "@/components/TaskForm";
import { TaskCard } from "@/components/TaskCard";

export default function Home() {
  const [filter, setFilter] = useState<string | undefined>(undefined);

  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tasks", filter],
    queryFn: () => tasksApi.getAll(filter),
  });

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Менеджер задач</h1>

      <TaskForm />

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter(undefined)}
          className={`px-3 py-1.5 rounded text-sm ${!filter ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
        >
          Всі
        </button>
        <button
          onClick={() => setFilter("open")}
          className={`px-3 py-1.5 rounded text-sm ${filter === "open" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
        >
          Відкриті
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-3 py-1.5 rounded text-sm ${filter === "completed" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
        >
          Виконані
        </button>
      </div>

      {isLoading && <p className="text-gray-500">Завантаження...</p>}
      {isError && <p className="text-red-500">Помилка завантаження задач</p>}

      <div className="flex flex-col gap-3">
        {tasks?.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {tasks?.length === 0 && (
          <p className="text-gray-400 text-center py-8">Задач немає</p>
        )}
      </div>
    </main>
  );
}
