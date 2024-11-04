// src/store/companyStore.js
import {create} from 'zustand';
import { persist } from 'zustand/middleware';

export const useCompanyStore = create(
  persist(
    (set) => ({
      companyId: null,
      setCompanyId: (id) => set({ companyId: id }),
    }),
    {
      name: 'company-storage',
      getStorage: () => (typeof window !== 'undefined' ? localStorage : undefined),
    }
  )
);