class entity{
    constructor(id, name, item, xIn, yIn){
        this.id = id;
        this.name = name;
        this.item = item;
        this.x = xIn || -1;
        this.y = yIn || -1;
    }
}