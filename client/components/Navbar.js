import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn, match }) => {
  const [inGallery, setInGallery] = useState(
    window.location.href.includes("gallery")
  );
  const [inLanding, setInLanding] = useState(
    window.location.pathname === "/" ? "gone" : "navBar"
  );

  console.log(window.location);
  return (
    <div className={inLanding}>
      <Link to={"/home"}>
        <img id="navLogo" src="/rf-logo.png" alt="" />
      </Link>
      <h1 className="header">ROTOFLO</h1>
      <nav>
        {isLoggedIn ? (
          <div className="center">
            {inGallery ? (
              <div>
                {" "}
                <Link className="center" to="/home">
                  <button
                    onClick={() => {
                      setInGallery(false);
                    }}
                    className="superFancyButton"
                    id="makeBlock"
                  >
                    HOME
                  </button>
                </Link>
              </div>
            ) : (
              <Link
                className="center"
                to="/gallery"
                onClick={() => {
                  setInGallery(true);
                }}
              >
                <button id="makeBlock" className="superFancyButton">
                  GALLERY
                </button>
              </Link>
            )}
            <button
              className="superFancyButton"
              id="makeBlock"
              onClick={handleClick}
            >
              LOG OUT
            </button>
          </div>
        ) : (
          <div className="center">
            {/* The navbar will show these links before you log in */}
            <Link to="/login">
              <button className="superFancyButton" id="makeBlock">
                LOG IN
              </button>
            </Link>
            <Link to="/signup">
              <button className="superFancyButton" id="makeBlock">
                SIGN UP
              </button>
            </Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
