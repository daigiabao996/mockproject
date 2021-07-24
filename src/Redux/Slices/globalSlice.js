import { createSlice } from "@reduxjs/toolkit";

const initialState = { theme: "light", language: "en" };
const globalSlice = createSlice({
  name: "globalSlice",
  initialState: initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.theme = action.payload.theme;
    },
    changeLanguage: (state, action) => {
      state.language = action.payload.language;
    },
  },
});

const { actions, reducer } = globalSlice;
export { actions as GlobalActions, reducer as GlobalReducer };
