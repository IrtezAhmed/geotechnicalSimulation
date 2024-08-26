function make2DArray(cols, rows) {
  //makes an array of col x row
  arr = Array(cols);
  for (i = 0; i < arr.length; i++) {
    arr[i] = Array(rows)
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}

let grid; //defines grid
let w = 2; //variable to define grid size
let cols, rows; //defines col and row variables
let gridHeight, gridWidth;
let canvasHeight, canvasWidth;
gridHeight = gridWidth = 550; //defines the width and height of the grid
canvasWidth = canvasHeight = 700; //defines canvas size
let centeringVar = (canvasHeight-gridHeight)/2
let hueValue = 200; //sets the hue value to blue

//trying to create a way to automatically center the grid
//I need a way to take the canvas width --- I can just input with a variable...?

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  colorMode(HSB, 360, 255, 255);
  cols = gridWidth / w; //defines the no. of col
  rows =  gridHeight / w; //defines the no. of rows
  grid = make2DArray(cols,rows); //makes an array of size col x row

for (let i = 0; i < cols; i++) {
  for (let j = 0; j < rows; j++) {
    grid[i][j] = 0;
  }
  
}

}

//commented out mousePressed() because only works when dragged
/*function mouseDragged() {
  //generates 1 states (sand) when mouse is dragged.
  //ensures them mouse is within boundaries of the grid.

  let mouseCol = floor((mouseX - centeringVar) / w);
  let mouseRow = floor((mouseY - centeringVar) / w);
  let matrix = 15;
  let splash = floor(matrix/2);
  for (let i = -splash; i <= splash; i++){
    for (let j = -splash; j <= splash; j++){
      if (random(1) < 0.5) {
        let col = mouseCol + i;
        let row = mouseRow + j;
        //let state = grid[i][j]; I'm not sure why but this line break the code...?
        //below checks if the grid point is in bounds and is currently black.
        if (col >= 0 && col <= cols-1 && row >= 0 && row <= rows && grid[col][row] ===0){
          grid[col][row] = hueValue;
      }
      }
    }
  }
  
  //reset the huevalue in a cycle
  hueValue += 1; if (hueValue>360) {hueValue = 0};
  


} */

function draw() {
  background("black");
  
  //check when mouse is clicked and held to produce sand
    if (mouseIsPressed === true){
      let mouseCol = floor((mouseX - centeringVar) / w);
      let mouseRow = floor((mouseY - centeringVar) / w);
      let matrix = 15;
      let splash = floor(matrix/2);
      for (let i = -splash; i <= splash; i++){
        for (let j = -splash; j <= splash; j++){
          if (random(1) < 0.5) {
            let col = mouseCol + i;
            let row = mouseRow + j;
            //let state = grid[i][j]; I'm not sure why but this line break the code...?
            //below checks if the grid point is in bounds and is currently black.
            if (col >= 0 && col <= cols-1 && row >= 0 && row <= rows && grid[col][row] ===0){
              grid[col][row] = hueValue;
          }
          }
        }
    }   
    //reset the huevalue in a cycle
    hueValue += 1; if (hueValue>360) {hueValue = 0};
  }
  

  stroke(255);
  fill(0);
  square(centeringVar,centeringVar,gridHeight);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      noStroke();
      if (grid[i][j] > 0) {
        fill(grid[i][j], 255, 255);
        let x = i * w; let y = j * w;
      square(x+centeringVar, y+centeringVar, w); //draws a white square when the state of the array is 1
    }
    }
  }

  let nextGrid = make2DArray(cols, rows)
  //updates the grid, checks the state of 1s, and then translates it down
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {

      let state = grid[i][j]; //defines state as 1 or 0

      if (state > 0) { 

        let below = grid[i][j+1]; //point directly below

        let randomDir = random([-1,1])
        let belowA, belowB;
        if(i + randomDir >= 0 && i + randomDir <= cols - 1){ //checks to see if the next point (bottom left OR bottom right) is between 0 and the col amount.
          belowA = grid[i+randomDir][j+1]; //point below and to some random direction
          
        }
        if(i - randomDir >= 0 && i - randomDir <= cols - 1) {
           belowB = grid[i-randomDir][j+1]; //point below and to some opposite direction
        }
       
       

        if (below === 0) {
          nextGrid[i][j+1] = grid[i][j]; //updates the grid below to value above
        } else if(belowA === 0) {
            nextGrid[i+randomDir][j+1] = grid[i][j];}
          else if(belowB === 0) {
            nextGrid[i-randomDir][j+1] = grid[i][j];}
        else {
          nextGrid[i][j] = grid[i][j] //sets the grid to stay the same when there is state of 1 below (stackable sand)
        }
      } else if (state > 0 && j === rows-1) {
          nextGrid[i][j] = grid[i][j] //sets the grid to stay the same
      } 
      }
    }
    grid = nextGrid;
  }
 

//need to create a way to automaticallly adjust the screen size of the web app to mobile.
//find a way to allow to sand to generate when just pressing and whole (not just dragging)
//find a way to PREVENT adding send over top existing sand (that shouldnt happen lol)
//find a way to implement gravity
//find a way to automatically create the correct slope for different soils to match the angle of repose
