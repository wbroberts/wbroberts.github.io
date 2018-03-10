//
//#53AAE0 //blue-ish
//#7CCAFA //lighter
//#F1EDF6 //grey background
//#414645 //dark text
//#767FF9 //purple compliment
//#
//

//begin list of variables
var canvas, canvasContext;
//ball coordinates and speed
var ballX = 10;
var ballY = 350;
var ballSpeedX = 4;
var ballSpeedY = 5;
var ballRadius = 10;
//paddle for control
var paddle;
var paddleX = 400;
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 10;
const PADDLE_DIST_EDGE = 20;
//mouse location
var mouseX;
var mouseY;
//bricks
const BRICK_HEIGHT = 20;
const BRICK_WIDTH = 80;
const BRICK_COLS = 10;
const BRICK_ROWS = 14;
var bricksLeft = 0;
var brickGrid = new Array(BRICK_COLS * BRICK_ROWS);

//ball and brick handling
function ballBrickHandling() {
  //remove bricks if ball hits
  var ballBrickCol = Math.floor(ballX / BRICK_WIDTH);
  var ballBrickRow = Math.floor(ballY / BRICK_HEIGHT);
  var brickIndexUnderBall = rowColToArrayIndex(ballBrickCol, ballBrickRow);
  //make sure ball is not crossing the boundaries of the canvas to remove bricks
  if( ballBrickCol >= 0 && ballBrickCol < BRICK_COLS &&
      ballBrickRow >= 0 && ballBrickRow < BRICK_ROWS) {

        if(isBrickAtColRow(ballBrickCol, ballBrickRow)) {
          brickGrid[brickIndexUnderBall] = false;
          bricksLeft--;

          var prevBallX = ballX - ballSpeedX;
          var prevBallY = ballY - ballSpeedY;
          var prevBrickCol = Math.floor(prevBallX / BRICK_WIDTH);
          var prevBrickRow = Math.floor(prevBallY / BRICK_HEIGHT);

          var bothTestsFail = true;

          if(prevBrickCol != ballBrickCol) {
            if(isBrickAtColRow(ballBrickCol, ballBrickRow) == false) {
              ballSpeedX *= -1;
              bothTestsFail = false;
            }
          }
          if(prevBrickRow != ballBrickRow) {
            if(isBrickAtColRow(ballBrickCol, ballBrickRow) == false) {
              ballSpeedY *= -1;
              bothTestsFail = false;
            }
          }
          if(bothTestsFail) {
            ballSpeedX *= -1;
            ballSpeedY *= -1;
          }

        }// ball hitting brick and erasing brick
  }//tracking ball within limits
}//end of function

//ball move and paddle interactions
function ballPaddleMove() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  //ball dimensions
  var ballBottomEdgeY = ballY + ballRadius;
  var ballTopEdgeY = ballY - ballRadius;
  var ballRightEdgeX = ballX + ballRadius;
  var ballLeftEdgeX = ballX - ballRadius;

  //bounce off right wall
  if(ballRightEdgeX >= canvas.width && ballSpeedX > 0.0) {
    ballSpeedX *= -1;
  }
  //bounce off left wall
  if(ballLeftEdgeX <= 0 && ballSpeedX < 0.0) {
    ballSpeedX *= -1;
  }
  //bounce off bottom
  if(ballBottomEdgeY >= canvas.height) {
    gameOver();
  }
  //bounce off ceiling
  if(ballTopEdgeY <= 0 && ballSpeedY < 0.0) {
    ballSpeedY *= -1;
  }

  //paddle dimensions
  var paddleTopEdgeY = canvas.height - PADDLE_DIST_EDGE;
  var paddleBottomEdgeY = paddleTopEdgeY + PADDLE_HEIGHT;
  var paddleLeftEdgeX = paddleX;
  var paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;

  if( ballBottomEdgeY >= paddleTopEdgeY && //ball is below the top of the paddle
      ballBottomEdgeY <= paddleBottomEdgeY && //ball is above the bottom of the paddle
      ballX >= paddleLeftEdgeX && //ball is to the right of the left edge
      ballX <= paddleRightEdgeX) { //ball is to the left of the right edge

      ballSpeedY *= -1;

      var centerOfPaddleX = paddleX + PADDLE_WIDTH/2;
      var ballDistFromPaddleCenterX = ballX - centerOfPaddleX;
      ballSpeedX = ballDistFromPaddleCenterX * 0.3;

      if(bricksLeft == 0) {

        brickReset();
      }// out of bricks
  }
}//end of function
//ball reset
function ballReset() {
  ballX = canvas.width/2;
  ballY = canvas.height/2;
  ballSpeedX = 4;
  ballSpeedY = 5;
}
//brick reset
function brickReset() {
  bricksLeft = 0;
  var i;
  for(var i = 0; i < BRICK_COLS * 3; i++) {
    brickGrid[i] = false;
  }
  for(; i < BRICK_COLS * BRICK_ROWS; i++) {
    brickGrid[i] = true;
    bricksLeft++;
  }
}
//text
function colorText(showWords, textX, textY, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillText(showWords, textX, textY);
}
//paddle control
function controlPaddle(evt){
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  mouseX = evt.clientX - rect.left - root.scrollLeft;
  mouseY = evt.clientY - rect.top - root.scrollTop;

  //this lines up the mouse with the middle of the paddle
  paddleX = mouseX - PADDLE_WIDTH/2;
}
//bricks
function drawBrick() {
  for(var eachRow = 0; eachRow < BRICK_ROWS; eachRow++) {
    for(var eachCol = 0; eachCol < BRICK_COLS; eachCol++) {
      //assigns a number to each brick in the brickGrid array
      var arrayIndex = rowColToArrayIndex(eachCol, eachRow);

      if(brickGrid[arrayIndex]){
        makeObject(BRICK_WIDTH*eachCol, BRICK_HEIGHT*eachRow, BRICK_WIDTH, BRICK_HEIGHT, '#767FF9');
        if(eachRow % 2 && eachRow > 2) {
          makeObject(BRICK_WIDTH*eachCol, BRICK_HEIGHT*eachRow, BRICK_WIDTH, BRICK_HEIGHT - 1, '#7CCAFA');
        } else if (eachRow % 3 && eachRow > 3) {
          makeObject(BRICK_WIDTH*eachCol, BRICK_HEIGHT*eachRow, BRICK_WIDTH, BRICK_HEIGHT, '#53AAE0');
        }
      } //end of if(brick)

    } //end of for i
  }//end of for each row

} // end of function drawBrick
//making all of the objects -- putting them on the screen
function drawCanvas(){
  //this is the actual canvas and background fill
  makeObject(0, 0, canvas.width, canvas.height, '#414645');
  //brick
  drawBrick();
  //ball
  makeBall(ballX, ballY, ballRadius, '#F1EDF6');

  //the paddle
  makeObject(paddleX, canvas.height - PADDLE_DIST_EDGE - 10, PADDLE_WIDTH, PADDLE_HEIGHT, '#53AAE0')
}
function isBrickAtColRow(col, row) {
  if( col >= 0 && col < BRICK_COLS &&
      row >= 0 && row < BRICK_ROWS) {

        var brickIndexUnderCoord = rowColToArrayIndex(col, row);
        return brickGrid[brickIndexUnderCoord];

      } else {
        return false;
      }
}
//game over
function gameOver() {
  canvasContext.fillText('GAME OVER!', (canvas.width - 450)/2, canvas.height/2 + 50);
  canvasContext.fillStyle = '#7CCAFA';
  document.onclick = function(evt) {
    ballReset();
    brickReset();
  }
}
//function for creating circles -- the ball
function makeBall(centerX, centerY, radius, color) {
  canvasContext.fillStyle = color;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}

//create rectangles or squares
function makeObject(locX, locY, width, height, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(locX, locY, width, height);
}

//moving objects
function moveAll() {

  ballPaddleMove();

  ballBrickHandling();
}

function rowColToArrayIndex(col, row) {
  return col + BRICK_COLS * row;
}
//for the refresh
function updateAll() {
  drawCanvas();
  moveAll();
}

//loading the game/window
window.onload = function() {
  //grabbing the canvas
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  canvasContext.font = '70px Arial';

  //reset screen for interval and movement
  var framePerSecond = 45;
  setInterval(updateAll, 1000/framePerSecond);

  //moving the mouse
  canvas.addEventListener('mousemove', controlPaddle);

  brickReset();
}
