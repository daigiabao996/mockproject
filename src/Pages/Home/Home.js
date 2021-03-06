import { Box } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import mapAPI from "../../API/map/mapAPI";
import InputTextField from "../../Components/InputTextField/InputTextField";
import Loading from "../../Components/Loading/Loading";
import MainLayout from "../../Components/MainLayout/MainLayout";
import { CountriesActions } from "../../Redux/rootActions";

const columns = (name) => [
  {
    field: "Country",
    headerName: name.arr[0],
    width: 250,
  },
  {
    field: "CountryCode",
    headerName: name.arr[1],
    width: 230,
  },
  {
    field: "TotalConfirmed",
    headerName: name.arr[2],
    type: "number",
    width: 250,
  },
  {
    field: "TotalRecovered",
    headerName: name.arr[3],
    type: "number",
    width: 250,
  },
  {
    field: "TotalDeaths",
    headerName: name.arr[4],
    type: "number",
    width: 250,
  },
];

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const name = {
    arr: [
      t("home.country"),
      t("home.countrycode"),
      t("home.case"),
      t("home.recover"),
      t("home.death"),
    ],
  };
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
        />
      </Box>
      {loading ? (
        <Loading />
      ) : (
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={countries}
            getRowId={(row) => row.ID}
            columns={columns(name)}
            pageSize={7}
          />
        </div>
      )}
    </MainLayout>
  );
}
