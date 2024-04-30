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
  formattedStatesDataForPieChart,
  getCountriesFromMembers,
} from "../../services/members.services";

const LocationCard = () => {
  const { members, loading, error, refetchMembers, fetchCities, fetchStates } =
    useFetchMemebrs({ amount: 500 });
  const selectedCountryRef = useRef(null);

  //   const [countries, setCountries] = useState([]);

  // !!! should not fetch cities, states, members in each card, should create a context for the whole dashboard
  useEffect(() => {}, []);

  const { data, stateLabels, countries } = useMemo(() => {
    const countries = getCountriesFromMembers(members);
    const { data, stateLabels } = formattedStatesDataForPieChart(
      countries.length > 0 ? countries[0].content : "",
      members
    );
    console.log("countries: ", countries);
    console.log("data: ", data);
    console.log("labels: ", stateLabels);
    return { data, stateLabels, countries };
  }, [members]);

  const handleSelectCountry = useCallback(
    (country) => {
      selectedCountryRef.current = country;
    },
    [selectedCountryRef]
  );

  const handleSearch = useCallback(() => {
    refetchMembers(
      selectedCountryRef.current.content,
      selectedCountryRef.current.content
    );
  }, [selectedCountryRef, selectedCountryRef, refetchMembers]);

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
