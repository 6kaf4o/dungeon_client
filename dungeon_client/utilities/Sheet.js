const Gamestate = require('/framework/State.js');

module.exports = class Sheet {
    constructor(imageSrc, properties) {
        this.image = new Image();
        this.image.src = imageSrc;

        this.rows = properties.rows;
        this.columns = properties.columns;
        this.imageWidth = properties.width;
        this.imageHeight = properties.height;
    }
    draw(positionInSheet, position, w, h) {
        Gamestate.context.drawImage(this.image, 
            positionInSheet.x * this.imageWidth / this.rows, 
            positionInSheet.y * this.imageHeight / this.columns, 
            this.imageWidth / this.rows, 
            this.imageHeight / this.columns, 
            position.x - w / 2, position.y - h / 2, w, h);
    }
}
