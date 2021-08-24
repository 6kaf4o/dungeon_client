class Position {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}
class Size {
    constructor(width, height){
        this.width = width;
        this.height = height;
    }
}
class Rect {
    constructor(x, y, width, height){
        this.position = new Position(x, y);
        this.size = new Size(width, height);
    }
    draw(){
        context.fillRect(this.position.x - (this.size.width/2), this.position.y - (this.size.height/2), this.size.width, this.size.height);
    }
}
class Circle {
    constructor(x, y, radius){
        this.position = new Position(x, y);
        this.radius = radius;
    }
    draw(){
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        context.fill();
    }
}