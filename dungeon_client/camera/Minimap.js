const Player = require('/player/Player.js');
const Maze = require('/utilities/Maze.js');
const Gamestate = require('/framework/State.js');
const Geometry = require('/utilities/Geometry.js');
const Point = Geometry.Point;
const Line = Geometry.Line;
const Size = Geometry.Size;
module.exports = class Minimap{
    constructor(sizeMap, camera, sizeMinimap){
        this.sizeMap = sizeMap;
        this.camera = camera;
        this.sizeMinimap = sizeMinimap;
        this.scale = new Size(this.sizeMap.width / this.sizeMinimap.width, this.sizeMap.height / this.sizeMinimap.height);
    	this.walls = [];
        for(let i = 0; i < Maze.walls.length; i++){
            this.walls.push(new Line(new Point(Maze.walls[i].begin.x, Maze.walls[i].begin.y), new Point(Maze.walls[i].end.x, Maze.walls[i].end.y)));
            this.walls[i].begin.x = this.walls[i].begin.x/this.scale.width;
            this.walls[i].end.x = this.walls[i].end.x/this.scale.width;
            this.walls[i].begin.y = this.walls[i].begin.y/this.scale.height;
            this.walls[i].end.y = this.walls[i].end.y/this.scale.height;
        }
        this.players = [];
    }
    updatePlayers(players){
        this.players=[];
        for(let i = 0; i < players.length; i++){
            this.players.push(new Player(new Point(players[0].position.x, players[0].position.y), players[0].health, players[0].inventory, players[0].id));
        }

        for(let i = 0; i < this.players.length; i++){
            this.players[i].size.x/=this.scale.width
            this.players[i].size.y/=this.scale.height
            this.players[i].position.x = this.players[i].position.x/this.scale.width + 600;
            this.players[i].position.y = this.players[i].position.y/this.scale.height;
        }
    }
    draw(point){
        this.pos = point;

        Gamestate.context.fillStyle = "blue";

        for(let i in this.players) {
            Gamestate.context.fillRect(this.players[i].position.x-this.players[i].size.x/2, 
            this.players[i].position.y-this.players[i].size.y/2, 
            this.players[i].size.x, 
            this.players[i].size.y);
        }
        Gamestate.context.lineWidth = 1;
        Gamestate.context.strokeStyle = "rgba(0, 0, 0, 0.3)";
        Gamestate.context.strokeRect(this.camera.pos.x/this.scale.width+point.x,
            this.camera.pos.y/this.scale.height+point.y,
            this.camera.cameraSize.x/this.scale.width,
            this.camera.cameraSize.y/this.scale.height)
        Gamestate.context.strokeStyle = "rgba(255, 0, 0, 0.3)";
        for(let i = 0; i < this.walls.length; i++){
            this.walls[i].begin.x += point.x;
            this.walls[i].begin.y += point.y;
            this.walls[i].end.x += point.x;
            this.walls[i].end.y += point.y;

            this.walls[i].draw();

            this.walls[i].begin.x -= point.x;
            this.walls[i].begin.y -= point.y;
            this.walls[i].end.x -= point.x;
            this.walls[i].end.y -= point.y;
        }
    }
}