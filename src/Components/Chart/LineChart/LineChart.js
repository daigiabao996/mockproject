import { Button, ButtonGroup } from "@material-ui/core";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const generateOptions = (customData, type, title, name) => {
  const categories = customData.map((item) =>
    moment(item.Date).format("DD/MM/YYYY")
  );

  return {
    chart: {
      height: 500,
      zoomType: "x",
    },
    title: {
      text: title,
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
        name: name.arr[0],
        data: customData.map((item) => item[type[0]]),
        color: "yellow",
      },
      {
        name: name.arr[1],
        data: customData.map((item) => item[type[1]]),
        color: "green",
      },
      {
        name: name.arr[2],
        data: customData.map((item) => item[type[2]]),
        color: "red",
      },
    ],
  };
};

export default function LineChart({ country, type }) {
  const { t } = useTranslation();
  const [options, setOptions] = useState({});
  const [reportType, setReportType] = useState("all");
  const title = t("overview.overview");
  const name = {
    arr: [t("overview.case"), t("overview.recover"), t("overview.death")],
  };
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
    setOptions(generateOptions(customData, type, title, name));
  }, [country, reportType, title]); // eslint-disable-line react-hooks/exhaustive-deps

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
          {t("overview.allday")}
        </Button>
        <Button
          color={reportType === "30" ? "secondary" : ""}
          onClick={() => setReportType("30")}
        >
          {t("overview.30day")}
        </Button>
        <Button
          color={reportType === "7" ? "secondary" : ""}
          onClick={() => setReportType("7")}
        >
          {t("overview.7day")}
        </Button>
      </ButtonGroup>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
}
