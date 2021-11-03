class ItemStack{
    constructor(item, count, visualSlot){
        this.item = item;
        this.stackable = item.stackable;
        this.maxStack = item.maxStack;
        this.stackCount = count || 1;
        this.visualSlot = visualSlot;
    }

    isMergeableWith(ite){
        return (this.item.id == ite.id);
    }

    getRemainingSpace(){
        return this.maxStack - this.stackCount;
    }
}