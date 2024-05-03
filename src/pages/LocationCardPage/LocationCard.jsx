import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import SimplePieChart from "../../components/PieChart/SimplePieChart";
import {
  formattedStatesDataForPieChart,
  initPieChartData,
  getCountriesFromMembers,
} from "../../services/members.services";
import SearchButton from "../../components/SearchButton";
import { SvgToPngConverter } from "../../utils/svg2png.helper";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDF from "../../components/PDF";
import PDFButton from "../../components/PDFButton";
import { useMembersData } from "../../contexts/MembersContext";
import SearchInput from "../../components/SearchInput";

const LocationCardRefine = () => {
  const {
    data: membersData,
    loading: loadingMembersData,
    error: fetchMembersDataError,
  } = useMembersData();
  const members = useMemo(() => membersData.members, [membersData]);

  const [selectedCountry, setSelectedCountry] = useState({});

  const [chartData, setChartData] = useState(initPieChartData);

  const filterMembersByCountry = useCallback(
    (selectedCountry) => {
      if (selectedCountry) {
        const data = members.filter(
          (user) => user.country === selectedCountry.content
        );
        setChartData(formattedStatesDataForPieChart(data));
      } else {
        setChartData(formattedStatesDataForPieChart([...members]));
      }
    },
    [members, setChartData]
  );

  const countries = useMemo(() => {
    console.log("countries memo", members);
    const data = getCountriesFromMembers([...members]);
    return data;
  }, [members]);

  const handleSelectCountry = useCallback(
    (country) => {
      setSelectedCountry(country);
    },
    [setSelectedCountry]
  );

  useEffect(() => {
    
    if (countries.length > 0) {
        console.log("init: ", countries);
      setSelectedCountry(countries[0]);
      filterMembersByCountry(countries[0]);
    }
  }, [countries, setSelectedCountry, filterMembersByCountry]);

  const handleSearch = useCallback(() => {
    filterMembersByCountry(selectedCountry);
  }, [selectedCountry, filterMembersByCountry]);

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
      svgToDataURL(
        chartRef.current.chart.el.getElementsByClassName("apexcharts-svg")[0]
      );
    }
  }, [setUrlData, chartRef, members, countries, chartData]);

  if (fetchMembersDataError)
    return <div>Error: {fetchMembersDataError.message}</div>;

  return (
    <div className="grid grid-cols-1 gap-4 bg-lightBlue">
      <div
        ref={titleRef}
        className="font-['Corben'] text-3xl not-italic font-bold text-black"
      >
        Location
      </div>
      <div className="grid grid-cols-6 gap-4 my-6">
        {selectedCountry && (
          <SearchInput
            data={countries}
            handleSelect={handleSelectCountry}
            selected={selectedCountry}
          />
        )}
        <SearchButton
          onClick={handleSearch}
          country={selectedCountry?.content}
        />
        <div className="col-end-7">
          {urlData && (
            <PDFDownloadLink
              document={<PDF title={"Location"} chart={urlData} />}
              filename="chart"
            >
              {({ loading }) => (loading ? <PDFButton /> : <PDFButton />)}
            </PDFDownloadLink>
          )}
        </div>
      </div>

      <SimplePieChart
        ref={chartRef}
        data={chartData.data}
        labels={chartData.stateLabels}
      />
    </div>
  );
};

export default LocationCardRefine;
