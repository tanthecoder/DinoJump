let spriteSheet;

let birdMoves;
let groundData = spriteData.frames.ground;
let obstacles = spriteData.frames.obstacles;
let numbers = spriteData.frames.numbers;

let ground = [];
let dinoAnimation = [];
let birdAnimation = [];
let birdX;
let birdY = [];
let groundX = 0;
let gameOver = false;

function preload() {
  spriteSheet = loadImage('sprites/spritesheet.png');
}

function setup() {

  createCanvas(windowWidth, 120);

  resetSketch();


  frameRate(10);

  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].birds) {
      birdMoves = obstacles[i].birds;
      //console.log('birdMoves', obstacles[i].birds);
      for (let i = 0; i < birdMoves.length; i++) {
        let pos = birdMoves[i].frame;
        let bird = spriteSheet.get(pos.x, pos.y, pos.w, pos.h);
        birdAnimation.push(bird);
      }
    }
  }

  //console.log(numbers);

  //console.log(groundData.frame);
  let gPos = groundData.frame;
  ground.push(spriteSheet.get(gPos.x, gPos.y, gPos.w, gPos.h));
  ground.push(spriteSheet.get(gPos.x, gPos.y, gPos.w, gPos.h));


}

function windowResized() {
  resizeCanvas(windowWidth, 120);
}

function draw() {
  background('lightgrey');
  dino.run();
  dino.dodge();
  let bird = birdAnimation[frameCount % birdAnimation.length];
  if (gameOver != true) {
    groundX -= 10;
    birdX = width + groundX;
  } else {
    bird = birdAnimation[0];
    noLoop();
  }

  if (groundX <= -groundData.frame.w) {
    groundX = 0;
  }

  let birdHitPointY = birdY + bird.height;
  let dinoHitPointY = height - dino.pos.y + dino.height - 5;
  console.log(birdHitPointY, dinoHitPointY);
  if (birdX <= dino.width) {
    //console.log(height - dino.pos.y, birdY+bird.height);
    gameOver = true;
  }

  //draw dino either running or dead
  //image(dino, 10, dinoY);
  image(bird, birdX, birdY);
  circle(birdX, birdHitPointY, 1);
  //console.log(width - groundX);
  image(ground[0], groundX, height - 20);
  image(ground[1], groundX + groundData.frame.w, height - 20);
  //console.log('not stopped');
}

function keyPressed() {
  if (keyCode === UP_ARROW || keyCode == 32) {
    dino.vel.y = -3;
  }
  if (gameOver && keyCode === ENTER) {
    gameOver = false;
    resetSketch();

  }
}
function touchStarted(){
      dino.vel.y = -3;
}
function resetSketch() {
  dino = new Dino(spriteData, gameOver);
  groundX = 0;
  //birdY = random([dino.noJump,dino.jump]);
  birdY = dino.jump
  loop();
}
