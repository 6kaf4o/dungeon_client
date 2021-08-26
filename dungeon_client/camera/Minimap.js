const Player = require('/player/Player.js');
const Maze = require('/utilities/Maze.js');
const Gamestate = require('/framework/State.js');
const Geometry = require('/utilities/Geometry.js');
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
