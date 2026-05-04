let sand = [];
let memes = [];
let tools = ["🖌️", "⛏️", "🧨"];
let currentTool = 0;
let tntCount = 3;
let tntMessage = false;
let memeGifs = [];
let memefx = [];
let gameWon = false;
let cutImages = [];
let curCut = 1;
let timer = 0;

function preload() {
  for (let i = 1; i <= 5; i++) {
    cutImages[i] = loadImage("cutscene/cut" + i + ".png");
  }

  sandBack = loadImage("sand.png");

  for (let i = 1; i <= 10; i++) {
    let meme = loadImage("funnies/funny" + i + ".gif");
    let fx = loadSound("sounds/funnysound" + i + ".mp3");
    memeGifs.push(meme);
    memefx.push(fx);
  }
}
function setup() {
  textFont("Comic Sans MS");
  createCanvas(600, 400);
  for (let i = 0; i < 5000; i++) {
    sand.push(new Sand(random(width), random(height), random(5, 10)));
  }

  for (let i = 0; i < memeGifs.length; i++) {
    memefx[i].setVolume(0.1);
    memes.push(new Meme(memeGifs[i], memefx[i], random(width), random(height)));
  }
}

function draw() {
  if (curCut < 6) {
    background(0);
    image(cutImages[curCut], 0, 0, width, height);
    timer++;
    if (timer > 60) {
      curCut++;
      timer = 0;
    }
  } else {
    let foundCount = 0;
    background(255, 205, 120);
    image(sandBack, 300, 200, sandBack.width * 2, sandBack.height * 2);

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

    tntWarning();
    textSize(40);
    text(tools[currentTool], mouseX, mouseY);
    fill(255);
    textSize(15);
    textAlign(LEFT);
    text("🧨 x " + tntCount, 20, 40);

    //counter
    for (let i = 0; i < memes.length; i++) {
      if (memes[i].found) {
        foundCount++;
      }
    }
    fill(255);
    textSize(15);
    textAlign(LEFT);
    text("Memes Found: " + foundCount + " / " + "10", 20, 60);

    if (foundCount == memes.length) {
      gameWon = true;
    }

    if (gameWon) {
      background(0, 200, 100);

      textAlign(CENTER);
      fill(255);
      textSize(40);
      text("YOU FOUND ALL THE MEMES!", width / 2, height / 2 - 40);

      textSize(20);
      text(
        "Learn More About 21st Century Internet Culture",
        width / 2,
        height / 2 + 20
      );

      fill(255);
      rectMode(CENTER);
      rect(width / 2, height / 2 + 60, 200, 40);

      fill(0);
      text("Meme Archive", width / 2, height / 2 + 68);
    }
  }
}

function mousePressed() {
  if (currentTool == 0) {
    deleteSize = 15;
  } else if (currentTool == 1) {
    deleteSize = 25;
  } else if (currentTool == 2) {
    if (tntCount > 0) {
      deleteSize = 100;
      tntCount--;
      console.log("TNT: " + tntCount);
    } else {
      tntMessage = true;
      setTimeout(() => (tntMessage = false), 1500);
      deleteSize = 0;
      console.log("No more TNT！");
    }
  }
  if (deleteSize > 0) {
    for (let i = sand.length - 1; i >= 0; i--) {
      if (sand[i].update(mouseX, mouseY, deleteSize)) {
        let onMeme = false;
        for (let p = 0; p < memes.length; p++) {
          if (
            dist(sand[i].x, sand[i].y, memes[p].x, memes[p].y) <
            memes[p].size / 2
          ) {
            onMeme = true;
          }
        }
        if (!onMeme || currentTool == 0) {
          sand.splice(i, 1);
        }
      }
    }
  }
  if (gameWon) {
    if (mouseX > 200 && mouseX < 400 && mouseY > 240 && mouseY < 280) {
      window.open("https://knowyourmeme.com/");
    }
  }
}

class Sand {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.w = random(size * 0.3, size * 4.5);
    this.h = random(size * 0.3, size * 4.5);
    this.shape = floor(random(1, 3));
    this.rotation = random(TWO_PI);
    this.color = color(random(200, 255), random(150, 200), random(50, 150));
  }
  display() {
    noStroke();
    fill(this.color);
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    if (this.shape == 1) {
      ellipse(0, 0, this.w, this.h);
    } else if (this.shape == 2) {
      rectMode(CENTER);
      rect(0, 0, this.w, this.h);
    } else {
      triangle(-this.w / 2, this.h / 2, 0, -this.h / 2, this.w / 2, this.h / 2);
    }
    pop();
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
    this.size = 50;
    this.found = false;
  }

  display() {
    image(this.meme, this.x, this.y, this.size, this.size);
  }

  clicked() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < this.size / 2) {
      let isCovered = false;
      for (let i = 0; i < sand.length; i++) {
        let sandDist = dist(sand[i].x, sand[i].y, this.x, this.y);
        if (sandDist < this.size / 2) {
          isCovered = true;
        }
      }
      if (d < 10 && !isCovered && !this.soundfx.isPlaying()) {
        this.soundfx.play();
        this.found = true;
      }
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