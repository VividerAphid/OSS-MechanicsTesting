CanvasRenderingContext2D.prototype.drawPolygon = 
    function(x, y, vertices){
        //Draws shape relative to provided x and y, xy as top left
        //Vertices are drawn in order they appear in the array
        this.beginPath();
        this.moveTo(x + vertices[0][0], y + vertices[0][1]);
        for(let r = 1; r < vertices.length; r++){
            this.lineTo(x + vertices[r][0], y + vertices[r][1])
        }
        this.closePath();
        this.stroke();
    };

CanvasRenderingContext2D.prototype.fillPolygon = 
    function(x, y, vertices){
        //Draws shape relative to provided x and y, xy as top left
        //Vertices are drawn in order they appear in the array
        this.beginPath();
        this.moveTo(x + vertices[0][0], y + vertices[0][1]);
        for(let r = 1; r < vertices.length; r++){
            this.lineTo(x + vertices[r][0], y + vertices[r][1])
        }
        this.closePath();
        this.fill();
    };

//Function for drawing points connected to specific points?