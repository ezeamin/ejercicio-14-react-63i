import { create } from "zustand";

export const useEditBlog = create((set) => ({
    blog: null,
    setBlog: (blog) => set({ blog }),
    clearBlog: () => set({ blog: null }),
}));