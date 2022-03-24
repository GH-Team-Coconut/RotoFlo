import React from 'react'
import '@tensorflow/tfjs-backend-webgl';
import MediaRecording from './components/MediaRecording';
import Navbar from './components/Navbar'
import Routes from './Routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <MediaRecording />
    </div>
  )
}

export default App

