import React from "react";
import MembersCardRefine from "./MembersCard";
import { useMembersData } from "../../contexts/MembersContext";

const MembersCardPage = () => {
  const {
    data: membersData,
    loading: loadingMembersData,
    error: fetchMembersDataError,
  } = useMembersData();

  if (fetchMembersDataError) return <div>Error: {fetchMembersDataError.message}</div>;

  return (
    <div>
      {!loadingMembersData && <MembersCardRefine members={membersData.members} />}
    </div>
  );
};
export default MembersCardPage;
