import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import mapAPI from "../../API/map/mapAPI";
import { CountriesActions, CountryActions } from "../../Redux/rootActions";
import _ from "lodash";
import InputTextField from "../../Components/InputTextField/InputTextField";
import MainLayout from "../../Components/MainLayout/MainLayout";

const columns = [
  {
    field: "Country",
    headerName: "Country",
    flex: 3,
  },
  {
    field: "CountryCode",
    headerName: "CountryCode",
    flex: 2,
  },
  {
    field: "TotalConfirmed",
    headerName: "TotalConfirmed",
    type: "number",
    flex: 3,
  },
  {
    field: "TotalRecovered",
    headerName: "TotalRecovered",
    type: "number",
    flex: 3,
  },
  {
    field: "TotalDeaths",
    headerName: "TotalDeaths",
    type: "number",
    flex: 3,
  },
];

export default function Home() {
  const [countries, setCountries] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    mapAPI
      .getAllCountries()
      .then((response) => {
        const countries = _.sortBy(response.Countries, "Country");
        const worldwide = response.Global;
        setCountries(countries);
        dispatch(CountriesActions.getCountries(countries));
        dispatch(CountriesActions.getWorldwide(worldwide));
        setLoading(false);
      })
      .catch((err) => {
        console.log({ err });
        setLoading(false);
      });
  }, []);
  const handleOnChange = useCallback((e, value) => {
    dispatch(CountriesActions.getSelectedCountry(value));
    history.push(`/countries/${value}`);
  }, []);
  return (
    <MainLayout>
      {loading ? (
        <CircularProgress color="secondary" style={{ margin: "0 auto" }} />
      ) : (
        <>
          <InputTextField onChangeCb={handleOnChange} />
          <div style={{ height: 500, width: "100%" }}>
            <DataGrid
              rows={countries}
              getRowId={(row) => row.ID}
              columns={columns}
              pageSize={7}
            />
          </div>
        </>
      )}
    </MainLayout>
  );
}
