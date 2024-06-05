function generateMaterialArt(G, materialArtist, materialList){
    let count = 20;
    let canvasMax = 450;
    let canvasMin = 50;
    let minStartAngle = 0;
    let maxStartAngle = 3;

    for(let r = 0; r < count; r++){
        let rCol = Math.round(Math.random()*256);
        let gCol = Math.round(Math.random()*256);
        let bCol = Math.round(Math.random()*256);

        //let clockwiseNum = Math.random();
        //let doCounterClockwise = false;
        //if(clockwiseNum > .5) doCounterClockwise = true;

        let startAngle = 0; //Math.random() * (maxStartAngle - minStartAngle) - minStartAngle;

        let colour = "rgb("+rCol+","+gCol+","+bCol+")";

        let attribHolder = {
            col: colour,
            rad: 10,
            startAng: startAngle,
            draw: function(artist, x, y){
                //console.log(x +", " + y);
                artist.drawCircular(x, y, this.col, this.rad, this.startAng);
                artist.drawDebugText(x, y, r, "bold 15px Arial", "#000");
            }
        };
        materialList[r].renderer = attribHolder;
    }    

    console.log("ding!");
}

function generateCoordinateSet(w, h, count, padding, r){
    var coords = [];
    for(let r = 0; r < count; r++){
        var safe = false;
		while (!safe) {
			var x = Math.floor((Math.random()*(w-2*padding))+ padding);
			var y = Math.floor((Math.random()*(h-2*padding))+ padding);
			var p = [x,y];
			safe = true;
			for (let j=0; j<coords.length; j+=1) {
				var q = coords[j];
				if ((p[0]-q[0])*(p[0]-q[0])+(p[1]-q[1])*(p[1]-q[1])<r*r) {
					safe = false;
					break;
				}
			}
		}
		coords.push(p);
    }
    return coords;
}