// The lighting class is used to find an amount of intersection points between rays cast from a certain points and an array of walls
module.exports = class Lighting {
    // Takes an array of walls as a perimeter
    constructor(walls) {
        this.walls = walls;
    }
    // Finds the intersection points between walls and rays cast at angles from the start point
    drawLight(start) {
        // We declare the intersections array and make it empty(to clear out the already existing rays beforehand(if any are present))
        this.intersections = [];
        // This for loop does all the checks for intersection at angle intervals of 0.002
        for(this.angle = 0; this.angle < Math.PI * 2; this.angle += 0.002) {
            // This is a single intersection that will go into the intersections array later(if it gets a value)
            this.intersection = undefined;
            // Minimum distance defines the maximum length our light rays can have
            this.minimumDistance = 10000;
            // Just a ray rotated around the starting point by an angle amount
            this.rotatedRay = new Line(start, new Point(start.x + Math.cos(this.angle), start.y + Math.sin(this.angle)));
            // In this for we check for collisions with every wall
            for(this.i = 0; this.i < this.walls.length; this.i ++) {
                // Current intersection is a holding variable that has a sole purpose to hold the result of the intersection check
                this.currentIntersection = wallRayIntersection(this.walls[this.i], this.rotatedRay);
                // If a ray doesn't collide with a wall it is undefined
                if(this.currentIntersection !== undefined) {
                    // We determine the distance of the light ray from the player to a wall
                    if(this.minimumDistance > distance(this.currentIntersection, start)) {
                        this.intersection = this.currentIntersection;
                        this.minimumDistance = distance(this.currentIntersection, start);
                    }
                }
            }
            // We push an intersection of value into the intersections array
            if(this.intersection != undefined) {
                this.intersections.push(this.intersection);
            }
        }
        // Returns an array of intersection points between the light rays coming from the player and walls
        // they can then be connected within a draw function to make light
        return this.intersections;
    }
}
// bottom text
