import React from 'react'
import '@tensorflow/tfjs-backend-webgl';
import MediaRecording from './components/MediaRecording';
import Navbar from './components/Navbar'
import Routes from './Routes'
import Cloud from './components/Cloud'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <MediaRecording />
      <Cloud />
    </div>
  )
}

export default App

//will also include:
//gallery
//login
