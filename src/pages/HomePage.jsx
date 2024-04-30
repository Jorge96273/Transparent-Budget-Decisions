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
    <div className="">
    <div className="">
      <img
        className={imageVisible ? "full-view-image" : "invisible-image"}
        src={TBD}
        alt="tbd logo"
      />
    <div className="p-4 mt-2 top-half">
      <img
        className="h-100 rounded-3xl" 
        src={Thinker}
        alt="greek statue"
      />
    </div>
      <div className="bottom-half shadow-2xl ">
        <p className='font-bold text-lg'>Transparent Budget Decisions</p>
        <p className='quote-style'>&quot;Breaking the stigma that focusing on your money is difficult.&quot;</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '80px', margin: '60px' }}>
        <button className="rounded-full bg-gray-800 w-full pl-6 pr-6 pt-2 pb-2 text-xl font-bold text-gray-100">Demo</button>
        <Link to="/enterlanding">
        <button className="rounded-full bg-gray-800 w-full pl-6 pr-6 pt-2 pb-2 text-xl font-bold text-gray-100">Enter</button>
        </Link>
        </div>
      </div>
    </div>
    </div>
  );
}

export default HomePage;