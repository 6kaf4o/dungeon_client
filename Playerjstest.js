context.feelRECT = context.fillRect;

class Magic{
    constructor(x,y,dx,dy){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
    }
    draw(){
        this.x += this.dx
        this.y += this.dy
        context.fillRect(this.x,this.y,20,20)
    }
}

var p = new Player(100,100,20,[],0)

function update (){
    p.logic()
}

function draw(){
    p.draw()
    for(let i = 0 ; i < p.bullets ; i ++){
        p.bullet[i].draw()
    }
}

function mouseup(){
    p.shoot()
}
