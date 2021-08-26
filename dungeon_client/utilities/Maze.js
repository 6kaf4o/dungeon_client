
class Maze{
	constructor(x, y, maze2) {
		this.x=x;
		this.y=y;
		this.size=100;
		this.connectedTo=["left", "up", "right", "down"];
		this.visited=false;
		if(this.x==maze2.numberOfPoints-1) this.connectedTo[2]="non"
		if(this.y==maze2.numberOfPoints-1) this.connectedTo[3]="non"
	}
	static search(maze2) {
		this.maze2 = maze2
		var possibleDirection=[]
		if(this.maze2.currentX<1 || this.maze2.currentY<1 || this.maze2.currentX>this.maze2.numberOfPoints-2 || this.maze2.currentY>this.maze2.numberOfPoints-2) Maze.back(maze2);
					if(this.maze2.grid[this.maze2.currentX-1][this.maze2.currentY].visited == false) possibleDirection.push("left");
					if(this.maze2.grid[this.maze2.currentX][this.maze2.currentY-1].visited == false) possibleDirection.push("up");
					if(this.maze2.grid[this.maze2.currentX+1][this.maze2.currentY].visited == false) possibleDirection.push("right");
					if(this.maze2.grid[this.maze2.currentX][this.maze2.currentY+1].visited == false) possibleDirection.push("down");
					if(possibleDirection.length==0) Maze.back(maze2);
					let gigaLame=Math.floor(Math.random()*possibleDirection.length)
					if(possibleDirection[gigaLame]=="left") {
						this.maze2.grid[this.maze2.currentX-1][this.maze2.currentY].visited=true;
						this.maze2.grid[this.maze2.currentX-1][this.maze2.currentY].connectedTo[2]="non"
						this.maze2.grid[this.maze2.currentX][this.maze2.currentY].connectedTo[0]="non"
						
						this.maze2.previousX.push(this.maze2.currentX);
						this.maze2.previousY.push(this.maze2.currentY);
						this.maze2.currentX--;
						Maze.search(maze2);
					};
					if(possibleDirection[gigaLame]=="up") {
						this.maze2.grid[this.maze2.currentX][this.maze2.currentY-1].visited=true;						
						this.maze2.grid[this.maze2.currentX][this.maze2.currentY-1].connectedTo[3]="non"
						this.maze2.grid[this.maze2.currentX][this.maze2.currentY].connectedTo[1]="non"
						this.maze2.previousX.push(this.maze2.currentX);
						this.maze2.previousY.push(this.maze2.currentY);
						this.maze2.currentY--;
						Maze.search(maze2);
					};
					if(possibleDirection[gigaLame]=="right") {
						this.maze2.grid[this.maze2.currentX+1][this.maze2.currentY].visited=true;
						this.maze2.grid[this.maze2.currentX+1][this.maze2.currentY].connectedTo[0]="non";
						this.maze2.grid[this.maze2.currentX][this.maze2.currentY].connectedTo[2]="non";
						
						this.maze2.previousX.push(this.maze2.currentX);
						this.maze2.previousY.push(this.maze2.currentY);
						this.maze2.currentX++;
						Maze.search(maze2);
					};
					if(possibleDirection[gigaLame]=="down") {
						this.maze2.grid[this.maze2.currentX][this.maze2.currentY+1].visited=true;
						this.maze2.grid[this.maze2.currentX][this.maze2.currentY+1].connectedTo[1]="non"
						this.maze2.grid[this.maze2.currentX][this.maze2.currentY].connectedTo[3]="non"
						this.maze2.previousX.push(this.maze2.currentX);
						this.maze2.previousY.push(this.maze2.currentY);
						this.maze2.currentY++;
						Maze.search(maze2);
					};
		
	}	
	static back(maze2) {
		this.maze2=maze2
		this.maze2.currentX=this.maze2.previousX[this.maze2.previousX.length-1]
		this.maze2.currentY=this.maze2.previousY[this.maze2.previousY.length-1]
		this.maze2.previousX.pop()
		this.maze2.previousY.pop()
		Maze.search(maze2)
		
	}
	draw() {
		 for(let m=0; m<this.connectedTo.length; m++) {
			 if(this.connectedTo[m]=="left") {
				 context.beginPath();
				 context.moveTo(this.x*this.size, this.y*this.size);
				 context.lineTo(this.x*this.size-this.size, this.y*this.size);
				 context.closePath();
				 context.stroke();
			 }
			 if(this.connectedTo[m]=="up") {
				 context.beginPath();
				 context.moveTo(this.x*this.size, this.y*this.size);
				 context.lineTo(this.x*this.size, this.y*this.size-this.size);
				 context.closePath();
				 context.stroke();
			 }
			 if(this.connectedTo[m]=="right") {
				 context.beginPath();
				 context.moveTo(this.x*this.size, this.y*this.size);
				 context.lineTo(this.x*this.size+this.size, this.y*this.size);
				 context.closePath();
				 context.stroke();
			 }
			 if(this.connectedTo[m]=="down") {
				 context.beginPath();
				 context.moveTo(this.x*this.size, this.y*this.size);
				 context.lineTo(this.x*this.size, this.y*this.size+this.size);
				 context.closePath();
				 context.stroke();
			 }
		 }
	}
	
}	
var maze2={currentX:1, currentY:1, previousX:[1], previousY:[1], numberOfPoints:15, grid:[]}
for(let x=0; x<maze2.numberOfPoints; x++) {
			maze2.grid[x]=[]
			for(let y=0; y<maze2.numberOfPoints; y++) {
				maze2.grid[x][y]=new Maze(x, y, maze2);
			}
		}
Maze.search(maze2)

