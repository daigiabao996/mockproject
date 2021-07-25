import React, { useEffect, useState } from "react";
// Import Highcharts
import Highcharts from "highcharts";
import HighchartsMap from "highcharts/modules/map";
import HighchartsReact from "highcharts-react-official";

import map from "@highcharts/map-collection/custom/world.geo.json";

HighchartsMap(Highcharts);

const initOptions = {
  chart: {
    borderWidth: 1,
    map: map,
  },
  title: {
    text: "World covid-19 by country",
  },
  legend: {
    enabled: false,
  },
  colorAxis: {
    min: 0,
    stops: [
      [0.2, "#FFC4AA"],
      [0.4, "#FF8A66"],
      [0.6, "#FF392B"],
      [0.8, "#B71525"],
      [1, "	#7A0826"],
    ],
  },
  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: "bottom",
    },
  },

  series: [
    {
      name: "Countries",
      color: "#E0E0E0",
      enableMouseTracking: false,
    },
    {
      type: "mapbubble",
      name: "Cases covid-19",
      joinBy: ["iso-a3", "code3"],
      minSize: 4,
      maxSize: "12%",
      tooltip: {
        pointFormat: "{point.properties.name}: {point.z} cases",
      },
    },
  ],
};

const HighMaps = ({ mapData }) => {
  const [options, setOptions] = useState({});
  useEffect(() => {
    if (mapData && Object.keys(mapData).length) {
      const database = mapData.map((feature) => ({
        code3: feature.properties["iso-a3"],
        z: feature.properties.covidCase.cases,
      }));
      console.log({ database });
      setOptions(() => ({
        ...initOptions,
        series: [
          {
            ...initOptions.series[0],
          },
          { ...initOptions.series[1], data: database },
        ],
      }));
    }
  }, [mapData]);
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      constructorType={"mapChart"}
    />
  );
};

export default React.memo(HighMaps);
