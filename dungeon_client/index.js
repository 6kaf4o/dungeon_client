const Player = require('/player/Player.js');
const Inventory = require('/player/Inventory.js');
const Lighting = require('/light/Lighting.js');
const Gamestate = require('/framework/State.js');
const Basegame = require('/framework/Framework.js');
const Geometry = require('/utilities/Geometry.js');
const Point = Geometry.Point;
const Line = Geometry.Line;
const Weapons = require('/weapons/Weapon.js');

class Game extends Basegame {
    constructor() {
        super();

        this.walls = [];
        this.intersections = [];

        this.walls.push(new Line(new Point(0, 0), new Point(800, 0)));
        this.walls.push(new Line(new Point(800, 0), new Point(800, 600)));
        this.walls.push(new Line(new Point(0, 600), new Point(800, 600)));
        this.walls.push(new Line(new Point(0, 0), new Point(0, 600)));
        this.walls.push(new Line(new Point(300, 100), new Point(300, 300)));

        this.player = new Player(new Point(100, 100), 100, new Inventory(10), 0);

        this.player.inventory.equipItem(new Weapons.BasicGun(this.player, 70));
        this.player.inventory.equipItem(new Weapons.AK47(this.player, 30));
        this.player.inventory.equipItem(new Weapons.Shotgun(this.player, 150));

        this.lighting = new Lighting(this.walls);
    }

    update() {
        this.intersections = this.lighting.drawLight(this.player.position);
        this.player.update(this.walls);
        this.player.inventory.update();
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
        for (let i = 0; i < this.walls.length; i++) {
            this.walls[i].draw();
        }

        this.player.draw();
        this.player.inventory.draw();

    }

    mousedown() {
        this.player.startUsing();
    }

    mouseup() {
        this.player.stopUsing();
    }

    keydown(key) { }
}

let game = new Game();
game.init();