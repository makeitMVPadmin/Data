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
    (country) => {
      // const country = selectedCountry;
      refetchMembers({ country });
    },
    [refetchMembers]
  );

  const renderChart = useMemo(() => {
    return <SimplePieChart data={data} labels={stateLabels} />
  }, [data, stateLabels]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 gap-4 bg-lightBlue">
      <div className="font-['Corben'] text-3xl not-italic font-bold text-black">
        Industry
      </div>
      <div className="grid grid-cols-6 gap-4 my-6">
        {selectedCountry && <SearchBar data={countries} handleSelect={handleSelectCountry} value={selectedCountry}/>}
        <button
          className="border-2 rounded-[10px] border-black w-28 bg-customYellow"
          onClick={() => handleSearch(selectedCountry.content)}
        >
          Search
        </button>
      </div>

      {/* <SimplePieChart data={data} labels={stateLabels} /> */}
      {renderChart}
    </div>
  );
};

export default LocationCard;
