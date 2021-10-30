class artist{
    constructor(ctx){
        this.ctx = ctx;
    }

    drawDebugText(x, y, text, font, colour){
        this.ctx.fillStyle = colour;
        this.ctx.strokeStyle = colour;
        this.ctx.font = font;
        this.ctx.fillText(text, x, y);
    }

    drawCircular(x, y, colour, rad, startAngle, counterClockwise){
        this.ctx.beginPath();
        this.ctx.fillStyle = colour;
        this.ctx.strokeStyle = colour;
        this.ctx.arc(x, y, rad, startAngle, 2*Math.PI, counterClockwise || false);
        this.ctx.fill();
        this.ctx.stroke();
    }
}