import React, { useRef, useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import "@tensorflow/tfjs-backend-webgl";
import * as poseDetection from "@tensorflow-models/pose-detection";
import { drawCanvas } from "../drawingUtilities";
import Webcam from "react-webcam";
import Axios from "axios";
import { Modal } from "./Modal";
import { saveToDatabase } from "../store/gallery";
import { DownloadIcon, TrashIcon } from '@heroicons/react/outline'

export default function MediaRecordingCanvasMoveNet() {
  const [detector, setDetector] = useState();
  const [capturing, setCapturing] = useState(false);
  const [recordedCanvasChunks, setRecordedCanvasChunks] = useState([]);
  const [showModal, setModalIsShowing] = useState(false);
  const [filter, setFilter] = useState(""); //rotoId
  const [webcamOnOff, setWebcamOnOff] = useState("on");
  const [secureUrl, setSecureUrl] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [countDown, setCountDown] = useState();

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaRecorderCanvasRef = useRef(null);

  const dispatch = useDispatch();

  const projectObj = {
    videoUrl: secureUrl,
    title: projectTitle,
    rotoId: filter,
  };

  useEffect(() => {
    if (secureUrl) {
      dispatch(saveToDatabase(projectObj));
      console.log("PROJECT OBJECT:", projectObj);
    }
  }, [dispatch, secureUrl]);

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

  const handleTitleChange = (event) => {
    const projectTitle = event.target.value;
    setProjectTitle(projectTitle);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleFilterChange = (event) => {
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
    setModalIsShowing(true);
    console.log("STAHP");
    mediaRecorderCanvasRef.current.stop();
  }, [mediaRecorderCanvasRef, setCapturing]);

  // handle start
  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    setModalIsShowing(false);
    console.log("capturing");
    //tap into the canvas stream
    const canvasStream = canvasRef.current.captureStream();
    // canvas media instance
    mediaRecorderCanvasRef.current = new MediaRecorder(canvasStream, {
      mimeType: "video/webm", //read only property multipurpose internet mail extension. type of document basically. ascii.
    });
    // Canvas event listener: compliling blob data in handleData
    mediaRecorderCanvasRef.current.addEventListener(
      "dataavailable", //this collects our blob data, binary large object, used to store images and audio files stored as strings of 0's and 1's.
      handleCanvasDataAvailable
    );
    //Canvas start
    mediaRecorderCanvasRef.current.start(); //this will rerun every time one of the things in the array changes
    setTimeout(() => {
      handleStopCaptureClick();
    }, 10000);
  }, [
    setCapturing,
    mediaRecorderCanvasRef,
    handleCanvasDataAvailable,
    handleStopCaptureClick,
  ]);

  const resetStateValues = () => {
    setFilter("");
    setSecureUrl("");
    setProjectTitle("");
    setModalIsShowing(false);
  };

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

  const handleCanvasSaveToCloud = useCallback(() => {
    if (recordedCanvasChunks.length) {
      const blob = new Blob(recordedCanvasChunks, {
        type: "video/webm",
      });
      setRecordedCanvasChunks([]);
      uploadMedia(blob);
      setModalIsShowing(false);
    }
  }, [recordedCanvasChunks]);

  getPoses(filter);

  return (
    <div className="innerMain">
      <div
        className="innerMain"
        style={{ position: "relative", width: "60vw", height: "60vh" }}
      >
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
      <div className="countDown">{countDown}</div>
      <div id="homeTools">
        <select
          id="filters"
          className="custom-dropdown"
          name="filters"
          onChange={handleFilterChange}
        >
          <option value="" disabled selected hidden>
            FILTERS
          </option>

          <option value='1'>PINK BUBBLES</option>
          <option value='2'>SKELETON</option>
          <option value='3'>GEOMETRIC</option>
          <option value='4'>FLUBBER</option>
          <option value='5'>BOX</option>
          <option value='6'>RADIATE</option>
          <option value='7'>PRISM</option>
        </select>
        <select
          id="webcamOnOff"
          className="custom-dropdown"
          name="webcamOnOff"
          onChange={webcamChangeHandler}
        >
          <option value="" disabled selected hidden>
            BACKGROUNDS
          </option>
          <option value="on">WEBCAM ON</option>
          <option value="off">WEBCAM OFF</option>
        </select>
        {capturing ? (
          <div className="innerMain">
            <button className="fancyButton" onClick={handleStopCaptureClick}>
              ■
            </button>
          </div>
        ) : (
          <button className="fancyButton" onClick={recordingTimer}>
            ▶
          </button>
        )}{" "}
        {showModal && (
          <Modal
            onClose={() => {
              setModalIsShowing(false);
            }}
          >
            <form onSubmit={handleSubmit} id="rotoflo-modal">
              <input
                name="title"
                placeholder="TITLE"
                value={projectTitle}
                onChange={handleTitleChange}
              />
            </form>
            <div>
              {recordedCanvasChunks.length > 0 && (
                <button
                  onClick={handleCanvasSaveToCloud}
                  className="fancyButton"
                  type="submit"
                >
                  <DownloadIcon className="heroicons" style={{height: '20px', width: '20px'}}/>
                </button>
              )}

              <button className="fancyButton" onClick={resetStateValues}>
                <TrashIcon className="heroicons" style={{height: '20px', width: '20px'}}/>
              </button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}
