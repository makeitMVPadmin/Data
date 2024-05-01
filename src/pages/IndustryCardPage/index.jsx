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
    (city, state) => {
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
        <button
          className="border-2 rounded-[10px] border-black w-28 bg-customYellow"
          onClick={() =>
            handleSearch(selectedCity.content, selectedState.content)
          }
        >
          Search
        </button>
      </div>

      {/* <GroupedBarChart data={data} labels={labels} /> */}
      {renderChart}
    </div>
  );
};

export default IndustryCard;
