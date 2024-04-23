import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import useMembersFakeData, {
  membersData,
  membersDataByLocation,
} from "../data/members.data";

const useFetchMemebrs = ({ years = 1 }) => {
  const { communityId } = useParams();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);

  const {
    fetchMembersFakeData,
    fetchMembersFakeDataByLocation,
    fetchCitiesFakeData,
    fetchStatesFakeData,
  } = useMembersFakeData();
  //   const [createdAtStart, createdAtEnd] = useYearRange();

  useEffect(() => {
    setLoading(true);

    const fetchFakerMembers = async () => {
      try {
        const data = await fetchMembersFakeData(200);
        setMembers(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchFakerMembers();
  }, []);

  const refetchMembers = useCallback(
    async (city, state) => {
      try {
        const data = await fetchMembersFakeDataByLocation(city, state);
        setMembers(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    },
    [setMembers, setLoading, setError, fetchMembersFakeDataByLocation]
  );

  const fetchCities = useCallback(async () => {
    const data = await fetchCitiesFakeData();
    const uniqueCities = new Set(data);
    const citiesObjs = Array.from(uniqueCities).sort().map((element, index) => ({
      content: element,
      id: index + 1,
    }));
    setCities(citiesObjs);
    return citiesObjs;
  }, [setCities, fetchCitiesFakeData]);

  const fetchStates = useCallback(async () => {
    const data = await fetchStatesFakeData();
    const uniqueStates = new Set(data);
    const statesObjs = Array.from(uniqueStates).sort().map((element, index) => ({
      content: element,
      id: index + 1,
    }));
    setStates(statesObjs);
    return statesObjs;
  }, [setStates, fetchStatesFakeData]);

  return { members, loading, error, refetchMembers, fetchCities, fetchStates };
};

export default useFetchMemebrs;
