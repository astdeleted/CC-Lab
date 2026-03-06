let s = 8;
let xwave = 0;
let ywave = 0;
let x;
let y;
let ySpeed = 5;

function setup() {
    let canvas = createCanvas(800, 500);
    canvas.id("p5-canvas");
    canvas.parent("p5-canvas-container");
    colorMode(HSB);
    x = width / 2;
    y = height / 2;
    bx = width / 2;
    by = height / 2;
    targetX = random(0, width);
    targetY = random(150, height);
}

function draw() {
    console.log(mouseX, mouseY);
    waves();
    blob(bx, by);
    if (mouseIsClose(bx, by) == true) {
        bx = lerp(bx, targetX, 0.5);
        by = lerp(by, targetY, 0.5);
    } else {
        bx = lerp(bx, targetX, 0.01);
        by = lerp(by, targetY, 0.01);
    }
    if (frameCount % 100 == 29) {
        targetX = random(0, width);
        targetY = random(150, height);
    }
}

function waves() {
    noStroke();
    for (let xback = s / 2; xback < width; xback += s) {
        for (let yback = s / 2; yback < height; yback += s) {
            //let noiseVal = noise(xback/400 + frameCount/100, yback/400 + frameCount/100);
            fill(
                map(mouseY, 0, height, 200, 240),
                100,
                map(mouseY, 0, height, 75, 15)
            );
            circle(xback, yback, s + 4);
        }
    }

    noStroke();
    fill("#001a33");
    xwave = 0;
    beginShape();
    for (let x = 0; x <= width; x += 10) {
        let y = map(noise(xwave, ywave), 0, 1, 200, 5);
        vertex(x, y);
        xwave += map(mouseY, 0, height, 0, 0.05);
        ywave += 0.0001;
    }
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);

    fill("#191970");
    beginShape();
    xwave = 0;
    for (let x = 0; x <= width; x += 10) {
        let y = map(noise(xwave, ywave), 0, 1, 200, 20);
        vertex(x, y);
        xwave += map(mouseY, 0, height, 0, 0.05);
        ywave += 0.00001;
    }
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);

    noFill();
    stroke(255);
    let x = map(sin(frameCount / 50), -1, 1, -30, 430);
    let x2 = map(cos(frameCount / 50 + 100), 0, 1, -30, 500);
    let x3 = map(sin(cos(frameCount / 50 + 100)), 0, 1, -30, 500);
    let x4 = map(cos(sin(frameCount / 50 + 100)), 0, 1, -30, 500);
    circle(x + 375, y, 50);
    circle(x2 + 250, y, 50);
    circle(x3, y, 50);
    circle(x4 - 100, y, 50);
    //y = y + map(mouseY,0, height, -20, 20);
    y = y - ySpeed;
    if (frameCount % 100 == 20) {
        ySpeed = random(1, 20);
    }
    if (y < 0) {
        x = random(0, 800);
        y = 550;
    }
}
function blob(bx, by) {
    push();
    translate(bx, by);
    beginShape();
    for (let i = 0; i <= 6; i += 0.1) {
        let xoff = map(cos(i), -1, 1, 0, 1);
        let yoff = map(sin(i), -1, 1, 0, 1);
        let r = 50 + map(noise(xoff, yoff, frameCount * 0.01), 0, 1, -50, 50);
        let x = r * cos(i);
        let y = r * sin(i);
        curveVertex(x, y);
    }
    if (mouseIsClose(bx, by) == true) {
        rotate(radians(frameCount * 10));
        triangle(-75, 0, 0, -100, 75, 0);
        triangle(-75, 0, 75, 0, 0, 100);
        triangle(0, -75, 0, 75, 100, 0);
        triangle(0, -75, 0, 75, -100, 0);
        circle(0 + random(-10, 10), 0 + random(-10, 10), 100);
        translate(bx + 5000, by + 5000);
    } else {
        rotate(radians(frameCount));
    }
    endShape(CLOSE);
    pop();
}

function mouseIsClose(x, y) {
    let d = dist(mouseX, mouseY, x, y);
    if (d < 150) {
        return true;
    } else {
        return false;
    }
}

//bubble location assign ix,xy use noise
//add more layers of water for more texture
//add other creatures in the ocean that can interact with the creature
