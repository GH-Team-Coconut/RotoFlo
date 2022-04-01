import React from "react";
import { Link, useHistory } from "react-router-dom";

export const Landing = () => {
  const history = useHistory();
  const loginHandler = () => {
    history.push("/login");
    history.go(0);
  };

  return (
    <div className='landing'>
      <img src='/rf-logo.png' id='landLogo' />
      <h1 className='headerLand'> ROTOFLO</h1>
      <h3 className='subHeader'>MOTION INTERACTIVE AR EXPERIENCE</h3>
      <Link to='/login'>
        <button
          onClick={loginHandler}
          className='superFancyButton'
          type='button'
        >
          START CREATING
        </button>{" "}
      </Link>
    </div>
  );
};
