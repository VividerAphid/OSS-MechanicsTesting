class chunk{
    constructor(id, blocks, x){
        this.id = id;
        this.blocks = blocks;
        this.x = x;
    }
    render(G){
        //Chunk size 16 x 128
        //Tilesize 5
        let canvas = document.getElementById("mapCanvas");
        let height = canvas.height;
        let width = canvas.width;
        let chunkW = 16;
        let chunkH = 128;
        let tileSize = 5;
        console.log("drawing relative to " + this.x);
        for(let x=0; x < chunkW; x++){
            for(let y=0; y < chunkH; y++){
                this.blocks[x + y*chunkW].render(G,(width-((x+this.x)*tileSize)), (height-y*tileSize), tileSize);
            }
        }
    }
}

class block{
    constructor(matRef){
        this.material = matRef;
    }
    render(G, x, y, size){
        G.beginPath();
        G.fillStyle = this.material.color;
        G.strokeStyle = this.material.color;
        G.fillRect(x, y, size, size);
        G.stroke();
    }
}

class material{
    constructor(id, name, color){
        this.id = id;
        this.name = name;
        this.color = color;
    }
}

class world{
    constructor(seed){
        //WORLD SIZE 32768 blocks (2^15), 2048 chunks
        this.seed = seed;
        this.aphidRan = new AphidRandom(this.seed);
        this.chunkNoiseLayer = generatePerlinHeights(2048, 128, this.seed, {bias:0.25, octaves:8}); //Layer for determining cohesive chunk heights
        this.chunks = []; //list of all generated chunks
        this.loadedChunks = []; //list of only actively loaded chunks;
        this.materials = [];
        this.generateMaterials();
        this.testChunks(10);
    }
    render(G){
        for(let r = 0; r < this.loadedChunks.length; r++){
            this.loadedChunks[r].render(G);
        }
    }
    generateMaterials(){
        let cols = this.generateRandomColors(this.aphidRan.rangeInt(15, 25));
        this.materials.push(new material(1, "Air", cols[0]));
        for(let r = 1; r < cols.length; r++){
            this.materials.push(new material(r+1, "Mat"+r, cols[r]));
        }
    }
    generateRandomColors(count){
        let output = ["#222"];
        for(let r = 0; r < count; r++){
            let rPick = this.aphidRan.rangeInt(0, 255);
            let gPick = this.aphidRan.rangeInt(0, 255);
            let bPick = this.aphidRan.rangeInt(0, 255);
            output.push("rgb(" + rPick + "," + gPick + "," + bPick + ")");
        }
        return output;
    }
    generateChunk(chunkId){
        let prevChunkH = -1;
        let nextChunkH = -1;
        if(chunkId == 0){
            prevChunkH = this.chunkNoiseLayer[0];
        }
        else{
            prevChunkH = this.chunkNoiseLayer[chunkId-1]
        }
        if(chunkId == 2047){
            nextChunkH = this.chunkNoiseLayer[2047];
        }
        else{
            nextChunkH = this.chunkNoiseLayer[chunkId+1];
        }
        let blocks = [];
        for(let x = 0; x < 16; x++){
            for(let y = 0; y < 128; y++){
                if(y < lerp(prevChunkH, nextChunkH, (x/16))){
                    blocks[x + y*16] = new block(this.materials[1]);
                }
                else{
                    blocks[x + y*16] = new block(this.materials[1]);
                }
            }
        }
        this.chunks.push(new chunk(chunkId, blocks, (chunkId*(5+(16*5)))));
    }
    loadChunk(chunkId){
        this.loadedChunks.push(this.chunks[chunkId]);
    }
    testChunks(count){
        for(let r = 0; r < count; r++){
            this.generateChunk(r);
            this.loadChunk(r);
        }
    }
}