import React, { useRef, useState, useCallback, useEffect } from "react";
import "@tensorflow/tfjs-backend-webgl";
import * as poseDetection from "@tensorflow-models/pose-detection";
import { drawCanvas } from "../drawingUtilities";
import Webcam from "react-webcam";

export default function MediaRecordingCanvasMoveNet() {
  const [detector, setDetector] = useState();
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const webcamRef = useRef(null); //this is an object with the current property that is readable and assignable
  const canvasRef = useRef(null); //box //option 1 is we make a parent like merle said and these two components as children and pass the props down from the parent.
  const mediaRecorderRef = useRef(null);
  //---------------------------
  const [recordedCanvasChunks, setRecordedCanvasChunks] = useState([]);
  const mediaRecorderCanvasRef = useRef(null);
  //---------------------------

  //could also use axios in onclick funcs from the front end or wherever. We dont need redux to send the token to the server but, migrating to fsa use redux its already configured.

  //write a solid read me, include gifs of how the project works and shows what it can do, and make the final presentation very polished.

  //useSelector and useDispatch replace the connect part of redux. mapstate is like useSelector and useDispatch is more like mapDispatch to props

  // "cram-jammed" - Merle

  async function init() {
    const detectorConfig = {
      modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
    };
    const detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet,
      detectorConfig
    );
    setDetector(detector);
  }

  useEffect(() => {
    init();
    return () => {
      init();
    };
  }, []);

  let allPoses = {};

  async function getPoses() {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video properties
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      if (detector) {
        // const start = Date.now();
        let poses = await detector.estimatePoses(video);
        requestAnimationFrame(getPoses);
        // const ctx = canvasRef.current.getContext("2d");
        drawCanvas(poses, videoWidth, videoHeight, canvasRef);
        allPoses.poses = poses;
        // const end = Date.now();
      }
    }
  }

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks] //our overall data array that will go in the blob.
  );

  //---------------------------
  // Canvas data handling
  const handleCanvasDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        //webcam
        setRecordedCanvasChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedCanvasChunks] //our overall data array that will go in the blob.
  );
  //---------------------------

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    console.log("capturing");
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm", //read only property multipurpose internet mail extension. type of document basically. ascii.
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable", //this collects our blob data, binary large object, used to store images and audio files stored as strings of 0's and 1's.
      handleDataAvailable
    );
    mediaRecorderRef.current.start(); //this will rerun every time one of the things in the array changes
    //---------------------------
    const canvasStream = canvasRef.current.captureStream();
    // canvas stream
    mediaRecorderCanvasRef.current = new MediaRecorder(canvasStream, {
      mimeType: "video/webm", //read only property multipurpose internet mail extension. type of document basically. ascii.
    });
    // Canvas event listener
    mediaRecorderCanvasRef.current.addEventListener(
      "dataavailable", //this collects our blob data, binary large object, used to store images and audio files stored as strings of 0's and 1's.
      handleCanvasDataAvailable
    );
    //Canvas start
    mediaRecorderCanvasRef.current.start(); //this will rerun every time one of the things in the array changes
    //---------------------------
  }, [setCapturing, mediaRecorderCanvasRef, handleCanvasDataAvailable, mediaRecorderRef, handleDataAvailable]);

  const handleStopCaptureClick = useCallback(() => {
      mediaRecorderRef.current.stop();
    setCapturing(false);
    //-------------------
    mediaRecorderCanvasRef.current.stop();
    //______________________
    console.log("stop capturing");
  }, [mediaRecorderCanvasRef, setCapturing, mediaRecorderRef]); //why did we take the other refs out?

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  //---------------------------------
  // Canvas download
  const handleCanvasDownload = useCallback(() => {
    console.log("recordedCanvasChunks", recordedCanvasChunks);
    if (recordedCanvasChunks.length) {
      const blob = new Blob(recordedCanvasChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "react-canvas-stream-capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedCanvasChunks([]);
    }
  }, [recordedCanvasChunks]);
  //---------------------------------

  getPoses();

  return (
    <>
      <div>
        <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
          <Webcam
            id="webcam"
            ref={webcamRef}
            audio={false}
            style={{
              transform: "scaleX(-1)",
              filter: "FlipH",
              position: "absolute",
              height: "75%",
              width: "75%",
              objectFit: "cover",
            }}
          />
          <canvas
            id="canvas"
            ref={canvasRef}
            style={{
              transform: "scaleX(-1)",
              filter: "FlipH",
              position: "absolute",
              height: "75%",
              width: "75%",
              objectFit: "cover",
            }}
          />
        </div>
        {capturing ? (
          <button onClick={handleStopCaptureClick}>Stop Capture</button>
        ) : (
          <button onClick={handleStartCaptureClick}>Start Capture</button>
        )}
        {recordedCanvasChunks.length > 0 && (
          <button
            onClick={() => {
              handleCanvasDownload();
              handleDownload();
            }}
          >
            Download
          </button>
        )}
      </div>
    </>
  );
}
