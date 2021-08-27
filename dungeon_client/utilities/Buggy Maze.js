var maze;
let MazeRet = {walls : []};
class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
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
    draw() {
        context.beginPath();
        context.lineTo(this.begin.x, this.begin.y);
        context.lineTo(this.end.x, this.end.y);
        context.stroke();
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

 class WallPoint{
	constructor(point) {
		this.point=point
		this.size=100;
		this.connectedTo=["left", "up", "right", "down"];
		this.visited=false;
		if(this.point.x==maze.numberOfPoints-1) this.connectedTo[2]="Removed Line"
		if(this.point.y==maze.numberOfPoints-1) this.connectedTo[3]="Removed Line"
	}
	static stepForward() {
		var possibleDirection=[]
		
		//checks if dfs is inside the matrix
		if(maze.currentPoint.x<1 || maze.currentPoint.y<1 || maze.currentPoint.x>maze.numberOfPoints-2 || maze.currentPoint.y>maze.numberOfPoints-2) WallPoint.stepBack(maze);
		
		//ckecks and marks which neighbours have been traversed
		console.log(maze.currentPoint)
		if(maze.wallPoints[maze.currentPoint.x-1][maze.currentPoint.y].visited == false) possibleDirection.push("left");
		if(maze.wallPoints[maze.currentPoint.x][maze.currentPoint.y-1].visited == false) possibleDirection.push("up");
		if(maze.wallPoints[maze.currentPoint.x+1][maze.currentPoint.y].visited == false) possibleDirection.push("right");
		if(maze.wallPoints[maze.currentPoint.x][maze.currentPoint.y+1].visited == false) possibleDirection.push("down");
		
		//returns to a point which has untraversed neighbours if all current neighbours are untraversable
		if(possibleDirection.length==0) WallPoint.stepBack();
		let randomlyChosenIndex=Math.floor(Math.random()*possibleDirection.length)
		
		//randomly picks a wall to erase
		if(possibleDirection[randomlyChosenIndex]=="left") {
			//removes a wall based on dfs(Depth First Search)
			maze.wallPoints[maze.currentPoint.x-1][maze.currentPoint.y].connectedTo[2]="Removed Line"
			maze.wallPoints[maze.currentPoint.x][maze.currentPoint.y].connectedTo[0]="Removed Line"
						
			//remembers it passed through line and sets dfs`s location 
			maze.wallPoints[maze.currentPoint.x-1][maze.currentPoint.y].visited=true;
			maze.previousPoint.push(maze.currentPoint);
			maze.currentPoint.x--;
			WallPoint.stepForward();
		};
		if(possibleDirection[randomlyChosenIndex]=="up") {
			//removes a wall based on dfs(Depth First Search)						
			maze.wallPoints[maze.currentPoint.x][maze.currentPoint.y-1].connectedTo[3]="Removed Line"
			maze.wallPoints[maze.currentPoint.x][maze.currentPoint.y].connectedTo[1]="Removed Line"
			
			//remembers it passed through line and sets dfs`s location 
			maze.wallPoints[maze.currentPoint.x][maze.currentPoint.y-1].visited=true;
			maze.previousPoint.push(maze.currentPoint);
			maze.currentPoint.y--;
			WallPoint.stepForward();
		};
		if(possibleDirection[randomlyChosenIndex]=="right") {
			//removes a wall based on dfs(Depth First Search)
			maze.wallPoints[maze.currentPoint.x+1][maze.currentPoint.y].connectedTo[0]="Removed Line";
			maze.wallPoints[maze.currentPoint.x][maze.currentPoint.y].connectedTo[2]="Removed Line";
						
			//remembers it passed through line and sets dfs`s location 
			maze.wallPoints[maze.currentPoint.x+1][maze.currentPoint.y].visited=true;
			maze.previousPoint.push(maze.currentPoint);
			maze.currentPoint.x++;
			WallPoint.stepForward();
		};
		if(possibleDirection[randomlyChosenIndex]=="down") {
			//removes a wall based on dfs(Depth First Search)
			maze.wallPoints[maze.currentPoint.x][maze.currentPoint.y+1].connectedTo[1]="Removed Line"
			maze.wallPoints[maze.currentPoint.x][maze.currentPoint.y].connectedTo[3]="Removed Line"
			
			//remembers it passed through line and sets dfs' location to the removedLine
			maze.wallPoints[maze.currentPoint.x][maze.currentPoint.y+1].visited=true;
			maze.previousPoint.push(maze.currentPoint);
			maze.currentPoint.y++;
			WallPoint.stepForward();
		};
		
		//sets the possible connection as an official wall
		let secondPoint;
		switch(this.connectedTo[this.connectedTo.length-1]) {
			case "left":
			MazeRet.walls.push(new Line(maze.wallPoints[maze.currentPoint.x][maze.currentPoint.y], maze.wallPoints[maze.currentPoint.x-1][maze.currentPoint.y]));
			break;
				
			case "up":
			MazeRet.walls.push(new Line(maze.wallPoints[maze.currentPoint.x][maze.currentPoint.y], maze.wallPoints[maze.currentPoint.x][maze.currentPoint.y-1]));
			break;
				
			case "right":
			MazeRet.walls.push(new Line(maze.wallPoints[maze.currentPoint.x][maze.currentPoint.y], maze.wallPoints[maze.currentPoint.x+1][maze.currentPoint.y]));
			break;
				
			case "down":
			MazeRet.walls.push(new Line(maze.wallPoints[maze.currentPoint.x][maze.currentPoint.y], maze.wallPoints[maze.currentPoint.x][maze.currentPoint.y+1]));
			 } 
	}	
	static stepBack () {
	//	console.log(maze.previousPoint[maze.previousPoint.length-2])
		if(maze.previousPoint.length>0) {
			maze.currentPoint=maze.previousPoint[maze.previousPoint.length-1]
			maze.previousPoint.pop()
			WallPoint.stepForward()
		}
	}
}	
function buildMaze() {
	 maze={currentPoint:new Point(10,10), previousPoint:[new Point(10, 10)], numberOfPoints:20, wallPoints:[]}
	console.log("at early shite", maze.previousPoint)
for(let x=0; x<maze.numberOfPoints; x++) {
			maze.wallPoints[x]=[]
			for(let y=0; y<maze.numberOfPoints; y++) {
				maze.wallPoints[x][y]=new WallPoint(new Point(x, y));
			}
		}
	WallPoint.stepForward()
	for(let x=0; x<maze.numberOfPoints; x++) {
		for(let y=0; y<maze.numberOfPoints; y++) {
			if(maze.wallPoints[x][y].connectedTo[0]=="left") this.walls.push(new Line(maze.wallPoints[x][y], maze.wallPoints[x-1][y]));
			if(maze.wallPoints[x][y].connectedTo[1]=="up") this.walls.push(new Line(maze.wallPoints[x][y], maze.wallPoints[x][y-1]));
			if(maze.wallPoints[x][y].connectedTo[2]=="right") this.walls.push(new Line(maze.wallPoints[x][y], maze.wallPoints[x+1][y]));
			if(maze.wallPoints[x][y].connectedTo[3]=="down") this.walls.push(new Line(maze.wallPoints[x][y], maze.wallPoints[x][y+1]));
		}
	}
}
buildMaze()
function update() {
	
}
function draw() {
	
}
