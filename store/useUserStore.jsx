import { create } from "zustand";

export const useUserStore = create((set) => ({
  username: null,
  password: null,
  token: null,
  updateUsername: (newUsername) =>
    set({
      username: newUsername,
    }),
  updateBears: (newBears) => set({ bears: newBears }),
}));
