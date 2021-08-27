const Gamestate = require('../framework/State.js');
const InventoryItems = require('/player/InventoryItems.js');

module.exports = class Inventory {
    constructor(maxSize) {
        this.maxSize = maxSize;
        if (this.maxSize > 9) this.maxSize = 9;
        this.content = [];
        for (let i = 0; i < this.maxSize; i++) {
            this.content[i] = new InventoryItems.Itemslot();
        }
        this.selected = 0; // index in this.content
        this.ammo = [];
    }

    draw(camera = new Camera()) {
        let cam = camera
        const w = Gamestate.canvas.width,
            h = Gamestate.canvas.height;
        const slotSize = w / 16;
        Gamestate.context.globalAlpha = 1;

        Gamestate.context.fillStyle = '#FACC69';
        Gamestate.context.fillRect(w / 2 - this.maxSize * slotSize / 2 + this.selected * slotSize, h - slotSize, slotSize, slotSize);

        for (let i = 0; i < this.maxSize; i++) {
            if (!this.content[i].empty) {
                this.content[i].item.draw(cam);
                Gamestate.context.drawImage(this.content[i].item.sprite, w / 2 - this.maxSize * slotSize / 2 + i * slotSize, h - slotSize, slotSize, slotSize);
            }
        }

        // Draw selected item
        this.getSelected().drawImg(this.players[0].position, new Size(100, 100) , this.camera);

        Gamestate.context.globalAlpha = 0.5;
        Gamestate.context.fillStyle = 'black';
        Gamestate.context.fillRect(w / 2 - this.maxSize * slotSize / 2, h - slotSize, this.maxSize * slotSize, slotSize);
        Gamestate.context.globalAlpha = 1;
        Gamestate.context.strokeStyle = '#DAEBAA';
        Gamestate.context.lineWidth = slotSize / 10;
        Gamestate.context.lineCap = 'round';
        Gamestate.context.lineJoin = 'round';
        Gamestate.context.strokeRect(w / 2 - this.maxSize * slotSize / 2, h - slotSize, this.maxSize * slotSize, slotSize);
        for (let i = -(this.maxSize / 2); i < this.maxSize / 2; i++) {
            Gamestate.context.beginPath();
            Gamestate.context.moveTo(w / 2 - i * slotSize, h - slotSize);
            Gamestate.context.lineTo(w / 2 - i * slotSize, h);
            Gamestate.context.stroke();
        }
    }

    update(camera = new Camera()) {
        for (let i = 49; i <= 57; i++) { // event.keyCode
            if (Gamestate.isKeyPressed[i]) {
                if (this.getSelected()) this.getSelected().stopUsing();
                if (this.maxSize > i - 49) this.selected = i - 49; // why are we still using event.keyCode
                if (Gamestate.isMouseDown && this.getSelected()) this.getSelected().startUsing();
            }
        }

        for (let i = 0; i < this.maxSize; i++) {
            if (!this.content[i].empty) {
                    this.content[i].item.update(camera);
            }
        }
    }

    getSelected() {
        return this.content[this.selected].item;
    }

    equipItem(item) {
        for (let i = 0; i < this.maxSize; i++) {
            if (this.content[i].empty) {
                this.content[i].equip(item);
                return true;
            }
        }
        return false;
    }

    startUsing() {
        if (this.content[this.selected].empty) {
            return;
        }
        this.content[this.selected].item.startUsing();
    }

    stopUsing() {
        if (this.content[this.selected].empty) {
            return;
        }
        this.content[this.selected].item.stopUsing();
    }
}