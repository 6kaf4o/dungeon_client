class Projectile { // Abstract class, please don't create any objects of this type
    constructor(x, y, deltaX, deltaY, damage){
        // TODO: Throw an error if initialized 
        this.x = x;
        this.y = y;
        this.deltaX = deltaX;
        this.deltaY = deltaY;
        this.damage = damage;
    }
    calculateDamage(){}
    update(){}
    draw(){}
    isColliding(rect){}
}

class Fireball extends Projectile {
    constructor(x, y, deltaX, deltaY, damage, radius = 15) {
        super(x, y, deltaX, deltaY, damage);
        this.radius = radius;
    }
    update() {   
        this.x += this.deltaX;
        this.y += this.deltaY;
    }
    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 2 * Math.PI, 0);
        context.fill();
        context.stroke();
    }
    calculateDamage() {
        return this.damage;
    }
    isColliding(rect){
        return rectCircleColliding(this, player);
    }
}

class Arrow extends Projectile {
    constructor(x, y, deltaX, deltaY, damage, sizeX = 20, sizeY = 5){
        super(x, y, deltaX, deltaY, damage);
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.theta = Math.atan2(deltaY,deltaX);

    }
    update() {   
        this.x += this.deltaX;
        this.y += this.deltaY;
    }
    draw(){
        context.save();
        context.translate(this.x - (this.sizeX / 2), this.y - (this.sizeY / 2))
        context.rotate(this.theta)
        context.fillRect(-this.sizeX/2, -this.sizeY/2, this.sizeX, this.sizeY);
        context.restore();
    }
}

class Bubble extends Projectile {
    constructor(x, y, deltaX, deltaY, damage, radius = 20){
        super(x, y, deltaX, deltaY, damage);
        this.radius = radius;
    }
    update(){
        this.x += this.deltaY;
        this.y += this.deltaX;
        let len = Math.sqrt(this.deltaX * this.deltaX + this.deltaY * this.deltaY);
        let newLen = len - 0.04;
        this.deltaX = (this.deltaX / len) * newLen;
        this.deltaY = (this.deltaY / len) * newLen;
    }
    draw(){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 2 * Math.PI, 0);
        context.fill();
        context.stroke();        
    }

}

class Grenade extends Projectile {
    constructor(x, y, deltaX, deltaY, damage, sizeX = 25, sizeY = 6, radius = 10){
        super(x, y, deltaX, deltaY, damage);
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.radius = radius;
        this.theta = Math.atan2(deltaY,deltaX);
        this.boom = false;

    }
    update(){
        if(!this.boom){
        this.x += this.deltaX;
        this.y += this.deltaY;
        }
        if(this.boom && this.radius <= 100){
            this.radius += 2;
        }
    }
    draw(){
            if(!this.boom){
                context.save();
                context.translate(this.x - (this.sizeX / 2), this.y - (this.sizeY / 2))
                context.rotate(this.theta);
                context.fillRect(-this.sizeX/2, -this.sizeY/2, this.sizeX, this.sizeY);
                context.restore();
            }else if(this.boom){
                context.beginPath();
                context.arc(this.x, this.y, this.radius, 2 * Math.PI, 0);
                context.fill();
                context.stroke();     
            }
    }
    explode(){
        this.boom = true;
    }
    isColliding(rect){
        return rectCircleColliding(this, player);
    }

}

module.exports = {
    Projectile: Projectile,
    Fireball: Fireball,
    Arrow: Arrow, 
    Bubble: Bubble, 
    Grenade: Grenade
}