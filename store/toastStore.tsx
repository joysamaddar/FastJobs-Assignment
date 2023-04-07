import { create } from "zustand";

export const toastStore = create((set) => ({
  show: false,
  setShow: (val: boolean) => set({ show: val }),
}))