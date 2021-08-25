const Gamestate = require('/framework/State.js');
const Utility = require('/utilities/Utility.js');
const Geometry = require('/utilities/Geometry.js');
const Point = Geometry.Point;
const Line = Geometry.Line;

class Projectile { // Abstract class, please don't create any objects of this type
    constructor(position, delta, damage){
        // TODO: Throw an error if initialized 
        this.position = position;
        this.delta = delta;
        this.damage = damage;
    }
    calculateDamage(){}
    update(){}
    draw(){}
    isColliding(rect){}
}

class Fireball extends Projectile {
    constructor(position, delta, damage, radius = 15) {
        super(position, delta, damage);
        this.radius = radius;
    }
    update() {   
        this.position.x += this.delta.x;
        this.position.y += this.delta.y;
    }
    draw() {
        Gamestate.context.beginPath();
        Gamestate.context.arc(this.position.x, this.position.y, this.radius, 2 * Math.PI, 0);
        Gamestate.context.fill();
        Gamestate.context.stroke();
    }
    calculateDamage() {
        return this.damage;
    }
    isColliding(rect){
        return rectCircleColliding(this, player);
    }
}

class Arrow extends Projectile {
    constructor(position, delta, damage, width = 20, height = 5){
        super(position, delta, damage);
        this.size = new Size(width, height);
        this.theta = Math.atan2(this.delta.x, this.delta.y);

    }
    update() {   
        this.position.x += this.delta.x;
        this.position.y += this.delta.y;
    }
    draw(){
        Gamestate.context.save();
        Gamestate.context.translate(this.position.x - (this.size.width / 2), this.position.y - (this.size.height / 2))
        Gamestate.context.rotate(this.theta)
        Gamestate.context.fillRect(-this.size.width/2, -this.size.height/2, this.size.width, this.size.height);
        Gamestate.context.restore();
    }
}

class Bubble extends Projectile {
    constructor(position, delta, damage, radius = 20){
        super(position, delta, damage);
        this.radius = radius;
    }
    update(){
        if(this.delta.x < 0.25 || this.delta.y < 0.25){
            this.position.x += this.delta.y;
            this.position.y += this.delta.x;
            let len = Math.sqrt(this.delta.x * this.delta.x + this.delta.y * this.delta.y);
            let newLen = len - 0.04;
            this.delta.x = (this.delta.x / len) * newLen;
            this.delta.y = (this.delta.y / len) * newLen;
        }
    }
    draw(){
        Gamestate.context.beginPath();
        Gamestate.context.arc(this.position.x, this.position.y, this.radius, 2 * Math.PI, 0);
        Gamestate.context.fill();
        Gamestate.context.stroke();        
    }

}

class Grenade extends Projectile {
    constructor(position, delta, damage, width = 25, height = 6, radius = 10){
        super(position, delta, damage);
        this.size = new Size(width, height)
        this.radius = radius;
        this.theta = Math.atan2(this.delta.x, this.delta.y);
        this.boom = false;

    }
    update(){
        if(!this.boom){
        this.position.x += this.delta.x;
        this.position.y += this.delta.y;
        }
        if(this.boom && this.radius <= 100){
            this.radius += 2;
        }
    }
    draw(){
            if(!this.boom){
                Gamestate.context.save();
                Gamestate.context.translate(this.position.x - (this.size.width / 2), this.position.y - (this.size.height / 2))
                Gamestate.context.rotate(this.theta);
                Gamestate.context.fillRect(-this.size.width/2, -this.size.height/2, this.size.width, this.size.height);
                Gamestate.context.restore();
            }else if(this.boom){
                Gamestate.context.beginPath();
                Gamestate.context.arc(this.position.x, this.position.y, this.radius, 2 * Math.PI, 0);
                Gamestate.context.fill();
                Gamestate.context.stroke();     
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