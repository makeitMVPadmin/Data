import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import membersData from "../data/members.data";


const useFetchMemebrs = ({ years = 1 }) => {
  const { communityId } = useParams();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
//   const [createdAtStart, createdAtEnd] = useYearRange();

  useEffect(() => {
    setLoading(true);

    const fetchFakerMembers = async () => {
      try {
        const data = await membersData(200);
        setMembers(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchFakerMembers();
  }, []);

  return { members, loading, error };
};

export default useFetchMemebrs;
