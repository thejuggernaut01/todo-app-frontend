import { create } from "zustand";

type TasksData = {
  _id: number;
  title: string;
  important: boolean;
  completed: boolean;
};

type State = {
  tasksData: TasksData[];
};

type Action = {
  updateTasksData: (data: TasksData[]) => void;
};

export const useTasksDataState = create<State & Action>((set) => ({
  tasksData: [],
  updateTasksData: (data: TasksData[]) =>
    set((state) => ({
      tasksData: data,
    })),
}));
