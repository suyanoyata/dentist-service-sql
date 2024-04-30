import { StoreApi, create } from "zustand";

export const useTableLoadingStore = create((set) => ({
  loading: false,
  setLoading: () => set(() => ({ loading: true })),
  notLoading: () => set({ loading: false }),
}));
