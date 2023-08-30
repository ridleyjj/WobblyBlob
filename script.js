let wobblyBlob;

let bgColor;

let blobColor;

let initialised = false;

function setup() {
    if (window.innerWidth > 700) {
        createCanvas(700, 700);
    } else {
        createCanvas(window.innerWidth * 0.95, window.innerHeight * 0.95);
    }

    noStroke();
    bgColor = color(210, 220, 220);
    blobColor = color(230, 120, 120);
    wobblyBlob = new WobblyBlob();
}

function draw() {
    if (initialised) {
        activeDraw();
    } else {
        background(bgColor);
        fill(blobColor);
        textSize(24);
        textAlign(CENTER);
        textFont("Arial");
        text("click to begin", width / 2, height / 2);
    }
}

function activeDraw() {
    let col = bgColor;
    if (mouseIsPressed) {
        col.setAlpha(80);
    } else {
        col.setAlpha(255);
    }
    background(col);
    fill(blobColor);
    wobblyBlob.display();
}

document.addEventListener("click", () => {
    if (!initialised) {
        Tone.start().then(() => (initialised = true));
    }
});
