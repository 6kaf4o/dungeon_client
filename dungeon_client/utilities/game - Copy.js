﻿function areCirclesColliding(x1, y1, r1, x2, y2, r2){
    let dist = Math.sqrt((x1-x2)(x1-x2) + (y1-y2)(y1-y2))
    return dist<=r1+r2; 
}