import React, { useRef, useState, useCallback, useEffect } from "react";
import "@tensorflow/tfjs-backend-webgl";
import * as poseDetection from "@tensorflow-models/pose-detection";
import { drawCanvas } from "../drawingUtilities";
import Webcam from "react-webcam";

import { uploadMedia } from "../cloud";

export default function MediaRecordingCanvasMoveNet() {
  const [detector, setDetector] = useState();
  const [capturing, setCapturing] = useState(false);
  const [recordedCanvasChunks, setRecordedCanvasChunks] = useState([]);
  const [filter, setFilter] = useState("");
  const [webcamOnOff, setWebcamOnOff] = useState("on");
  const [countDown, setCountDown] = useState();

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaRecorderCanvasRef = useRef(null);

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
      // const videoStream = webcamRef.current.stream;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video properties
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      if (detector) {
        let poses = await detector.estimatePoses(video);
        requestAnimationFrame(getPoses);
        drawCanvas(
          poses,
          videoWidth,
          videoHeight,
          canvasRef,
          video,
          filter,
          webcamOnOff
        );
        allPoses.poses = poses;
      }
    }
  }

  const onChangeHandler = (event) => {
    const filter = event.target.value;
    setFilter(filter);
  };

  const webcamChangeHandler = (event) => {
    const webcamState = event.target.value;
    setWebcamOnOff(webcamState);
  };

  function recordingTimer() {
    let count = 5;
    let timer = setInterval(function () {
      if (count >= 0) {
        setCountDown(count);
        count -= 1;
      } else if (count < 0) {
        setCountDown("Bust a move!");
        handleStartCaptureClick();
        clearInterval(timer);
        // setCountDown('')
      }
    }, 1000);
  }

  // Canvas data handling
  const handleCanvasDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedCanvasChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedCanvasChunks] //our overall data array that will go in the blob.
  );

  // handle stop
  const handleStopCaptureClick = useCallback(() => {
    setCapturing(false);
    mediaRecorderCanvasRef.current.stop();
    console.log("stop capturing");
  }, [mediaRecorderCanvasRef, setCapturing]);

  // Canvas download
  const handleCanvasSaveToCloud = useCallback(() => {
    console.log("recordedCanvasChunks", recordedCanvasChunks);
    if (recordedCanvasChunks.length) {
      const blob = new Blob(recordedCanvasChunks, {
        type: "video/webm",
      });
      uploadMedia(blob);
      setRecordedCanvasChunks([]);
    }
  }, [recordedCanvasChunks]);

  // handle start
  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    console.log("capturing");
    //tap into the canvas stream
    const canvasStream = canvasRef.current.captureStream();
    // canvas media instance
    mediaRecorderCanvasRef.current = new MediaRecorder(canvasStream, {
      mimeType: "video/webm", //read only property multipurpose internet mail extension. type of document basically. ascii.
    });
    // Canvas event listener: compliling blob data in handleData...
    mediaRecorderCanvasRef.current.addEventListener(
      "dataavailable", //this collects our blob data, binary large object, used to store images and audio files stored as strings of 0's and 1's.
      handleCanvasDataAvailable
    );
    //Canvas start
    mediaRecorderCanvasRef.current.start(); //this will rerun every time one of the things in the array changes
     setTimeout(() => { handleStopCaptureClick() }, 20000);
  }, [setCapturing, mediaRecorderCanvasRef, handleCanvasDataAvailable, handleStopCaptureClick]);

  getPoses(filter);

  return (
    //define filter
    <>
      <div>
        <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
          <p>{countDown}</p>
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
          {/* <img src="https://unsplash.com/photos/MV5ro8zkXys"/>  */}
        </div>
        <select id="filters" name="filters" onChange={onChangeHandler}>
          <option value="pink-bubbles">pink bubbles</option>
          <option value="skeleton">skeleton</option>
          <option value="geometric">geometric</option>
        </select>
        <select
          id="webcamOnOff"
          name="webcamOnOff"
          onChange={webcamChangeHandler}
        >
          <option value="on">Webcam On</option>
          <option value="off">Webcam Off</option>
          <option value="space">Cellular</option>
        </select>
        {capturing ? (
          <button onClick={handleStopCaptureClick}>Stop Recording</button>
        ) : (
          <button onClick={recordingTimer}>Record</button>
        )}
        {recordedCanvasChunks.length > 0 && (
          <button onClick={handleCanvasSaveToCloud}>Download</button>
        )}
      </div>
    </>
  );
}
