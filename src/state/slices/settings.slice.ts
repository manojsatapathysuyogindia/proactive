import { createSlice,type PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
  darkMode: boolean;
  language: string,
 tab : string;
}

const initialState: SettingsState = {
  darkMode: false,
  language: localStorage.getItem("language") || "en",
  tab: 'regular',
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
      localStorage.setItem("language", action.payload); // Persist
    },
    setOrderTab: (state, action: PayloadAction<string>) => {
      state.tab = action.payload;

    },
  },
});

export const { toggleDarkMode,setLanguage ,setOrderTab} = settingsSlice.actions;
export default settingsSlice.reducer;