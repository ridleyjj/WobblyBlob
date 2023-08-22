class WobblyBlob {
    r = 120;

    level = new Tone.Signal(0);

    vol = new Tone.Volume(-80).toDestination();
    osc = new Tone.Oscillator(200, "triangle").connect(this.vol);

    numWaves = 20;

    soundOn = false;

    display = function () {
        ellipse(mouseX, mouseY, this.r, this.r);
        if (mouseIsPressed) {
            this.drawWobbles();
            this.startSound();
        } else {
            this.stopSound();
        }
    };

    drawWobbles = function () {
        translate(mouseX, mouseY);
        for (let i = 0; i < this.numWaves; i++) {
            rotate(TWO_PI / randomRange(2, 2));
            let amount = map(this.level.value, 0, 1, 0.65, 1);
            let radX = this.r * randomRange(amount, 0.35);
            let radY = this.r * randomRange(0.2, 0.5);
            if (floor(random(50)) === 1) {
                radX =
                    this.r *
                    randomRange(map(this.level.value, 0, 1, 1, 1.35), 0.35);
            }
            ellipse(0, 0, radX, radY);
        }
    };

    startSound = function () {
        if (!this.soundOn) {
            this.level.rampTo(1, 0.1);
            this.osc.start();
            this.vol.volume.rampTo(-24, 0.01);
            this.soundOn = true;
        }
        this.osc.frequency.rampTo(
            constrain(map(mouseY, height, 0, 200, 550), 200, 550),
            0.1
        );
    };

    stopSound = function () {
        if (this.soundOn) {
            this.level.rampTo(0, 0.1);
            this.vol.volume.rampTo(-80, 0.2);
            this.soundOn = false;
        }
    };
}
