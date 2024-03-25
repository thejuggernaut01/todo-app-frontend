import { create } from "zustand";

type State = {
  isOpen: boolean;
};

type Action = {
  setIsOpen: (isOpen: boolean) => void;
};

export const useAddTaskState = create<State & Action>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) =>
    set((state) => ({
      isOpen: isOpen,
    })),
}));

export const useViewTaskState = create<State & Action>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) =>
    set((state) => ({
      isOpen: isOpen,
    })),
}));
