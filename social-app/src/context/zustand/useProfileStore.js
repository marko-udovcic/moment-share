import { create } from "zustand";
export const useProfileStore = create((set) => ({
  currentUser: null,
  userProfile: null,
  isUserLoading: false,
  setCurrentUser: (user) => set({ currentUser: user }),
  setUserProfile: (user) => set({ userProfile: user }),
  setIsUserLoading: (isLoading) => set({ isUserLoading: isLoading }),
  resetProfile: () => set({ userProfile: null }),
}));
