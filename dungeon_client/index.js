const Player = require('/player/Player.js');
const Inventory = require('/player/Inventory.js');
const Lighting = require('/light/Lighting.js');
const Gamestate = require('/framework/State.js');
const Basegame = require('/framework/Framework.js');
const Geometry = require('/utilities/Geometry.js');
const Point = Geometry.Point;
const Size = Geometry.Size;
const Line = Geometry.Line;
const Weapons = require('/weapons/Weapon.js');
const Maze = require('/utilities/Maze.js');

class Game extends Basegame {
    constructor() {
        super();

        this.intersections = [];

        this.player = new Player(new Point(100, 100), 100, new Inventory(10), 0);

        this.player.inventory.equipItem(new Weapons.BasicGun(this.player, 70,20));
        this.player.inventory.equipItem(new Weapons.AK47(this.player, 30,60));
        this.player.inventory.equipItem(new Weapons.Shotgun(this.player, 150,8));
        this.lighting = new Lighting(Maze.walls);
    }

    update() {
        this.intersections = this.lighting.drawLight(this.player.position);
        this.player.update();
    }

    draw() {
        Gamestate.context.fillStyle = "black";
        Gamestate.context.fillRect(0, 0, Gamestate.canvas.width, Gamestate.canvas.height);

        Gamestate.context.fillStyle = "white";
        Gamestate.context.beginPath();
        for (let i = 1; i < this.intersections.length; i++) {
            Gamestate.context.lineTo(this.intersections[i].x, this.intersections[i].y)
        }
        Gamestate.context.fill()
        this.lighting.drawLight(this.player.position)

        Gamestate.context.strokeStyle = "red"
        Gamestate.context.lineWidth = 1;
        for (let i = 0; i < Maze.walls.length; i++) {
            Maze.walls[i].draw();
        }

        this.player.draw();

        this.player.inventory.getSelected().drawImg(this.player.position, new Size(100, 100));
    }

    mousedown() {
        this.player.startUsing();
    }

    mouseup() {
        this.player.stopUsing();
    }

    keydown(key) {  }
}

let game = new Game();
game.init();