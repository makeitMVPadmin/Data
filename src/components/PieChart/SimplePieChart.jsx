import React, { forwardRef, memo, useMemo } from "react";
import Chart from "react-apexcharts";
import "./SimplePieChart.scss";
import {
  generateDynamicColors
} from "../../utils/colors.helper";

const SimplePieChart = memo(forwardRef(({ data, labels }, ref) => {
//   const series = [44, 55, 13, 43, 22, 44, 55, 13];
//   const [series, setseries] = useState(data);

  const colors = useMemo(() => {
    return generateDynamicColors(
      ["#0954B0", "#FFD22F", "#52C059", "#FF7070", "#FFF9F4"],
      data.length,
      {
        hueShift: 20,
        lightnessRange: [0.5, 0.8],
        saturationRange: [0.5, 1],
      }
    );
  }, [data]);

  const options = {
    chart: {
      type: "pie",
      fontFamily: "Gilroy, Helvetica, Arial, sans-serif",
      animations: {
        enabled: false,
      }
    },
    labels: labels,
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
        vertical: 20,
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
      <Chart ref={ref} options={options} series={data} type="pie" height={400} />
    </div>
  );
}));
export default SimplePieChart;
