import { useState, useEffect } from "react";
import Mike from "../images/Mike.png";
import Jose from "../images/Jose.png";
import Weston from "../images/Weston.png";
import Saul from "../images/Saul.png";
import Jorge from "../images/Jorge.png";
import Andrew from "../images/Andrew.png";
import cashregister from "../images/cashregister.mp3";
// https://pixabay.com/sound-effects/search/cash/
// Cash Register Purchase MP3 Royalty Free, Free Download
const AboutPage = () => {
  const [cylinderRotation, setCylinderRotation] = useState(0);
  const [holeRotation, setHoleRotation] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      const audio = new Audio(cashregister);
      audio.play();
      audio.addEventListener('ended', () => {
        setIsPlaying(false);
      });
    }
  }, [isPlaying]);

  const handleRotate = () => {
    setIsPlaying(true);
    setCylinderRotation((prevRotation) => prevRotation + 60); 
    setHoleRotation((prevRotation) => prevRotation); 
  };

  const getHoleStyle = (initialAngle, translateX) => ({
    transform: `rotate(${
      holeRotation + initialAngle
    }deg) translateX(${translateX}px) rotate(-${
      holeRotation + initialAngle + cylinderRotation
    }deg)`,
  });

  const initialAngles = {
    Jose: -90,
    Mike: -30,
    Weston: 30,
    Saul: 90,
    Jorge: 150,
    Andrew: 210,
  };

  const findNameWithAngle = () => {
    for (const name in initialAngles) {
      const angle = (initialAngles[name] + cylinderRotation) % 360;
      if (angle === 270) {
        return name;
      }
    }
    return null; // Return null if no name matches the angle
  };

  const nameWithAngle270 = findNameWithAngle();

  console.log(holeRotation);
  return (
    <>
      <div className="animate-in fade-in duration-1000 " >AboutPage</div>
    </>
  );
};

export default AboutPage;
