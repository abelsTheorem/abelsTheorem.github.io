//globals
var topLeftScale = 1.25;
var topLeftBound = topLeftScale.toString();
var topRightScale = 1;
var topRightBound = topRightScale.toString();
var bottomLeftScale = 0.5;
var bottomLeftBound = bottomLeftScale.toString();
var bottomRightScale = 1;
var bottomRightBound = bottomRightScale.toString();
var height = 750;
var width = 1000;
var step = 0.0025;

var colors = ['red', 'green', 'blue', 'yellow', 'orange'];
var points = [];
var coeffList = [];
var beginPath = false;
var exponent = 4;
var catchOriginal = true;
var calculation;
var calcHistory = [];

//------5 COMPLEX SOLUTIONS (< 1) ---------//
var root1 = math.complex('-0.25 + 0.6i');
var root2 = math.complex('0.3 + 0.75i');
var root3 = math.complex('0.675 - 0.25i'); 
var root4 = math.complex('-0.75 - 0.5i'); 
var root5 = math.complex('0.35 + 0.333i'); 

var motion;

//------LISTS---------//
var complexRootList = [root1, root2, root3, root4, root5];
var originalPoints = [];
var originalCoefficients = [];
var s4z1HistP1 = [];
var s4z2HistP1 = [];
var s4z3HistP1 = [];
var s4z4HistP1 = [];
var s4z5HistP1 = [];
var s4z1HistP2 = [];
var s4z2HistP2 = [];
var s4z3HistP2 = [];
var s4z4HistP2 = [];
var s4z5HistP2 = [];
var s4z1HistP3 = [];
var s4z2HistP3 = [];
var s4z3HistP3 = [];
var s4z4HistP3 = [];
var s4z5HistP3 = [];
var s4z1HistP4 = [];
var s4z2HistP4 = [];
var s4z3HistP4 = [];
var s4z4HistP4 = [];
var s4z5HistP4 = [];

var firstPathDone = false;
var secondPathDone = false;
var thirdPathDone = false;
var fourthPathDone = false;
var startSecondPath = false;
var startThirdPath = false;
var startFourthPath = false;

var stopFirstHist, stopSecondHist, stopThirdHist, stopFourthHist = false;
var changeColor1 = false;

var animationComplete = false;
var canvas;



//------SETUP SCENE---------//


function setup() {
  motion = new Motion(root1, root2, root3, root4, root5);
  originalPoints = [];
  print(complexRootList);

  //create the canvis 500 x 500 pixels
  canvas = createCanvas(1000, 750);
  
  canvas.parent('sketch-holder');

  //save the original root positions
  for (let i = 0; i < 5; i++) {
    let newPt = new Point(complexRootList[i].re,complexRootList[i].im , 1);
    originalPoints.push(newPt);
  }

  beginPath = false;
  catchOriginal = true;
  calcHistory = [];
  coeffList = [];
  originalCoefficients = [];
  s4z1HistP1 = [];
  s4z1HistP2 = [];
  s4z1HistP3 = [];
  s4z1HistP4 = [];
  s4z2HistP1 = [];
  s4z2HistP2 = [];
  s4z2HistP3 = [];
  s4z2HistP4 = [];
  s4z3HistP1 = [];
  s4z3HistP2 = [];
  s4z3HistP3 = [];
  s4z3HistP4 = [];
  s4z4HistP1 = [];
  s4z4HistP2 = [];
  s4z4HistP3 = [];
  s4z4HistP4 = [];
  s4z5HistP1 = [];
  s4z5HistP2 = [];
  s4z5HistP3 = [];
  s4z5HistP4 = [];
  firstPathDone = false;
  secondPathDone = false;
  thirdPathDone = false;
  fourthPathDone = false;
  startSecondPath = false;
  startThirdPath = false;
  startFourthPath = false;
  stopFirstHist, stopSecondHist, stopThirdHist, stopFourthHist = false;
  animationComplete = false;
}



//------DRAW FUNCTION---------//


function draw() {
  //reset the background
  background(25);

  //plot original point traces
  for (item in originalPoints) {
    originalPoints[item].plotOriginal();
  }

  //creates the axis
  sketchAxis();

  //plot potential
  plotPotential();

  //------MOTIONS---------//

  //plot the points
  motion.plot();

  //start updating motion
  if (beginPath) {
    motion.update();
  }

  //checks for first path complete
  if (firstPathDone){
    motion.setNewLocations(points);
    motion.setNewEnds(4, 5, 3, 1, 2);
    firstPathDone = false;
    stopFirstHist = true;
  } 

  //checks for second path complete
  if (secondPathDone){
    motion.setNewLocations(points);
    motion.setNewEnds(1, 2, 4, 5, 3);
    secondPathDone = false;
    stopSecondHist = true;
  }
  
  //checks for third path complete
  if (thirdPathDone){
    motion.setNewLocations(points);
    motion.setNewEnds(2, 3, 1, 4, 5);
    thirdPathDone = false;
    stopThirdHist = true;
  }

  //------DRAW ALL HISTORIES---------//

  stroke(255);
  drawHistory(calcHistory);

  stroke(color('green'));
  drawHistory(s4z1HistP1);
  drawHistory(s4z2HistP1);
  drawHistory(s4z3HistP1);
  drawHistory(s4z4HistP1);
  drawHistory(s4z5HistP1);

  stroke(color('blue'));
  drawHistory(s4z1HistP2);
  drawHistory(s4z2HistP2);
  drawHistory(s4z3HistP2);
  drawHistory(s4z4HistP2);
  drawHistory(s4z5HistP2);

  stroke(color('red'));
  drawHistory(s4z1HistP3);
  drawHistory(s4z2HistP3);
  drawHistory(s4z3HistP3);
  drawHistory(s4z4HistP3);
  drawHistory(s4z5HistP3);

  stroke(color('yellow'));
  drawHistory(s4z1HistP4);
  drawHistory(s4z2HistP4);
  drawHistory(s4z3HistP4);
  drawHistory(s4z4HistP4);
  drawHistory(s4z5HistP4);

  //------COEFFICIENTS---------//

  //coefficient list
  coeffList = evalCoeffs(updateCoefficients(points));
  plotCoefficients();

  calculation = calcFromCoef(coeffList);
  calculation.plotPoint("f(a0, a1, a2, a3, a4)");
  

  //catch the original coefficient list to plot their original trace
  if (catchOriginal) {
    catchOriginalCo();
  }

  plotOriginalCoefficients();

} 


//------USER CONTROL---------//

function keyPressed(event){

  //if spacebar is pressed
  if (key == " " && beginPath == false) {
    event.preventDefault();
    beginPath = true;
    print("beginPath set to true!");
  } else if (key == " " && beginPath) {
    event.preventDefault();
    beginPath = false;
    firstPathDone = false;
    startSecondPath = false;
    startThirdPath = false;
    startFourthPath = false;
    print("beginPath set to false!");
  }

  if (key == "r") {
    print("reset");
    setup();
  }

  if (key == "s") {
    saveCanvas(canvas, 'art.jpg');
  }
  
}

ptList = [];

function mouseClicked() {
  if (mouseX > 500 && mouseY < 375) {
    test = pixel2Point(mouseX, mouseY, 1);
    ptList.push(test);
    
    if (ptList.length == 5) {
      root1 = ptList[0];
      root2 = ptList[1];
      root3 = ptList[2];
      root4 = ptList[3];
      root5 = ptList[4];
      complexRootList = [root1, root2, root3, root4, root5];

      motion = new Motion(ptList[0], ptList[1], ptList[2], ptList[3], ptList[4]);
      originalPoints = [];
      
      for (item in ptList) {
        let newPoint = new Point(ptList[item].re, ptList[item].im, 1);
        originalPoints.push(newPoint);
      }

      coeffList = [];
      coeffList = evalCoeffs(updateCoefficients(points));
      catchOriginalCo();
      ptList = [];
    }

  }
}

function mouseWheel(event){
  event.preventDefault();
  if (mouseX < 500 && mouseY < 375 && mouseX > 0 && mouseY > 0) {
    if (event.delta > 0) {
      topLeftScale -= 0.01;
    }
    if (event.delta < 0) {
      topLeftScale += 0.01;
    }
    topLeftBound = Math.round(100*topLeftScale)/100;
    topLeftBound = topLeftBound.toString();
  }

  if (mouseX < 500 && mouseY > 375 && mouseX > 0 && mouseY < height) {
    if (event.delta > 0) {
      bottomLeftScale -= 0.01;
    }
    if (event.delta < 0) {
      bottomLeftScale += 0.01;
    }
    bottomLeftBound = Math.round(100*bottomLeftScale)/100;
    bottomLeftBound = bottomLeftBound.toString();
  }

  if (mouseX > 500 && mouseY > 375 && mouseX < width && mouseY < height) {
    if (event.delta > 0) {
      bottomRightScale -= 0.01;
    }
    if (event.delta < 0) {
      bottomRightScale += 0.01;
    }
    bottomRightBound = Math.round(100*bottomRightScale)/100;
    bottomRightBound = bottomRightBound.toString();
  }

}