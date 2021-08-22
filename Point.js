module.exports = class Point {
// Takes an x and y coordinate as parameters 
    constructor(x, y) {
            this.x=x
            this.y=y
    }
    // Draws the point with the x and y coordinates as the center of the dot(if needed)
    draw() {
        context.fillRect(this.position.x - 5, this.position.y - 5, 10, 10);
    }
}
// bottom text
