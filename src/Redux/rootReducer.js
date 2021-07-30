import { combineReducers } from "redux";
import { CountriesReducer } from "./Slices/countriesSlice";
import { CountryReducer } from "./Slices/countrySlice";
import { NewsReducer } from "./Slices/newsSlice";
import { GlobalReducer } from "./Slices/globalSlice";

const rootReducer = combineReducers({
  CountriesReducer,
  CountryReducer,
  NewsReducer,
  GlobalReducer,
});
export default rootReducer;
