import React from "react";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <div className='landing'>
      <img src='/rf-logo.png' id='landLogo' />
      <h1> ROTOFLO</h1>
      <h3>MOTION INTERACTIVE AR EXPERIENCE</h3>
      <Link to='/login'>
        <button className='fancyButton' type='button'>
          LOG IN
        </button>{" "}
      </Link>
      <Link to='/signup'>
        <button className='fancyButton' type='button'>
          SIGN UP
        </button>{" "}
      </Link>
    </div>
  );
};
