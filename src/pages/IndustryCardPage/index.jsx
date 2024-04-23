import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useFetchMemebrs from "../../hooks/useFetchMemebrs";
import { formattedMemebersDataForStackedBarChart } from "../../services/members.services";
import SearchBar from "../../components/SearchBar";
import { GroupedBarChart } from "../../components/BarChart/GroupedBarChart";

const IndustryCard = () => {
  const { members, loading, error, refetchMembers, fetchCities, fetchStates } = useFetchMemebrs(1);
  const selectedCityRef = useRef({});
  const selectedStateRef = useRef({});

  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);

  // !!! should not fetch cities, states, members in each card, should create a context for the whole dashboard
  useEffect(() => {
    fetchCities().then((data) => {
      console.log(data);
      setCities(data);
    });
    fetchStates().then((data) => {
      setStates(data);
    });
  }, []);

  const data = useMemo(() => {
    const data = formattedMemebersDataForStackedBarChart(members);
    return data;
  }, [members]);

  const handleSelectCity = useCallback(
    (cityItem) => {
      selectedCityRef.current = cityItem;
    },
    [selectedCityRef]
  );

  const handleSelectState = useCallback(
    (stateItem) => {
      selectedStateRef.current = stateItem;
    },
    [selectedStateRef]
  );

  const handleSearch = useCallback(() => {
    refetchMembers(
      selectedCityRef.current.content,
      selectedStateRef.current.content
    );
  }, [selectedCityRef, selectedStateRef, refetchMembers]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 gap-4 bg-lightBlue">
      <div className="font-['Corben'] text-3xl not-italic font-bold text-black">
        Industry
      </div>
      <div className="grid grid-cols-6 gap-4 my-6">
        <SearchBar data={cities} handleSelect={handleSelectCity} />
        <SearchBar data={states} handleSelect={handleSelectState} />
        <button
          className="border-2 rounded-[10px] border-black w-28 bg-customYellow"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <GroupedBarChart />
    </div>
  );
};

export default IndustryCard;
