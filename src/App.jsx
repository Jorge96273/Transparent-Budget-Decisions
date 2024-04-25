import "./App.css";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer"


function App() {
  return (
    <>
    <div className="flex flex-col min-h-screen bg-orange-50">
      <NavBar/>
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
    </>
  )
}

export default App;
