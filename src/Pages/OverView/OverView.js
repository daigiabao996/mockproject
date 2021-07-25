import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import MainLayout from "../../Components/MainLayout/MainLayout";
import WorldMap from "../../Components/WorldMap/WorldMap";
import Highlight from "../../Components/Highlight/Highlight";
import _ from "lodash";

export default function OverView() {
  const [mapData, setMapData] = useState({});
  const countries = useSelector((state) => state.CountriesReducer.countries);
  const worldwide = useSelector((state) => state.CountriesReducer.worldwide);
  console.log({ worldwide });
  const addCasesToGEOJson = (countries, mapData) => {
    let countryList = mapData?.default?.features;
    for (let i = 0; i < countryList.length; i++) {
      let country = countryList[i];
      const covidCountry = countries.find(
        (x) => x.CountryCode === country.properties["iso-a2"]
      );
      if (covidCountry) {
        const cases = covidCountry.TotalConfirmed;
        const textCases = new Intl.NumberFormat().format(cases);
        _.setWith(country, "properties.covidCase", {
          cases: cases,
          textCases: textCases,
        });
      }
      if (!covidCountry) {
        _.setWith(country, "properties.covidCase", {
          cases: 0,
          textCases: "0",
        });
      }
    }
    return countryList;
  };
  const summary = useMemo(() => {
    if (worldwide) {
      return [
        {
          title: "Số ca nhiễm",
          count: worldwide.TotalConfirmed,
          type: "confirmed",
        },
        {
          title: "Khỏi",
          count: worldwide.TotalRecovered,
          type: "recovered",
        },
        {
          title: "Tử vong",
          count: worldwide.TotalDeaths,
          type: "death",
        },
      ];
    }
    return [];
  }, [worldwide]);
  console.log({ summary });
  useEffect(() => {
    import("@highcharts/map-collection/custom/world.geo.json")
      .then((res) => {
        const data = addCasesToGEOJson(countries, res);
        setMapData(data);
      })
      .catch((err) => console.log({ err }));
  }, []);
  return (
    <MainLayout>
      <Highlight summary={summary} />
      <WorldMap mapData={mapData} />
    </MainLayout>
  );
}
