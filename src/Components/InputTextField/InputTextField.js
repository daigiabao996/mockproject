import React from "react";
import { useSelector } from "react-redux";
import { TextField, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
// import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from "@material-ui/lab/Autocomplete";

// const useStyles = makeStyles((theme) => ({
//   // formControl: {
//   //   margin: `${theme.spacing(3)}px 0`,
//   //   minWidth: 120,
//   // },
//   // submit: {

//   // }
// }));

export default function InputTextField({ onChangeCb, selectedCountry }) {
  // const classes = useStyles();
  const countries = useSelector((state) => state.CountriesReducer.countries);
  return (
    <div style={{ width: "50%", margin: "0 auto" }}>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={countries.map((option) => option.Country)}
        onChange={onChangeCb}
        value={selectedCountry}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            margin="normal"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              type: "search",
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </div>
  );
}
