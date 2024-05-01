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
import {
  formattedStatesDataForPieChart
} from "../../services/members.services";

const LocationCard = () => {
  const { members, loading, error, countries, refetchMembers, fetchCountries } =
    useFetchMemebrs({ amount: 500 });
  const selectedCountryRef = useRef(null);

  //   const [countries, setCountries] = useState([]);

  // !!! should not fetch cities, states, members in each card, should create a context for the whole dashboard
  useEffect(() => {
    fetchCountries();
  }, []);

  const { data, stateLabels } = useMemo(() => {
    const { data, stateLabels } = formattedStatesDataForPieChart(
      countries.length > 0 ? countries[0].content : "",
      members
    );
    return { data, stateLabels };
  }, [members, countries]);

  const handleSelectCountry = useCallback(
    (country) => {
      selectedCountryRef.current = country;
    },
    [selectedCountryRef]
  );

  const handleSearch = useCallback(() => {
    refetchMembers(selectedCountryRef.current.content);
  }, [selectedCountryRef, refetchMembers]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 gap-4 bg-lightBlue">
      <div className="font-['Corben'] text-3xl not-italic font-bold text-black">
        Industry
      </div>
      <div className="grid grid-cols-6 gap-4 my-6">
        <SearchBar data={countries} handleSelect={handleSelectCountry} />
        <button
          className="border-2 rounded-[10px] border-black w-28 bg-customYellow"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <SimplePieChart data={data} labels={stateLabels} />
    </div>
  );
};

export default LocationCard;
