import { createContext, useContext, useMemo } from "react";
import useFetchMembers from "../hooks/useFetchMembers";

const MembersContext = createContext(undefined);

export const MembersDataProvider = ({ children }) => {
  const { data, loading, error } = useFetchMembers();
  const contextValue = useMemo(
    () => ({ data, loading, error }),
    [data, loading, error]
  );

  return (
    <MembersContext.Provider value={contextValue}>
      {children}
    </MembersContext.Provider>
  );
};

export const useMembersData = () => {
  const context = useContext(MembersContext);
  if (context === undefined) {
    throw new Error(
      "useMembersData must be used within a MembersDataProvider"
    );
  }
  return context;
};
