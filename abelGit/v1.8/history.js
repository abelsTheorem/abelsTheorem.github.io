//------FUNCTION TO DRAW CALCULATION HISTORY---------//

function drawHistory(history) {
    var size = history.length;
  
    strokeWeight(2);
  
    if (size >= 2) {
  
      //draw a line for every point in calculations history
      for (let i = 0; i < size - 1; i++) {
        line(history[i][0], history[i][1], history[i+1][0], history[i+1][1]);
      }
  
    }
  
    strokeWeight(1);
  
  }

function fourthHistory(kPoints){

    let kSize = kPoints.length;
    let lSize = 4;

    for (let i = 0; i < kSize; i++) {

      if (fits(4, kPoints[i].pixelX, kPoints[i].pixelY)) {
  
        kPoints[i].plotPoint("z" + (i+1));
    
        if (!animationComplete && beginPath && !stopFirstHist) {
    
            if ((frameCount % lSize) == 0) {
    
            if (i == 0) s4z1HistP1.push([kPoints[i].pixelX, kPoints[i].pixelY]); 
            if (i == 1) s4z2HistP1.push([kPoints[i].pixelX, kPoints[i].pixelY]); 
            if (i == 2) s4z3HistP1.push([kPoints[i].pixelX, kPoints[i].pixelY]); 
            if (i == 3) s4z4HistP1.push([kPoints[i].pixelX, kPoints[i].pixelY]); 
            if (i == 4) s4z5HistP1.push([kPoints[i].pixelX, kPoints[i].pixelY]); 
    
            }
    
        } else if (!animationComplete && beginPath && !stopSecondHist) {
    
            if ((frameCount % lSize) == 0) {
    
                if (i == 0) s4z1HistP2.push([kPoints[i].pixelX, kPoints[i].pixelY]); 
                if (i == 1) s4z2HistP2.push([kPoints[i].pixelX, kPoints[i].pixelY]); 
                if (i == 2) s4z3HistP2.push([kPoints[i].pixelX, kPoints[i].pixelY]); 
                if (i == 3) s4z4HistP2.push([kPoints[i].pixelX, kPoints[i].pixelY]); 
                if (i == 4) s4z5HistP2.push([kPoints[i].pixelX, kPoints[i].pixelY]); 
    
            }
    
        } else if (!animationComplete && beginPath && !stopThirdHist) {
    
            if ((frameCount % lSize) == 0) {
    
            if (i == 0) s4z1HistP3.push([kPoints[i].pixelX, kPoints[i].pixelY]); 
            if (i == 1) s4z2HistP3.push([kPoints[i].pixelX, kPoints[i].pixelY]); 
            if (i == 2) s4z3HistP3.push([kPoints[i].pixelX, kPoints[i].pixelY]); 
            if (i == 3) s4z4HistP3.push([kPoints[i].pixelX, kPoints[i].pixelY]); 
            if (i == 4) s4z5HistP3.push([kPoints[i].pixelX, kPoints[i].pixelY]); 
    
            }
    
        } else if (!animationComplete && beginPath && !stopFourthHist) {
    
        if ((frameCount % lSize) == 0) {
    
            if (i == 0) s4z1HistP4.push([kPoints[i].pixelX, kPoints[i].pixelY]); 
            if (i == 1) s4z2HistP4.push([kPoints[i].pixelX, kPoints[i].pixelY]); 
            if (i == 2) s4z3HistP4.push([kPoints[i].pixelX, kPoints[i].pixelY]); 
            if (i == 3) s4z4HistP4.push([kPoints[i].pixelX, kPoints[i].pixelY]); 
            if (i == 4) s4z5HistP4.push([kPoints[i].pixelX, kPoints[i].pixelY]); 
    
        }
    
    }

}
      
  
    }
}