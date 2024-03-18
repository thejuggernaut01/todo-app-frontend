import { create } from "zustand";

type UserData = {
  _id: number;
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
  [key: string]: string | number | boolean | undefined | null;
};

type State = {
  userData: UserData[];
};

type Action = {
  updateUserData: (data: UserData) => void;
};

export const useUserDataState = create<State & Action>((set) => ({
  userData: [],
  updateUserData: (data: UserData) =>
    set((state) => ({
      userData: [...state.userData, data],
    })),
}));
