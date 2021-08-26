const Gamestate = require('/framework/State.js');
const Geometry = require('/utilities/Geometry.js');
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