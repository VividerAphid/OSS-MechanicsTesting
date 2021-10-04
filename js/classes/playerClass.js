class player{
    constructor(id, name){
        this.id = id;
        this.name = name;
        this.skills = this.initSkills();
        this.health = 100;
        this.inventory = {slots: 10};
    }

    initSkills(){
        let skillObj = {};
        let skillList = [["knowledge", "", 0],
        ["crafting", "knowledge", .1],
        ["analysis", "knowledge", .1],
        ["tool", "crafting", .1],
        ["pickaxe", "tool", .1],
        ["hammer", "tool", .1],
        ["axe", "tool"], .1,
        ["shovel", "tool", .1],
        ["hoe", "tool", .1],
        ["bag", "tool", .1]];

        for(let r = 0; r < skillList.length; r++){
            let name = skillList[r][0];
            let parent = skillObj[skillList[r][1]];
            if(skillList[r][1] == ""){
                parent = {incrementXP: function(){}};
            }
            skillObj[name] = new skill(name, parent);
        }
        //     tool: new skill("Tool"),
        //     pickaxe: new skill("Pickaxe"),
        //     hammer: new skill("Hammer"),
        //     shovel: new skill("Shovel"),
        //     axe: new skill("Axe"),
        //     hoe: new skill("Hoe"),
        //     bag: new skill("Bag"),

        //     athletics: new skill("Athletics"),
        //     strength: new skill("strength"),
        //     running: new skill("Running"),
        //     jumping: new skill("Jumping"),

        //     weapon: new skill("Weapon"),
        //     sword: new skill("Sword"),
        //     dagger: new skill("Dagger"),
        //     club: new skill("Club"),
        //     bow: new skill("Bow"),
        //     crossbow: new skill("Crossbow"),
        //     sling: new skill("Sling"),
        //     firearm: new skill("Firearm"),

        //     mining: new skill("Mining"),
        //     gathering: new skill("Gathering"),
        //     farming: new skill("Farming"),
        //     butchering: new skill("Butchering")
        // };
        return skillObj;
    }
}