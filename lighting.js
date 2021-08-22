class Lighting {
    constructor(walls) {
        this.walls = walls;
    }
    drawLight(start) {
        this.intersections = [];
        for(this.angle = 0; this.angle < Math.PI * 2; this.angle += 0.002) {
            this.intersection = undefined;
            this.minimumDistance = 100000;
            this.rotatedRay = new Line(start, new Point(start.x + Math.cos(this.angle), start.y + Math.sin(this.angle)));
            for(this.i = 0; this.i < this.walls.length; this.i ++) {
                this.currentIntersection = wallRayIntersection(this.walls[this.i], this.rotatedRay);
                if(this.currentIntersection == undefined) {
                    continue;
                } else {
                    if(this.minimumDistance > distance(this.currentIntersection, start)) {
                        this.intersection = this.currentIntersection;
                        this.minimumDistance = distance(this.currentIntersection, start);
                    }
                }
            }
            if(this.intersection != undefined) {
                this.intersections.push(this.intersection);
            }
        }
        return this.intersections
        // context.beginPath()
        // for(let i = 0 ; i < this.intersections.length ; i ++){
        //     context.lineTo(this.intersection[i].x,this.intersection[i].y)
        // }
        // context.fill()
    }
    /*inSightSquare(start, object) {
        let squareLeft = new Line(object, new Point(object.x,object.y+object.size));
        let squareUp = new Line(object, new Point(object.x+size,object.y));
        let squareRight = new Line(new Point(object.x+size,object.y),new Point(object.x+size,object.y+size));
        let squareDown = new Line(new Point(object.x,object.y+size),new Point(object.x+size,object.y+size));
    }*/
}
