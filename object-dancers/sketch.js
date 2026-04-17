/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/
let dancer;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");
  dancer = new tubeDancer(width / 2, height / 2);
}

function draw() {
  background(0);
  drawFloor();
  dancer.update();
  dancer.display();
}

class tubeDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.angle = 0;
  }
  update() {
    this.angle += 0.1;
  }
  display() {
    push();
    translate(this.x, this.y);
    strokeWeight(2);
    fill('red');
    let moveBody = sin(this.angle) * 15;
    beginShape();
    curveVertex(this.x - 830, this.y - 360);
    curveVertex(this.x - 830 + moveBody, this.y - 430);
    curveVertex(this.x - 830 - moveBody, this.y - 475);
    curveVertex(this.x - 830 + moveBody, this.y - 525);
    curveVertex(this.x - 815, this.y - 550);
    curveVertex(this.x - 815 + moveBody, this.y - 525);
    curveVertex(this.x - 800 - moveBody, this.y - 475);
    curveVertex(this.x - 800 + moveBody, this.y - 430);
    curveVertex(this.x - 800, this.y - 360);
    endShape(CLOSE);

    fill(255);
    strokeWeight(0.5)
    ellipse(this.x - 825 + moveBody * 0.5, this.y - 505, 5, 5);
    ellipse(this.x - 815 + moveBody * 0.5, this.y - 505, 5, 5);
    fill(255);
    arc(this.x - 820 + moveBody * 0.2, this.y - 495, 15, 10, 0, PI);
    //this.drawReferenceShapes()
    pop();

    push();
    let armSwing = sin(this.angle * 1.8) * 0.5;
    translate(this.x, this.y);
    noStroke();
    fill('red');
    rotate(PI + armSwing);
    rect(this.x - 815, this.y - 475, 50, 10);
    pop();

    push();
    let armSwing2 = sin(this.angle * 1.8) * 0.5;
    translate(this.x, this.y);
    noStroke();
    fill('red');
    rotate(PI - armSwing2);
    rect(this.x - 870, this.y - 475, 50, 10);
    pop();
  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/