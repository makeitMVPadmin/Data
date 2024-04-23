import React from "react";
import Chart from "react-apexcharts";

// series: [{
//     name: 'Net Profit',
//     data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
//   }, {
//     name: 'Revenue',
//     data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
//   }, {
//     name: 'Free Cash Flow',
//     data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
//   }],
export const GroupedBarChart = (labels) => {
  const series = [
    {
      name: "Net Profit",
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    },
    {
      name: "Revenue",
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
    },
    {
      name: "Free Cash Flow",
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
    },
    {
      name: "Free Cash Flow",
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
    },
    {
      name: "Free Cash Flow",
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
    },
  ];
  const options = {
    chart: {
      fontFamily: "Gilroy, Helvetica, Arial, sans-serif",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
    },
    xaxis: {
      categories: [
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
      labels: {
        style: {
          colors: "#000",
          fontSize: "22px",
          fontFamily: "Gilroy-Bold, Helvetica, Arial, sans-serif",
          fontWeight: 400,
        },
      },
    },
    yaxis: {},
    legend: {
        show: true,
        horizontalAlign: 'left',
        fontSize: '22px',
        fontFamily: 'Gilroy-Bold, Helvetica, Arial',
        fontWeight: 400,
        itemMargin: {
            horizontal: 100,
            vertical: 10
        },


    },
    colors: ["#0954B0", "#FFD22F", "#52C059", "#FF7070", "#FFF9F4"],
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {},
    },
    grid: {
      borderColor: "rgba(0, 0, 0, 0.30)",
    },
  };

  return (
    <>
      <Chart options={options} series={series} type="bar" height={400} />
    </>
  );
};
