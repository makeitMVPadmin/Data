import React, { useMemo } from "react";
import { BarChart } from "../../components/BarChart";
import useFetchMemebrs from "../../hooks/useFetchMemebrs";
import { formattedMemebersDataForStackedBarChart } from "../../services/members.services";
import TotalSummary from "../../components/BarChart/TotalSummary";

const MembersChart = () => {
  const { members, loading, error } = useFetchMemebrs(1);

  const data = useMemo(() => {
    const data = formattedMemebersDataForStackedBarChart(members);
    return data;
  }, [members]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const summaries = [
    {
      id: 1,
      title: "Total users",
      currentTotal: 1394,
      currentDate: "Apr 14, 2024",
      pastTotal: 206,
    },
    {
        id: 2,
        title: "New users",
        currentTotal: 21,
        currentDate: "Apr 14, 2024",
        pastTotal: 32,
      },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 bg-lightBlue">
      <div className="font-['Corben'] text-3xl not-italic font-bold text-black">Members</div>
      <div>Search Bar</div>

        <BarChart data={data} />

      <div className="grid grid-cols-2">
        {summaries.map((item) => (
          <TotalSummary key={item.id}
          title={item.title} 
          currentTotal={item.currentTotal}
          currentDate={item.currentDate}
          pastTotal={item.pastTotal}
          />
        ))}
      </div>
    </div>
  );
};
export default MembersChart;
