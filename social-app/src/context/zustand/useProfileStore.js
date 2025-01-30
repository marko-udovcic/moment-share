import { create } from "zustand";
export const useProfileStore = create((set) => ({
  currentUser: null,
  isUserLoading: false,
  setCurrentUser: (user) => set({ currentUser: user }),
  setIsUserLoading: (isLoading) => set({ isUserLoading: isLoading }),
  resetProfile: () => set({ currentUser: null, isUserLoading: false }),
}));
