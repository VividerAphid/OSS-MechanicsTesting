class ItemStack{
    constructor(item, count){
        this.item = item;
        this.stackable = item.stackable;
        this.maxStack = item.maxStack;
        this.stackCount = count || 1;
    }

    isMergeableWith(ite){
        return (this.item.id = ite.id);
    }
}