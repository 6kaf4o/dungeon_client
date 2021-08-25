class Itemslot {
    constructor() {
        this.empty = true;
    }
    equip(item) {
        this.empty = false;
        this.item = item; 
    }
}

module.exports = {
    Itemslot : Itemslot,
}
