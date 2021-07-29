import { Box } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import mapAPI from "../../API/map/mapAPI";
import InputTextField from "../../Components/InputTextField/InputTextField";
import Loading from "../../Components/Loading/Loading";
import MainLayout from "../../Components/MainLayout/MainLayout";
import { CountriesActions } from "../../Redux/rootActions";

const columns = [
  {
    field: "Country",
    headerName: "Country",
    width: 250,
  },
  {
    field: "CountryCode",
    headerName: "CountryCode",
    width: 230,
  },
  {
    field: "TotalConfirmed",
    headerName: "TotalConfirmed",
    type: "number",
    width: 250,
  },
  {
    field: "TotalRecovered",
    headerName: "TotalRecovered",
    type: "number",
    width: 250,
  },
  {
    field: "TotalDeaths",
    headerName: "TotalDeaths",
    type: "number",
    width: 250,
  },
];

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const getAllCountries = () => {
    setLoading(true);
    mapAPI
      .getAllCountries()
      .then((response) => {
        const countriesData = _.sortBy(response.Countries, "Country");
        const value = countriesData.filter((index) =>
          index.Country.toLowerCase().includes(data)
        );
        setCountries(value);
        dispatch(CountriesActions.getCountries(countriesData));
        setLoading(false);
      })
      .catch((err) => {
        console.log({ err });
        setLoading(false);
      });
  };
  useEffect(getAllCountries, [data]); // eslint-disable-line react-hooks/exhaustive-deps
  const handleOnChange = useCallback((e, value) => {
    if (value) {
      dispatch(CountriesActions.getSelectedCountry(value));
      history.push(`/countries/${value}`);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const handleOnChangeFilter = _.debounce((e) => {
    setData(e.target.value);
  }, 500);
  return (
    <MainLayout>
      <Box mb="50px">
        <InputTextField
          onChangeCb={handleOnChange}
          onChangeFilter={handleOnChangeFilter}
          countriesData={data}
        />
      </Box>
      {loading ? (
        <Loading />
      ) : (
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={countries}
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={7}
          />
        </div>
      )}
    </MainLayout>
  );
}
