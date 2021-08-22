class Point {
    constructor(x, y) {
            this.x=x
            this.y=y
    }
    draw() {
        context.fillRect(this.position.x - 5, this.position.y - 5, 10, 10);
    }
}