import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn }) => {
  const [inGallery, setInGallery] = useState(false);
  return (
  <div>
    <h1 id='app-title'>RotoFlo</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {inGallery ? (
           <Link to='/home' onClick={()=>{setInGallery(false)}}>Home</Link>
        ) : (
          <Link to='/gallery' onClick={()=>{setInGallery(true)}}>Gallery</Link>
        )}
          {/* The navbar will show these links after you log in */}
          <a href='#' onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)};

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
