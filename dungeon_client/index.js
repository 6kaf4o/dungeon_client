const Player = require('/player/Player.js');
const Camera = require('/camera/Camera.js');
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
        this.player.inventory.equipItem(new Weapons.BasicGun(this.player, 70, 20));
        this.player.inventory.equipItem(new Weapons.AK47(this.player, 30, 60));
        this.player.inventory.equipItem(new Weapons.Shotgun(this.player, 150, 8));
        this.lighting = new Lighting(Maze.walls);
        this.camera = new Camera(new Point(800, 600), new Point(800, 600))
    }

    update() {
        this.camera.follow(this.player)
        this.intersections = this.lighting.getIntersections(this.player.position);
        this.player.update(this.walls);
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

        let curdrawplayerpos = this.camera.calculate_pos(this.player.position)

        Gamestate.context.strokeStyle = "red"
        Gamestate.context.lineWidth = 1;
        console.log(this.camera);
        this.player.draw(this.camera);
        for (let i = 0; i < Maze.walls.length; i++) {
            Maze.walls[i].draw(this.camera);
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

    keydown(key) {}
}

let game = new Game();
game.init();