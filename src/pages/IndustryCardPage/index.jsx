import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useFetchMemebrs from "../../hooks/useFetchMemebrs";
import { formattedMemebersDataForGroupedBarChart } from "../../services/members.services";
import SearchBar from "../../components/SearchBar";
import { GroupedBarChart } from "../../components/BarChart/GroupedBarChart";
import SearchButton from "../../components/SearchButton";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDF from "../../components/PDF";
import PDFButton from "../../components/PDFButton";

const IndustryCard = () => {
  const {
    members,
    loading,
    error,
    cities,
    states,
    refetchMembers,
    fetchCities,
    fetchStates,
  } = useFetchMemebrs({ amount: 500 });
  const selectedCityRef = useRef({});
  const selectedStateRef = useRef({});
  const [selectedCity, setSelectCity] = useState({});
  const [selectedState, setSelectState] = useState({});
  const titleRef = useRef("");
  const chartRef = useRef(null);

  // !!! should not fetch cities, states, members in each card, should create a context for the whole dashboard
  useEffect(() => {
    fetchCities();
    fetchStates();
  }, []);

  useEffect(() => {
    setSelectCity(cities[0]);
  }, [cities]);
  useEffect(() => {
    setSelectState(states[0]);
  }, [states]);

  const { data, labels } = useMemo(() => {
    const { data, labels } = formattedMemebersDataForGroupedBarChart(members);
    return { data, labels };
  }, [members]);

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

  const handleSearch = useCallback(
    ({city, state}) => {
      let query = {};
      if ((city !== "All") & (state !== "All")) {
        query = {
          city,
          state,
        };
      } else {
        setSelectCity(cities[0]);
        setSelectState(states[0]);
      }
      refetchMembers(query);
    },
    [refetchMembers, cities, states]
  );

  const renderChart = useMemo(() => {
    return <GroupedBarChart data={data} labels={labels} />;
  }, [data, labels]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 gap-4 bg-lightBlue">
      <div className="font-['Corben'] text-3xl not-italic font-bold text-black">
        Industry
      </div>
      <div className="grid grid-cols-6 gap-4 my-6">
        {selectedCity && (
          <SearchBar
            data={cities}
            handleSelect={handleSelectCity}
            value={selectedCity}
          />
        )}
        {selectedState && (
          <SearchBar
            data={states}
            handleSelect={handleSelectState}
            value={selectedState}
          />
        )}
        <SearchButton
          onClick={handleSearch}
          city={selectedCity?.content}
          state={selectedState?.content}
        />

        {/* <div className="col-end-7">
          {chartRef.current && (
            <PDFDownloadLink
              document={
                <PDF
                  title={titleRef.current.textContent}
                  chart={chartRef.current.children[0].children[0].toDataURL(
                    "image/png"
                  )}
                />
              }
              filename="chart"
            >
              {({ loading }) => (loading ? <PDFButton /> : <PDFButton />)}
            </PDFDownloadLink>
          )}
        </div> */}
      </div>

      <div ref={chartRef}>{renderChart}</div>
    </div>
  );
};

export default IndustryCard;
