import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn }) => {
  const [inGallery, setInGallery] = useState(false);
  return (
    <div className='navBar'>
      <Link to={"/home"}>
        <img id='navLogo' src='/rf-logo.png' />
      </Link>

      {/* <img id='navBG' src='/cubes.png' /> */}
      <nav>
        {isLoggedIn ? (
          <div className='center'>
            {inGallery ? (
              <Link className='center' to='/home'>
                <button
                  onClick={() => {
                    setInGallery(false);
                  }}
                  className='fancyButton'
                  id='makeBlock'
                >
                  HOME
                </button>
              </Link>
            ) : (
              <Link
                className='center'
                to='/gallery'
                onClick={() => {
                  setInGallery(true);
                }}
              >
                <button id='makeBlock' className='fancyButton'>
                  GALLERY
                </button>
              </Link>
            )}
            {/* The navbar will show these links after you log in */}
            <button
              className='fancyButton'
              id='makeBlock'
              onClick={handleClick}
            >
              LOG OUT
            </button>
          </div>
        ) : (
          <div className='center'>
            {/* The navbar will show these links before you log in */}
            <Link to='/login'>
              <button className='fancyButton' id='makeBlock'>
                LOG IN
              </button>
            </Link>
            <Link to='/signup'>
              <button className='fancyButton' id='makeBlock'>
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
