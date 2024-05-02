import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useFetchMemebrs from "../../hooks/useFetchMemebrs";
import SearchBar from "../../components/SearchBar";
import SimplePieChart from "../../components/PieChart/SimplePieChart";
import { formattedStatesDataForPieChart } from "../../services/members.services";
import SearchButton from "../../components/SearchButton";
import { SvgToPngConverter } from "../../utils/svg2png.helper";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDF from "../../components/PDF";
import PDFButton from "../../components/PDFButton";

const LocationCard = () => {
  const { members, loading, error, countries, refetchMembers, fetchCountries } =
    useFetchMemebrs({ amount: 500 });
  const selectedCountryRef = useRef(countries[0]);

  const [selectedCountry, setSelectedCountry] = useState({});

  // !!! should not fetch cities, states, members in each card, should create a context for the whole dashboard
  useEffect(() => {
    fetchCountries();
  }, []);
  useEffect(() => {
    setSelectedCountry(countries[0]);
  }, [countries]);

  const { data, stateLabels } = useMemo(() => {
    let country = "";
    if (selectedCountry) {
      country = selectedCountry.content;
    } else if (countries[0]) {
      country = countries[0].content;
    } else {
      country = "";
    }

    const { data, stateLabels } = formattedStatesDataForPieChart(
      country,
      members
    );

    return { data, stateLabels };
  }, [members, countries]);

  const handleSelectCountry = useCallback(
    (country) => {
      setSelectedCountry(country);
    },
    [setSelectedCountry]
  );

  const handleSearch = useCallback(
    ({country}) => {
      // const country = selectedCountry;
      refetchMembers({ country });
    },
    [refetchMembers]
  );

  const renderChart = useMemo(() => {
    return <SimplePieChart data={data} labels={stateLabels} />
  }, [data, stateLabels]);

  const titleRef = useRef();
  const chartRef = useRef();
  const [urlData, setUrlData] = useState(null);
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
      svgToDataURL(chartRef.current.getElementsByClassName("apexcharts-svg")[0]);
    }
  }, [chartRef, titleRef, data, stateLabels]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 gap-4 bg-lightBlue">
      <div ref={titleRef} className="font-['Corben'] text-3xl not-italic font-bold text-black">
        Location
      </div>
      <div className="grid grid-cols-6 gap-4 my-6">
        {selectedCountry && <SearchBar data={countries} handleSelect={handleSelectCountry} value={selectedCountry}/>}
        <SearchButton
          onClick={handleSearch}
          country={selectedCountry?.content}
        />
        <div className="col-end-7">
          {urlData && (
            <PDFDownloadLink
              document={
                <PDF title={"Location"} chart={urlData} />
              }
              filename="chart"
            >
              {({ loading }) => (loading ? <PDFButton /> : <PDFButton />)}
            </PDFDownloadLink>
          )}
        </div>
      </div>

      <div ref={chartRef}>{renderChart}</div>
    </div>
  );
};

export default LocationCard;
