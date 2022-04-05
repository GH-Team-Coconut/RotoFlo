import React from "react";
import { connect } from "react-redux";
import MediaRecording from "./MediaRecording";


export const Home = (props) => {
  const { username } = props;
  window.onload = function() {
    if(!window.location.hash) {
      window.location = window.location + '#loaded';
      window.location.reload();
    }
  }
  return (
    <div className='center'>
      <h3 className='header' id='welcomeMsg'>
        Start creating, {username}!
      </h3>
      <MediaRecording />
    </div>
  );
};


const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
