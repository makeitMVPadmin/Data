import React, { useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import useResizeChart from "../../hooks/useResizeChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const StackedBarChart = ({ data }) => {
  const options = {
    animation: {
      duration: 0,
    },
    plugins: {
      title: {
        display: false,
        text: "Chart.js Bar Chart - Stacked",
      },
      legend: {
        position: "bottom",
        labels: {
          font: {
            family: "Gilroy-Bold",
            size: 18,
            style: "normal",
            weight: 400,
          },
        },
      },
    },
    responsive: true,
    aspectRatio: 1 | 2,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
      },
    },
  };

  const parentRef = useRef(0);
  const { canvasSize } = useResizeChart(parentRef);

  return (
    <div ref={parentRef}>
      <Bar options={options} data={data} width={canvasSize.width} redraw />
    </div>
  );
};
