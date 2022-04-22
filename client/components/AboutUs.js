import React from "react";

export const About = () => {
  return (
    <div className="about-main-div">
       <h1 className="header" id="about">
          About RotoFlo's Developers
        </h1>
      <div className="team-div">
        <img
          className="dev-img"
          src="https://hosting.photobucket.com/images/i/MerleSelf/slide.png"
          alt=""
        />
        <a href="https://www.linkedin.com/in/mica-oz/">
          <h3 className="name">Mica Oz</h3>
        </a>
      </div>

      <div className="team-div">
        <img
          className="dev-img"
          src="https://hosting.photobucket.com/images/i/MerleSelf/Serena.png"
          alt=""
        />
        <a href="https://www.linkedin.com/in/serena-chang-a986w/">
          <h3 className="name">Serena Chang</h3>
        </a>
      </div>

      <div className="team-div">
        <img
          className="dev-img"
          src="https://hosting.photobucket.com/images/i/MerleSelf/Leah.png"
          alt=""
        />
        <a href="https://www.linkedin.com/in/leah-ball-hamilton/">
          <h3 className="name">Leah Ball-Hamilton</h3>
        </a>
      </div>
      <div className="team-div">
        <img
          className="dev-img"
          src="https://hosting.photobucket.com/images/i/MerleSelf/Merle.png"
          alt=""
        />
        <a href="https://www.linkedin.com/in/merle-self/">
          <h3 className="name">Merle Self</h3>
        </a>
      </div>
      <div id="bio-div">
        <p>
          The team behind RotoFlo is a group of recent graduates from FullStack
          Academy's Grace Hopper program. Finding common ground in the Arts,
          RotoFlo was conceived, as a culmination of our shared passions and
          indivdual focuses. The team has background in Contemporary Dance,
          Illustration, Animation, and Graphic Design, which have all informed
          the development of this project. For more information please visit our
          <a href="https://linktr.ee/rotoflo"> LinkTree </a>.
        </p>
      </div>
    </div>
  );
};
