
class Bubble {
    constructor(x, y, radius, context) {
        this.x = x;
        this.y = y;
        this.alpha = 1;
        this.context = context;
        this.radius = radius;
        this.angle = 0;
        this.colorArr = ['#1A4271','#386FA4', '#59A5D8', '#84D2F6', '#91E5F6'];
        this.initColor();
    }

    initColor() {
      const idx = Math.floor(Math.random() * 5);
      this.color = this.colorArr[idx];
    }

    draw() {
        this.context.beginPath();

        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        this.context.fillStyle = this.color;
        this.context.globalAlpha = this.alpha;
        this.context.fill();
        this.context.closePath();
    }

    update() {
            this.angle += 0.5;
            this.alpha -= 0.01;
            this.radius -= 0.1;
            this.y -= 1;
            if(this.radius < 4) {
                this.y -= (10 - this.radius)/6;
                this.x += Math.sin(this.angle);
            }
            if(this.alpha > 0.1 && this.radius > 0.1 ) {
                this.draw();
            }
        }
}

export default Bubble;