module.exports = class Inventory {
    constructor(maxSize) {
        this.maxSize = maxSize;
        this.weapons = [];
        this.ammo = [];
        this.items = [];
    }
}
