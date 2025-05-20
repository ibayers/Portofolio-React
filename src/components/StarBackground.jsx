import React, { useEffect, useState } from "react";

// id, size, x, y, opacity, animationduration
export const StarBackground = () => {
  const [stars, setstars] = useState([]);
  const [meteors, setmeteors] = useState([]);

  useEffect(() => {
    generatestars();
    generatemeteors();

    const resize = () => {
      generatestars();
    };

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  const generatestars = () => {
    const numberofstars = Math.floor(
      (window.innerWidth * window.innerHeight) / 5000
    );

    const newstars = [];

    for (let i = 0; i < numberofstars; i++) {
      newstars.push({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.5,
        animationduration: Math.random() * 4 + 2,
      });
    }

    setstars(newstars);
  };

  const generatemeteors = () => {
    const numberofmeteor = 5;
    const newmeteor = [];

    for (let i = 0; i < numberofmeteor; i++) {
      newmeteor.push({
        id: i,
        size: Math.random() * 2 + 1,
        x: Math.random() * 100,
        y: Math.random() * 20,
        opacity: Math.random() * 15,
        animationduration: Math.random() * 3 + 3,
      });
    }

    setmeteors(newmeteor);
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star animate-pulse-subtle"
          style={{
            width: star.size + "px",
            height: star.size + "px",
            left: star.x + "%",
            top: star.y + "%",
            opacity: star.opacity,
            animationDuration: star.animationduration + "s",
          }}
        />
      ))}

      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor animate-meteor"
          style={{
            width: meteor.size + "px",
            height: meteor.size * 2 + "px",
            left: meteor.x + "%",
            top: meteor.y + "%",
            animationDelay: meteor.delay,
            animationDuration: meteor.animationduration + "s",
          }}
        />
      ))}
    </div>
  );
};

export default StarBackground;
