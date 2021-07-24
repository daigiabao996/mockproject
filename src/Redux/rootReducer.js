import { combineReducers } from "redux";
import { CountriesReducer } from "./Slices/countriesSlice";
import { CountryReducer } from "./Slices/countrySlice";
import { GlobalReducer } from "./Slices/globalSlice";

const rootReducer = combineReducers({
  CountriesReducer,
  CountryReducer,
  GlobalReducer,
});
export default rootReducer;
