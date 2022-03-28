import * as poseDetection from "@tensorflow-models/pose-detection";

export function drawCanvas(poses, videoWidth, videoHeight, canvasRef, video, filter) {
  canvasRef.current.width = videoWidth;
  canvasRef.current.height = videoHeight;

  drawVidToCanvas(video, videoWidth, videoHeight, canvasRef); 
  if(filter === "skeleton"){
  drawSkeleton(poses[0].keypoints, canvasRef);
  console.log('drawSkeleton running')
  }
  if(filter ==="pink-bubbles"){
  drawSomeRandomPointsClusteredAtKeypoint(poses[0].keypoints, canvasRef);
  console.log('pink-bubbles running')
}
};

function drawVidToCanvas(video, width, height, canvasRef) {
  const ctx = canvasRef.current.getContext('2d');
  ctx.drawImage(video, 0, 0, width, height);
};

export function drawKeypoint(keypoint, canvasRef) {
  //keypoint argument is a singular point --> (y, x, score, name)
  const ctx = canvasRef.current.getContext('2d');
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

export function drawKeypoints(keypoints, canvasRef) {
  //keypoints is an array of 17 objects of the keypoints

  const ctx = canvasRef.current.getContext('2d');
  const keypointInd = poseDetection.util.getKeypointIndexBySide('MoveNet');
  // object with keys: left, middle, right ---> value is an array of the key points (body parts)
  ctx.fillStyle = 'White';
  ctx.strokeStyle = 'White';
  ctx.lineWidth = 2;

  //middle points will be white (just nose)
  for (const i of keypointInd.middle) {
    drawKeypoint(keypoints[i], canvasRef);
  }
  //left points will be green... note your actual left side (technically right side when looking at video)
  ctx.fillStyle = 'Green';
  for (const i of keypointInd.left) {
    drawKeypoint(keypoints[i],canvasRef);
    //looping through all the left points & drawing a outline filled circle
  }
  //right points will be orange... note your actual right side (technically left side when looking at video)
  ctx.fillStyle = 'Orange';
  for (const i of keypointInd.right) {
    drawKeypoint(keypoints[i],canvasRef);
  }
}

// *********************** MICA ANIMATIONS ******************************
export function drawSomeRandomPointsClusteredAtKeypoint(keypoints, canvasRef) {
  const ctx = canvasRef.current.getContext('2d');

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
      ctx.arc(randomX, randomY, 5, 0, 2 * Math.PI);
      ctx.strokeStyle = 'pink';
      ctx.stroke();
    }
  }
}

//   function theoreticallyCreateUpwardFloatingDotTrails(
// 	ctx,
// 	x,
// 	y,
// 	r,
// 	color,
// 	canvas
//   ) {
// 	requestAnimationFrame(theoreticallyCreateUpwardFloatingDotTrails);
// 	ctx.clearRect(0, 0, canvas.height, canvas.width); // might need some clarification on what to pass in
// 	ctx.beginPath();
// 	ctx.arc(x, y, r, 0, 2 * Math.PI);
// 	ctx.fillStyle = color;
// 	ctx.fill();
// 	x++
//   }

export function drawSkeleton(keypoints, canvasRef, angleArray) {
  const ctx = canvasRef.current.getContext('2d');
  ctx.fillStyle = 'White';
  ctx.strokeStyle = 'White';
  ctx.lineWidth = 2;

  drawKeypoints(keypoints, canvasRef)

  poseDetection.util.getAdjacentPairs('MoveNet').forEach(([i, j]) => {
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
