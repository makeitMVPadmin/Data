import React, {
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
import {
  initGroupedBarChartData,
  formattedMemebersDataForGroupedBarChart,
  getCitiesFromMembers,
  getStatesFromMembers,
} from "../../services/members.services";
import SearchInput from "../../components/SearchInput";
import { useMembersData } from "../../contexts/MembersContext";
import { GroupedBarChart } from "../../components/BarChart/GroupedBarChart";
import { SvgToPngConverter } from "../../utils/svg2png.helper";

const IndustryCardRefine = ({isOnDashboard}) => {
  const {
    data: membersData,
    loading: loadingMembersData,
    error: fetchMembersDataError,
  } = useMembersData();
  const members = useMemo(() => membersData.members, [membersData]);

  const [selectedCity, setSelectCity] = useState(null);
  const [selectedState, setSelectState] = useState(null);

  const [chartData, setChartData] = useState(initGroupedBarChartData);

  useEffect(() => {
    // console.log("members: ", members);
    setChartData(formattedMemebersDataForGroupedBarChart([...members]));
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
      setChartData(formattedMemebersDataForGroupedBarChart(data));
    } else if (
      selectedCity.content === "All" &&
      selectedState.content === "All"
    ) {
      setChartData(formattedMemebersDataForGroupedBarChart([...members]));
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
  function svgToDataURL(svgElement) {
    const svgString = new XMLSerializer().serializeToString(svgElement);
    const base64String = btoa(svgString);
    const uriData = `data:image/svg+xml;base64,${base64String}`;

    new SvgToPngConverter().convertFromInput(uriData, function (imgData) {
      setUrlData(imgData);
    });
  }
  useEffect(() => {
    if (chartRef.current) {
        svgToDataURL(chartRef.current.chart.el.getElementsByClassName("apexcharts-svg")[0]);
      }
  }, [setUrlData, chartRef, members, cities, states, chartData]);

  if (fetchMembersDataError)
    return <div>Error: {fetchMembersDataError.message}</div>;

  return (
    <div className="bg-lightBlue" style={{ padding: '20px', width: '100%', border: '3px solid black' }}>
      <div className="grid grid-cols-1 gap-4 bg-lightBlue">
        <div
          className="font-['Corben'] text-3xl not-italic font-bold text-black"
          ref={titleRef}
        >
          Industry
        </div>
        <div className={`grid grid-cols-6 gap-4 my-6 ${isOnDashboard ? "hidden" : ""}`}>
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
                document={<PDF title={"Industry"} chart={urlData} />}
                filename="chart"
              >
                {({ loading }) => (loading ? <PDFButton /> : <PDFButton />)}
              </PDFDownloadLink>
            )}
          </div>
        </div>

        <div>
          <GroupedBarChart
            ref={chartRef}
            data={chartData.data}
            labels={chartData.labels}
          />
        </div>
      </div>
    </div>
  );
};
export default IndustryCardRefine;
