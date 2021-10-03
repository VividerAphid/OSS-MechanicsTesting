class skill{
    constructor(name, parent, parentGain){
        console.log("creating " + name);
        this.name = name;
        this.xp = 0;
        this.level = 1;
        this.parent = parent;
        this.parentGain = parentGain;
    }

    getMaxXP(){
        return 2*(Math.pow((this.level * 5), 2));
    }

    incrementXP(amount, gain){
        this.xp += amount;
        //console.log(this.name + " - " + this.parent);
        this.parent.incrementXP(Math.ceil(amount * (gain || this.parentGain)));
        //console.log(this.xp + "/" + this.getMaxXP());
        if(this.xp >= this.getMaxXP()){
            while(this.xp >= this.getMaxXP()){
                this.xp -= this.getMaxXP();
                this.level++;
                console.log("Level up!");
            }
        }
    }
}