class item{
    constructor(id, name, stackable, maxStack){
        this.id = id;
        this.name = name;
        this.stackable = stackable;
        this.maxStack = maxStack || 0;
    }
}