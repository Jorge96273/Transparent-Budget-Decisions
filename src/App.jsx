import "./App.css";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

function App() {
  //? Used to pass useState to pages through Outlet Context
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [accountList, setAccountList] = useState([]);

  return (
    <>
      <div className="bg-orange-50 flex flex-col min-h-screen">
        <NavBar />
        <div className="flex-grow bg-orange-50">
          <Outlet
            context={{
              triggerFetch,
              setTriggerFetch,
              accountList,
              setAccountList,
            }}
          />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
