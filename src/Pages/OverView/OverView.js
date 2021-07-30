import { Box, Grid, Typography } from "@material-ui/core";
import _ from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import mapAPI from "../../API/map/mapAPI";
import LineChart from "../../Components/Chart/LineChart/LineChart";
import WorldMap from "../../Components/Chart/WorldMap/WorldMap";
import Highlight from "../../Components/Highlight/Highlight";
import Loading from "../../Components/Loading/Loading";
import MainLayout from "../../Components/MainLayout/MainLayout";
import { CountriesActions } from "../../Redux/rootActions";
import { addCasesToGEOJson } from "../../utilities/addCasesToGEOJson";

export default function OverView() {
  const [mapData, setMapData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [worldData, setWorldData] = useState([]);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const countries = useSelector((state) => state.CountriesReducer.countries);
  const getMapData = () => {
    setLoading(true);
    import("@highcharts/map-collection/custom/world.geo.json")
      .then((response) => {
        const data = addCasesToGEOJson(countries, response);
        setMapData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log({ err });
        setLoading(false);
      });
  };
  const getChartData = () => {
    setLoading(true);
    mapAPI
      .getWorldwide()
      .then((response) => {
        const data = _.sortBy(response, "Date");
        setWorldData(data);
        dispatch(CountriesActions.getWorldwide(data));
        setLoading(false);
      })
      .catch((err) => {
        console.log({ err });
        setLoading(false);
      });
  };
  const summary = useMemo(() => {
    if (worldData && worldData.length) {
      const latestData = worldData[worldData.length - 1];
      return [
        {
          title: `overview.case`,
          count: latestData.TotalConfirmed,
          type: "confirmed",
        },
        {
          title: `overview.recover`,
          count: latestData.TotalRecovered,
          type: "recovered",
        },
        {
          title: `overview.death`,
          count: latestData.TotalDeaths,
          type: "death",
        },
      ];
    }
    return [];
  }, [worldData]);
  useEffect(getMapData, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(getChartData, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <MainLayout>
      <Typography
        variant="h2"
        component="h2"
        style={{
          fontWeight: "bold",
          marginBottom: "30px",
          textAlign: "center",
        }}
      >
        {t("overview.title")}
      </Typography>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Highlight summary={summary} />
          <Box mt="20px" mb="20px">
            <WorldMap mapData={mapData} />
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <LineChart
                type={["TotalConfirmed", "TotalRecovered", "TotalDeaths"]}
                country={worldData}
              />
            </Grid>
          </Grid>
        </>
      )}
    </MainLayout>
  );
}
