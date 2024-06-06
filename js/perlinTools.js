function generatePerlinHeights(width, height, seed){
    let seedList = getSeed(width, seed);
    let noise = perlinNoise(width, seedList, 1, 8);
    let output = [];
    for(let r = 0; r < noise.length; r++){
        let airHeight = Math.floor(noise[r]*height/2)+Math.floor(height/2);
        output.push([airHeight, airHeight-(Math.floor(Math.random()*3)+4)]);
    }
    //console.log(seedList);
    return output;    
}

function getSeed(width, seed){
    let aphidRan = "";
    let output = []
    if(seed){
        console.log("Seeded");
        aphidRan = new AphidRandom(seed);
        for(let r = 0; r < width; r++) output[r] = aphidRan.rangeDec(0, 1);
    }
    else{
        console.log("unseeded");
        for(let r = 0; r < width; r++) output[r] = Math.random();
    }
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
        //console.log(perlinOutput[x]);
    }
    return perlinOutput;
}

function lerp(a, b, x){
    return a * (1 - x) + b * x;
}

function invlerp(a, b, x){
    return clamp((x-a)/(b-a));
}

function clamp(x, min=0, max=1){
    return Math.min(max, Math.max(min, x));
}

function range(x1, y1, x2, y2, a){
    return lerp(x2, y2, invlerp(x1, y1, a));
}