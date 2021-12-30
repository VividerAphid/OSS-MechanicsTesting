class artist{
    constructor(ctx){
        this.ctx = ctx;
        //panning and zooming stuff
        this.cameraOffset = {x: this.ctx.canvas.width/2, y: this.ctx.canvas.height/2};
        this.cameraZoom = 1;
        this.maxZoom = 5;
        this.minZoom = 0.1;
        this.scrollSensitivity = 0.0005;
        this.isDragging = false;
        this.dragChanged = false;
        this.dragStart = {x: 0, y: 0};
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