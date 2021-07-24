import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countries: [],
  selectedCountry: null,
};

const countriesSlice = createSlice({
  name: "countriesSlice",
  initialState: initialState,
  reducers: {
    getCountries: (state, action) => {
      state.countries = action.payload;
    },
    getSelectedCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
  },
});

const { actions, reducer } = countriesSlice;
export { actions as CountriesActions, reducer as CountriesReducer };
