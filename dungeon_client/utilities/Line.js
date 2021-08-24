const Gamestate = require('/framework/State.js');

module.exports = class Line {
    // Takes two points as parameters(begin and end), each of them has a x and y position
    constructor(begin, end) {
        this.begin = begin;
        this.end = end;
        this.recalculate();
    }   
    // Draws the line(if needed)
    draw() {
        Gamestate.context.beginPath();
        Gamestate.context.lineTo(this.begin.x, this.begin.y);
        Gamestate.context.lineTo(this.end.x, this.end.y);
        Gamestate.context.stroke();
    }
    recalculate() {
        // We check if the x coordinates of the starting and end point of the line, and if they are we move the starting point a bit to prevent an edge case
        if(this.begin.x == this.end.x) {
            this.begin.x += 0.1;            
        }
        // m and b are constants which help us determine a collision point between two lines 
        this.m = (this.begin.y - this.end.y) / (this.begin.x - this.end.x);
        this.b = this.begin.y - this.begin.x * this.m;
    }
}
// bottom text
