import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  country: [],
};

const countrySlice = createSlice({
  name: "countriesSlice",
  initialState: initialState,
  reducers: {
    getCountry: (state, action) => {
      state.country = action.payload;
    },
  },
});
const { actions, reducer } = countrySlice;
export { actions as CountryActions, reducer as CountryReducer };
