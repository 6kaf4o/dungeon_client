const Gamestate = require('/framework/State.js');

class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    draw() {
        Gamestate.context.fillRect(this.position.x - 5, this.position.y - 5, 10, 10);
    }
}
class Size {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}
class Line {
    // Takes two points as parameters(begin and end), each of them has a x and y position
    constructor(begin, end) {
            this.begin = begin;
            this.end = end;
            this.recalculate();
        }
        // Draws the line(if needed)
    draw(camera = {
        calculate_pos: () => {
            return { x: 0, y: 0 }
        }
    }) {
        Gamestate.context.beginPath();
        let begin = camera.calculate_pos(this.begin)
        let end = camera.calculate_pos(this.end)
        Gamestate.context.lineTo(begin.x, begin.y);
        Gamestate.context.lineTo(end.x, end.y);
        Gamestate.context.stroke();
    }
    recalculate() {
        // We check if the x coordinates of the starting and end point of the line, and if they are we move the starting point a bit to prevent an edge case
        if (this.begin.x == this.end.x) {
            this.begin.x += 0.01;
        }
        // m and b are constants which help us determine a collision point between two lines 
        this.m = (this.begin.y - this.end.y) / (this.begin.x - this.end.x);
        this.b = this.begin.y - this.begin.x * this.m;
    }
}
class Rectangle {
    constructor(position, size) {
        this.position = position;
        this.size = size;
    }
    draw() {
        context.fillRect(this.position.x - (this.size.width / 2), this.position.y - (this.size.height / 2), this.size.width, this.size.height);
    }
}
class Circle {
    constructor(position, radius) {
        this.position = position;
        this.radius = radius;
    }
    draw() {
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        context.fill();
    }
}
module.exports = {
    Point: Point,
    Size: Size,
    Line: Line,
    Rectangle: Rectangle,
    Circle: Circle
};