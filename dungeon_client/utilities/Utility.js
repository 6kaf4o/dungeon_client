module.exports = class Utility{
    constructor(){
    }
    // Returns true if there was no problem.
    static fixWallRayIntersection(line, ray, intersection) {
        // This makes the light ray shine only in front of you
        let isBetweenx = false, isBetweeny = false;
        if((ray.end.x <= ray.begin.x && ray.begin.x <= intersection.x) || (ray.end.x >= ray.begin.x && ray.begin.x >= intersection.x)) {
            isBetweenx = true;
        }
        if((ray.end.y <= ray.begin.y && ray.begin.y <= intersection.y) || (ray.end.y >= ray.begin.y && ray.begin.y >= intersection.y)) {
            isBetweeny = true;
        }
        if(isBetweeny && isBetweenx) {
            return false;
        }
        // This checks if the light collides with a wall, and not the ray it lays on
        isBetweenx = false, isBetweeny = false;
        if((line.begin.x <= intersection.x && intersection.x <= line.end.x) || (line.begin.x >= intersection.x && intersection.x >= line.end.x)) {
            isBetweenx = true;
        }
        if((line.begin.y <= intersection.y && intersection.y <= line.end.y) || (line.begin.y >= intersection.y && intersection.y >= line.end.y)) {
            isBetweeny = true;
        }
        if(!isBetweeny || !isBetweenx) {
            return false;
        }
        return true;
    }

    static wallRayIntersection(wall, ray) {
        wall.recalculate();
        ray.recalculate();
        let x = (wall.b - ray.b) / (ray.m - wall.m);
        let y = x * wall.m + wall.b;
        // The point of contact between the ray and wall
        let answerPoint = new Point(x, y);
        if(fixWallRayIntersection(wall, ray, answerPoint)) {
            return answerPoint;        
        } 
        else {
            return false;
        }
    }
    // Checks for collision between a circle and rectangle
    static rectCircleColliding(circle,rect){
        let distX = Math.abs(circle.x - rect.pos.x - rect.size.x/2);
        let distY = Math.abs(circle.y - rect.pos.y - rect.size.y/2);
        let dx = distX-rect.size.x/2;
        let dy = distY-rect.size.y/2;

        if (distX > (rect.size.x/2 + circle.radius) || distY > (rect.size.y/2 + circle.radius)) {
            return false; 
        }

        if ((distX < (rect.size.x/2) || distY < (rect.size.y/2)) || (dx * dx + dy * dy <= (circle.radius * circle.radius))) {
            return true; 
        }
        return undefined;
    }
    static areCirclesColliding(x1, y1, r1, x2, y2, r2){
        let dist = Math.sqrt((x1-x2)(x1-x2) + (y1-y2)(y1-y2))
        return dist<=r1+r2; 
    }
    static areColliding(Ax, Ay, Awidth, Aheight, Bx, By, Bwidth, Bheight) {
    if (Bx <= Ax + Awidth) {
        if (Ax <= Bx + Bwidth) {
            if (By <= Ay + Aheight) {
                if (Ay <= By + Bheight) {
                    return true;
                }
            }
        }
    }
    return false;
};
}
