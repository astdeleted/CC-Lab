let s = 8;
let xwave = 0;
let ywave = 0;
let x;
let y;
let ySpeed = 5;
let t = 0;
let xfish = 0;
let yfish = 0;
let xfish2 = 0;
let yfish2 = 0;
let xfish3 = 0;
let yfish3 = 0;

function setup() {
    let canvas = createCanvas(800, 500);
    canvas.id("p5-canvas");
    canvas.parent("p5-canvas-container");
    colorMode(HSB, 360, 100, 100);
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
    let yfish = 300 + sin(t) * 40;
    fill('yellow');
    fish(xfish, yfish);
    xfish += 2;
    t += 0.05;
    if (xfish > width + 50) {
        xfish = -50;
    }
    if (mouseIsClose(bx, by) == true) {
        xfish += random(10, 30);
    }

    let yfish2 = 400 + cos(t) * 20;
    fill('red');
    fish(xfish2, yfish2)
    xfish2 += 2;
    t += 0.05;
    if (xfish2 > width + 50) {
        xfish2 = -50;
    }
    if (mouseIsClose(bx, by) == true) {
        xfish2 += frameCount % random(10, 30);
    }

    let yfish3 = 200 + cos(sin(t)) * 20;
    fill(' #65EAEB')
    fish(xfish3, yfish3)
    xfish3 += 2;
    t += 0.05;
    if (xfish3 > width + 50) {
        xfish3 = -50;
    }
    if (mouseIsClose(bx, by) == true) {
        xfish3 += random(10, 30);
    }

    fill('#1c4e4f');
    blob(bx, by);
    grass();
    if (mouseIsClose(bx, by) == true) {
        bx = lerp(bx, targetX, 0.5);
        by = lerp(by, targetY, 0.5);
    } else {
        bx = lerp(bx, targetX, 0.01);
        by = lerp(by, targetY, 0.01);
    }
    if (frameCount % 30 == 29) {
        targetX = random(0, width);
        targetY = random(190, height);
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
    /*circle(x + 375, y, 50);
    circle(x2 + 250, y, 50);
    circle(x3, y, 50);
    circle(x4 - 100, y, 50);*/
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
        let hcircle = (frameCount % 20);
        let h = map(noise(0, 100, frameCount), -1, 1, 0, 360)
        let h2 = map(noise(0, 100, frameCount / 200), -1, 1, 0, 360)
        let s = random(50, 100);
        let b = random(50, 100);
        rotate(radians(frameCount * 20));
        fill(h, s, b);
        triangle(-75, 0, 0, -100, 75, 0);
        fill(h, s, b);
        triangle(-75, 0, 75, 0, 0, 100);
        fill(h2, s, b);
        triangle(0, -75, 0, 75, 100, 0);
        fill(h2, s, b);
        triangle(0, -75, 0, 75, -100, 0);
        fill(hcircle, 100, 100);
        circle(0 + random(-10, 10), 0 + random(-10, 10), 100);
        translate(bx + 5000, by + 5000);
    } else {
        rotate(radians(frameCount));
    }
    endShape(CLOSE);
    pop();
}

function grass() {
    stroke('#86A475');
    strokeWeight(2);
    for (let x = 0; x <= width; x += 10) {
        let sway = sin(t + x * 0.05) * 10;
        let grassHeight = noise(x * .05) * 150;
        line(x, height, x + sway, height - grassHeight);
    }
    t += 0.05;
}


function fish(xfish, yfish) {
    stroke(0);
    ellipse(xfish, yfish, 60, 40);
    triangle(xfish - 30, yfish, xfish - 50, yfish - 20, xfish - 50, yfish + 20);
    fill(0);
    ellipse(xfish + 15, yfish - 5, 5, 5);
}
function fish(xfish2, yfish2) {
    stroke(0);
    ellipse(xfish2, yfish2, 60, 40);
    triangle(xfish2 - 30, yfish2, xfish2 - 50, yfish2 - 20, xfish2 - 50, yfish2 + 20);
    fill(0);
    ellipse(xfish2 + 15, yfish2 - 5, 5, 5);
}
function fish(xfish3, yfish3) {
    stroke(0);
    ellipse(xfish3, yfish3, 60, 40);
    triangle(xfish3 - 30, yfish3, xfish3 - 50, yfish3 - 20, xfish3 - 50, yfish3 + 20);
    fill(0);
    ellipse(xfish3 + 15, yfish3 - 5, 5, 5);
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