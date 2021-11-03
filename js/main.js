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
    for(let r = 0; r < materialList.length; r++){
        materialList[r].renderer.draw(materialArtist);
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
			}
		}
    }
}