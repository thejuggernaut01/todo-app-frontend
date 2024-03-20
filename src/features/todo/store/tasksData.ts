import { create } from "zustand";
import { TasksDataProps } from "@/shared/types/task";

type State = {
  tasksData: TasksDataProps[];
};

type Action = {
  updateTasksData: (data: TasksDataProps[]) => void;
};

export const useTasksDataState = create<State & Action>((set) => ({
  tasksData: [],
  updateTasksData: (data: TasksDataProps[]) =>
    set((state) => ({
      tasksData: data,
    })),
}));
