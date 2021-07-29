import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import mapAPI from "../../API/map/mapAPI";
import Highlight from "../../Components/Highlight/Highlight";
import Loading from "../../Components/Loading/Loading";
import MainLayout from "../../Components/MainLayout/MainLayout";
import Summary from "../../Components/Summary/Summary";
import { CountryActions } from "../../Redux/rootActions";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(8),
    textAlign: "center",
  },
  highlight: {
    textAlign: "center",
  },
}));

export default function CovidDetail() {
  const classes = useStyles();
  const selectedCountry = useSelector(
    (state) => state.CountriesReducer.selectedCountry
  );
  const countries = useSelector((state) => state.CountriesReducer.countries);
  const [country, setCountry] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const getSelectedCountry = () => {
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
  };
  useEffect(getSelectedCountry, [selectedCountry, countries]); // eslint-disable-line react-hooks/exhaustive-deps
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
  return (
    <MainLayout>
      <Typography variant="h3" component="h2" className={classes.title}>
        {selectedCountry}
      </Typography>
      {loading ? (
        <Loading />
      ) : (
        <>
          {country.length === 0 ? (
            <Typography variant="h5" component="h2" className={classes.title}>
              API cùi mía nên một số nước nó không có dữ liệu á!!!
            </Typography>
          ) : (
            <>
              <Highlight summary={summary} className={classes.highlight} />
              <Summary country={country} />
            </>
          )}
        </>
      )}
    </MainLayout>
  );
}
