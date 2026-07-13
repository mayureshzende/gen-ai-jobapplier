import "./App.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/Router.jsx";

function App() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} className="min-h-screen transition-colors duration-200">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
