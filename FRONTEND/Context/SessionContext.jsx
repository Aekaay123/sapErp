import React, { createContext, useState } from "react";
// eslint-disable-next-line react-refresh/only-export-components
export const SessionContext = createContext();
const Session = ({ children }) => {
  const [session, setSession] = useState("");
  return (
    <>
      <SessionContext.Provider value={{ session, setSession }}>
        {children}
      </SessionContext.Provider>
    </>
  );
};

export default Session;
