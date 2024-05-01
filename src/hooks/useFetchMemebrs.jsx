import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import useMembersFakeData from "../data/members.data";

const useFetchMemebrs = ({years = 1, amount = 200}) => {
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
  } = useMembersFakeData(amount);
  //   const [createdAtStart, createdAtEnd] = useYearRange();

  useEffect(() => {
    setLoading(true);

    const fetchMembers = async () => {
      try {
        const data = await fetchMembersFakeData();
        console.log(data);
        setMembers(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const refetchMembers = useCallback(
    async (city, state) => {
      setLoading(true);
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



  // has to fetch from db, because search function will refetch members
  const fetchCities = useCallback(
    async (withAll = true) => {
      setLoading(true);
      try {
        const data = await fetchCitiesFakeData();
        const all = withAll ? ["All"] : [];
        const uniqueCities = all.concat(Array.from(new Set(data)).sort());
        const citiesObjs = uniqueCities.map((element, index) => ({
            content: element,
            id: index + 1,
          }));
        setCities(citiesObjs);
        console.log("citiesObjs: ", uniqueCities)
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    },
    [setCities, fetchCitiesFakeData]
  );

  const fetchStates = useCallback(
    async (withAll = true) => {
      setLoading(true);
      try {
        const data = await fetchStatesFakeData();
        const all = withAll ? ["All"] : [];
        const uniqueStates = all.concat(Array.from(new Set(data)).sort());
        const statesObjs = uniqueStates.map((element, index) => ({
            content: element,
            id: index + 1,
          }));
        setStates(statesObjs);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    },
    [setStates, fetchStatesFakeData]
  );

  return { members, loading, error, cities, states, refetchMembers, fetchCities, fetchStates };
};

export default useFetchMemebrs;
