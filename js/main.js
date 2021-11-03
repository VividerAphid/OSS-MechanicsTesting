var testPlayer = new player(1, "Player");
var materials = [];
var playerInventory = new Inventory(10);
testPlayer.inventory = playerInventory;

function fillMaterials(){
    
}

function generateMaterialCategory(G, materialArtist, count, type){
    let mats = [];
    for(let r = 0; r < count; r++){
        let hard = (r*5) + (Math.round(Math.random()*5)) + 1;
        let weig = (r*3) + (Math.round(Math.random()*3)) + 1;
        mats[r] = new material(r, "Material" + r, true, 10, hard, weig, type);
    }
    generateMaterialArt(G, materialArtist, mats);
    return mats;
}

function render(materialArtist, materialList){
    materialArtist.ctx.fillStyle = "#222";
    materialArtist.ctx.fillRect(0,0, gameCanvas.width, gameCanvas.height);
    for(let r = 0; r < materialList.length; r++){
        materialList[r].renderer.draw(materialArtist, materialList[r].renderer.x, materialList[r].renderer.y);
    }
}

function updateInventoryCanvases(){
    for(let r = 0; r < testPlayer.inventory.slots.length; r++){
        console.log("slots"+r);
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

function checkHit(materialList){
    let canvRect = gameCanvas.getBoundingClientRect();
	let x = (event.clientX - canvRect.left);
	let y = (event.clientY - canvRect.top);
    let reps = materialList.length;
	for(r=0; r<reps;r++){
        let itemWidth = materialList[r].renderer.rad + Math.ceil(materialList[r].renderer.rad * .1);
		if (x >= (materialList[r].renderer.x - itemWidth) && x <= (materialList[r].renderer.x + itemWidth)){
			if (y >= (materialList[r].renderer.y - itemWidth) && y <= (materialList[r].renderer.y + itemWidth)){         
                testPlayer.inventory.addItem(materialList[r]);
                updateInventoryCanvases();
			}
		}
    }
}