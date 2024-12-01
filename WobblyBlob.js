class WobblyBlob {
    r = 120;

    level = new Tone.Signal(0);

    vol = new Tone.Volume(-80).toDestination();
    osc = new Tone.FMSynth().connect(this.vol);

    numWaves = 20;

    soundOn = false;

    display = function () {
        if (mouseIsPressed) {
            if (touches.length >= 1) {
                this.drawActiveBlob(touches[0].x, touches[0].y);
            } else {
                this.drawActiveBlob(mouseX, mouseY);
            }
        } else {
            let radius = this.r * 0.95;
            ellipse(mouseX, mouseY, radius, radius);
            this.stopSound();
        }
    };

    drawActiveBlob = function (x, y) {
        ellipse(x, y, this.r, this.r);
        this.drawWobbles(x, y);
        this.startSound(x, y);
    };

    drawWobbles = function (x, y) {
        translate(x, y);
        for (let i = 0; i < this.numWaves; i++) {
            rotate(TWO_PI / randomRange(5, 3));
            let amount = map(this.level.value, 0, 1, 0.65, 0.85);
            amount += constrain(map(x, 0, width, 0, 0.15), 0, 0.15);
            let radX = this.r * randomRange(amount, 0.35);
            let radY = this.r * randomRange(0.2, 0.5);
            if (floor(random(50)) === 1) {
                radX =
                    this.r * randomRange(map(amount, 0.85, 1, 1, 1.35), 0.35);
            }
            ellipse(0, 0, radX, radY);
        }
    };

    startSound = function (x, y) {
        if (!this.soundOn) {
            this.level.rampTo(1, 0.1);
            this.osc.triggerAttack('220');
            this.vol.volume.rampTo(0, 0.01);
            this.soundOn = true;
        }
        this.osc.frequency.rampTo(
            constrain(map(y, height, 0, 200, 550), 200, 550),
            0.1
        );
        this.osc.harmonicity.rampTo(
            constrain(map(y, height, 0, 0.2, 2.0), 0.2, 2.0),
            0.1
        );
        this.osc.modulationIndex.rampTo(
            constrain(map(x, 0, width, 0, 7.0), 0, 7.0),
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
