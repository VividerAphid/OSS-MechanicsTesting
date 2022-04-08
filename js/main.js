var testPlayer = new player(1, "Player");
var materials = [];
var playerInventory = new Inventory(10);
testPlayer.inventory = playerInventory;


function generateMaterialCategory(G, materialArtist, count, type){
    let mats = [];
    for(let r = 0; r < count; r++){
        let hard = (r*5) + (Math.round(Math.random()*5)) + 1;
        let weig = (r*3) + (Math.round(Math.random()*3)) + 1;
        mats[r] = new material(r, "Material" + r, true, 100, hard, weig, type);
    }
    generateMaterialArt(G, materialArtist, mats);
    return mats;
}

function generateMaterialNodes(materialList, maxOfEach, width, height){
    let generatedNodes = [];
    let idIndex = 0;
    for(let r = 0; r < materialList.length; r++){
        let count = Math.round(Math.random()*maxOfEach) + 1;
        let material = materialList[r];
        for(let t = 0; t < count; t++){
            generatedNodes.push(new entity(idIndex, material.name + t, material));
            idIndex++;
        }
    }
    let coords = generateCoordinateSet(width, height, generatedNodes.length, 20, 30); 
    //console.log(coords);
    for(let r = 0; r < generatedNodes.length; r++){
        generatedNodes[r].x = coords[r][0];
        generatedNodes[r].y = coords[r][1];
    }
    return generatedNodes;
}

function render(materialArtist, materialList){
    materialArtist.ctx.fillStyle = "#222";
    materialArtist.ctx.fillRect(0,0, gameCanvas.width, gameCanvas.height);
    for(let r = 0; r < materialList.length; r++){
        materialList[r].item.renderer.draw(materialArtist, materialList[r].x, materialList[r].y);
    }
}

function updateInventoryCanvases(){
    for(let r = 0; r < testPlayer.inventory.slots.length; r++){
       //console.log("slots"+r);
        let ctx = testPlayer.inventory.visualSlots[r].getContext("2d");
        let tmpArtist = new artist(ctx);
        let item = testPlayer.inventory.slots[r].item;
        ctx.fillStyle = "#222";
        ctx.fillRect(0, 0, testPlayer.inventory.visualSlots[r].width, testPlayer.inventory.visualSlots[r].height);
        item.renderer.draw(tmpArtist, 30, 20);
        ctx.fillStyle = "#fff";
        ctx.strokeStyle = "#fff";
        ctx.font = "bold 15px Arial";
        ctx.fillText(testPlayer.inventory.slots[r].stackCount, 25, 45);
    }
}

function checkHit(entityList, art){
    //console.log("checkHit");
    let canvRect = gameCanvas.getBoundingClientRect();
    let tempOffset = {x: (art.cameraOffset.x - (gameCanvas.width/2)), y: (art.cameraOffset.y - (gameCanvas.height/2))};
	let x = (event.clientX - canvRect.left) - (art.cameraOffset.x - (gameCanvas.width/2));
	let y = (event.clientY - canvRect.top) - (art.cameraOffset.y - (gameCanvas.height/2));
    let reps = entityList.length;
    //console.log("item 2 is at " + materialList[2].renderer.x + ", " + materialList[2].renderer.y);
    console.log("click registered at " + x + ", " + y);
    //console.log("offset is " + art.cameraOffset.x + ", " + art.cameraOffset.y);
    //console.log("temp offset is " + tempOffset.x + ", " + tempOffset.y);
	for(let r=0; r<reps;r++){
        let entity = entityList[r];
        let itemWidth = entityList[r].item.renderer.rad + Math.ceil(entityList[r].item.renderer.rad * .1);
        let itemRenderer = entityList[r].item.renderer;
		if (x >= (entity.x - itemWidth) && x <= (entity.x + itemWidth)){
			if (y >= (entity.y - itemWidth) && y <= (entity.y + itemWidth)){       
                console.log("hit!");  
                testPlayer.inventory.addItem(entityList[r].item);
                updateInventoryCanvases();
			}
		}
    }
}