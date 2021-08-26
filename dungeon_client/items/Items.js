// Note: this code has not been tested extensively

const Player = require('../player/Player.js');

class Item {
    /**
     * @param {number} maxUses 
     * @param {number} cooldown 
     * @param {Player} owner 
     */
    constructor(maxUses, cooldown, owner) {
        this.uses = 0;
        this.cooldown = cooldown;
        this.owner = owner;
    }

    use() {
        if (this.uses >= this.maxUses) return;
        this.uses++;
        this.effect();
    }

    effect() { }
}

class HealthPotion extends Item {
    /** 
     * @param {number} cooldown 
     * @param {Player} owner 
     * @param {number} healAmount 
     */
    constructor(cooldown, owner, healAmount) {
        super(cooldown, owner);
        this.maxUses = 1;
        this.healAmount = healAmount;
    }

    use() {
        super.use();
    }

    effect() {
        this.owner.health += this.healAmount;
    }
}