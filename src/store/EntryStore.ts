import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

interface Entry {
    id: number;
    note: string;
    mood: string;
    energy: number;
    score: number;
    created_at: Date;
}

interface FormData {
    mood: string;
    note: string;
    energy: number;
}

interface EntryStore {
    all_entries: Entry[];
    formData: FormData;
    isLoading: boolean;
    entriesLoading: boolean;
    searchLoading: boolean,
    error: string | null;
    fetchEntries: () => void;
    searchEntries: (query: string) => Promise<void>;
    addEntry: (data: FormData) => Promise<void>;
    updateEntry: (id: number, data: Partial<FormData>) => Promise<void>;
    deleteEntry: (id: number) => Promise<void>;
    setFormData: (data: Partial<FormData>) => void;
    resetFormData: () => void;
}

const initialFormData: FormData = {
    mood: "Good",
    note: "",
    energy: 0,
};

export const useEntryStore = create<EntryStore>((set, get) => ({
    all_entries: [],
    formData: initialFormData,
    isLoading: false,
    entriesLoading: false,
    searchLoading: false,
    error: null,

    fetchEntries: async () => {
        set({ entriesLoading: true, error: null });
        try {
            const res = await axios.get("/entry/all");
            console.log(res.data)
            set({ all_entries: res.data.entries, entriesLoading: false });
        } catch (err: any) {
            set({ entriesLoading: false });
        }
    },

    searchEntries: async (query: string) => {
        if (!query.trim()) {
            return get().fetchEntries()
        }

        set({ searchLoading: true, error: null });
        try {
            const res = await axios.get(`/entry/search?q=${encodeURIComponent(query)}`)
            console.log("Search results", res.data)
            set({ all_entries: res.data.results, searchLoading: false });
        } catch (error) {
            set({ entriesLoading: false });
        }
    },

    addEntry: async(data) => {
        set({ isLoading: true, error: null });
        try {
            const res = await axios.post("/entry/add", {
                note: data.note,
                mood: data.mood,
                energy: data.energy
            })
            set((state) => ({
                all_entries: [...state.all_entries, res.data.entry],
                isLoading: false
            }));
            toast.success(res.data.message)
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
            const status = err.response?.status;
            if (status === 409) {
                toast.error("You've already checked in today ");
            } else {
                toast.error(err.response?.data?.message || err.message);
            }
        }
    },

    updateEntry: async(id, data)=>{
        console.log("📡 updateEntry: starting...", id);
        set({ isLoading: true, error: null });
        try {
            const res = await axios.put(`/entry/${id}`, data);
            console.log("✅ updateEntry: success", res.data);
            set((state) => ({
                all_entries: state.all_entries.map((a) => (a.id === id ? res.data : a)),
                isLoading: false,
            }));
            toast.success(`${res.data.message}`);

        } catch (err:any) {
            set({ error: err.message, isLoading: false });
            toast.error(`${err.message}`);
        }

    },

    deleteEntry: async(id) => {
        console.log("📡 deleteEntry: starting...", id);
        set({ isLoading: true, error: null });
        try {
            const res = await axios.delete(`/entry/${id}`);
            console.log("✅ deleteEntry: success", id);
            set((state) => ({
                all_entries: state.all_entries.filter((a) => (a.id !== id )),
            }));
            toast.success(`${res.data.message}`);

        } catch (err:any) {
            set({ error: err.message, isLoading: false });
            toast.error(`${err.message}`);
        }
    },

    setFormData: (data) => {
        console.log("📝 setFormData:", data);
        set((state) => ({ formData: { ...state.formData, ...data } }));
    },

    resetFormData: () => {
        set({ formData: initialFormData });
    },
}))