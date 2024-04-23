import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import TempPage from "./pages/TempPage.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "register/",
        element: <RegisterPage />,
      },
      {
        path: "login/",
        element: <LoginPage />,
      },
      {
        path: "about/",
        element: <AboutPage />,
      },
      {
        path: "temp/",
        element: <TempPage />,
      },
      {
        path: "/*/",
        element: <HomePage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;
