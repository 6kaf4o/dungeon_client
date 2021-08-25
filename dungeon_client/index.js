const Player = require('/player/Player.js');
const Inventory = require('/player/Inventory.js');
const Lighting = require('/light/Lighting.js');
const Gamestate = require('/framework/State.js');
const Basegame = require('/framework/Framework.js');
const Geometry = require('/utilities/Geometry.js');
const Point = Geometry.Point;
const Line = Geometry.Line;
const Weapon = require('/weapons/Weapon.js');

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

        this.player = new Player(new Point(100,100), 100, new Inventory(10), 0);
        this.player.inventory.equipItem(new Weapon.BasicGun(this.player));

        this.lighting = new Lighting(this.walls);
    }

    update() {
        this.intersections = this.lighting.drawLight(this.player.position);
        this.player.update();
        this.player.inventory.update();
    }

    draw(){
        Gamestate.context.fillStyle = "black";
        Gamestate.context.fillRect(0, 0, Gamestate.canvas.width, Gamestate.canvas.height);
        
        Gamestate.context.fillStyle = "white";
        Gamestate.context.beginPath();
        for(let i = 1 ; i < this.intersections.length ; i ++){
            Gamestate.context.lineTo(this.intersections[i].x, this.intersections[i].y)
        }
        Gamestate.context.fill()
        this.lighting.drawLight(this.player.position)

        Gamestate.context.strokeStyle = "red"
        Gamestate.context.lineWidth = 3;
        for(let i = 0 ; i < this.walls.length ; i ++){        
            this.walls[i].draw();
        }

        this.player.draw();
        this.player.inventory.draw();

    }

    mousedown() {
        this.player.startShooting();
    }

    mouseup(){
        this.player.stopShooting();
    }

    keydown(key) {
        if (key == 32) {
            this.player.health -= 10;
            console.log(this.player.health);
        }
    }
}

let game = new Game();
game.init();