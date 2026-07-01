import "./App.css";
import Welcome from "./features/auth/components/Welcome.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./features/auth/pages/Home..jsx";
import Login from "./features/auth/pages/Login.jsx";
import Register from "./features/auth/pages/Register.jsx";
import Protected from "./features/auth/components/Protected.jsx";

let router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
    // loader: loadRootData,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/welcome",
    element: <Welcome />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
