import React, { useMemo } from "react";
import Chart from "react-apexcharts";
import "./SimplePieChart.scss";
import { generateColors } from "../../utils/colors.helper";


const SimplePieChart = ({ data, labels }) => {
  const series = [44, 55, 13, 43, 22, 44, 55, 13];
  
  const colors = useMemo(() => {
    return generateColors(["#0954B0", "#FFD22F", "#52C059", "#FF7070", "#FFF9F4"], series.length);
  }, [series]);

  const options = {
    chart: {
      type: "pie",
      fontFamily: "Gilroy, Helvetica, Arial, sans-serif",

    },
    labels: [
      "Team A",
      "Team B",
      "Team C",
      "Team D",
      "Team E",
      "Team F",
      "Team G",
      "Team 8",
      
    ],
    legend: {
      show: true,
      position: "right",
      horizontalAlign: "left",
      layout: "horizontal",
      fontSize: "18px",
      fontFamily: "Gilroy-Bold, Helvetica, Arial",
      fontWeight: 400,
      itemMargin: {
        horizontal: 30,
        vertical: 10,
      },
      width: 400,
      markers: {
        shape: "square",
        radius: 0,
        width: 32, 
        height: 32,
      },
    },
    colors: colors,
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
    <div id="simple-pie-container" className="container min-h-96">
      <Chart options={options} series={series} type="pie" height={400}/>
    </div>
  );
};
export default SimplePieChart;
