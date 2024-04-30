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

const LocationCard = () => {
  const { members, loading, error, refetchMembers, fetchCities, fetchStates } =
    useFetchMemebrs({ amount: 500 });
  const selectedCityRef = useRef({});
  const selectedStateRef = useRef({});

  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);

  // !!! should not fetch cities, states, members in each card, should create a context for the whole dashboard
  useEffect(() => {
    fetchCities().then((data) => {
      setCities(data);
    });
    fetchStates().then((data) => {
      setStates(data);
    });
  }, []);

//   const { data, labels } = useMemo(() => {
//     const { data, labels } = formattedMemebersDataForPieChart(members);
//     return { data, labels };
//   }, [members]);

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

      <SimplePieChart  />
    </div>
  );
};

export default LocationCard;