const GRAVITY = 1;
const FRICTION = .95;

var bricks = [];
var player;
var otherEntities = [];

var IDEALCAMERAOFFSET = new Vector(0, 0);
var CURRENTCAMERAOFFSET = new Vector(0, 0);

function preload() {
    loadTextures();
    console.log("Hi there");
}

function setup() {
    createCanvas(windowWidth, windowHeight-10);

    player = new Player(new Vector(width/2, 0));
    const size = 50;
    for (let x = 0; x < 40; x++) {
        for (let y = 0; y < 40; y++) {
            if (y > 10)/*(dist(20, 20, x, y) > 10)*/ {
                bricks.push(new Brick(new Vector(x*size, y*size), new Vector(size, size), true));
            }
        }

    }

}

function draw() {
    background(200);

    player.update();
    for (let brick of bricks) {
        brick.show();
    }

    // perspective
    CURRENTCAMERAOFFSET.x = IDEALCAMERAOFFSET.x;//(CURRENTCAMERAOFFSET.x + IDEALCAMERAOFFSET.x)/2;
    CURRENTCAMERAOFFSET.y = (CURRENTCAMERAOFFSET.y + IDEALCAMERAOFFSET.y)/2;

    // networking
    send({
        x: player.position.x,
        y: player.position.y
    });

    // draw others
    for (let i = 0; i < otherEntities.length; i ++) {
        fill(255, 0, 0);
        rect(otherEntities[i].x + CURRENTCAMERAOFFSET.x, otherEntities[i].y + CURRENTCAMERAOFFSET.y, 30, 30);
    }
}

// INPUT

// function mouseClicked() {
//     send({
//         x: player.position.x,
//         y: player.position.y
//     });
// }

function keyPressed() {
    player.interprete(key);
}