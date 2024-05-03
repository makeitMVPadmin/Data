import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import SearchButton from "../../components/SearchButton";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDF from "../../components/PDF";
import PDFButton from "../../components/PDFButton";
import TotalSummary from "../../components/BarChart/TotalSummary";
import { StackedBarChart } from "../../components/BarChart/StackedBarChart";
import {
  initStackedBarChartData,
  formattedMemebersDataForStackedBarChart,
  getCitiesFromMembers,
  getStatesFromMembers,
} from "../../services/members.services";
import SearchInput from "../../components/SearchInput";
import { useMembersData } from "../../contexts/MembersContext";

const MembersCardRefine = () => {
  const {
    data: membersData,
    loading: loadingMembersData,
    error: fetchMembersDataError,
  } = useMembersData();
  const members = useMemo(()=>membersData.members, [membersData]);

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

  const [selectedCity, setSelectCity] = useState(null);
  const [selectedState, setSelectState] = useState(null);

  const [chartData, setChartData] = useState(initStackedBarChartData);

  useEffect(() => {
    console.log(members);
    setChartData(formattedMemebersDataForStackedBarChart([...members]));
  }, [members]);

  const cities = useMemo(() => {
    const data = getCitiesFromMembers([...members]);
    return data;
  }, [members]);

  const states = useMemo(() => {
    const data = getStatesFromMembers([...members]);
    return data;
  }, [members]);

  useEffect(() => {
    setSelectCity(cities[0]);
  }, [cities]);
  useEffect(() => {
    setSelectState(states[0]);
  }, [states]);

  const handleSearch = useCallback(() => {
    if (selectedCity.content !== "All" && selectedState.content !== "All") {
      const data = members.filter(
        (user) =>
          user.city === selectedCity.content &&
          user.state === selectedState.content
      );
      setChartData(formattedMemebersDataForStackedBarChart(data));
    } else if (
      selectedCity.content === "All" &&
      selectedState.content === "All"
    ) {
      setChartData(formattedMemebersDataForStackedBarChart(members));
    }
  }, [members, setChartData, selectedCity, selectedState]);

  const handleSelectCity = useCallback(
    (cityItem) => {
      setSelectCity(cityItem);
    },
    [setSelectCity]
  );

  const handleSelectState = useCallback(
    (stateItem) => {
      setSelectState(stateItem);
    },
    [setSelectState]
  );

  const [urlData, setUrlData] = useState(null);
  const titleRef = useRef("");
  const chartRef = useRef(null);

  useEffect(() => {
    setUrlData(chartRef.current?.canvas.toDataURL("image/png"));
  }, [setUrlData, chartRef, members, cities, states, chartData]);

  if (fetchMembersDataError) return <div>Error: {fetchMembersDataError.message}</div>;

  return (
    <div className="grid grid-cols-1 gap-4 bg-lightBlue">
      <div
        className="font-['Corben'] text-3xl not-italic font-bold text-black"
        ref={titleRef}
      >
        Members
      </div>
      <div className="grid grid-cols-6 gap-4 my-6">
        {cities && selectedCity && states && selectedState && (
          <>
            <SearchInput
              data={cities}
              handleSelect={handleSelectCity}
              selected={selectedCity}
            />

            <SearchInput
              data={states}
              handleSelect={handleSelectState}
              selected={selectedState}
            />

            <SearchButton onClick={handleSearch} />
          </>
        )}

        <div className="col-end-7 max-w-max">
          {urlData && chartData && chartRef && (
            <PDFDownloadLink
              document={<PDF title={"Members"} chart={urlData} />}
              filename="chart"
            >
              {({ loading }) => (loading ? <PDFButton /> : <PDFButton />)}
            </PDFDownloadLink>
          )}
        </div>
      </div>

      <div>
        <StackedBarChart ref={chartRef} data={chartData} />
      </div>

      <div className="grid grid-cols-2">
        {summaries.map((item) => (
          <TotalSummary
            key={item.id}
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
export default MembersCardRefine;
