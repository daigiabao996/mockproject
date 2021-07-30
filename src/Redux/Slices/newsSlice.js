import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  news: [],
  selectedNews: null,
};

const newsSlice = createSlice({
  name: "newsSlice",
  initialState: initialState,
  reducers: {
    getNews: (state, action) => {
      state.news = action.payload;
    },
    getSelectedNews: (state, action) => {
      state.selectedNews = action.payload;
    },
  },
});

const { actions, reducer } = newsSlice;
export { actions as NewsActions, reducer as NewsReducer };
