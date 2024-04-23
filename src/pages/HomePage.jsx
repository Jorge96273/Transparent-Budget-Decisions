import React, { useState, useEffect } from "react";
import TBD from "../images/TBD.png";
import Thinker from "../images/Thinker.png";
import { Button } from "@/components/ui/button";
// import './App.css'; // Make sure to import your CSS file

function HomePage() {
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
        <p>Transparent Budget Decisions</p>
        <br></br>
        <br></br>
        <p>"Breaking the stigma that focusing on your money is difficult."</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '100px', marginTop: '20px' }}>
          <Button>Demo</Button>  
          <Button>Enter</Button>  
        </div>
      </div> 
    </div>
  );
}

export default HomePage;