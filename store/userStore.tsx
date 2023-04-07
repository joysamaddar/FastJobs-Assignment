import { create } from 'zustand'

export const userStore = create((set) => ({
  user: null,
  setUser: (user: string) => set({ user }),
  removeUser: () => set({ user: null }),
}))
