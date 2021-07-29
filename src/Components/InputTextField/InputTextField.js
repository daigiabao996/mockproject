import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";
import { useSelector } from "react-redux";

export default function InputTextField({
  onChangeCb,
  onChangeFilter,
  countriesData,
}) {
  const countries = useSelector((state) => state.CountriesReducer.countries);
  return (
    <div style={{ width: "50%", margin: "0 auto" }}>
      <Autocomplete
        id="auto-highlight"
        autoHighlight
        options={countries.map((option) => option.Country)}
        onChange={onChangeCb}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            margin="normal"
            variant="outlined"
            onChange={onChangeFilter}
            value={countriesData}
            autoFocus
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
    </div>
  );
}
