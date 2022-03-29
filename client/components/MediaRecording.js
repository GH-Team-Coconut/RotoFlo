import React, { useRef, useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "@tensorflow/tfjs-backend-webgl";
import * as poseDetection from "@tensorflow-models/pose-detection";
import { drawCanvas } from "../drawingUtilities";
import Webcam from "react-webcam";
import Axios from "axios";
import { Modal } from "./Modal";
import {saveToDatabase} from "../store/gallery";

export default function MediaRecordingCanvasMoveNet() {
  const [detector, setDetector] = useState();
  const [capturing, setCapturing] = useState(false);
  const [recordedCanvasChunks, setRecordedCanvasChunks] = useState([]);
  const [showModal, setModalIsShowing] = useState(false);
  const [filter, setFilter] = useState(""); //rotoId
  const [webcamOnOff, setWebcamOnOff] = useState("on");
  const [secureUrl, setSecureUrl] = useState("");
  const [title, setTitle] = useState("");

  // Title, rotoID, videoId

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaRecorderCanvasRef = useRef(null);

  //write a solid read me, include gifs of how the project works and shows what it can do, and make the final presentation very polished.
  //useSelector and useDispatch replace the connect part of redux. mapstate is like useSelector and useDispatch is more like mapDispatch to props
  // "cram-jammed" - Merle

  const userId = useSelector((state) => { return state.auth.id})
  const dispatch = useDispatch();

  const projectObj  =  {userId: userId, videoUrl: secureUrl, title: title, rotoId: filter}

  useEffect(() => {
    if (secureUrl) {
      dispatch(saveToDatabase(projectObj));
    }
  }, [dispatch, projectObj, secureUrl]);


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

  // Canvas data handling
  const handleCanvasDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedCanvasChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedCanvasChunks] //our overall data array that will go in the blob.
  );

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    setModalIsShowing(false);
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
    }, [
      setCapturing,
      mediaRecorderCanvasRef,
      handleCanvasDataAvailable,
    ]);
    
  const handleStopCaptureClick = useCallback(() => {
    setCapturing(false);
    setModalIsShowing(true);
    mediaRecorderCanvasRef.current.stop();
  }, [mediaRecorderCanvasRef, setCapturing]);
  
  // Canvas download
  const uploadMedia = (blob) => {
    const formData = new FormData();
    formData.append("file", blob);
    formData.append("upload_preset", "jdjof0vs");
    Axios.post(
      "https://api.cloudinary.com/v1_1/rotoflo/video/upload",
      formData
    ).then((response) => {
      setSecureUrl(response.data.secure_url);
    });
  };

  const handleCanvasDownload = useCallback(() => {
    if (recordedCanvasChunks.length) {
      const blob = new Blob(recordedCanvasChunks, {
        type: "video/webm",
      });
      setRecordedCanvasChunks([]);
      uploadMedia(blob);
    }
  }, [recordedCanvasChunks]);

  getPoses(filter);

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
        </select>
        {capturing ? (
          <button onClick={handleStopCaptureClick}>Stop Capture</button>
        ) : (
          <div>
            <button onClick={handleStartCaptureClick}>Start Capture</button>
            {showModal && (
              <Modal
                onClose={() => {
                  setModalIsShowing(false);
                }}
              >
                {/* <form id="rotoflo-modal">
                <label htmlFor="title">Title:</label>
                <input name="title" value={title} />
              </form> */}
              </Modal>
            )}
          </div>
        )}
        {recordedCanvasChunks.length > 0 && (
          <button onClick={handleCanvasDownload}>Save</button>
        )}
      </div>
    </>
  );
}

