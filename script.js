let wobblyBlob;

let bgColor;

let blobColor;

let initialised = false;

function setup() {
    createCanvas(700, 700);
    noStroke();
    bgColor = color(210, 220, 220);
    blobColor = color(230, 120, 120);
    wobblyBlob = new WobblyBlob();
}

function draw() {
    background(bgColor);
    fill(blobColor);
    wobblyBlob.display();
}

document.addEventListener("click", () => {
    if (!initialised) {
        Tone.start();
    }
});
