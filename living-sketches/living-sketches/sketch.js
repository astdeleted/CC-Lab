let wolves = [];
let skies = [];
let curWolves = 0;
let curSkies = 0;

function preload() {
  for (let i = 1; i <= 3; i++) {
    let wolfImage = "wolf" + i + ".jpg";
    let wolf = loadImage(wolfImage);
    wolves.push(wolf);
  }
  for (let i = 1; i <= 3; i++) {
    let skyImage = "sky" + i + ".jpg";
    let sky = loadImage(skyImage);
    skies.push(sky);
  }
}

function setup() {
  createCanvas(400, 400);
  noCursor();
  eraseBg(wolves, 10);
  eraseBg(skies, 10);
  wolves = crop(wolves, 150, 100, 500, 300);
  skies = crop(skies, 825, 40, 650, 500);
}

function draw() {

  let cycle = frameCount % 120;
  if (cycle < 40) {
    background('#D4FAFA');
  } else if (cycle < 80) {
    background('#e79414');
  } else {
    background('#131862');
  }
  imageMode(CENTER);
  image(
    skies[curSkies],
    350,
    50,
    skies[0].width * 0.6,
    skies[0].height * 0.6
  );
  image(
    wolves[curWolves],
    mouseX,
    mouseY,
    wolves[0].width * 0.7,
    wolves[0].height * 0.7
  );
  if (frameCount % 40 == 0) {
    curWolves = (curWolves + 1) % wolves.length;
    curSkies = (curSkies + 1) % skies.length;
  }
}

function crop(imgs, x, y, w, h) {
  let cropped = [];
  for (let i = 0; i < imgs.length; i++) {
    cropped.push(imgs[i].get(x, y, w, h));
  }
  return cropped;
}

function eraseBg(imgs, threshold = 10) {
  for (let i = 0; i < imgs.length; i++) {
    let img = imgs[i];
    img.loadPixels();
    for (let j = 0; j < img.pixels.length; j += 4) {
      let d = 255 - img.pixels[j];
      d += 255 - img.pixels[j + 1];
      d += 255 - img.pixels[j + 2];
      if (d < threshold) {
        img.pixels[j + 3] = 0;
      }
    }
    img.updatePixels();
  }
}
