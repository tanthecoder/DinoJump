let spriteSheet;
let dinoMoves = spriteData.frames.dinoMoves;
let groundData = spriteData.frames.ground;

let ground = [];
let dinoAnimation = [];
let groundX = 0;

function preload(){
  spriteSheet = loadImage('sprites/spritesheet.png');
}

function setup() {
  frameRate(10);
  
  createCanvas(windowWidth, 60);
  console.log(groundData.frame);
  let gPos = groundData.frame;
  ground.push(spriteSheet.get(gPos.x,gPos.y,gPos.w,gPos.h));
  ground.push(spriteSheet.get(gPos.x,gPos.y,gPos.w,gPos.h));
  
  for(let i = 0; i< dinoMoves.length; i++){
    let pos = dinoMoves[i].frame; 
    //console.log(dinoMoves[i].frame);
    let dino = spriteSheet.get(pos.x,pos.y,pos.w,pos.h);
    dinoAnimation.push(dino);
  }
}

function windowResized(){
  resizeCanvas(windowWidth,400);
}

function draw() {
  background('lightgrey');
  groundX -= 10;
  if(groundX <= -groundData.frame.w){
    console.log(groundX);
    groundX = 0;
    console.log(groundX);
  }
  
  image(dinoAnimation[frameCount % dinoAnimation.length],10,10);
  image(ground[0],groundX,height - 20);
  image(ground[1],groundX + groundData.frame.w,height - 20);
}