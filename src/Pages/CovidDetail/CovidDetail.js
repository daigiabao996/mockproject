import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Highlight from "../../Components/Highlight/Highlight";
import Summary from "../../Components/Summary/Summary";
import mapAPI from "../../API/map/mapAPI";
import { CountryActions } from "../../Redux/rootActions";
import { Typography, CircularProgress } from "@material-ui/core";
import _ from "lodash";
import MainLayout from "../../Components/MainLayout/MainLayout";

export default function CovidDetail() {
  const selectedCountry = useSelector(
    (state) => state.CountriesReducer.selectedCountry
  );
  const countries = useSelector((state) => state.CountriesReducer.countries);
  const [country, setCountry] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    if (selectedCountry) {
      const selectedCountryReport = countries.find(
        (country) => country.Country === selectedCountry
      );
      mapAPI
        .getByCountry(selectedCountryReport.Slug)
        .then((response) => {
          dispatch(CountryActions.getCountry(response));
          setCountry(response);
          setLoading(false);
        })
        .catch((err) => {
          console.log({ err });
          setLoading(false);
        });
    }
  }, [selectedCountry, countries]);
  const summary = useMemo(() => {
    if (country && country.length) {
      const latestData = country[country.length - 1];
      return [
        {
          title: "Số ca nhiễm",
          count: latestData.Confirmed,
          type: "confirmed",
        },
        {
          title: "Khỏi",
          count: latestData.Recovered,
          type: "recovered",
        },
        {
          title: "Tử vong",
          count: latestData.Deaths,
          type: "death",
        },
      ];
    }
    return [];
  }, [country]);
  console.log({ summary });
  return (
    <MainLayout>
      <Typography variant="h3" component="h2" style={{ marginBottom: "15px" }}>
        {selectedCountry}
      </Typography>
      {loading ? (
        <CircularProgress color="secondary" />
      ) : (
        <>
          {/* <InputTextField onChangeCb={handleOnChange} value={selectedCountry} /> */}
          {country.length === 0 ? (
            <Typography variant="h5" component="h2">
              Nước không có bệnh bạn ơi
            </Typography>
          ) : (
            <>
              <Highlight summary={summary} />
              <Summary />
            </>
          )}
        </>
      )}
    </MainLayout>
  );
}
