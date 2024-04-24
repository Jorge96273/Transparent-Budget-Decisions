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
    
    <div className="page-container">
      <img
        className={imageVisible ? "full-view-image" : "invisible-image"}
        src={TBD}
        alt="tbd logo"
      />
      <div className="top-half">
        <img
          className="thinker-image"
          src={Thinker}
          alt="greek statue"
        />
        </div>
      <div className="bottom-half">
        <p className='font-bold text-lg'>Transparent Budget Decisions</p>
        <p className='quote-style'>"Breaking the stigma that focusing on your money is difficult."</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '100px', marginTop: '100px' }}>
        <button className="round-button">Demo</button>
        <Link to="/enterlanding">
        <button className="round-button">Enter</button>
        </Link>
        </div>
      </div> 
    </div>
   
  );
}

export default HomePage;