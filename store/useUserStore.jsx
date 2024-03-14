import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

// export const useUserStore = create((set) => ({
//   userId: null,
//   identifier: null,
//   username: null,
//   password: null,
//   token: null,
//   notificationToken: null,
//   profilIcon: null,

//   updateUsername: (newUsername) =>
//     set({
//       username: newUsername,
//     }),
//   updateIdentifier: (newIdentifier) =>
//     set({
//       identifier: newIdentifier,
//     }),
//   updatePassword: (newPassword) =>
//     set({
//       password: newPassword,
//     }),
//   updateToken: (newToken) =>
//     set({
//       token: newToken,
//     }),
//   updateNotificationToken: (newNotificationToken) =>
//     set({
//       notificationToken: newNotificationToken,
//     }),
//   updateProfilIcon: (newProfileIcon) => set({ profilIcon: newProfileIcon }),
//   updateUserId: (newId) => set({ userId: newId }),
// }));

export const useUserStore = create(
  persist(
    (set, get) => ({
      userId: null,
      identifier: null,
      username: null,
      password: null,
      token: null,
      notificationToken: null,
      profilIcon: null,
      friends: [],
      badges: [],
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
      updateUserId: (newId) => set({ userId: newId }),
      updateBadges: (newBadges) => set({ badges: newBadges }),
      updateFriends: (newFriends) => set({ friends: newFriends }),
    }),
    {
      name: "user", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);


