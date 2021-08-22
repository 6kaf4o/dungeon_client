class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    draw() {
        context.fillRect(this.x - 5, this.y - 5, 10, 10);
    }
}