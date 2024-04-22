import React from "react";
import { BarChart } from "../../components/BarChart";

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export const data = {
  labels,
  datasets: [
    {
      barThickness: 20,
      minBarLength: 2,
      label: "Active users",
      data: labels.map(() => getRandomInt(0, 1000)),
      backgroundColor: "#FFD22F",
    },
    {
      barThickness: 20,
      minBarLength: 2,
      label: "New users",
      data: labels.map(() => getRandomInt(0, 1000)),
      backgroundColor: "#0099FF",
    },
  ],
};

const MembersChart = () => {
  return (
    <div className="grid grid-cols-1 gap-4 bg-lightBlue">
      <div className="text-3xl font-bold text-black">Members</div>
      <div>Search Bar</div>
      <div>
        <BarChart data={data} />
      </div>
      <div className="grid grid-cols-subgrid grid-cols-2 gap-4">
        <div className="grid grid-cols-subgrid grid-cols-3">
          <div className="col-span-3 bg-lime-500">Total users</div>
          <div className="col-start-2 bg-red-400">
            <div>1396</div>
            <div>Apr 14, 2024</div>
          </div>
          <div className="bg-sky-400">
            <div>icon</div>
            <div>206</div>
            <div>past month</div>
          </div>
        </div>

        <div className="grid grid-cols-subgrid grid-cols-3">
          <div className="col-span-3 bg-lime-500">New users</div>
          <div className="col-start-2 bg-red-400">
            <div>1396</div>
            <div>Apr 14, 2024</div>
          </div>
          <div className="bg-sky-400">
            <div>icon</div>
            <div>206</div>
            <div>past month</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MembersChart;
