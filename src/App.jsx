import "./App.css";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

function App() {
  //? Used to pass useState to pages through Outlet Context
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [accountList, setAccountList] = useState([]);
  const [budgetList, setBudgetList] = useState([]);
  const [budgetTriggerFetch, setBudgetTriggerFetch] = useState(false);
  return (
    <>
      <div className="bg-slate-700 flex flex-col min-h-screen">
        <NavBar />
        <div className="flex-grow">
          <Outlet
            context={{
              triggerFetch,
              setTriggerFetch,
              accountList,
              setAccountList,
              budgetList,
              setBudgetList,
              budgetTriggerFetch,
              setBudgetTriggerFetch,
            }}
          />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
