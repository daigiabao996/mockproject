import { makeStyles, Select } from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  [theme.breakpoints.up("sm")]: {
    selectionLanguage: {
      color: "black",
      "& option": {
        color: "black",
      },
    },
  },
}));

function SelectionLanguage({ onChangeLanguage, currentLanguage }) {
  const [language, setLanguage] = useState("en");
  const classes = useStyles();
  const handleChangeLanguage = (e) => {
    if (onChangeLanguage) {
      setLanguage(e.target.value);
      onChangeLanguage(e.target.value);
    }
  };
  return (
    <Select
      native
      className={classes.selectionLanguage}
      onChange={handleChangeLanguage}
      value={currentLanguage || language}
      variant="standard"
      inputProps={{
        name: "age",
        id: "filled-age-native-simple",
      }}
    >
      <option value="vi">Tiếng Việt</option>
      <option value="en">English</option>
    </Select>
  );
}

export default SelectionLanguage;
