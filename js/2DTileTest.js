function render(G, map, widthCount, heightCount, tileSize){
    let canvas = document.getElementById("mapCanvas");
    let height = canvas.height;
    let width = canvas.width;
    for(let x=0; x < widthCount; x++){
        for(let y=0; y < heightCount; y++){
            G.beginPath();
            G.fillStyle = map[x + y*widthCount];
            G.strokeStyle = map[x + y*widthCount];
            G.fillRect((width-x*tileSize), (height-y*tileSize), tileSize, tileSize);
            G.stroke();
        }
    }
}

function initCanvas(canvas, width, height){
    canvas.width = width;
    canvas.height = height;
}

function fillMap(widthCount, heightCount){
    let colorList = ["#222", "#fff", "#000", "#555", "#f00", "#0f0", "#00f", "#5e2b02", "#126102", "#021fd9"];
    let mapOut = [];
    //let heights = generateHeights(widthCount, heightCount, (heightCount*.6), (heightCount*.85));
    let heights = generatePerlinHeights(widthCount, heightCount);
    let waterLevel = heightCount*.65;
    for(let x = 0; x < widthCount; x++){
        for(let y = 0; y < heightCount; y++){
            let pick;
            if(y <= heights[x][0]){
                if(y < heights[x][1]) pick = 3;
                else if(y < heights[x][0] || y < waterLevel-1) pick = 7;
                else pick = 8;
                if(Math.random() < .05 && y < heightCount*.1) pick = 1;
                if(Math.random() < .1 && y < heightCount*.4) pick = 2;
                if(Math.random() < .1 && y < heightCount*.25) pick = 4;
            }
            else{
                if(y < waterLevel) pick = 9;
                else pick = 0;
            }
            mapOut[x + y*widthCount] = colorList[pick];
        }
    }
    return mapOut;
}

function generatePerlinHeights(width, height){
    let seed = getSeed(width);
    let noise = perlinNoise(width, seed, 1.3, 8);
    let output = [];
    for(let r = 0; r < noise.length; r++){
        let airHeight = Math.floor(noise[r]*height/2)+Math.floor(height/2);
        output.push([airHeight, airHeight-5]);
    }
    return output;    
}

function getSeed(width){
    let output = []
    for(let r = 0; r < width; r++) output[r] = Math.random();
    return output;
}

function perlinNoise(width, seed, bias, octaves){
    let perlinOutput = [];
    for(let x = 0; x < width; x++){
        let noise = 0.0;
        let scale = 1.0;
        let accumulate = 0.0;
        for(let o = 0; o < octaves; o++){
            let pitch = width >> o;
            let sample1 = Math.floor(x / pitch) * pitch;
            let sample2 = (sample1 + pitch) % width;

            let blend = (x - sample1) / pitch;
            let bigSample = (1.0 - blend) * seed[sample1] + blend * seed[sample2];
            noise += bigSample * scale;
            accumulate += scale;
            scale = scale / bias;
        }
        perlinOutput[x]= noise / accumulate;
    }
    return perlinOutput;
}