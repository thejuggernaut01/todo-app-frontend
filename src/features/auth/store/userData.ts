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
  userData: UserData & { fullName: string }; // Include fullName in UserData
};

type Action = {
  updateUserData: (data: UserData) => void;
};

export const useUserDataState = create<State & Action>((set) => ({
  userData: {
    _id: 0,
    firstName: "",
    lastName: "",
    email: "",
    isVerified: false,
    fullName: "", // Initialize fullName
  },
  updateUserData: (data: UserData) =>
    set((state) => ({
      userData: {
        ...data,
        fullName: `${data.firstName} ${data.lastName}`, // Compute fullName
      },
    })),
}));
