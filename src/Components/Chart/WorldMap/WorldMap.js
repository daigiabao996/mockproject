import map from "@highcharts/map-collection/custom/world.geo.json";
// Import Highcharts
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMap from "highcharts/modules/map";
import React, { useEffect, useState } from "react";
import "./WorldMap.scss";

HighchartsMap(Highcharts);

const initOptions = {
  chart: {
    borderWidth: 1,
    map: map,
  },
  title: {
    text: "World Covid Cases",
  },

  legend: {
    layout: "horizontal",
    align: "right",
    verticalAlign: "bottom",
  },

  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: "bottom",
    },
  },

  tooltip: {
    backgroundColor: null,
    borderWidth: 0,
    shadow: false,
    useHTML: true,
    pointFormat:
      '<span class="f32"><span class="flag {point.properties.hc-key}"></span></span>' +
      " {point.name}: <b>{point.value}</b> cases",
  },

  colorAxis: {
    dataClasses: [
      {
        color: "#FFDAB9",
        from: 0,
        name: "<500.000",
        to: 5e5 - 1,
      },
      {
        color: "#00FFFF",
        from: 5e5,
        name: ">500.000",
        to: 1e6 - 1,
      },
      {
        color: "#00FF00",
        from: 1e6,
        name: ">1.000.000",
        to: 5e6 - 1,
      },
      {
        color: "	#FFFF00",
        from: 5e6,
        name: ">5.000.000",
        to: 1e7 - 1,
      },
      {
        color: "#FF1493",
        from: 1e7,
        name: ">10.000.000",
        to: 25e6 - 1,
      },
      {
        color: "#FF0000",
        from: 25e6,
        name: ">25.000.000",
      },
    ],
  },

  series: [
    {
      joinBy: ["iso-a2", "code"],
      name: "Covid Cases",
      states: {
        hover: {
          color: "#a4edba",
        },
      },
    },
  ],
};

const WorldMap = ({ mapData }) => {
  const [options, setOptions] = useState({});
  useEffect(() => {
    if (mapData && Object.keys(mapData).length) {
      const database = mapData.map((feature) => ({
        code3: feature.properties["iso-a3"],
        name: feature.properties["name"],
        value:
          feature.properties.covidCase.cases < 1
            ? "none"
            : feature.properties.covidCase.cases,
        code: feature.properties["iso-a2"],
      }));
      setOptions(() => ({
        ...initOptions,
        series: [{ ...initOptions.series[0], data: database }],
      }));
    }
  }, [mapData]);
  return (
    <div className="worldmap">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        constructorType={"mapChart"}
      />
    </div>
  );
};

export default React.memo(WorldMap);
