import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import EnterLandingPage from "./pages/EnterLandingPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import TempPage from "./pages/TempPage.jsx"
import DashboardPage from "./pages/Dashboard.jsx";
import EducationPage from "./pages/EducationPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx"
import TestChart from "./components/TestChart.jsx";


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
        path: "enterlanding/",
        element: <EnterLandingPage />,
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
        path: "dashboard/",
        element: <DashboardPage />,
      },     
      {
        path: "education/",
        element: <EducationPage />,
      },     
      {
        path: "profile/",
        element: <ProfilePage />,
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
        path: "testchart/",
        element: <TestChart />,
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
