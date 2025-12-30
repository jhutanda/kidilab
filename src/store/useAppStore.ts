import { create } from 'zustand';

type ViewState = 'home' | 'alphabet' | 'numbers' | 'game' | 'poem' | 'art';

interface AppState {
    currentView: ViewState;
    setView: (view: ViewState) => void;
    // Learning Progress
    stars: number;
    addStars: (amount: number) => void;
    // AI State
    isSpeaking: boolean;
    setIsSpeaking: (speaking: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
    currentView: 'home',
    setView: (view) => set({ currentView: view }),
    stars: 0,
    addStars: (amount) => set((state) => ({ stars: state.stars + amount })),
    isSpeaking: false,
    setIsSpeaking: (speaking) => set({ isSpeaking: speaking }),
}));
