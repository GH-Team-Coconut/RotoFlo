import * as poseDetection from "@tensorflow-models/pose-detection";

export function drawCanvas(
  poses,
  videoWidth,
  videoHeight,
  canvasRef,
  video,
  filter,
  webcamState
) {
  canvasRef.current.width = videoWidth;
  canvasRef.current.height = videoHeight;

  if (webcamState === "on") {
    drawVidToCanvas(video, videoWidth, videoHeight, canvasRef);
  }

  switch (filter) {
    case "2":
      return drawSkeleton(poses[0].keypoints, canvasRef);
    case "1":
      return drawSomeRandomPointsClusteredAtKeypoint(
        poses[0].keypoints,
        canvasRef
      );
    case "3":
      return geometricFilter(poses[0].keypoints, canvasRef);
    case "4":
      return flubberMan(poses[0].keypoints, canvasRef);
    case "5":
      return boundingBox(poses[0].keypoints, canvasRef);
    default:
      console.log("no filter");
  }
}

function drawVidToCanvas(video, width, height, canvasRef) {
  const ctx = canvasRef.current.getContext("2d");
  ctx.drawImage(video, 0, 0, width, height);
}

export function drawKeypoint(keypoint, canvasRef) {
  //keypoint argument is a singular point --> (y, x, score, name)
  const ctx = canvasRef.current.getContext("2d");
  //ctx = methods you get in 2D

  // If score is null, just show the keypoint.
  const confidence = keypoint.score != null ? keypoint.score : 1;
  const scoreThreshold = 0.3 || 0;

  if (confidence >= scoreThreshold) {
    const circle = new Path2D();
    circle.arc(keypoint.x, keypoint.y, 4, 0, 2 * Math.PI);
    ctx.fill(circle);
    ctx.stroke(circle);
  }
}

function drawKeypointInGeo(keypoint, canvasRef) {
  //keypoint argument is a singular point --> (y, x, score, name)
  const ctx = canvasRef.current.getContext("2d");
  //ctx = methods you get in 2D

  // If score is null, just show the keypoint.
  const confidence = keypoint.score != null ? keypoint.score : 1;
  const scoreThreshold = 0.3 || 0;

  if (confidence >= scoreThreshold) {
    const circle = new Path2D();
    circle.arc(keypoint.x, keypoint.y, 6, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
    ctx.fill(circle);
    ctx.stroke(circle);
  }
}

function geometricFilter(keypoints, canvasRef) {
  // const ctx = canvasRef.current.getContext("2d");
  const gkp1 = {
    name: "above-head",
    x: keypoints[0].x,
    y: keypoints[0].y - 50,
    score: keypoints[0].score,
  };
  const gkp2 = {
    name: "right-shoulder",
    x: keypoints[6].x,
    y: keypoints[6].y,
    score: keypoints[6].score,
  };
  const gkp3 = {
    name: "left-shoulder",
    x: keypoints[5].x,
    y: keypoints[5].y,
    score: keypoints[5].score,
  };
  const gkp4 = {
    name: "outer-left-elbow",
    x: keypoints[7].x - 50,
    y: keypoints[7].y - 10,
    score: keypoints[7].score,
  };
  const gkp5 = {
    name: "left-elbow",
    x: keypoints[7].x,
    y: keypoints[7].y,
    score: keypoints[7].score,
  };
  const gkp6 = {
    name: "right-wrist",
    x: keypoints[10].x,
    y: keypoints[10].y,
    score: keypoints[10].score,
  };
  const gkp7 = {
    name: "off-center-belly",
    x: keypoints[12].x - 5,
    y: keypoints[12].y - 10,
    score: keypoints[12].score,
  };
  const gkp8 = {
    name: "left-wrist",
    x: keypoints[9].x,
    y: keypoints[9].y,
    score: keypoints[9].score,
  };
  const gkp9 = {
    name: "left-fingertip-area",
    x: keypoints[9].x - 10,
    y: keypoints[9].y + 20,
    score: keypoints[9].score,
  };
  const gkp10 = {
    name: "outer-left-thigh",
    x: keypoints[13].x + 30,
    y: keypoints[13].y - 40,
    score: keypoints[13].score,
  };
  const gkp11 = {
    name: "below-crotch",
    x: keypoints[0].x,
    y: keypoints[0].y + 300,
    score: keypoints[0].score,
  };
  const gkp12 = {
    name: "outer-right-calf",
    x: keypoints[14].x + 20,
    y: keypoints[14].y - 20,
    score: keypoints[14].score,
  };
  const gkp13 = {
    name: "left-knee",
    x: keypoints[13].x,
    y: keypoints[13].y,
    score: keypoints[13].score,
  };
  const gkp14 = {
    name: "right-ankle",
    x: keypoints[16].x,
    y: keypoints[16].y,
    score: keypoints[16].score,
  };
  const gkp15 = {
    name: "left-ankle",
    x: keypoints[15].x,
    y: keypoints[15].y,
    score: keypoints[15].score,
  };
  const arrayOfVerticies = [
    gkp1,
    gkp2,
    gkp3,
    gkp4,
    gkp5,
    gkp6,
    gkp6,
    gkp7,
    gkp8,
    gkp9,
    gkp10,
    gkp11,
    gkp12,
    gkp13,
    gkp14,
    gkp15,
  ];
  drawLineFromTo(canvasRef, gkp1, gkp4);
  drawLineFromTo(canvasRef, gkp1, gkp5);
  drawLineFromTo(canvasRef, gkp1, gkp6);
  drawLineFromTo(canvasRef, gkp1, gkp7);
  drawLineFromTo(canvasRef, gkp2, gkp12);
  drawLineFromTo(canvasRef, gkp3, gkp5);
  drawLineFromTo(canvasRef, gkp3, gkp7);
  drawLineFromTo(canvasRef, gkp5, gkp7);
  drawLineFromTo(canvasRef, gkp4, gkp5);
  drawLineFromTo(canvasRef, gkp4, gkp9);
  drawLineFromTo(canvasRef, gkp6, gkp7);
  drawLineFromTo(canvasRef, gkp6, gkp12);
  drawLineFromTo(canvasRef, gkp7, gkp10);
  drawLineFromTo(canvasRef, gkp7, gkp11);
  drawLineFromTo(canvasRef, gkp7, gkp12);
  drawLineFromTo(canvasRef, gkp7, gkp13);
  drawLineFromTo(canvasRef, gkp7, gkp14);
  drawLineFromTo(canvasRef, gkp8, gkp10);
  drawLineFromTo(canvasRef, gkp9, gkp10);
  drawLineFromTo(canvasRef, gkp10, gkp13);
  drawLineFromTo(canvasRef, gkp10, gkp15);
  drawLineFromTo(canvasRef, gkp11, gkp14);
  drawLineFromTo(canvasRef, gkp11, gkp13);
  drawLineFromTo(canvasRef, gkp11, gkp15);
  drawLineFromTo(canvasRef, gkp12, gkp14);
  drawLineFromTo(canvasRef, gkp13, gkp15);
  for (let i = 0; i < arrayOfVerticies.length; i++) {
    drawKeypointInGeo(arrayOfVerticies[i], canvasRef);
  }
}

function drawLineFromTo(canvasRef, kpStart, kpEnd) {
  const ctx = canvasRef.current.getContext("2d");
  const score1 = kpStart.score != null ? kpStart.score : 1;
  const score2 = kpEnd.score != null ? kpEnd.score : 1;
  const scoreThreshold = 0.2;
  if (score1 >= scoreThreshold && score2 >= scoreThreshold) {
    ctx.beginPath(); // Start a new path
    ctx.moveTo(kpStart.x, kpStart.y); // Move the pen to (30, 50)
    ctx.lineTo(kpEnd.x, kpEnd.y); // Draw a line to (150, 100)
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.stroke(); // Render the path
  }
}

export function drawKeypoints(keypoints, canvasRef) {
  //keypoints is an array of 17 objects of the keypoints

  const ctx = canvasRef.current.getContext("2d");
  const keypointInd = poseDetection.util.getKeypointIndexBySide("MoveNet");
  // object with keys: left, middle, right ---> value is an array of the key points (body parts)
  ctx.fillStyle = "White";
  ctx.strokeStyle = "White";
  ctx.lineWidth = 2;

  //middle points will be white (just nose)
  for (const i of keypointInd.middle) {
    drawKeypoint(keypoints[i], canvasRef);
  }
  //left points will be green... note your actual left side (technically right side when looking at video)
  ctx.fillStyle = "Green";
  for (const i of keypointInd.left) {
    drawKeypoint(keypoints[i], canvasRef);
    //looping through all the left points & drawing a outline filled circle
  }
  //right points will be orange... note your actual right side (technically left side when looking at video)
  ctx.fillStyle = "Orange";
  for (const i of keypointInd.right) {
    drawKeypoint(keypoints[i], canvasRef);
  }
}

export function drawSomeRandomPointsClusteredAtKeypoint(keypoints, canvasRef) {
  const ctx = canvasRef.current.getContext("2d");

  for (let j = 0; j < keypoints.length; j++) {
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      const generateRandomLocal = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
      };

      const currKey = keypoints[j];

      const randomX = generateRandomLocal(currKey.x - 50, currKey.x + 50);
      const randomY = generateRandomLocal(currKey.y - 50, currKey.y + 50);
      ctx.arc(randomX, randomY, 15, 0, 2 * Math.PI);
      ctx.strokeStyle = "pink";
      ctx.stroke();
    }
  }
}

export function drawSkeleton(keypoints, canvasRef, angleArray) {
  const ctx = canvasRef.current.getContext("2d");
  ctx.fillStyle = "White";
  ctx.strokeStyle = "White";
  ctx.lineWidth = 2;

  drawKeypoints(keypoints, canvasRef);

  poseDetection.util.getAdjacentPairs("MoveNet").forEach(([i, j]) => {
    const kp1 = keypoints[i];
    const kp2 = keypoints[j];

    // If score is null, just show the keypoint.
    const score1 = kp1.score != null ? kp1.score : 1;
    const score2 = kp2.score != null ? kp2.score : 1;
    const scoreThreshold = 0.2;

    if (score1 >= scoreThreshold && score2 >= scoreThreshold) {
      ctx.beginPath();
      ctx.moveTo(kp1.x, kp1.y);
      ctx.lineTo(kp2.x, kp2.y);
      ctx.stroke();
    }
  });
}

export function flubberMan(keypoints, canvasRef) {
  const ctx = canvasRef.current.getContext("2d");
  ctx.fillStyle = "White";
  ctx.strokeStyle = "lime";
  ctx.globalAlpha = "0.40";
  ctx.lineWidth = 2;

  poseDetection.util.getAdjacentPairs("MoveNet").forEach(([i, j]) => {
    const kp1 = keypoints[i];
    const kp2 = keypoints[j];

    // If score is null, just show the keypoint.
    const score1 = kp1.score != null ? kp1.score : 1;
    const score2 = kp2.score != null ? kp2.score : 1;
    const scoreThreshold = 0.2;

    if (score1 >= scoreThreshold && score2 >= scoreThreshold) {
      ctx.beginPath();
      ctx.moveTo(kp1.x, kp1.y);
      ctx.lineTo(kp2.x, kp2.y);
      ctx.lineWidth = 120;
      ctx.lineCap = "round";
      ctx.stroke();
    }
  });
}

export function boundingBox(keypoints, canvasRef) {
  const ctx = canvasRef.current.getContext("2d");
  const scoreThreshold = 0.3 || 0;

  const leftWrist = keypoints[10];
  const confidenceLW = leftWrist.score != null ? leftWrist.score : 1;
  const rightWrist = keypoints[9];
  const confidenceRW = rightWrist.score != null ? rightWrist.score : 1;
  const leftAnkle = keypoints[16];
  const confidenceLA = leftAnkle.score != null ? leftAnkle.score : 1;
  const rightAnkle = keypoints[15];
  const confidenceRA = rightAnkle.score != null ? rightAnkle.score : 1;

  if (
    confidenceLW &&
    confidenceRW &&
    confidenceLA &&
    confidenceRA >= scoreThreshold
  ) {
    ctx.moveTo(leftAnkle.x, leftAnkle.y);
    ctx.lineTo(rightAnkle.x, rightAnkle.y);
    ctx.lineTo(rightWrist.x, rightWrist.y);
    ctx.lineTo(leftWrist.x, leftWrist.y);
    ctx.lineTo(leftAnkle.x, leftAnkle.y);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "orange";
    ctx.stroke();
  }
}

// export function radiate(keypoints, canvasRef){
//     const ctx = canvasRef.current.getContext("2d");
//     const scoreThreshold = 0.3 || 0;
//     const xAvg = (keypoints[6].x + keypoints[5].x + keypoints[12].x + keypoints[11].x)/4
//     const yAvg = (keypoints[6].y + keypoints[5].y + keypoints[12].y + keypoints[11].y)/4

//     const center =

// }
