import React, { useMemo } from "react";
import { BarChart } from "../../components/BarChart";
import useFetchMemebrs from "../../hooks/useFetchMemebrs";
import { formattedMemebersDataForStackedBarChart } from "../../services/members.services";

const MembersChart = () => {
  const { members, loading, error } = useFetchMemebrs(1);

  const data = useMemo(() => {
    const data = formattedMemebersDataForStackedBarChart(members);
    return data;
  }, [members]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 gap-4 bg-lightBlue">
      <div className="text-3xl font-bold text-black">Members</div>
      <div>Search Bar</div>
      <div>
        <BarChart data={data} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid grid-cols-3 gap-4">
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

        <div className="grid grid-cols-3 gap-4">
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
