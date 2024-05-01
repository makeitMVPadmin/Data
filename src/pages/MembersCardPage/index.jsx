import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StackedBarChart } from "../../components/BarChart/StackedBarChart";
import useFetchMemebrs from "../../hooks/useFetchMemebrs";
import { formattedMemebersDataForStackedBarChart } from "../../services/members.services";
import TotalSummary from "../../components/BarChart/TotalSummary";
import SearchBar from "../../components/SearchBar";

// have to be community cities and states
// const cities = [
//   { id: 0, content: "All" },
//   { id: 1, content: "Boston" },
//   { id: 2, content: "St. Louis" },
//   { id: 3, content: "Wilmington" },
// ];

// const states = [
//   { id: 0, content: "All" },
//   { id: 1, content: "NC" },
//   { id: 2, content: "MO" },
//   { id: 3, content: "MA" },
// ];

const MembersCard = () => {
  const {
    members,
    loading,
    error,
    cities,
    states,
    refetchMembers,
    fetchCities,
    fetchStates,
  } = useFetchMemebrs({});
  const selectedCityRef = useRef({});
  const selectedStateRef = useRef({});

  const [selectedCity, setSelectCity] = useState({});
  const [selectedState, setSelectState] = useState({});

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

  const data = useMemo(() => {
    const data = formattedMemebersDataForStackedBarChart(members);
    return data;
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
    (city, state) => {
      // const city = selectedCity.content;
      // const state = selectedState.content;
      console.log("handleSearch");
      let query = {};
      if ((city !== "All") & (state !== "All")) {
        query = {
          city,
          state,
        };
        refetchMembers(query);
      }
    },
    [refetchMembers]
  );

  const renderChart = useMemo(() => {
    return <StackedBarChart data={data} />;
  }, [data]);

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
      <div className="font-['Corben'] text-3xl not-italic font-bold text-black">
        Members
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
        <button
          className="border-2 rounded-[10px] border-black w-28 bg-customYellow"
          onClick={() =>
            handleSearch(selectedCity.content, selectedState.content)
          }
        >
          Search
        </button>
      </div>

      {renderChart}

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
export default MembersCard;
