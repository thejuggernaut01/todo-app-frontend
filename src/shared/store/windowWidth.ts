import { create } from "zustand";

type WindowWidth = number;

type State = {
  windowWidth: WindowWidth;
};

type Action = {
  updatewindowWidth: (data: WindowWidth) => void;
};

export const useWindowWidthState = create<State & Action>((set) => ({
  windowWidth: 0,
  updatewindowWidth: (data: WindowWidth) =>
    set((state) => ({
      windowWidth: data,
    })),
}));
