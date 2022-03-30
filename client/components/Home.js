import React from "react";
import { connect } from "react-redux";
import MediaRecording from "./MediaRecording";
/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <div className='center'>
      <h3 className='header' id='welcomeMsg'>
        Start creating, {username}!
      </h3>
      <MediaRecording />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
