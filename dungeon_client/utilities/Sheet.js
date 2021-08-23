module.exports = class Sheet {
    constructor(sheet, properties) {
        this.sheet = new Image();
        this.sheet.src = sheet;
        this.rows = properties.rows;
        this.columns = properties.columns;
        this.imageWidth = properties.width;
        this.imageHeight = properties.height;
    }
    draw(positionInSheet, position, w, h) {
        context.drawImage(this.sheet, positionInSheet.x * this.imageWidth / this.rows, positionInSheet.y * this.imageHeight / this.columns, this.imageWidth / this.rows, this.imageHeight / this.columns, position.x - w / 2, position.y - h / 2, w, h);
    }
}
