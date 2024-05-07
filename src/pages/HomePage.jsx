import { useState, useEffect } from "react";
import TBD from "../images/TBD.png";
import Thinker from "../images/Thinker.png";
import { Link } from 'react-router-dom';
// import { Button } from "@/components/ui/button";
// import './App.css'; // Make sure to import your CSS file


const HomePage = () => {
  const [imageVisible, setImageVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setImageVisible(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div >
    <div >
      <img
        className={imageVisible ? "full-view-image" : "invisible-image"}
        src={TBD}
        alt="tbd logo"
      />
    <div className=" p-4 bg-slate-700 top-half">
      <img
        className="h-100 rounded-3xl outline-slate-500 outline outline-4 shadow" 
        src={Thinker}
        alt="greek statue"
      />
    </div>
      <div className="bottom-half shadow-2xl">
        <p className=' text-3xl font-serif mb-8 bg-slate-600 text-white p-3 rounded'>Transparent Budget Decisions</p>
        <p className='quote-style'>&quot;Breaking the stigma that focusing on your money is difficult.&quot;</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '80px', margin: '60px' }}>
        <button className="rounded-full bg-slate-400 px-4 py-2 text-xl font-bold text-white shadow-slate-200 shadow-md hover:bg-slate-500">Demo</button>
        <Link to="/enterlanding">
        <button className="rounded-full bg-slate-400 px-4 py-2 text-xl font-bold text-white shadow-slate-200 shadow-md hover:bg-slate-500">Enter</button>
        </Link>
        </div>
      </div>
    </div>
    </div>
  );
}

export default HomePage;