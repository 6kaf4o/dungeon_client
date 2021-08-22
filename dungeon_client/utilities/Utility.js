//Returns true if there was no problem.
function fixWallRayIntersection(line, ray, intersection) {
    // This makes the light shine only in front of you
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

    //This checks if the light collides with a wall, and not the ray it lays on
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

function wallRayIntersection(wall, ray) {
    wall.recalculate();
    ray.recalculate();

    let x = (wall.b - ray.b) / (ray.m - wall.m);
    let y = x * wall.m + wall.b;

    let answerPoint = new Point(x, y);

    if(fixWallRayIntersection(wall, ray, answerPoint)) {
        return answerPoint;        
    } else {
        return undefined;
    }
}