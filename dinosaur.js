class Dino {
  constructor(spriteData, gameOver) {
    clear();
    let dinoMoves = spriteData.frames.dinoMoves;
    let dinoDodge = spriteData.frames.dinoDodge;
    let dinoDead = spriteData.frames.dinoOver;
    this.dinoAnimation = [];
    this.dinoRuns = [];
    this.dinoDodges = [];
    this.isDodging = false;

    if (this.dinoRuns.length == 0 && this.dinoDodges.length == 0) {
      for (let i = 0; i < dinoMoves.length; i++) {
        let pos = dinoMoves[i].frame;
        //console.log(dinoMoves[i].frame);
        let dino = spriteSheet.get(pos.x, pos.y, pos.w, pos.h);
        this.dinoRuns.push(dino);
      }
      for (let i = 0; i < dinoDodge.length; i++) {
        let pos = dinoDodge[i].frame;
        //console.log(dinoMoves[i].frame);
        let dino = spriteSheet.get(pos.x, pos.y, pos.w, pos.h);
        this.dinoDodges.push(dino);
      }
      let dinoDeadPos = dinoDead.frame;
      this.dinoRuns.push(spriteSheet.get(dinoDeadPos.x, dinoDeadPos.y, dinoDeadPos.w, dinoDeadPos.h));
      this.dinoDodges.push(spriteSheet.get(dinoDeadPos.x, dinoDeadPos.y, dinoDeadPos.w, dinoDeadPos.h));
    }

    this.dinoAnimation = this.dinoRuns;

    this.pos = createVector(10, height - this.dinoAnimation[0].height - 5);
    this.vel = createVector();
    this.grav = 1;
    this.width = this.dinoAnimation[0].width;
    this.height = this.dinoAnimation[0].height;
    this.noJump = height - this.dinoAnimation[0].height - 5;
    this.jump = this.noJump - 25;
  }

  update() {
    this.vel.y += this.grav; // vy = vy + gravity;
    this.pos.y += 20 * this.vel.y; // y = y + vy;
    this.pos.y = constrain(this.pos.y, 0, height - this.dinoAnimation[0].height - 5);
    if (gameOver) {
      this.pos.y = constrain(this.pos.y, 0, height - this.dinoRuns[0].height - 5);
    }
    return this;
  }

  display() {
    let dino = this.dinoAnimation[frameCount % (this.dinoAnimation.length - 1)];

    //console.log(this.dinoAnimation);
    if (gameOver) {
      dino = this.dinoAnimation[this.dinoAnimation.length - 1];
    }
    image(dino, this.pos.x, this.pos.y);
    circle(this.pos.x + this.width, this.pos.y, 5);
    return this;
  }

  dodge() {
    if (keyIsDown(DOWN_ARROW)) {
      this.dinoAnimation = this.dinoDodges;
      this.width = this.dinoAnimation[0].width;
      this.height = this.dinoAnimation[0].height;
    } else {
      this.dinoAnimation = this.dinoRuns;
      this.width = this.dinoAnimation[0].width;
      this.height = this.dinoAnimation[0].height;
    }
  }

  run() {
    return this.update().display();
  }
}