import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import { Button, ButtonGroup } from '@material-ui/core';

const generateOptions = (customData, title, type) => {
  const categories = customData.map((item) => moment(item.Date).format('DD/MM/YYYY'));

  return {
    chart: {
      height: 500,
    },
    title: {
      text: title,
    },
    xAxis: {
      categories: categories,
      crosshair: true,
    },
    colors: ['red'],
    yAxis: {
      min: 0,
      title: {
        text: null,
      },
      labels: {
        align: 'right',
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
      footerFormat: '</table>',
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
        name: title,
        data: customData.map((item) => item[type]),
      },
    ],
  };
};

export default function LineChart({ title, type }) {
  const [options, setOptions] = useState({});
  const [reportType, setReportType] = useState('all');
  const country = useSelector((state) => state.CountryReducer.country);

  useEffect(() => {
    let customData = [];
    switch (reportType) {
      case 'all':
        customData = country;
        break;
      case '30':
        customData = country.slice(Math.max(country.length - 30, 1));
        break;
      case '7':
        customData = country.slice(Math.max(country.length - 7, 1));
        break;

      default:
        customData = country;
        break;
    }

    setOptions(generateOptions(customData, title, type));
  }, [country, reportType]);

  return (
    <>
      <ButtonGroup
        size='small'
        aria-label='small outlined button group'
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          color={reportType === 'all' ? 'secondary' : ''}
          onClick={() => setReportType('all')}
        >
          Tất cả
        </Button>
        <Button
          color={reportType === '30' ? 'secondary' : ''}
          onClick={() => setReportType('30')}
        >
          30 ngày
        </Button>
        <Button
          color={reportType === '7' ? 'secondary' : ''}
          onClick={() => setReportType('7')}
        >
          7 ngày
        </Button>
      </ButtonGroup>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
}
