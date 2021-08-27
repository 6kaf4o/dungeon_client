//Camera is not static and you may have multiple cameras
var Point = require('/utilities/Geometry.js').Point

module.exports = class Camera {
    constructor(mazeSize = new Point(800,600), cameraSize = new Point(800 , 600)) {
        this.mazeSize = mazeSize;
        this.cameraSize = cameraSize;
        this.pos = new Point(0,0);
    }

    //follow() reqires a Point class to follow and updates the cameras position
    follow(a) {
        this.pos.x = a.position.x - this.cameraSize.x / 2;
        this.pos.y = a.position.y - this.cameraSize.y / 2;
        if (this.pos.x < 0) {
            this.pos.x = 0;
        }
        if (this.pos.y < 0) {
            this.pos.y = 0;
        }
        if (this.pos.x > this.mazeSize.x) {
            this.pos.x = this.mazeSize.x;
        }
        if (this.pos.y > this.mazeSize.y) {
            this.pos.y = this.mazeSize.y;
        }
    }

    // calculates a point's draw position according to the cameras location
    calculatePos(pos) {
        let returnpos = { x: pos.x, y: pos.y }
        returnpos.x -= this.pos.x
        returnpos.y -= this.pos.y
        return returnpos;
    }

}