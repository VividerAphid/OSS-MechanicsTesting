class Inventory{
    constructor(maxSlots){
        this.slots = [];
        this.maxSlots = maxSlots;
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
                this.slots.push(new ItemStack(item, 1));
            }
            console.log(this);
        }
        else{
            console.log("Inventory full!");
        }
    }
}