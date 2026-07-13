import { createContext, useState } from "react";

const InterviewContext = createContext();

const InterviewContextProvider = ({ children }) => {
  const [report, setReport] = useState(null);
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log("[InterviewContextProvider] State changed - loading:", loading, "reports:", reports?.length, "report:", report?._id);

  return (
    <InterviewContext.Provider
      value={{ reports, setReports, report, setReport, loading, setLoading }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export { InterviewContext, InterviewContextProvider };
