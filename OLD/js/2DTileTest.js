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
    let colorList = ["#222", "#fff", "#000", "#555", "#f00", "#0f0", "#00f", "#5e2b02", "#126102", "#021fd9", "#a00", "#aa0", "#0aa", "#f0f"];
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
            }
            else{
                if(y < waterLevel) pick = 9;
                else pick = 0;
            }
            mapOut[x + y*widthCount] = colorList[pick];
        }
    }
    mapOut = pickOres(colorList, mapOut, widthCount, heightCount);
    mapOut = pickCaves(mapOut, widthCount, heightCount, colorList);
    return mapOut;
}

function pickOres(colors, map, width, height){
    let ores = [
        {tries: Math.floor(width*.075), color: colors[1], min: 0, max: height*.1},
        {tries: Math.floor(width*.2), color: colors[10], min: 0, max: height*.25},
        {tries: Math.floor(width*.35), color: colors[2], min: 0, max: height*.5},
        {tries: Math.floor(width*.075), color: colors[11], min: 0, max: height*.5},
        {tries: Math.floor(width*.2), color: colors[12], min: 0, max: height*.80},
        {tries: Math.floor(width*.1), color: colors[13], min: height*.8, max: height}
    ]
    for(let r = 0; r < ores.length; r++){
        let min = ores[r].min;
        let max = ores[r].max;
        for(let t = 0; t < ores[r].tries; t++){
            let yPick = Math.floor(Math.random()*(max-min))+min;
            let xPick = Math.floor(Math.random()*width);
            if(map[xPick + yPick*width] != "#222") map[xPick + yPick*width] = ores[r].color;
            if(Math.random() < .25 && map[(xPick-1) + yPick*width] != "#222") map[(xPick-1) + yPick*width] = ores[r].color;
            if(Math.random() < .25 && map[(xPick+1) + yPick*width] != "#222") map[(xPick+1) + yPick*width] = ores[r].color;
            if(Math.random() < .25 && map[xPick + (yPick-1)*width] != "#222") map[xPick + (yPick-1)*width] = ores[r].color;
            if(Math.random() < .25 && map[xPick + (yPick+1)*width] != "#222") map[xPick + (yPick+1)*width] = ores[r].color;
        }
    }
    return map;
}
function pickCaves(map, width, height, colors){
    let count = Math.floor(Math.random()*(width*.2));
    let min = 0;
    let max = height*.7;
    for(let r = 0; r < count; r++){
        let hei = Math.floor(Math.random()*(max-min))+min;
        let xPick = Math.floor(Math.random()*width);
        let length = Math.floor(Math.random()*50) + 10;
        if(length > width - (width - xPick)){
            length = width - (width - xPick);
        }
        for(let x = 0; x < length; x++){
            let ex1 = Math.random();
            let ex2 = Math.random();
            map[(xPick+x) + (hei+1)*width] = colors[0];
            map[(xPick+x) + (hei)*width] = colors[0];
            map[(xPick+x) + (hei+2)*width] = colors[0];
            if(ex1 > .8){
                map[(xPick+x) + (hei+3)*width] = colors[0];
                if(ex2 > .8){
                    map[(xPick+x) + (hei+4)*width] = colors[0];
                }
            }
        
            let dir = Math.random();
            if(dir > .7){
                if(hei < max-2){
                    hei++;
                }
            }
            if(dir < .4){
                if(hei > min+2){
                    hei--;
                }
            }  
        }
    }
    return map;
}

function generatePerlinHeights(width, height){
    let seed = getSeed(width);
    let noise = perlinNoise(width, seed, 1, 8);
    let output = [];
    for(let r = 0; r < noise.length; r++){
        let airHeight = Math.floor(noise[r]*height/2)+Math.floor(height/2);
        output.push([airHeight, airHeight-(Math.floor(Math.random()*3)+4)]);
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

function fillMapRandom(widthCount, heightCount){
    let colorCount = Math.floor(Math.random()*10)+10;
    let colorList = generateRandomColors(colorCount);
    let mapOut = [];
    //let heights = generateHeights(widthCount, heightCount, (heightCount*.6), (heightCount*.85));
    let heights = generatePerlinHeights(widthCount, heightCount);
    let waterLevel = heightCount*.65;
    for(let x = 0; x < widthCount; x++){
        for(let y = 0; y < heightCount; y++){
            let pick;
            if(y <= heights[x][0]){
                if(y < heights[x][1]) pick = 1;
                else if(y < heights[x][0] || y < waterLevel-1) pick = 2;
                else pick = 3;
            }
            else{
                if(y < waterLevel) pick = 4;
                else pick = 0;
            }
            mapOut[x + y*widthCount] = colorList[pick];
        }
    }
    mapOut = pickOresRandom(colorList, mapOut, widthCount, heightCount, (colorCount-4));
    mapOut = pickCaves(mapOut, widthCount, heightCount, colorList);
    return mapOut;
}

function generateRandomColors(count){
    let output = ["#222"];
    for(let r = 0; r < count; r++){
        let rPick = Math.floor(Math.random()*256);
        let gPick = Math.floor(Math.random()*256);
        let bPick = Math.floor(Math.random()*256);
        output.push("rgb(" + rPick + "," + gPick + "," + bPick + ")");
    }
    return output;
}

function pickOresRandom(colors, map, width, height, count){
    //{tries: Math.floor(width*.075), color: colors[1], min: 0, max: height*.1}
    let ores = []
    for(let t = 0; t < count; t++){
        let tries = Math.floor(width*((Math.random()*.5)+.01));
        let color = colors[t+4];
        let min = Math.floor(Math.random()*(height*.75));
        let max = Math.floor(Math.random()*(height*.9))+min;
        if (max >= height) max = height;
        ores.push({tries, color, min, max});
    }
    for(let r = 0; r < ores.length; r++){
        let min = ores[r].min;
        let max = ores[r].max;
        for(let t = 0; t < ores[r].tries; t++){
            let yPick = Math.floor(Math.random()*(max-min))+min;
            let xPick = Math.floor(Math.random()*width);
            if(map[xPick + yPick*width] != "#222") map[xPick + yPick*width] = ores[r].color;
            if(Math.random() < .25 && map[(xPick-1) + yPick*width] != "#222") map[(xPick-1) + yPick*width] = ores[r].color;
            if(Math.random() < .25 && map[(xPick+1) + yPick*width] != "#222") map[(xPick+1) + yPick*width] = ores[r].color;
            if(Math.random() < .25 && map[xPick + (yPick-1)*width] != "#222") map[xPick + (yPick-1)*width] = ores[r].color;
            if(Math.random() < .25 && map[xPick + (yPick+1)*width] != "#222") map[xPick + (yPick+1)*width] = ores[r].color;
        }
    }
    return map;
}