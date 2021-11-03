class Inventory{
    constructor(maxSlots){
        this.slots = [];
        this.maxSlots = maxSlots;
        this.currentSlot = 0;
        this.visualSlots = [];
    }
    addItem(item){
        if(this.slots.length < this.maxSlots){
            let found = false;
            let location;
            this.slots.forEach(element => {
                if(element.item.id == item.id){
                    console.log("Found!");
                    if(element.getRemainingSpace() > 0){
                        console.log("Space left!");
                        location = element;
                        found = true;
                    }
                }
            });

            if(found){
                location.stackCount++;
            }
            else{
                this.slots.push(new ItemStack(item, 1, this.visualSlots[this.currentSlot]));
                this.currentSlot++;
            }
            console.log(this);
        }
        else{
            console.log("Inventory full!");
        }
    }
    loadVisualSlots(){
        for(let r = 0; r < this.maxSlots; r++){
            this.visualSlots.push(document.getElementById("invSlot"+r+"-canvas"));
        }
    }
}