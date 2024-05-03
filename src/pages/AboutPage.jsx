import { useState } from "react";
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
    setCylinderRotation((prevRotation) => prevRotation + 60); // Cylinder rotates by 60 degrees
    setHoleRotation((prevRotation) => prevRotation); // Holes rotate by 30 degrees
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
      <div className="about-page-container">
        <p className="quote-style">
          &quot;TBD: Helping you hit your financial targets.&quot;
        </p>
        {nameWithAngle270 && (
          <>
            {nameWithAngle270 === "Jose" && (
              <p>This is a paragraph for Jose.</p>
            )}
            {nameWithAngle270 === "Mike" && (
              <p>This is a paragraph for Mike.</p>
            )}
            {nameWithAngle270 === "Weston" && (
              <p>This is a paragraph for Weston.</p>
            )}
            {nameWithAngle270 === "Saul" && (
              <p>This is a paragraph for Saul.</p>
            )}
            {nameWithAngle270 === "Jorge" && (
              <p>This is a paragraph for Jorge.</p>
            )}
            {nameWithAngle270 === "Andrew" && (
              <p>This is a paragraph for Andrew.</p>
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
    </>
  );
};

export default AboutPage;
