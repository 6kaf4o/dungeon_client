const Line = require('/utilities/Line.js');
const Point = require('/utilities/Point.js');
const Player = require('/player/Player.js');
const Lighting = require('/light/Lighting.js');
const Gamestate = require('/framework/State.js');
const Basegame = require('/framework/Framework.js');

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
        Gamestate.context.fillStyle = "black";
        Gamestate.context.fillRect(0, 0, Gamestate.canvas.width, Gamestate.canvas.height);
        
        Gamestate.context.fillStyle = "white";
        Gamestate.context.beginPath();
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