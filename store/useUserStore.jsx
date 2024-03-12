import { create } from "zustand";

export const useUserStore = create((set) => ({
  identifier: null,
  username: null,
  password: null,
  token: null,
  notificationToken: null,
  profilIcon: null,

  updateUsername: (newUsername) =>
    set({
      username: newUsername,
    }),
  updateIdentifier: (newIdentifier) =>
    set({
      identifier: newIdentifier,
    }),
  updatePassword: (newPassword) =>
    set({
      password: newPassword,
    }),
  updateToken: (newToken) =>
    set({
      token: newToken,
    }),
  updateNotificationToken: (newNotificationToken) =>
    set({
      notificationToken: newNotificationToken,
    }),
  updateProfilIcon: (newProfileIcon) => set({ profilIcon: newProfileIcon }),
}));
