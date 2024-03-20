import { create } from "zustand";

type TaskStatus = "false" | "true";

type State = {
  taskStatus: TaskStatus;
};

type Action = {
  updateTaskStatus: (Status: TaskStatus) => void;
};

export const useTaskStatusState = create<State & Action>((set) => ({
  taskStatus: "false",
  updateTaskStatus: (status: TaskStatus) =>
    set((state) => ({
      taskStatus: status,
    })),
}));
