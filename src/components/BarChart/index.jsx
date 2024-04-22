import React from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const BarChart = ({ data }) => {
    
  const options = {
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

  return (
    <>
      <Bar options={options} data={data} />;
    </>
  );
};