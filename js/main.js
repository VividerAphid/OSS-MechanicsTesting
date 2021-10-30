var testPlayer = new player(1, "Player");
var materials = [];

function fillMaterials(){
    
}

function generateMaterialCategory(G, materialArtist, count, type){
    let mats = [];
    for(let r = 0; r < count; r++){
        let hard = (r*5) + (Math.round(Math.random()*5)) + 1;
        let weig = (r*3) + (Math.round(Math.random()*3)) + 1;
        mats[r] = new material(r, "Material" + r, true, hard, weig, type);
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
		if (x >= (materialList[r].renderer.x - materialList[r].renderer.rad*2) && x <= (materialList[r].renderer.x + materialList[r].renderer.rad*2)){
			if (y >= (materialList[r].renderer.y - materialList[r].renderer.rad*2) && y <= (materialList[r].renderer.y + materialList[r].renderer.rad*2)){         
                console.log(materialList[r]);
			}
		}
    }
}