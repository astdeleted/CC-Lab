let sand = [];
let memes = [];
let tools = ["🖌️", "⛏️", "🧨"];
let currentTool = 0;
let tntCount = 2;
let tntMessage = false;
let memeSounds = [];

function setup() {
  noCursor();
  textFont("Comic Sans MS");
  createCanvas(600, 400);
  for (let i = 0; i < 7500; i++) {
    sand.push(new Sand(random(width), random(height), random(5, 10)));
  }

  for (let i = 1; i <= 3; i++) {
    let memeGifs = loadImage("funnies/funny" + i + ".gif");
    let soundfx = loadSound("sounds/funnysound" + i + ".mp3");
    soundfx.setVolume(0.05);
    memes.push(new Meme(memeGifs, soundfx,  random(width), random(height)));
  }
}

function draw() {
  background(255, 205, 120);

  //memes and sand
  imageMode(CENTER);
  for (let i = 0; i < memes.length; i++) {
    memes[i].display();
    memes[i].clicked();
  }

  for (let i = 0; i < sand.length; i++) {
    sand[i].display();
  }
  //

  //tools
  tntWarning();
  textSize(40);
  text(tools[currentTool], mouseX, mouseY);
  fill(255);
  textSize(20);
  textAlign(LEFT);
  text("🧨 x " + tntCount, 20, 40);
  //
}

function mousePressed() {
  if (currentTool == 0) {
    deleteSize = 15;
  } else if (currentTool == 1) {
    deleteSize = 25;
  } else if (currentTool == 2) {
    if (tntCount > 0) {
      deleteSize = 75;
      tntCount--;
      console.log("TNT: " + tntCount);
    } else {
      tntMessage = true;
      setTimeout(() => tntMessage = false, 1500);
      deleteSize = 0;
      console.log("No more TNT！");
    }
  }
  if (deleteSize > 0) {
    for (let i = sand.length - 1; i >= 0; i--) {
      if (sand[i].update(mouseX, mouseY, deleteSize)) {
        sand.splice(i, 1);
      }
    }
  }
}

class Sand {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color(
      random(200, 255),
      random(150, 200),
      random(50, 150),
      random(150, 250)
    );
  }
  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.r * 2);
  }
  update(mouseX, mouseY, deleteSize) {
    let d = dist(mouseX, mouseY, this.x, this.y);
    return d <= deleteSize;
  }
}

class Meme {
  constructor(meme, soundfx, x, y) {
    this.meme = meme;
    this.soundfx = soundfx;
    this.x = x;
    this.y = y;
  }
  display() {
    image(this.meme, this.x, this.y, 50, 50);
  }
  clicked() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < 10 && !this.soundfx.isPlaying()) {
      this.soundfx.play();
    }
  }
}

function mouseWheel(event) {
  if (event.delta > 0) {
    currentTool++;
  } else {
    currentTool--;
  }
  if (currentTool >= tools.length) {
    currentTool = 0;
  }
  if (currentTool < 0) {
    currentTool = tools.length - 1;
  }
  return false;
}

function tntWarning() {
  if (tntMessage == true) {
    fill(255, 50, 50);
    textAlign(CENTER);
    textSize(32);
    text("NO MORE TNT!", width / 2, height / 2);
  }
}
