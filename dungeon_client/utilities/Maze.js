const Geometry = require('/utilities/Geometry.js');
const Point = Geometry.Point;
const Line = Geometry.Line;

let MazeRet = {walls : []};
MazeRet.walls.push(new Line(new Point(0, 0), new Point(800, 0)));
MazeRet.walls.push(new Line(new Point(800, 0), new Point(800, 600)));
MazeRet.walls.push(new Line(new Point(0, 600), new Point(800, 600)));
MazeRet.walls.push(new Line(new Point(0, 0), new Point(0, 600)));
MazeRet.walls.push(new Line(new Point(300, 100), new Point(300, 300)));

module.exports = MazeRet;
