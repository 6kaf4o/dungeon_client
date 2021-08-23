var walls = [];
var intersections = [];

walls.push(new Line(new Point(0, 0), new Point(800, 0)));
walls.push(new Line(new Point(800, 600), new Point(800, 0)));
walls.push(new Line(new Point(800, 600), new Point(0, 600)));
walls.push(new Line(new Point(0, 0), new Point(0, 600, 1)));

for (let i = 0; i < Math.random() * 4 + 1; i++) {
    walls.push(new Line(new Point(Math.random() * 300, Math.random() * 300), new Point(Math.random() * 300, Math.random() * 300)));
}

var p_spritesheet = new Sheet('./testchar', { rows: 4, columns: 4, width: 1601, height: 2397 });
var p = new Player(new Point(100, 100), 20, [], 0, );
var lighting = new Lighting(walls);

function update() {
    intersections = lighting.drawLight(p.position);
    p.update();
}

function draw() {

    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "white";
    context.beginPath();
    for (let i = 1; i < intersections.length; i++) {
        context.lineTo(intersections[i].x, intersections[i].y);
    }
    context.fill();

    lighting.drawLight(p.position);

    context.strokeStyle = "red";
    context.lineWidth = 3;

    for (let i = 0; i < walls.length; i++) {
        context.beginPath()
        context.lineTo(walls[i].begin.x, walls[i].begin.y);
        context.lineTo(walls[i].end.x, walls[i].end.y);
        context.stroke();
    }

    p.draw();

    for (let i = 0; i < p.bullets; i++) {
        p.bullet[i].draw();
    }
}

function mouseup() {
    p.shoot();
}
