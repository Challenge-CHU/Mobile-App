import { create } from "zustand";

export const useUserStore = create((set) => ({
  username: null,
  password: null,
  token: null,
}));
