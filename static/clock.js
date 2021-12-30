class GlowClock {
    constructor(w, h) {
        this.timeTable = {};
        let index = 0;
        let interval = 360;
        while (index < 60) {
            this.timeTable[index] = interval;
            interval -= 6;
            index++;
        }

        this.canvas = document.createElement('canvas');
        this.canvas.width = w;
        this.canvas.height = h;
        this.background = new Image();
        this.background.src = 'static/face.png';
        this.ctx = this.canvas.getContext('2d');
        this.clock = 0;
        this.hue = '#1A75FF';
        this.center = 186;
        this.theta = 360;
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }

    updateMinute() {
        this.theta = this.timeTable[new Date().getMinutes()];
        let mRadians = this.theta * (Math.PI / 180);
        let cos = Math.cos(mRadians);
        let sin = Math.sin(mRadians);
        return {
            x: (cos * (186 - this.center)) + (sin * (50 - this.center)) + this.center,
            y: (cos * (50 - this.center)) - (sin * (186 - this.center)) + this.center,
        };
    }

    drawMinute() {
        const point = this.updateMinute();
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.moveTo(point.x, point.y);
        this.ctx.lineTo(this.center, this.center);
        this.ctx.strokeStyle = this.hue;
        this.ctx.stroke();

        if (this.clock < 1) {
            this.updateMinute();
        }
    }

    updateHour() {
        const now = new Date();
        let minutes = parseInt(now.getMinutes(), 10);
        let interval;

        if (minutes > 48) {
            interval = 4;
        } else if (minutes > 36) {
            interval = 3;
        } else if (minutes > 24) {
            interval = 2;
        } else if (minutes > 12) {
            interval = 1;
        } else {
            interval = 0;
        }

        let hourLookup = ((now.getHours() % 12) * 5) + interval;

        this.theta = this.timeTable[hourLookup];
        let hRadians = this.theta * (Math.PI / 180);
        let cos = Math.cos(hRadians);
        let sin = Math.sin(hRadians);
        return {
            x: (cos * (186 - this.center)) + (sin * (100 - this.center)) + this.center,
            y: (cos * (100 - this.center)) - (sin * (186 - this.center)) + this.center,
        };
    }

    drawHour() {
        const point = this.updateHour();
        this.ctx.beginPath();
        this.ctx.lineWidth = 5;
        this.ctx.moveTo(point.x, point.y);
        this.ctx.lineTo(this.center, this.center);
        this.ctx.strokeStyle = this.hue;
        this.ctx.stroke();
    }

    drawBG() {
        this.ctx.fillStyle = this.hue;
        this.ctx.fillRect(2, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    run() {
        window.requestAnimationFrame(this.run.bind(this));
        this.clear();
        this.drawBG();
        this.drawMinute();
        this.drawHour();

        if (this.clock < 1) {
            this.updateMinute();
            this.updateHour();
        }

        if (this.clock > 59) {
            this.clock = 0;
        } else {
            this.clock++;
        }
    }
}

/* eslint-disable-next-line no-unused-vars */
function startClock() {
    const gc = new GlowClock(373, 373);
    gc.run();
}
