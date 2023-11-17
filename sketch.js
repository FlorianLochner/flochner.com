class ArrayList extends Array {
    constructor() {
        super(...[]);
    }
    size() {
        return this.length;
    }
    add(x) {
        this.push(x);
    }
    get(i) {
        return this[i];
    }
    remove(i) {
        this.splice(i, 1);
    }
}

let colors = new Array(2);
let alpha = 0.2;
let N = 5;
let maxPosX = new ArrayList();
let maxPosY = new ArrayList();

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    colors[0] = color(0, 255, 0);
    colors[1] = color(0, 0, 255);
    canvas.parent('sketch-holder');
    noLoop();
}
function draw() {
    let pos = new p5.Vector(0 + 100, height * 0.75);
    let v = new p5.Vector(0, -100 * 1.5);
    stroke(255, 255, 255);
    fill(230, 242, 174);
    rect(0, 0, width, height);
    for (let i = 0; i < 4; i++) {
        for (let l = 0; l < 2; l++) {
            make_branch(
                alpha,
                0,
                new p5.Vector(70 + 450 * i, 450 * l + 450),
                v
            );
        }
    }
}
function make_branch(deg, nr, pos, v) {
    let alpha0 = PI * Math.random() * (2 * alpha) - alpha;
    let v0 = v.copy();
    v0.rotate(alpha0);
    let p = pos.copy();
    p.add(v0);
    if (nr % 2 == 0) {
        stroke(color(23, 145, 58));
    } else {
        stroke(color(35, 158, 70));
    }
    strokeWeight(N - nr);
    line(pos.x, pos.y, p.x, p.y);
    nr = nr + 1;
    if (nr < N) {
        let rnd = Math.random() * (N - nr) + nr;
        for (let i = 0; i < 2; i++) {
            make_branch(deg + 0.1, nr, p, v0.mult(0.8));
        } //make_branch(deg+0.2 ,nr, p, v0);
    } else {
        make_leafe(pos, v0, N - nr);
        maxPosX.add(pos.x);
        maxPosY.add(pos.y);
    }
}
function make_leafe(pos, v, lineStrength) {
    let nrLeaf = 5;
    let leng = v.mag();
    let rotv = v.heading();
    let leafSizeX = 8; //anteil an Länge des branches
    let leafSizeY = 4;
    translate(pos.x, pos.y);
    rotate(rotv + PI * 0.5);
    stroke(30, 92, 48);
    fill(color(110, 204, 137));
    ellipse(0, 0 - leng, leng / leafSizeX, leng / leafSizeY);
    for (let i = 0; i < nrLeaf; i++) {
        push();
        translate(leng / 12 + lineStrength, -i * (leng / nrLeaf));
        rotate(PI * 0.25);
        ellipse(0, 0, leng / leafSizeX, leng / leafSizeY);
        pop();
    }
    for (let i = 0; i < nrLeaf; i++) {
        push();
        translate(-leng / 12, -i * (leng / nrLeaf));
        rotate(-PI * 0.25);
        ellipse(0, 0, leng / leafSizeX, leng / leafSizeY);
        pop();
    }
    rotate(-rotv - PI * 0.5);
    translate(-pos.x, -pos.y);
}

function mouseReleased() {
    draw();
  }
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
