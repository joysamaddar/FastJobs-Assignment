import { create } from 'zustand'

export const dataStore = create((set) => ({
  data: [],
  setData: (data: []) => set({ data }),
}))
