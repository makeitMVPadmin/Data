import React from "react";
import Chart from "react-apexcharts";

const SimplePieChart = ({ data, labels }) => {
  const series = [44, 55, 13, 43, 22];

  const options = {
    chart: {
      width: 400,
      type: "pie",
      fontFamily: "Gilroy, Helvetica, Arial, sans-serif",
    },
    labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
    legend: {
      show: true,
      position: "right",
      horizontalAlign: "left",
      fontSize: "22px",
      fontFamily: "Gilroy-Bold, Helvetica, Arial",
      fontWeight: 400,
      itemMargin: {
        horizontal: 100,
        vertical: 10,
      },
    },
    colors: ["#0954B0", "#FFD22F", "#52C059", "#FF7070", "#FFF9F4"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <>
      <Chart options={options} series={series} type="pie" width={400} />
    </>
  );
};
export default SimplePieChart;
