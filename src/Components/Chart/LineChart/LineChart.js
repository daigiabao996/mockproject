import { Button, ButtonGroup } from "@material-ui/core";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";
import React, { useEffect, useState } from "react";

const generateOptions = (customData, type) => {
  const categories = customData.map((item) =>
    moment(item.Date).format("DD/MM/YYYY")
  );

  return {
    chart: {
      height: 500,
      zoomType: "x",
    },
    title: {
      text: "Tình hình covid trong nước",
    },
    xAxis: {
      categories: categories,
      crosshair: true,
    },
    colors: ["red"],
    yAxis: {
      min: 0,
      title: {
        text: null,
      },
      labels: {
        align: "right",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Tổng số ca nhiễm",
        data: customData.map((item) => item[type[0]]),
        color: "yellow",
      },
      {
        name: "Tổng số ca khỏi",
        data: customData.map((item) => item[type[1]]),
        color: "green",
      },
      {
        name: "Tổng số ca chết",
        data: customData.map((item) => item[type[2]]),
        color: "red",
      },
    ],
  };
};

export default function LineChart({ country, type }) {
  const [options, setOptions] = useState({});
  const [reportType, setReportType] = useState("all");
  useEffect(() => {
    let customData = [];
    switch (reportType) {
      case "all":
        customData = country;
        break;
      case "30":
        customData = country.slice(country.length - 30);
        break;
      case "7":
        customData = country.slice(country.length - 7);
        break;

      default:
        customData = country;
        break;
    }
    setOptions(generateOptions(customData, type));
  }, [country, reportType]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <ButtonGroup
        size="small"
        aria-label="small outlined button group"
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          color={reportType === "all" ? "secondary" : ""}
          onClick={() => setReportType("all")}
        >
          Tất cả
        </Button>
        <Button
          color={reportType === "30" ? "secondary" : ""}
          onClick={() => setReportType("30")}
        >
          30 ngày
        </Button>
        <Button
          color={reportType === "7" ? "secondary" : ""}
          onClick={() => setReportType("7")}
        >
          7 ngày
        </Button>
      </ButtonGroup>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
}