import { create } from "zustand";

// export const useImageStore = create((set) => ({
//   imageCache: {},
//   addImageToCache: (key, url) =>
//     set((state) => ({ imageCache: { ...state.imageCache, [key]: url } })),
//   getImageFromCache: (key) => state.imageCache[key],
// }));

export const useImageStore = create((set, get) => ({
  fecthed: false,
  imageCache: {},
  addImageToCache: (key, url) =>
    set((state) => ({
      ...state,
      imageCache: { ...state.imageCache, [key]: url },
    })),
  getImageFromCache: (key) => get().imageCache[key],
  updateFetched: (newvalue) => set({ fetched: newvalue }),
}));
