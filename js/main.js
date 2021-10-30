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