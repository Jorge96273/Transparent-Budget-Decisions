import { useState } from 'react';
import Mike from "../images/Mike.png";
import Jose from "../images/Jose.png";
import Weston from "../images/Weston.png";
import Saul from "../images/Saul.png";
import Jorge from "../images/Jorge.png";
import Andrew from "../images/Andrew.png";


const AboutPage = () => {
  const [cylinderRotation, setCylinderRotation] = useState(0);
  const [holeRotation, setHoleRotation] = useState(0);

  const handleRotate = () => {
    setCylinderRotation(prevRotation => prevRotation + 60); // Cylinder rotates by 60 degrees
    setHoleRotation(prevRotation => prevRotation); // Holes rotate by 30 degrees
    printCurrentAngle('Mike');
  };
  
  const getHoleStyle = (initialAngle, translateX) => ({
    transform: `rotate(${holeRotation + initialAngle}deg) translateX(${translateX}px) rotate(-${holeRotation + initialAngle + cylinderRotation}deg)`
  });

  const initialAngles = {
    Jose: -90,
    Mike: -30,
    Weston: 30,
    Saul: 90,
    Jorge: 150,
    Andrew: 210
  };

  const printCurrentAngle = (name) => {
    const angle = (initialAngles[name] + cylinderRotation) % 360;
    console.log(`${name}: ${angle}`);
    return angle; // Optionally return the angle if needed elsewhere
  };




  console.log(holeRotation);
  return (
    <>
      <div className="about-page-container">
        <p className='quote-style'>&quot;TBD: Helping you hit your financial targets.&quot;</p>
        <div className="cylinder" onClick={handleRotate} style={{ transform: `rotate(${cylinderRotation}deg)` }}>
        <div className="hole" style={getHoleStyle(-87.5, 143)}><img src={Jose} alt="Jose"/></div>
<div className="hole" style={getHoleStyle(-29.5, 149)}><img src={Mike} alt="Mike"/></div>
<div className="hole" style={getHoleStyle(26, 150)}><img src={Weston} alt="Weston"/></div>
<div className="hole picture-adjust4" style={getHoleStyle(84, 143)}><img src={Saul} alt="Saul"/></div>
<div className="hole picture-adjust5" style={getHoleStyle(147, 137)}><img src={Jorge} alt="Jorge"/></div>
<div className="hole picture-adjust6" style={getHoleStyle(211, 138)}><img src={Andrew} alt="Andrew"/></div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
