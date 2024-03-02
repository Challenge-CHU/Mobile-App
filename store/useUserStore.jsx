import { create } from "zustand";

export const useUserStore = create((set) => ({
  username: "",
  password: null,
  token: null,
  updateUsername: (newUsername) =>
    set({
      username: newUsername,
    }),
  updateBears: (newBears) => set({ bears: newBears }),
}));
