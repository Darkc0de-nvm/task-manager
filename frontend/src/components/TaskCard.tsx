"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksApi, Task } from "@/lib/api";

export function TaskCard({ task }: { task: Task }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => tasksApi.complete(task.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return (
    <div
      className={`p-4 bg-white rounded-lg shadow flex justify-between items-start ${
        task.isOverdue ? "border-l-4 border-red-500" : ""
      }`}
    >
      <div>
        <div className="flex items-center gap-2">
          <h3
            className={`font-medium ${task.status === "completed" ? "line-through text-gray-400" : ""}`}
          >
            {task.title}
          </h3>
          {task.isOverdue && (
            <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
              Прострочено
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Дедлайн: {new Date(task.dueDate).toLocaleDateString("uk-UA")}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">
          Статус: {task.status === "open" ? "Відкрита" : "Виконана"}
        </p>
      </div>
      {task.status === "open" && (
        <button
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending}
          className="text-sm bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700 disabled:opacity-50 ml-4 shrink-0"
        >
          {mutation.isPending ? "..." : "Виконано"}
        </button>
      )}
    </div>
  );
}
