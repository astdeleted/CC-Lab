let sand = [];
let memes = [];
let memePositions = [];
let curMemes = 0;
let randX;
let randY;

function preload() {
  for (let i = 1; i <= 3; i++) {
    let memeImage = "memes" + i + ".gif";
    let meme = loadImage(memeImage);
    memes.push(meme);
  }
}

function setup() {
  createCanvas(600, 400);
  for (let i = 0; i < 7500; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(5, 10);
    sand.push(new Sand(x, y, r));
  }
  for (let i = 0; i < memes.length; i++) {
    let x = random(width);
    let y = random(height);
    memePositions.push(new Meme(memes[i], x, y));
  }
}

function draw() {
  background(0);
  imageMode(CENTER);
  for (let i = 0; i < memePositions.length; i++) {
    memePositions[i].display();
  }
  for (let i = 0; i < sand.length; i++) {
    sand[i].display();
  }
}

function mousePressed() {
  for (let i = sand.length - 1; i >= 0; i--) {
    if (sand[i].update(mouseX, mouseY)) {
      sand.splice(i, 1);
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
  update(sx, sy) {
    let d = dist(sx, sy, this.x, this.y);
    let deleteSize = 25;
    return d < deleteSize;
  }
}

class Meme {
  constructor(meme, x, y) {
    this.meme = meme;
    this.x = x;
    this.y = y;
  }
  display() {
    image(this.meme, this.x, this.y, 50, 50);
  }
}