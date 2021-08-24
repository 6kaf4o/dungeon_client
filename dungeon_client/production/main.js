/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 313:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Gamestate = __webpack_require__(147);
const Point = __webpack_require__(320);

module.exports = class Basegame { // Abstract class
    constructor() {}

    redraw() {
        Gamestate.context.clearRect(0, 0, Gamestate.canvas.width, Gamestate.canvas.height);

        this.draw();
        Gamestate.context.globalAlpha = 1;
        Gamestate.context.font = "10px Arial";

        window.requestAnimationFrame(this.redraw.bind(this));
    };

    handleEvent(event) {
        switch(event.type) { 
            case 'mousemove':
                Gamestate.mousePosition = new Point(event.pageX - Gamestate.canvas.offsetLeft,
                    event.pageY - Gamestate.canvas.offsetTop);
                this.mousemove();
                break;
            case 'mousedown':
                this.mousedown();
                break;
            case 'mouseup':
                this.mouseup();
                break;
            case 'keydown':
                Gamestate.isKeyPressed[event.keyCode] = 1;
                this.keydown(event.keyCode);
                break;
            case 'keyup':
                Gamestate.isKeyPressed[event.keyCode] = 0;
                this.keyup(event.keyCode);
                break;    
        }
    }

    init() {        
        Gamestate.canvas = document.getElementById("canvas-id");

        Gamestate.canvas.width = 800;
        Gamestate.canvas.height = 600;
    
        Gamestate.context = Gamestate.canvas.getContext("2d");
        Gamestate.context.fillStyle = "#0000ff";
    
        Gamestate.mousePosition = new Point(0, 0);
        Gamestate.isKeyPressed = new Array(256).fill(0);

        window.addEventListener("keyup", this);
        window.addEventListener("keydown", this);
        window.addEventListener("mousedown", this);
        window.addEventListener("mouseup", this);
        window.addEventListener("mousemove", this);

        this.redraw();
        setInterval(this.update.bind(this), 10);
    }

    draw() {}
    update() {}
    keyup(key) {}
    keydown(key) {}
    mousemove() {}
    mouseup() {}
    mousedown() {}
}

/***/ }),

/***/ 147:
/***/ ((module) => {

let canvas, context, mousePosition, isKeyPressed;
module.exports = {
    canvas,
    context,
    mousePosition,
    isKeyPressed
};

/***/ }),

/***/ 732:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Line = __webpack_require__(927);
const Point = __webpack_require__(320);
const Utility = __webpack_require__(580)

module.exports = class Lighting {
    // Takes an array of walls as a perimeter
    constructor(walls) {
        this.walls = walls;
    }
    // Finds the intersection points between walls and rays cast at angles from the start point
    drawLight(start) {
        // We declare the intersections array and make it empty(to clear out the already existing rays beforehand(if any are present))
        this.intersections = [];
        // This for loop does all the checks for intersection at angle intervals of 0.002
        for(this.angle = 0; this.angle < Math.PI * 2; this.angle += 0.002) {
            // This is a single intersection that will go into the intersections array later(if it gets a value)
            this.intersection = false;
            // Minimum distance defines the maximum length our light rays can have
            this.minimumDistance = 10000;
            // Just a ray rotated around the starting point by an angle amount
            this.rotatedRay = new Line(start, new Point(start.x + Math.cos(this.angle), start.y + Math.sin(this.angle)));
            // In this for we check for collisions with every wall
            for(this.i = 0; this.i < this.walls.length; this.i ++) {
                // Current intersection is a holding variable that has a sole purpose to hold the result of the intersection check
                this.currentIntersection = Utility.wallRayIntersection(this.walls[this.i], this.rotatedRay);
                // If a ray doesn't collide with a wall their intersection is false
                if(this.currentIntersection !== false) {
                    // We determine the distance of the light ray from the player to a wall
                    if(this.minimumDistance > Utility.distance(this.currentIntersection, start)) {
                        this.intersection = this.currentIntersection;
                        this.minimumDistance = Utility.distance(this.currentIntersection, start);
                    }
                }
            }
            // We push an intersection of value into the intersections array
            if(this.intersection !== false) {
                this.intersections.push(this.intersection);
            }
        }
        // Returns an array of intersection points between the light rays coming from the player and walls
        // they can then be connected within a draw function to make light
        return this.intersections;
    }
}
// bottom text


/***/ }),

/***/ 94:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Sheet = __webpack_require__(307);
const Gamestate = __webpack_require__(147);

module.exports = class Player{
    constructor(position, health, inventory, id){
        this.position = position;
        this.id = id;
        this.inventory = inventory;
        this.delta = 0;
        // TODO wtf who wrote this code 
        // Author : Vladi...
        this.spritesheet = new Sheet('images/bruh.png', 
                        {rows:4, columns:4, width:408, height:611});

        this.health = health;
        this.sprite = {
            left:[],
            right:[],
            up:[],
            down:[],
            global:4
        }

        this.dir = "up";
        this.cursprite = 0;
        
        for(let i = 0 ; i < this.sprite.global ; i ++){
            this.sprite.left = 2
            this.sprite.up = 1
            this.sprite.down = 0
            this.sprite.right = 3
        }

        this.curimg
        this.size = {
            x:50,
            y:70
        }

        this.colorscheme = {
            r:Math.random()*255,
            g:Math.random()*255,
            b:Math.random()*255,
            rainbow : false
        }

        this.itr = 0;
        this.bullets = 0;
        this.bullet = [];
    }
    update(){
            //--------------------->>> normal <<<----------------------------------------\\
        let movx = false , movy = false

            if(Gamestate.isKeyPressed[65]){

                this.dir = "left"
                this.position.x -= this.delta
                movx = true
                this.delta += 0.1
            }else if(Gamestate.isKeyPressed[68]){

                this.dir = "right"
                this.position.x += this.delta
                movx = true
                this.delta += 0.1
            }else {

                movx = false
            }

            if(Gamestate.isKeyPressed[87]){

                this.dir = "up"
                this.position.y -= this.delta
                movy = true
                this.delta += 0.1
            }else if(Gamestate.isKeyPressed[83]){

                this.dir = "down"
                this.position.y += this.delta
                movy = true
                this.delta += 0.1
            }else{

                movy = false
            }

            if((!movx && !movy)|| this.delta > 6){
                if(this.delta > 0){
                    this.delta -= 0.05
                }
                this.delta /= 1.04
            }
            
            if(this.delta > 0.1){
                this.itr++
                if(this.itr%30 == 0){
                    this.cursprite ++;
                }
            }else{
                this.irt = 0;
                this.cursprite = 0;
            }
            
            if(this.cursprite == this.sprite.global){
                this.cursprite = 0;
            }
        //--------------------->>> Sprite management <<<----------------------------------------\\
    }
    draw(){
        //--------------------->>> sprite draw <<<----------------------------------------\\
        
            // console.log(this.curimg , this.dir)
        switch(this.dir){
            case "up" :                         
                Gamestate.context.drawImage(this.spritesheet.image , this.cursprite*this.spritesheet.w/this.spritesheet.x , this.sprite.up*this.spritesheet.h/this.spritesheet.y , this.spritesheet.w/this.spritesheet.x , this.spritesheet.h/this.spritesheet.y , this.position.x - this.size.x/2 , this.position.y - this.size.x/2, this.size.x , this.size.y)
                break;
            case "down" : 
                // this.curimg = this.sprite.down[this.cursprite]
                Gamestate.context.drawImage(this.spritesheet.image , this.cursprite*this.spritesheet.w/this.spritesheet.x , this.sprite.down*this.spritesheet.h/this.spritesheet.y , this.spritesheet.w/this.spritesheet.x , this.spritesheet.h/this.spritesheet.y , this.position.x - this.size.x/2, this.position.y - this.size.x/2, this.size.x , this.size.y)
                break;
            case "left" : 
                // this.curimg = this.sprite.left[this.cursprite]                        
                Gamestate.context.drawImage(this.spritesheet.image , this.cursprite*this.spritesheet.w/this.spritesheet.x , this.sprite.left*this.spritesheet.h/this.spritesheet.y , this.spritesheet.w/this.spritesheet.x , this.spritesheet.h/this.spritesheet.y , this.position.x - this.size.x/2, this.position.y - this.size.x/2, this.size.x , this.size.y)
                break;
            case "right" : 
                // this.curimg = this.sprite.right[this.cursprite]
                Gamestate.context.drawImage(this.spritesheet.image , this.cursprite*this.spritesheet.w/this.spritesheet.x , this.sprite.right*this.spritesheet.h/this.spritesheet.y , this.spritesheet.w/this.spritesheet.x , this.spritesheet.h/this.spritesheet.y , this.position.x - this.size.x/2, this.position.y - this.size.x/2, this.size.x , this.size.y)
                break;
        }

        //--------------------->>> sprite draw <<<----------------------------------------\\


    }
    shoot(){
        let angle = Math.atan2((Gamestate.mousePosition.y-this.position.y) , (Gamestate.mousePosition.x-this.position.x))
        this.bullet[this.bullets] = new Magic(this.position.x+this.size.x/2,this.position.y+this.size.y/2 , Math.cos(angle)*20 , Math.sin(angle) * 20)
        this.bullets ++ 
    }
}


/***/ }),

/***/ 927:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Gamestate = __webpack_require__(147);

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


/***/ }),

/***/ 320:
/***/ ((module) => {

module.exports = class Point {
    constructor(x, y) {
            this.x=x
            this.y=y
    }
    draw() { 
        context.fillRect(this.position.x - 5, this.position.y - 5, 10, 10);
    }
}
// bottom text


/***/ }),

/***/ 307:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Gamestate = __webpack_require__(147);

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
        Gamestate.context.drawImage(this.image, positionInSheet.x * this.imageWidth / this.rows, positionInSheet.y * this.imageHeight / this.columns, this.imageWidth / this.rows, this.imageHeight / this.columns, position.x - w / 2, position.y - h / 2, w, h);
        console.log("what");
    }
}


/***/ }),

/***/ 580:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Point = __webpack_require__(320);

module.exports = class Utility{
    constructor(){}
    static distance(a, b) {
        return Math.hypot(a.x - b.x, a.y - b.x);
    }
    // Returns true if there was no problem.
    static fixWallRayIntersection(line, ray, intersection) {
        // This makes the light ray shine only in front of you
        let isBetweenx = false, isBetweeny = false;
        if((ray.end.x <= ray.begin.x && ray.begin.x <= intersection.x) || (ray.end.x >= ray.begin.x && ray.begin.x >= intersection.x)) {
            isBetweenx = true;
        }
        if((ray.end.y <= ray.begin.y && ray.begin.y <= intersection.y) || (ray.end.y >= ray.begin.y && ray.begin.y >= intersection.y)) {
            isBetweeny = true;
        }
        if(isBetweeny && isBetweenx) {
            return false;
        }
        // This checks if the light collides with a wall, and not the ray it lays on
        isBetweenx = false, isBetweeny = false;
        if((line.begin.x <= intersection.x && intersection.x <= line.end.x) || (line.begin.x >= intersection.x && intersection.x >= line.end.x)) {
            isBetweenx = true;
        }
        if((line.begin.y <= intersection.y && intersection.y <= line.end.y) || (line.begin.y >= intersection.y && intersection.y >= line.end.y)) {
            isBetweeny = true;
        }
        if(!isBetweeny || !isBetweenx) {
            return false;
        }
        return true;
    }

    static wallRayIntersection(wall, ray) {
        wall.recalculate();
        ray.recalculate();
        let x = (wall.b - ray.b) / (ray.m - wall.m);
        let y = x * wall.m + wall.b;
        // The point of contact between the ray and wall
        let answerPoint = new Point(x, y);
        if(this.fixWallRayIntersection(wall, ray, answerPoint)) {
            return answerPoint;        
        } 
        else {
            return false;
        }
    }
    // Checks for collision between a circle and rectangle
    static rectCircleColliding(circle,rect){
        let distX = Math.abs(circle.x - rect.pos.x - rect.size.x/2);
        let distY = Math.abs(circle.y - rect.pos.y - rect.size.y/2);
        let dx = distX-rect.size.x/2;
        let dy = distY-rect.size.y/2;

        if (distX > (rect.size.x/2 + circle.radius) || distY > (rect.size.y/2 + circle.radius)) {
            return false; 
        }

        if ((distX < (rect.size.x/2) || distY < (rect.size.y/2)) || (dx * dx + dy * dy <= (circle.radius * circle.radius))) {
            return true; 
        }
    }
}
//bottom text


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const Line = __webpack_require__(927);
const Point = __webpack_require__(320);
const Player = __webpack_require__(94);
const Lighting = __webpack_require__(732);
const Gamestate = __webpack_require__(147);
const Basegame = __webpack_require__(313);

class Magic{
    constructor(x,y,dx,dy){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
    }
    draw(){
        this.x += this.dx
        this.y += this.dy
        context.fillRect(this.x,this.y,20,20)
    }
}    

class Game extends Basegame {
    constructor() {
        super();

        this.walls = [];
        this.intersections = [];

        this.walls.push(new Line(new Point(0, 0), new Point(800, 0)));
        this.walls.push(new Line(new Point(800, 600), new Point(800, 0)));
        this.walls.push(new Line(new Point(800, 600), new Point(0, 600)));
        this.walls.push(new Line(new Point(0, 0), new Point(0, 600, 1)));

        for(let i = 0 ; i < Math.random()*4+1 ; i ++){
            this.walls.push (new Line(new Point(Math.random()*300 , Math.random()*300),new Point(Math.random()*300 , Math.random()*300)));
        }

        this.p = new Player(new Point(100,100),20,[],0);

        this.lighting = new Lighting(this.walls);
    }

    update() {
        this.intersections = this.lighting.drawLight(this.p.position);
        this.p.update();
    }

    draw(){
        Gamestate.context.fillStyle = "black"
        Gamestate.context.fillRect(0, 0, Gamestate.canvas.width, Gamestate.canvas.height)
        
        Gamestate.context.fillStyle = "white"
        Gamestate.context.beginPath()
        for(let i = 1 ; i < this.intersections.length ; i ++){
            Gamestate.context.lineTo(this.intersections[i].x, this.intersections[i].y)
        }
        Gamestate.context.fill()
        this.lighting.drawLight(this.p.position)

        Gamestate.context.strokeStyle = "red"
        Gamestate.context.lineWidth = 3;
        for(let i = 0 ; i < this.walls.length ; i ++){        
            this.walls[i].draw();
        }

        this.p.draw()
        for(let i = 0 ; i < this.p.bullets ; i ++){
            this.p.bullet[i].draw()
        }
    }

    mouseup(){
        this.p.shoot()
    }
}

let game = new Game();
game.init();
})();

/******/ })()
;