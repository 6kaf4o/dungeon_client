const Camera = require('/camera/Camera.js');
const Player = require('/player/Player.js');
const Inventory = require('/player/Inventory.js');
const Lighting = require('/light/Lighting.js');
const Gamestate = require('/framework/State.js');
const Basegame = require('/framework/Framework.js');
const Geometry = require('/utilities/Geometry.js');
const Point = Geometry.Point;
const Line = Geometry.Line;
const Size = Geometry.Size;
const Weapons = require('/weapons/Weapon.js');
const Maze = require('/utilities/Maze.js');
const Minimap = require('/camera/Minimap.js');

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
