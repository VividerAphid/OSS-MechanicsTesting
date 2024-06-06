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