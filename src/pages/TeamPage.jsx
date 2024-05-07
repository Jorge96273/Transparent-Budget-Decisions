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
    <div className="w-full h-full flex justify-center items-center">
      <div className="about-page-container h-full  shadow-xl shadow-slate-400 h-100 py-3 rounded-xl bg-slate-500 my-2 w-3/4">
        <p className="quote-style text-slate-50">
          &quot;TBD: Helping you hit your financial targets.&quot;
        </p>
        {nameWithAngle270 && (
          <>
            {nameWithAngle270 === "Jose" && (
              <p className="bio shadow">Jose Sandoval, Army Veteran turned Full-Stack Software Engineer, worked on front-end development and UI design. From Cars & Coffee to Code & Coffee, out here sharing passions!</p>
            )}
            {nameWithAngle270 === "Mike" && (
              <p className="bio shadow">Mike Durell, Navy Intelligence Veteran turned Full-Stack Software Engineer, worked on the animations and styling for the home, login/signup, and about us pages.</p>
            )}
            {nameWithAngle270 === "Weston" && (
              <p className="bio shadow">Weston Kelly, Marine Corps Veteran turned Full-Stack Software Engineer, worked on authentication, demo video, chart and calendar functionality for the application.</p>
            )}
            {nameWithAngle270 === "Saul" && (
              <p className="bio shadow">Saul Alvarez, Navy Engineering Veteran turned Full-Stack Software Engineer, worked on the database, data entry, table design and line chart functionality.</p>
            )}
            {nameWithAngle270 === "Jorge" && (
              <p className="bio shadow">Jorge L. Ayala, Marine Corps Veteran turned Full-Stack Software Engineer, worked on data manipulation, dynamic charts, and interactive calendars.</p>
            )}
            {nameWithAngle270 === "Andrew" && (
              <p className="bio shadow">Andrew Dew, Special Forces Veteran turned Full-Stack Software Engineer, worked on the database, data manipulation, and table design.</p>
            )}
          </>
        )}
    
        <div
          className="cylinder"
          onClick={handleRotate}
          style={{ transform: `rotate(${cylinderRotation}deg)` }}
          >
          <div
            className="hole"
            style={{ ...getHoleStyle(-87.5, 143)}}
            >
            {nameWithAngle270 === "Jose" && (
              <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 255, 0, 0.5)",
              }}
              />
            )}
            <img src={Jose} alt="Jose" />
          </div>
          <div
            className="hole"
            style={{ ...getHoleStyle(-29.5, 149)}}
            >
            {nameWithAngle270 === "Mike" && (
              <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 255, 0, 0.5)",
              }}
              />
            )}
            <img src={Mike} alt="Mike" />
          </div>
          <div
            className="hole"
            style={{ ...getHoleStyle(26, 150)}}
            >
            {nameWithAngle270 === "Weston" && (
              <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 255, 0, 0.5)",
              }}
              />
            )}
            <img src={Weston} alt="Weston" />
          </div>
          <div
            className="hole picture-adjust4"
            style={{ ...getHoleStyle(84, 143)}}
            >
            {nameWithAngle270 === "Saul" && (
              <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 255, 0, 0.5)",
              }}
              />
            )}
            <img src={Saul} alt="Saul" />
          </div>
          <div
            className="hole picture-adjust5"
            style={{ ...getHoleStyle(147, 137)}}
            >
            {nameWithAngle270 === "Jorge" && (
              <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 255, 0, 0.5)",
              }}
              />
            )}
            <img src={Jorge} alt="Jorge" />
          </div>
          <div
            className="hole picture-adjust6"
            style={{ ...getHoleStyle(211, 138)}}
            >
            {nameWithAngle270 === "Andrew" && (
              <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 255, 0, 0.5)",
              }}
              />
            )}
            <img src={Andrew} alt="Andrew" />
          </div>
        </div>
      </div>
            </div>
    </>
  );
};

export default AboutPage;
