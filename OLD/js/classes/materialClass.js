class material extends item{
    constructor(id, name, stackable, maxStack, hardness, weight, type){
        super(id, name, stackable, maxStack);
        this.hardness = hardness;
        this.weight = weight;
        this.type = type;
        this.renderer;
    }
}