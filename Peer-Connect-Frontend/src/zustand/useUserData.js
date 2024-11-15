import { create } from 'zustand';

const useUserData = create((set) => ({
  userInfo: null,
  setUserInfo: (userInfo) => set({ userInfo }),
}));

export default useUserData;
