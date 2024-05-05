import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useMembersFakeData from "../data/members.data";



const initMembersData = {
    members: []
};

function useFetchMembers() {
  const { fetchMembersFakeData } = useMembersFakeData(200);

  const { communityId } = useParams();
  const [data, setData] = useState(initMembersData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const membersData = await fetchMembersFakeData(); //communityId
      setData({
        members: membersData,
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error };
}

export default useFetchMembers;
