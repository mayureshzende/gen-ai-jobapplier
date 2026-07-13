import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeContextProvider } from "./context/ThemeContext.jsx";
import { AuthContextProvider } from "./features/auth/state/AuthContext.jsx";
import { InterviewContextProvider } from "./features/ai/state/InterviewContext.jsx";
import { ApplicationsContextProvider } from "./features/applications/state/ApplicationsContext.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeContextProvider>
    <AuthContextProvider>
      <InterviewContextProvider>
        <ApplicationsContextProvider>
          <App />
        </ApplicationsContextProvider>
      </InterviewContextProvider>
    </AuthContextProvider>
  </ThemeContextProvider>,
);
