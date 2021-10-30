class material extends item{
    constructor(id, name, stackable, hardness, weight, type){
        super(id, name, stackable);
        this.hardness = hardness;
        this.weight = weight;
        this.type = type;
        this.renderer;
    }
}