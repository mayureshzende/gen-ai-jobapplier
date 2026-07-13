import { createContext, useState } from "react";

const InterviewContext = createContext();

const InterviewContextProvider = ({ children }) => {
  const [report, setReport] = useState(null);
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <InterviewContext.Provider
      value={{ reports, setReports, report, setReport, loading, setLoading }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export { InterviewContext, InterviewContextProvider };
