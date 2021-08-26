/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 741:
/***/ ((module) => {

//Camera is not static and you may have multiple cameras
module.exports = class Camera {
    constructor(mazeSize, cameraSize) {
        this.mazeSize = mazeSize;
        this.cameraSize = cameraSize;
        this.pos = { x: 0, y: 0 };
    }

    //follow() reqires a Point class to follow and updates the cameras position
    follow(a) {
        this.pos.x = a.position.x - this.cameraSize.x / 2;
        this.pos.y = a.position.y - this.cameraSize.y / 2;
        if (this.pos.x < 0) {
            this.pos.x = 0;
        }
        if (this.pos.y < 0) {
            this.pos.y = 0;
        }
        if (this.pos.x > this.mazeSize.x) {
            this.pos.x = this.mazeSize.x;
        }
        if (this.pos.y > this.mazeSize.y) {
            this.pos.y = this.mazeSize.y;
        }
    }

    // calculates a point's draw position according to the cameras location
    calculate_pos(pos) {
        let returnpos = { x: pos.x, y: pos.y }
        returnpos.x -= this.pos.x
        returnpos.y -= this.pos.y
        return returnpos;
    }

}

/***/ }),

/***/ 622:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Player = __webpack_require__(94);
const Maze = __webpack_require__(864);
const Gamestate = __webpack_require__(147);
const Geometry = __webpack_require__(322);
const Point = Geometry.Point;
const Line = Geometry.Line;
const Size = Geometry.Size;
module.exports = class Minimap{
    constructor(sizeMap, sizeCamera, sizeMinimap){
        this.sizeMap = sizeMap;
        this.sizeCamera = sizeCamera;
        this.sizeMinimap = sizeMinimap;
        this.scale = new Size(this.sizeMap.width / this.sizeMinimap.width, this.sizeMap.height / this.sizeMinimap.height);
    }
    /*updatePlayers(players){
        this.players=players
    }*/
    draw(point,players){
        this.players = [];
        this.walls = [];
        for(let i = 0; i < Maze.walls.length; i++){
            this.walls.push(new Line(new Point(Maze.walls[i].begin.x, Maze.walls[i].begin.y), new Point(Maze.walls[i].end.x, Maze.walls[i].end.y)));
        }
        for(let i = 0; i < players.length; i++){
            this.players.push(new Player(new Point(players[0].position.x, players[0].position.y), players[0].health, players[0].inventory, players[0].id));
        }
        this.pos = point;

        for(let i = 0; i < this.players.length; i++){
            this.players[i].size.x/=this.scale.width
            this.players[i].size.y/=this.scale.height
            this.players[i].position.x = this.players[i].position.x/this.scale.width + 600;
            this.players[i].position.y = this.players[i].position.y/this.scale.height;
            this.players[i].draw();
        }
        Gamestate.context.strokeStyle = "rgba(255, 0, 0, 0.3)";
        Gamestate.context.lineWidth = 1;
        for(let i = 0; i < this.walls.length; i++){
            this.walls[i].begin.x = this.walls[i].begin.x/this.scale.width + 600;
            this.walls[i].end.x = this.walls[i].end.x/this.scale.width + 600;
            this.walls[i].begin.y = this.walls[i].begin.y/this.scale.height;
            this.walls[i].end.y = this.walls[i].end.y/this.scale.height;
            this.walls[i].draw();
        }
    }
}


/***/ }),

/***/ 313:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Gamestate = __webpack_require__(147);
const Geometry = __webpack_require__(322);
const Point = Geometry.Point;
const Line = Geometry.Line;

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
                Gamestate.isMouseDown = true;
                this.mousedown();
                break;
            case 'mouseup':
                Gamestate.isMouseDown = false;
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
        Gamestate.absoluteTime = 0;
        
        Gamestate.canvas = document.getElementById("canvas-id");

        Gamestate.canvas.width = 800;
        Gamestate.canvas.height = 600;
    
        Gamestate.context = Gamestate.canvas.getContext("2d");
        Gamestate.context.fillStyle = "#0000ff";
    
        Gamestate.mousePosition = new Point(0, 0);
        Gamestate.isKeyPressed = new Array(256).fill(0);
        Gamestate.isMouseDown = false;

        window.addEventListener("keyup", this);
        window.addEventListener("keydown", this);
        window.addEventListener("mousedown", this);
        window.addEventListener("mouseup", this);
        window.addEventListener("mousemove", this);

        this.redraw();
        setInterval(this.updateStart.bind(this), 10);
    }

    draw() {}
    updateStart() {
        let timestamp = performance.now();
        this.update();
        Gamestate.deltaTime = performance.now() - timestamp;
        Gamestate.absoluteTime += performance.now() - timestamp;
    }
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

let canvas, context, mousePosition, isKeyPressed, isMouseDown, deltaTime, absoluteTime;
module.exports = {
    canvas,
    context,
    mousePosition,
    isKeyPressed,
    isMouseDown,
    deltaTime,
    absoluteTime
};

/***/ }),

/***/ 732:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Geometry = __webpack_require__(322);
const Gamestate = __webpack_require__(147);
const Point = Geometry.Point;
const Line = Geometry.Line;
const Utility = __webpack_require__(580)

module.exports = class Lighting {
    // Takes an array of walls as a perimeter
    constructor(walls) {
            this.walls = walls;
        }
        // Finds the intersection points between walls and rays cast at angles from the start point
    getIntersections(start) {
        // We declare the intersections array and make it empty(to clear out the already existing rays beforehand(if any are present))
        this.intersections = [];
        // This for loop does all the checks for intersection at angle intervals of 0.002
        for (this.angle = 0; this.angle < Math.PI * 2; this.angle += 0.002) {
            // This is a single intersection that will go into the intersections array later(if it gets a value)
            this.intersection = false;
            // Minimum distance defines the maximum length our light rays can have
            this.minimumDistance = 100000000;
            // Just a ray rotated around the starting point by an angle amount
            this.rotatedRay = new Line(start, new Point(start.x + Math.cos(this.angle), start.y + Math.sin(this.angle)));
            // In this for we check for collisions with every wall
            for (this.i = 0; this.i < this.walls.length; this.i++) {
                // Current intersection is a holding variable that has a sole purpose to hold the result of the intersection check
                this.currentIntersection = Utility.wallRayIntersection(this.walls[this.i], this.rotatedRay);
                // If a ray doesn't collide with a wall their intersection is false
                if (this.currentIntersection !== false) {
                    // We determine the distance of the light ray from the player to a wall
                    if (this.minimumDistance > Utility.distance(this.currentIntersection, start)) {
                        this.intersection = this.currentIntersection;
                        this.minimumDistance = Utility.distance(this.currentIntersection, start);
                    }
                }
            }
            // We push an intersection of value into the intersections array
            if (this.intersection !== false) {
                this.intersections.push(this.intersection);
            }
        }
        // Returns an array of intersection points between the light rays coming from the player and walls
        // they can then be connected within a draw function to make light
        return this.intersections;
    }
}

/***/ }),

/***/ 825:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Gamestate = __webpack_require__(147);
const InventoryItems = __webpack_require__(125);

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

    draw(camera) {
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

    update(camera) {
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

/***/ }),

/***/ 125:
/***/ ((module) => {

class Itemslot {
    constructor() {
        this.empty = true;
    }
    equip(item) {
        this.empty = false;
        this.item = item; 
    }
}

module.exports = {
    Itemslot : Itemslot,
}


/***/ }),

/***/ 94:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Sheet = __webpack_require__(307);
const Gamestate = __webpack_require__(147);
const Weapons = __webpack_require__(45);
const Utility = __webpack_require__(580);
const Geometry = __webpack_require__(322);
const Point = Geometry.Point;
const Maze = __webpack_require__(864);

module.exports = class Player {
    constructor(position, health, inventory, id) {
        this.position = position;
        this.id = id;
        this.inventory = inventory;
        this.delta = 0;
        // TODO wtf who wrote this code 
        // Author : Vladi...
        this.spritesheet = new Sheet('./images/test_char.png', { rows: 4, columns: 4, width: 1601, height: 2397 });

        this.health = health;
        this.maxHealth = health;
        this.sprite = {
            left: 2,
            right: 3,
            up: 1,
            down: 0,
            global: 4
        }

        this.dir = "up";
        this.cursprite = 0;

        for (let i = 0; i < this.sprite.global; i++) {
            this.sprite.left = 2
            this.sprite.up = 1
            this.sprite.down = 0
            this.sprite.right = 3
        }

        this.curimg
        this.size = {
            x: 50,
            y: 70
        }

        this.colorscheme = {
            r: Math.random() * 255,
            g: Math.random() * 255,
            b: Math.random() * 255,
            rainbow: false
        }

        this.itr = 0;
    }
    update(walls , camera) {
        let movx = false,
            movy = false

        if (Gamestate.isKeyPressed[65]) {
            // All collision detections done before movement to prevent getting stuck 
            if (!Utility.boxWallsColliding(
                    new Point((this.position.x - this.size.x / 2) - this.delta,
                        this.position.y - this.size.y / 2),
                    this.size.x, this.size.y, Maze.walls)) {
                this.dir = "left"
                this.position.x -= this.delta /* / Gamestate.deltaTime */ ;
                movx = true
                this.delta += 0.1
            }
        } else if (Gamestate.isKeyPressed[68]) {
            if (!Utility.boxWallsColliding(
                    new Point((this.position.x - this.size.x / 2) + this.delta,
                        this.position.y - this.size.y / 2),
                    this.size.x, this.size.y, Maze.walls)) {

                this.dir = "right"
                this.position.x += this.delta /* / Gamestate.deltaTime */ ;
                movx = true
                this.delta += 0.1
            }
        } else {
            movx = false
        }

        if (Gamestate.isKeyPressed[87]) {
            if (!Utility.boxWallsColliding(
                    new Point(this.position.x - this.size.x / 2,
                        (this.position.y - this.size.y / 2) - this.delta),
                    this.size.x, this.size.y, Maze.walls)) {
                this.dir = "up"
                this.position.y -= this.delta /* / Gamestate.deltaTime */ ;
                movy = true
                this.delta += 0.1
            }
        } else if (Gamestate.isKeyPressed[83]) {
            if (!Utility.boxWallsColliding(
                    new Point(this.position.x - this.size.x / 2,
                        (this.position.y - this.size.y / 2) + this.delta),
                    this.size.x, this.size.y, Maze.walls)) {
                this.dir = "down"
                this.position.y += this.delta /* / Gamestate.deltaTime */ ;
                movy = true
                this.delta += 0.1
            }
        } else {

            movy = false
        }

        if ((!movx && !movy) || this.delta > 6) {
            if (this.delta > 0) {
                this.delta -= 0.05
            }
            this.delta /= 1.04
        }

        if (this.delta > 0.1) {
            this.itr++
                if (this.itr % 30 == 0) {
                    this.cursprite++;
                }
        } else {
            this.irt = 0;
            this.cursprite = 0;
        }

        if (this.cursprite == this.sprite.global) {
            this.cursprite = 0;
        }
        //--------------------->>> Sprite management <<<----------------------------------------\\

        this.inventory.update(camera);
    }
    draw(camera) {
        //--------------------->>> sprite draw <<<----------------------------------------\\

        let curdrawpos = camera.calculate_pos(this.position)
        switch (this.dir) {
            case "up":
                this.spritesheet.draw(new Point(this.cursprite, this.sprite.up), curdrawpos, this.size.x, this.size.y)
                break;
            case "down":
                // this.curimg = this.sprite.down[this.cursprite]

                this.spritesheet.draw(new Point(this.cursprite, this.sprite.down), curdrawpos, this.size.x, this.size.y)
                break;
            case "left":
                // this.curimg = this.sprite.left[this.cursprite]                        
                this.spritesheet.draw(new Point(this.cursprite, this.sprite.left), curdrawpos, this.size.x, this.size.y)
                break;
            case "right":
                // this.curimg = this.sprite.right[this.cursprite]
                this.spritesheet.draw(new Point(this.cursprite, this.sprite.right), curdrawpos, this.size.x, this.size.y)
                break;
        }
        // Gamestate.context.fillStyle = 'blue';
        // Gamestate.context.fillRect(this.position.x - this.size.x / 2, this.position.y - this.size.y / 2, this.size.x, this.size.y);
        let healthBarSize = this.size.x * this.maxHealth / 50;
        Gamestate.context.fillStyle = 'red';
        Gamestate.context.fillRect(curdrawpos.x - healthBarSize / 2, curdrawpos.y - this.size.y / 2 - this.size.y / 10, healthBarSize, this.size.y / 20);
        Gamestate.context.fillStyle = 'green';
        Gamestate.context.fillRect(curdrawpos.x - healthBarSize / 2, curdrawpos.y - this.size.y / 2 - this.size.y / 10, healthBarSize / this.maxHealth * this.health, this.size.y / 20);
        //--------------------->>> sprite draw <<<----------------------------------------\\

        this.inventory.draw(camera);
    }

    startUsing() {
        this.inventory.startUsing();
    }

    stopUsing() {
        this.inventory.stopUsing();
    }
}

/***/ }),

/***/ 322:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Gamestate = __webpack_require__(147);

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
    draw(camera) {
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

/***/ }),

/***/ 864:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

﻿const Geometry = __webpack_require__(322);
const Point = Geometry.Point;
const Line = Geometry.Line;

let MazeRet = {walls : []};
MazeRet.walls.push(new Line(new Point(0, 0), new Point(800, 0)));
MazeRet.walls.push(new Line(new Point(800, 0), new Point(800, 600)));
MazeRet.walls.push(new Line(new Point(0, 600), new Point(800, 600)));
MazeRet.walls.push(new Line(new Point(0, 0), new Point(0, 600)));
MazeRet.walls.push(new Line(new Point(300, 100), new Point(300, 300)));

module.exports = MazeRet;


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
        Gamestate.context.drawImage(this.image, 
            positionInSheet.x * this.imageWidth / this.rows, 
            positionInSheet.y * this.imageHeight / this.columns, 
            this.imageWidth / this.rows, 
            this.imageHeight / this.columns, 
            position.x - w / 2, position.y - h / 2, w, h);
    }
}


/***/ }),

/***/ 580:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Geometry = __webpack_require__(322);
const Point = Geometry.Point;

module.exports = class Utility {
    constructor() { }
    static distance(a, b) {
        return Math.hypot(a.x - b.x, a.y - b.y);
    }
    // Returns true if there was no problem.
    static fixWallRayIntersection(line, ray, intersection) {
        // This makes the light ray shine only in front of you
        let isBetweenx = false, isBetweeny = false;
        if ((ray.end.x <= ray.begin.x && ray.begin.x <= intersection.x) || (ray.end.x >= ray.begin.x && ray.begin.x >= intersection.x)) {
            isBetweenx = true;
        }
        if ((ray.end.y <= ray.begin.y && ray.begin.y <= intersection.y) || (ray.end.y >= ray.begin.y && ray.begin.y >= intersection.y)) {
            isBetweeny = true;
        }
        if (isBetweeny && isBetweenx) {
            return false;
        }
        // This checks if the light collides with a wall, and not the ray it lays on
        isBetweenx = false, isBetweeny = false;
        if ((line.begin.x <= intersection.x && intersection.x <= line.end.x) || (line.begin.x >= intersection.x && intersection.x >= line.end.x)) {
            isBetweenx = true;
        }
        if ((line.begin.y <= intersection.y && intersection.y <= line.end.y) || (line.begin.y >= intersection.y && intersection.y >= line.end.y)) {
            isBetweeny = true;
        }
        if (!isBetweeny || !isBetweenx) {
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
        if (this.fixWallRayIntersection(wall, ray, answerPoint)) {
            return answerPoint;
        } else {
            return false;
        }
    }
    // Checks for collision between a circle and rectangle
    static rectCircleColliding(circle, rect) {
        let distX = Math.abs(circle.x - rect.pos.x - rect.size.x / 2);
        let distY = Math.abs(circle.y - rect.pos.y - rect.size.y / 2);
        let dx = distX - rect.size.x / 2;
        let dy = distY - rect.size.y / 2;

        if (distX > (rect.size.x / 2 + circle.radius) || distY > (rect.size.y / 2 + circle.radius)) {
            return false;
        }

        if ((distX < (rect.size.x / 2) || distY < (rect.size.y / 2)) || (dx * dx + dy * dy <= (circle.radius * circle.radius))) {
            return true;
        }
        return undefined;
    }
    static areCirclesColliding(x1, y1, r1, x2, y2, r2) {
        let dist = Math.sqrt((x1 - x2)(x1 - x2) + (y1 - y2)(y1 - y2))
        return dist <= r1 + r2;
    }
    static areColliding(Ax, Ay, Awidth, Aheight, Bx, By, Bwidth, Bheight) {
        if (Bx <= Ax + Awidth) {
            if (Ax <= Bx + Bwidth) {
                if (By <= Ay + Aheight) {
                    if (Ay <= By + Bheight) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    static boxWallsColliding(box, boxSizeX, boxSizeY, walls) {
        for (let i = 0; i < walls.length; i++) {
            if (walls[i].begin.x - 0.01 == walls[i].end.x) {
                walls[i].begin.x -= 0.01
            }
            if (walls[i].begin.x + 0.01 == walls[i].end.x) {
                walls[i].begin.x += 0.01
            }
            // Checks for colision between a box and any horizontal/vertical wall
            if (walls[i].begin.y == walls[i].end.y) {
                if (this.areColliding(box.x, box.y, boxSizeX, boxSizeY, walls[i].begin.x, walls[i].begin.y, Math.abs(walls[i].begin.x - walls[i].end.x), 1)) {
                    return true;
                }
            }
            else if (walls[i].begin.x == walls[i].end.x) {
                    if (this.areColliding(box.x, box.y, boxSizeX, boxSizeY, walls[i].begin.x, walls[i].begin.y, 1, Math.abs(walls[i].begin.y - walls[i].end.y))) {
                    return true;
                }
            }
        }
        return false;
    }
}


/***/ }),

/***/ 814:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Gamestate = __webpack_require__(147);
const Utility = __webpack_require__(580);
const Geometry = __webpack_require__(322);
const Point = Geometry.Point;
const Line = Geometry.Line;

class Projectile { // Abstract class, please don't create any objects of this type
    constructor(position, delta, damage) {
        // TODO: Throw an error if initialized 
        this.position = position;
        this.delta = delta;
        this.damage = damage;
    }
    calculateDamage() {}
    update() {}
    draw() {}
    isColliding(rect) {}
}
class BasicBullet extends Projectile {
    constructor(position, delta, damage, radius = 5) {
        super(position, delta, damage);
        this.radius = radius;
    }
    update() {
        this.position.x += this.delta.x /* / Gamestate.deltaTime * 2 */ ;
        this.position.y += this.delta.y /* / Gamestate.deltaTime * 2 */ ;
    }
    draw(camera) {
        Gamestate.context.beginPath();
        Gamestate.context.fillStyle = "#442442";
        let newpos = camera.calculate_pos(this.position)
        Gamestate.context.arc(newpos.x, newpos.y, this.radius, 2 * Math.PI, 0);
        Gamestate.context.fill();
    }
    calculateDamage() {
        return this.damage;
    }
    isColliding(rect) {
        return rectCircleColliding(this, player);
    }
}

class Fireball extends Projectile {
    constructor(position, delta, damage, radius = 15) {
        super(position, delta, damage);
        this.radius = radius;
    }
    update() {
        this.position.x += this.delta.x;
        this.position.y += this.delta.y;
    }
    draw(camera) {
        Gamestate.context.beginPath();
        Gamestate.context.fillStyle = "yellow";
        Gamestate.context.arc(this.position.x, this.position.y, this.radius, 2 * Math.PI, 0);
        Gamestate.context.fill();
    }
    calculateDamage() {
        return this.damage;
    }
    isColliding(rect) {
        return rectCircleColliding(this, player);
    }
}

class Arrow extends Projectile {
    constructor(position, delta, damage, width = 20, height = 5) {
        super(position, delta, damage);
        this.size = new Size(width, height);
        this.theta = Math.atan2(this.delta.y, this.delta.x);

    }
    update() {
        this.position.x += this.delta.x;
        this.position.y += this.delta.y;
    }
    draw(camera) {
        Gamestate.context.save();
        Gamestate.context.translate(this.position.x - (this.size.width / 2), this.position.y - (this.size.height / 2))
        Gamestate.context.rotate(this.theta)
        Gamestate.context.fillRect(-this.size.width / 2, -this.size.height / 2, this.size.width, this.size.height);
        Gamestate.context.restore();
    }
}

class Bubble extends Projectile {
    constructor(position, delta, damage, radius = 20) {
        super(position, delta, damage);
        this.radius = radius;
    }
    update() {
        if (this.delta.x < 0.25 || this.delta.y < 0.25) {
            this.position.x += this.delta.y;
            this.position.y += this.delta.x;
            let len = Math.sqrt(this.delta.x * this.delta.x + this.delta.y * this.delta.y);
            let newLen = len - 0.04;
            this.delta.x = (this.delta.x / len) * newLen;
            this.delta.y = (this.delta.y / len) * newLen;
        }
    }
    draw(camera) {
        Gamestate.context.beginPath();
        Gamestate.context.arc(this.position.x, this.position.y, this.radius, 2 * Math.PI, 0);
        Gamestate.context.fill();
        Gamestate.context.stroke();
    }

}

class Grenade extends Projectile {
    constructor(position, delta, damage, width = 25, height = 6, radius = 10) {
        super(position, delta, damage);
        this.size = new Size(width, height)
        this.radius = radius;
        this.theta = Math.atan2(this.delta.x, this.delta.y);
        this.boom = false;

    }
    update() {
        if (!this.boom) {
            this.position.x += this.delta.x;
            this.position.y += this.delta.y;
        }
        if (this.boom && this.radius <= 100) {
            this.radius += 2;
        }
    }
    draw(camera) {
        if (!this.boom) {
            Gamestate.context.save();
            Gamestate.context.translate(this.position.x - (this.size.width / 2), this.position.y - (this.size.height / 2))
            Gamestate.context.rotate(this.theta);
            Gamestate.context.fillRect(-this.size.width / 2, -this.size.height / 2, this.size.width, this.size.height);
            Gamestate.context.restore();
        } else if (this.boom) {
            Gamestate.context.beginPath();
            Gamestate.context.arc(this.position.x, this.position.y, this.radius, 2 * Math.PI, 0);
            Gamestate.context.fill();
            Gamestate.context.stroke();
        }
    }
    explode() {
        this.boom = true;
    }
    isColliding(rect) {
        return rectCircleColliding(this, player);
    }

}

module.exports = {
    Projectile: Projectile,
    Fireball: Fireball,
    Arrow: Arrow,
    Bubble: Bubble,
    Grenade: Grenade,
    BasicBullet: BasicBullet
}

/***/ }),

/***/ 45:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Bullets = __webpack_require__(814);
const Utility = __webpack_require__(580);
const Geometry = __webpack_require__(322);
const Player = __webpack_require__(94);
const Point = Geometry.Point;
const Size = Geometry.Size;
const Line = Geometry.Line;
const Gamestate = __webpack_require__(147);
const Maze = __webpack_require__(864);
const { context, mousePosition } = __webpack_require__(147);
class Weapons { // TODO: Abstract class
    constructor(owner, reloadRate, ammo) {
        this.bullets = [];
        this.owner = owner;
        this.cooldown = 0;
        this.reloadRate = reloadRate;
        this.alreadyShot = true;
        this.ammo = ammo;
        this.maxAmmo = ammo;
    }

    startUsing() {
        this.alreadyShot = false;
    }

    stopUsing() {
        this.alreadyShot = true;
    }

    equip(newOwner) { this.owner = newOwner; }
    unequip() {}

    update(camera) {
        for (let i in this.bullets) {
            this.bullets[i].update();
            if (Utility.boxWallsColliding(this.bullets[i].position, 10, 10, Maze.walls)) {
                this.bullets[i] = this.bullets[this.bullets.length - 1];
                this.bullets.pop();
                --i;
            }
        }
        this.cooldown--;
        if (Gamestate.isKeyPressed[32]) {
            this.cooldown = 500;
            this.ammo = this.maxAmmo;
        }
        if (this.cooldown > 0) return;
        this.inferiorUpdate(camera);

    }

    draw(camera) {
            for (let i of this.bullets) {
                i.draw(camera);
            }
        }
        /**
         * @param {Point} position 
         * @param {Size} size 
         */
    drawImg(position, size, camera) {
        if (this.owner) {
			let drawpos = camera.calculate_pos(this.owner.position);
            Gamestate.context.save();
            Gamestate.context.translate(drawpos.x, drawpos.y);
            Gamestate.context.rotate(Math.atan2(Gamestate.mousePosition.y - drawpos.y, Gamestate.mousePosition.x - drawpos.x));
            Gamestate.context.drawImage(this.sprite, -size.width / 2.5, -size.height / 2.5, size.width, size.height);
            Gamestate.context.restore();
        } else Gamestate.context.drawImage(this.sprite, position.x, position.y, size.x, size.y);
    }
}

class BasicGun extends Weapons {
    //class for basicgun - pistol, which is the first Weapons, that everyone will have when plays;
    constructor(owner, reloadRate, ammo) {
        super(owner, reloadRate, ammo);
        this.sprite = new Image();
        this.sprite.src = '../production/images/pistol.png';

    }

    stopUsing() {}

    inferiorUpdate(camera) {
        //	console.log(this.ammo);
        if (this.ammo > 0) {
            if (!this.alreadyShot) {
                let shotFrom = this.owner.position;
                let shotTo = Gamestate.mousePosition;
				shotTo.x += camera.pos.x;
				shotTo.y += camera.pos.y;
                let dist = Utility.distance(shotFrom, shotTo);
                let deltaX = (shotTo.x - shotFrom.x) / dist * 6;
                let deltaY = (shotTo.y - shotFrom.y) / dist * 6;
                this.bullets.push(new Bullets.BasicBullet(
                    new Point(shotFrom.x, shotFrom.y),
                    new Point(deltaX, deltaY), 69));
                this.cooldown = this.reloadRate;
                this.alreadyShot = true;
                this.ammo--;
            }
        }
    }
}


class AK47 extends Weapons {
    //class for basicgun - pistol, which is the first Weapons, that everyone will have when plays;
    constructor(owner, reloadRate, ammo) {
        super(owner, reloadRate, ammo);
        this.sprite = new Image();
        this.sprite.src = '../production/images/assaultRifle.png';
    }
    inferiorUpdate(camera) {
        if (Gamestate.isKeyPressed[32]) {
            this.cooldown = 600;
            this.ammo = 60;
        }
        if (this.ammo > 0) {
            if (!this.alreadyShot) {
                let shotFrom = this.owner.position;
                let shotTo = Gamestate.mousePosition;
				shotTo.x += camera.pos.x;
				shotTo.y += camera.pos.y;
                if (this.alreadyShot == false) {
                    let dist = Utility.distance(shotFrom, shotTo);
                    let deltaX = (shotTo.x - shotFrom.x) / dist * 6;
                    let deltaY = (shotTo.y - shotFrom.y) / dist * 6;
                    this.bullets.push(new Bullets.BasicBullet(
                        new Point(shotFrom.x, shotFrom.y),
                        new Point(deltaX, deltaY), 69));
                    this.cooldown = this.reloadRate;
                    this.ammo--;
                }
				shotTo.x -= camera.pos.x;
				shotTo.y -= camera.pos.y;
            }
        }
        //	console.log(this.ammo);
    }

}
class Shotgun extends Weapons {
    //class for basicgun - pistol, which is the first Weapons, that everyone will have when plays;
    constructor(owner, reloadRate, ammo) {
        super(owner, reloadRate, ammo);
        this.sprite = new Image();
        this.sprite.src = '../production/images/shotgun.png';
    }
    inferiorUpdate(camera) {
        if (Gamestate.isKeyPressed[32]) {
            this.cooldown = 700;
            this.ammo = 8;
        }
        if (this.ammo > 0) {
            if (!this.alreadyShot) {
                let shotFrom = this.owner.position;
                let shotTo = Gamestate.mousePosition;
				shotTo.x += camera.pos.x;
				shotTo.y += camera.pos.y;
                let dist = Utility.distance(shotFrom, shotTo);
                let speed = []
                for (let i = 0; i < 7; i++) {
                    speed[i] = Math.random() * 3 + 3;
                }
                let deltaX = (shotTo.x - shotFrom.x) / dist * speed[1];
                let deltaY = (shotTo.y - shotFrom.y) / dist * speed[1];
                this.bullets.push(new Bullets.BasicBullet(new Point(shotFrom.x, shotFrom.y), new Point(deltaX, deltaY), 69));
                deltaX = (shotTo.x - shotFrom.x) / dist * speed[2];
                deltaY = (shotTo.y - shotFrom.y) / dist * speed[2];
                this.bullets.push(new Bullets.BasicBullet(new Point(shotFrom.x, shotFrom.y), new Point(deltaX + 0.15, deltaY + 0.15), 69));
                deltaX = (shotTo.x - shotFrom.x) / dist * speed[3];
                deltaY = (shotTo.y - shotFrom.y) / dist * speed[3];
                this.bullets.push(new Bullets.BasicBullet(new Point(shotFrom.x, shotFrom.y), new Point(deltaX - 0.15, deltaY - 0.15), 69));
                deltaX = (shotTo.x - shotFrom.x) / dist * speed[4];
                deltaY = (shotTo.y - shotFrom.y) / dist * speed[4];
                this.bullets.push(new Bullets.BasicBullet(new Point(shotFrom.x, shotFrom.y), new Point(deltaX + 0.30, deltaY + 0.30), 69));
                deltaX = (shotTo.x - shotFrom.x) / dist * speed[5];
                deltaY = (shotTo.y - shotFrom.y) / dist * speed[5];
                this.bullets.push(new Bullets.BasicBullet(new Point(shotFrom.x, shotFrom.y), new Point(deltaX - 0.30, deltaY - 0.30), 69));
                deltaX = (shotTo.x - shotFrom.x) / dist * speed[6];
                deltaY = (shotTo.y - shotFrom.y) / dist * speed[6];
                this.bullets.push(new Bullets.BasicBullet(new Point(shotFrom.x, shotFrom.y), new Point(deltaX - 0.45, deltaY - 0.45), 69));
                deltaX = (shotTo.x - shotFrom.x) / dist * speed[0];
                deltaY = (shotTo.y - shotFrom.y) / dist * speed[0];
                this.bullets.push(new Bullets.BasicBullet(new Point(shotFrom.x, shotFrom.y), new Point(deltaX + 0.45, deltaY + 0.45), 69));
                deltaX = (shotTo.x - shotFrom.x) / dist * speed[0];
                deltaY = (shotTo.y - shotFrom.y) / dist * speed[0];
                this.ammo--;
                this.cooldown = this.reloadRate;
				shotTo.x -= camera.pos.x;
				shotTo.y -= camera.pos.y;
            }
        }
    }
}
module.exports = {
    Weapons: Weapons,
    BasicGun: BasicGun,
    AK47: AK47,
    Shotgun: Shotgun
};

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
const Camera = __webpack_require__(741);
const Player = __webpack_require__(94);
const Inventory = __webpack_require__(825);
const Lighting = __webpack_require__(732);
const Gamestate = __webpack_require__(147);
const Basegame = __webpack_require__(313);
const Geometry = __webpack_require__(322);
const Point = Geometry.Point;
const Line = Geometry.Line;
const Size = Geometry.Size;
const Weapons = __webpack_require__(45);
const Maze = __webpack_require__(864);
const Minimap = __webpack_require__(622);

class Game extends Basegame {
    constructor() {
        super();

        this.intersections = [];
        this.players = [];

        this.players.push(new Player(new Point(100, 100), 100, new Inventory(10), 0));
        this.minimap = new Minimap(new Size(800, 600), new Size(800, 600), new Size(200, 200))
        this.players[0].inventory.equipItem(new Weapons.BasicGun(this.players[0], 70,20));
        this.players[0].inventory.equipItem(new Weapons.AK47(this.players[0], 30,60));
        this.players[0].inventory.equipItem(new Weapons.Shotgun(this.players[0], 150,8));
        this.lighting = new Lighting(Maze.walls);
        this.camera = new Camera(new Point(800, 600), new Point(800, 600))
    }

    update() {
        this.camera.follow(this.players[0])
        this.intersections = this.lighting.drawLight(this.players[0].position);
        this.players[0].update();
    }

    draw() {
        Gamestate.context.fillStyle = "black";
        Gamestate.context.fillRect(this.camera.calculate_pos(new Point(0, 0)).x, this.camera.calculate_pos(new Point(0, 0)).y, Gamestate.canvas.width, Gamestate.canvas.height);

        Gamestate.context.fillStyle = "white";
        Gamestate.context.beginPath();
        for (let i = 1; i < this.intersections.length; i++) {
            let drawPosition = this.camera.calculate_pos(this.intersections[i])
            Gamestate.context.lineTo(drawPosition.x, drawPosition.y)
        }
        Gamestate.context.fill()
        let curdrawplayerpos = this.camera.calculate_pos(this.players[0].position)

        Gamestate.context.strokeStyle = "red"
        Gamestate.context.lineWidth = 1;
        this.players[0].draw(this.camera);
        for (let i = 0; i < Maze.walls.length; i++) {
            Maze.walls[i].draw(this.camera);
        }

        this.players[0].draw(this.camera);

        this.players[0].inventory.getSelected().drawImg(this.players[0].position, new Size(100, 100));
        this.minimap.draw(new Point(600, 0),this.players)
    }

    mousedown() {
        this.players[0].startUsing();
    }

    mouseup() {
        this.players[0].stopUsing();
    }

    keydown(key) {}
}

let game = new Game();
game.init();

})();

/******/ })()
;